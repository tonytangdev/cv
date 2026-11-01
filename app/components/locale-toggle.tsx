'use client';

import { getDictionary } from '@/locales';
import { Languages } from 'lucide-react';

import { Button } from '@/app/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { AppConfig, LocaleId, localePath } from '@/app.config';

export function LocaleToggle({ locale }: { locale: LocaleId }) {
  const t = getDictionary(locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full uppercase">
          <Languages size={16} className="mr-2" />
          {locale}
          <span className="sr-only">{t.toggleLocale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {AppConfig.locales.map(({ id, label }) => (
          <DropdownMenuItem key={id} asChild>
            <a href={localePath(id)} hrefLang={id}>
              {label}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
