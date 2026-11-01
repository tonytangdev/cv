'use client';

import { AppConfig, type LocaleId } from '@/app.config';
import { cn } from '@/app/lib/utils';
import type { Dictionary } from '@/locales';
import { GlassesSvg } from '@/app/components/glasses';
import { ArrowUp, Square, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Chat about the CV. Answers come from the ask.tonytang.dev worker
 * (tonytangdev/ask), which holds the model, the prompt and the abuse
 * limits. The browser proves it's human once with Cloudflare Turnstile and
 * gets a 30-minute session for its questions.
 */

type Status = 'verifying' | 'ready' | 'failed';
/** `failed`: an error shown in place of an answer, never sent back to the model. */
type Message = { role: 'user' | 'assistant'; content: string; failed?: boolean };
type ChatDictionary = Dictionary['chat'];
type Session = { token: string; expiresAt: number };

// What the worker accepts per request (see tonytangdev/ask src/validate.ts).
const MAX_MESSAGES = 11;
const MAX_ANSWER_CHARS = 2500;

type Turnstile = {
  render(el: HTMLElement, opts: Record<string, unknown>): string;
  execute(id: string): void;
  reset(id: string): void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

let turnstileScript: Promise<Turnstile> | null = null;
function loadTurnstile(): Promise<Turnstile> {
  turnstileScript ??= new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('Turnstile missing')));
    s.onerror = () => {
      turnstileScript = null;
      reject(new Error('Turnstile failed to load'));
    };
    document.head.appendChild(s);
  });
  return turnstileScript;
}

class AskError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
  ) {
    super(code);
  }
}

