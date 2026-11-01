'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label={label}
      title={label}
      className="inline-grid size-9 cursor-pointer place-items-center rounded-lg border border-current opacity-75 transition hover:-translate-y-px hover:opacity-100"
    >
      <Moon size={17} className="block dark:hidden" aria-hidden="true" />
      <Sun size={17} className="hidden dark:block" aria-hidden="true" />
    </button>
  );
}
