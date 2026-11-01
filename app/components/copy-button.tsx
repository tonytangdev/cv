'use client';

import { cn } from '@/app/lib/utils';
import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

export function CopyButton({
  value,
  label,
  copiedLabel,
  size = 16,
  className,
}: {
  value: string;
  label: string;
  copiedLabel: string;
  size?: number;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Fallback for browsers/contexts without the async clipboard API.
      const el = document.createElement('textarea');
      el.value = value;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      el.remove();
    }
    setCopied(true);
  }

  const current = copied ? copiedLabel : label;

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={current}
      title={current}
      className={cn('inline-grid cursor-pointer place-items-center transition', className)}
    >
      {copied ? <Check size={size} aria-hidden="true" /> : <Copy size={size} aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">
        {copied ? copiedLabel : ''}
      </span>
    </button>
  );
}
