import type { LocaleId } from '@/app.config';
import en from './en';
import fr from './fr';

type Widen<T> = { [K in keyof T]: T[K] extends string ? string : Widen<T[K]> };
export type Dictionary = Widen<typeof en>;

const dictionaries: Record<LocaleId, Dictionary> = { en, fr };

export const getDictionary = (locale: LocaleId) => dictionaries[locale];
