import { LocaleId } from '@/app.config';
import { Data } from '@/types/data';

import en from '@/data/en';
import fr from '@/data/fr';

const data: Record<LocaleId, Data> = { en, fr };

export const getData = (locale: LocaleId) => data[locale];