async function post(path: string, body: object, token?: string) {
  const res = await fetch(`${AppConfig.ask.url}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = (await res.json().catch(() => null)) as { error?: { code?: string } } | null;
    throw new AskError(res.status, err?.error?.code ?? 'error');
  }
  return res;
}

/** The most recent answered turns the worker accepts, starting with a question. */
function recentHistory(messages: Message[]): { role: Message['role']; content: string }[] {
  // Drop failed turns (the question and the error shown instead of an answer).
  const answered = messages.filter((m, i) => !m.failed && !messages[i + 1]?.failed);
  const recent = answered.slice(-MAX_MESSAGES);
  const start = recent[0]?.role === 'assistant' ? 1 : 0;
  return recent.slice(start).map((m) => ({ role: m.role, content: m.content.slice(0, MAX_ANSWER_CHARS) }));
}

export function CvChat({ locale, t }: { locale: LocaleId; t: ChatDictionary }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('verifying');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [generating, setGenerating] = useState(false);

  const session = useRef<Session | null>(null);
  const widget = useRef<{ id: string; resolve?: (token: string) => void; reject?: (e: Error) => void } | null>(null);
  const challengeBox = useRef<HTMLDivElement>(null);
  const abort = useRef<AbortController | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  /** Runs the Turnstile challenge (invisible unless Cloudflare has doubts). */
  const challenge = useCallback(async (): Promise<string> => {
    const turnstile = await loadTurnstile();
    return new Promise((resolve, reject) => {
      if (!widget.current) {
        widget.current = {
          id: turnstile.render(challengeBox.current!, {
            sitekey: AppConfig.ask.turnstileSiteKey,
            action: AppConfig.ask.site,
            appearance: 'interaction-only',
            execution: 'execute',
            language: locale,
            callback: (token: string) => widget.current?.resolve?.(token),
            'error-callback': () => widget.current?.reject?.(new Error('Turnstile error')),
          }),
        };
      } else {
        turnstile.reset(widget.current.id);
      }
      widget.current.resolve = resolve;
      widget.current.reject = reject;
      turnstile.execute(widget.current.id);
    });
  }, [locale]);

  const newSession = useCallback(async () => {
    const token = await challenge();
    const res = await post('/session', { site: AppConfig.ask.site, token });
    session.current = (await res.json()) as Session;
    return session.current;
  }, [challenge]);

  const validSession = useCallback(async () => {
    const s = session.current;
    // Renew a minute early so a question never races the expiry.
    if (s && s.expiresAt * 1000 - Date.now() > 60_000) return s;
    return newSession();
  }, [newSession]);

  // Verify as soon as the chat opens, so the first question is instant.
  useEffect(() => {
    if (!open || status !== 'verifying') return;
    let cancelled = false;
    validSession()
      .then(() => !cancelled && setStatus('ready'))
      .catch((err) => {
        console.error(err);
        if (!cancelled) setStatus('failed');
      });
    return () => {
      cancelled = true;
    };
  }, [open, status, validSession]);

  // Follow the conversation as it grows (including while an answer types
  // itself out), unless the visitor scrolled up to reread something.
  const content = useRef<HTMLDivElement>(null);
  const stickToBottom = useRef(true);
  useEffect(() => {
    const el = scroller.current;
    if (!el || !content.current) return;
    const onScroll = () => {
      stickToBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    };
    const observer = new ResizeObserver(() => {
      if (stickToBottom.current) el.scrollTo({ top: el.scrollHeight });
    });
    el.addEventListener('scroll', onScroll, { passive: true });
    observer.observe(content.current);
    return () => {
      el.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Only with a mouse: on phones it would pop the keyboard over the suggestions.
    if (open && status === 'ready' && matchMedia('(pointer: fine)').matches) inputRef.current?.focus();
  }, [open, status]);

  // On phones the chat is full screen: keep the page behind it from scrolling.
  useEffect(() => {
    if (!open || !matchMedia('(max-width: 639px)').matches) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || generating || status !== 'ready') return;
    stickToBottom.current = true;
    const history = recentHistory([...messages, { role: 'user', content: q }]);
    setMessages((m) => [...m, { role: 'user', content: q }, { role: 'assistant', content: '' }]);
    setInput('');
    setGenerating(true);
    const setAnswer = (content: string, failed = false) =>
      setMessages((m) => [...m.slice(0, -1), { role: 'assistant', content, failed }]);

    const controller = new AbortController();
    abort.current = controller;
    const body = { site: AppConfig.ask.site, locale, messages: history };
    let text = '';
    try {
      let res: Response;
      try {
        res = await post('/chat', body, (await validSession()).token);
      } catch (err) {
        // Session expired or the IP changed (e.g. mobile network): verify again once.
        if (!(err instanceof AskError && err.status === 401)) throw err;
        res = await post('/chat', body, (await newSession()).token);
      }
      const reader = res.body!.pipeThrough(new TextDecoderStream()).getReader();
      controller.signal.addEventListener('abort', () => void reader.cancel());
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        text += value;
        setAnswer(text);
      }
      if (!text) setAnswer(t.error, true);
    } catch (err) {
      console.error(err);
      const code = err instanceof AskError ? err.code : '';
      const message =
        code === 'rate_limited'
          ? t.rateLimited
          : code === 'daily_limit'
            ? t.dailyLimit
            : code === 'busy'
              ? t.busy
              : t.error;
      setAnswer(text ? `${text}…` : message, !text);
    } finally {
      abort.current = null;
      setGenerating(false);
    }
  }

  if (!AppConfig.ask.turnstileSiteKey) return null;

  return (
    <div className="print:hidden">
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-40 inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-teal py-3 pl-4 pr-5 font-medium text-cream shadow-lg transition hover:-translate-y-px hover:bg-teal-2"
        >
          {/* Drawn straight on the button, like the favicon. */}
          <span className="chat-glasses w-8 shrink-0" aria-hidden="true">
            <GlassesSvg />
          </span>
          {t.open}
        </button>
      )}

      {/* Always mounted, so the conversation and the Turnstile widget survive closing. */}
      <section
        role="dialog"
        aria-label={t.title}
        hidden={!open}
        // Full screen on phones, a floating panel from the sm breakpoint.
        className="fixed inset-0 z-50 flex h-dvh flex-col overflow-hidden bg-surface sm:inset-auto sm:bottom-5 sm:right-5 sm:z-40 sm:h-[min(36rem,calc(100dvh-2.5rem))] sm:w-96 sm:rounded-2xl sm:border sm:border-line sm:shadow-2xl [&[hidden]]:hidden"
      >
        <header className="flex items-center gap-3 bg-teal px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] text-cream">
          <Avatar reading={generating && !messages.at(-1)?.content} className="size-10 bg-teal-2" />
          <div className="min-w-0 flex-1 leading-tight">
            <h2 className="text-[1rem] font-semibold text-cream">Tony Tang</h2>
            <p className="flex items-center gap-1.5 text-[0.78rem] text-cream/80">
              <span className="size-1.5 rounded-full bg-pop" aria-hidden="true" />
              {t.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t.close}
            title={t.close}
            className="inline-grid size-8 cursor-pointer place-items-center rounded-lg transition hover:bg-teal-2"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        <div ref={scroller} className="flex-1 overflow-y-auto px-4 py-4 text-[0.92rem]">
          <div ref={content} className="space-y-3">
          <AssistantRow>
            <Bubble>{t.greeting}</Bubble>
          </AssistantRow>
          {status === 'verifying' && <p className="animate-pulse text-muted">{t.verifying}</p>}
          {status === 'failed' && <p>{t.verifyFailed}</p>}
          {/* Turnstile only shows something here if it needs the visitor to click. */}
          <div ref={challengeBox} />

          {status === 'ready' && messages.length === 0 && (
            <ul className="flex flex-wrap gap-2">
              {t.suggestions.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => ask(s)}
                    className="cursor-pointer rounded-full border border-line px-3 py-1 text-left text-[0.85rem] transition hover:border-accent hover:text-accent"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {messages.map((m, i) =>
            m.role === 'user' ? (
              <div key={i} className="ml-auto w-fit max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-teal px-3 py-2 text-cream">
                {m.content}
              </div>
            ) : (
              <AssistantRow key={i}>
                <Bubble>
                  <Answer
                    text={m.content}
                    streaming={generating && i === messages.length - 1}
                    waitingLabel={t.thinking}
                  />
                </Bubble>
              </AssistantRow>
            ),
          )}
          </div>
          {/* Screen readers hear each answer once, when it's complete. */}
          <p className="sr-only" aria-live="polite">
            {status === 'verifying'
              ? t.verifying
              : !generating && messages.at(-1)?.role === 'assistant'
                ? messages.at(-1)!.content
                : ''}
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void ask(input);
          }}
          className="border-t border-line px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        >
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  void ask(input);
                }
              }}
              rows={1}
              maxLength={500}
              disabled={status !== 'ready'}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              className="max-h-28 min-h-10 flex-1 resize-none rounded-lg border border-line bg-bg px-3 py-2 text-base outline-none sm:text-[0.92rem] focus:border-accent disabled:opacity-50"
            />
            {generating ? (
              <button
                type="button"
                onClick={() => abort.current?.abort()}
                aria-label={t.stop}
                title={t.stop}
                className="inline-grid size-10 shrink-0 cursor-pointer place-items-center rounded-lg border border-line transition hover:border-accent hover:text-accent"
              >
                <Square size={14} aria-hidden="true" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim() || status !== 'ready'}
                aria-label={t.send}
                title={t.send}
                className="inline-grid size-10 shrink-0 cursor-pointer place-items-center rounded-lg bg-teal text-cream transition hover:bg-teal-2 disabled:cursor-default disabled:opacity-40"
              >
                <ArrowUp size={18} aria-hidden="true" />
              </button>
            )}
          </div>
          <p className="mt-2 text-[0.72rem] text-muted">{t.disclaimer}</p>
        </form>
      </section>
    </div>
  );
}

/** Tony's glasses as the assistant's face. `reading`: the pupils scan lines. */
function Avatar({ reading = false, className }: { reading?: boolean; className?: string }) {
  return (
    <span
      className={cn('chat-glasses grid shrink-0 place-items-center rounded-full text-cream', className)}
      data-reading={reading || undefined}
      aria-hidden="true"
    >
      <span className="w-[72%]">
        <GlassesSvg />
      </span>
    </span>
  );
}

/** An assistant message: a small avatar and its bubble. */
function AssistantRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-end gap-2">
      <Avatar className="size-7 bg-teal" />
      {children}
    </div>
  );
}

function Bubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-fit max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-md bg-surface-2 px-3 py-2">
      {children}
    </div>
  );
}

/**
 * An answer that types itself out. The model sends nothing for a moment and
 * then the whole answer in a burst, so the text received so far is revealed
 * at a steady pace: faster when a lot is waiting, never slower than a quick
 * reader. Instant for people who prefer reduced motion.
 */
function Answer({ text, streaming, waitingLabel }: { text: string; streaming: boolean; waitingLabel: string }) {
  const [reducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  // Answers already complete when shown (e.g. errors) don't animate.
  const [start] = useState(() => (streaming ? 0 : text.length));
  const [revealed, setRevealed] = useState(start);
  const target = useRef(text.length);
  useEffect(() => {
    target.current = text.length;
  }, [text.length]);

  useEffect(() => {
    if (reducedMotion) return;
    let frame = 0;
    let last = performance.now();
    let position = start;
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;
      const backlog = target.current - position;
      if (backlog > 0) {
        // Characters per second: 120 to 500, depending on what's waiting.
        const speed = Math.min(500, Math.max(120, backlog * 2));
        position = Math.min(target.current, position + speed * dt);
        setRevealed(Math.floor(position));
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion, start]);

  const shown = reducedMotion ? text.length : revealed;
  const visible = text.slice(0, shown);
  const typing = streaming || shown < text.length;

  // Meanwhile, Tony's glasses read the CV.
  if (!visible && typing) {
    return (
      <span className="flex items-center gap-3 py-0.5">
        <span className="chat-glasses w-14 shrink-0 text-ink" data-reading aria-hidden="true">
          <GlassesSvg />
        </span>
        <span className="italic text-muted">{waitingLabel}</span>
      </span>
    );
  }
  return (
    <>
      <Formatted text={visible} />
      {typing && (
        <span
          className="ml-0.5 inline-block h-[1.1em] w-0.5 animate-pulse bg-current align-text-bottom"
          aria-hidden="true"
        />
      )}
    </>
  );
}

/** Just enough markdown for chat answers: **bold**, links and email addresses. */
function Formatted({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s)]*[^\s).,]|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g).map((part, i) => {
        if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={i}>{part.slice(2, -2)}</strong>;
        if (/^https?:\/\//.test(part))
          return (
            <a key={i} href={part} className="break-all underline">
              {part}
            </a>
          );
        if (/^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$/.test(part))
          return (
            <a key={i} href={`mailto:${part}`} className="underline">
              {part}
            </a>
          );
        return part;
      })}
    </>
  );
}
