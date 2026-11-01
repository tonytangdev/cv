'use client';

import { useEffect, useRef } from 'react';

/**
 * The glasses mark from tonytang.dev. Draws itself on once per session, and on
 * desktop the pupils follow the cursor. Both are skipped with reduced motion.
 */
export function Glasses({ width = 26 }: { width?: number }) {
  const root = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    const pupils = el?.querySelector<SVGGElement>('.pupils');
    if (!el || !pupils) return;
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    const calm = matchMedia('(prefers-reduced-motion: no-preference)');
    if (!fine.matches || !calm.matches) return;

    const MAX = 7; // lens r=18, pupil r=5: the pupil stays inside the lens
    let rect = el.getBoundingClientRect();
    let frame = 0;
    let px = 0;
    let py = 0;
    const measure = () => (rect = el.getBoundingClientRect());
    const apply = () => {
      frame = 0;
      const dx = px - (rect.left + rect.width / 2);
      const dy = py - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      const ramp = Math.min(dist, 220) / 220;
      pupils.style.transform = `translate(${(dx / dist) * MAX * ramp}px, ${(dy / dist) * MAX * ramp}px)`;
    };
    const move = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      pupils.style.transform = 'translate(0, 0)';
    };

    addEventListener('scroll', measure, { passive: true });
    addEventListener('resize', measure);
    addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener('scroll', measure);
      removeEventListener('resize', measure);
      removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <span ref={root} className="glasses inline-block leading-none" style={{ width }} aria-hidden="true">
      <GlassesSvg />
    </span>
  );
}

/** The glasses drawing, shared by the header mark and the chat avatar. */
export function GlassesSvg() {
  return (
    <svg viewBox="0 0 120 56" fill="none">
      <g className="frame" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path className="rim" pathLength={1} d="M34 12a18 18 0 1 0 0 36a18 18 0 1 0 0-36" />
        <path className="rim" pathLength={1} d="M86 12a18 18 0 1 1 0 36a18 18 0 1 1 0-36" />
        <path className="bridge" pathLength={1} d="M51 25 C 56 31, 64 31, 69 25" />
        <path className="temple" pathLength={1} d="M17 26 L 6 21" />
        <path className="temple" pathLength={1} d="M103 26 L 114 21" />
      </g>
      <g className="lenses">
        <circle className="lens" cx="34" cy="30" r="16" />
        <circle className="lens" cx="86" cy="30" r="16" />
      </g>
      <g className="pupils">
        <g className="gaze">
          <circle className="pupil" cx="34" cy="30" r="5" fill="var(--pop)" />
          <circle className="pupil" cx="86" cy="30" r="5" fill="var(--pop)" />
        </g>
      </g>
    </svg>
  );
}
