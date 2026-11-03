import { LinkedInIcon } from '@/app/components/icons';
import { Link } from '@/types/data';
import {
  SiCodementor,
  SiGithub,
  SiX,
  SiYoutube,
} from '@icons-pack/react-simple-icons';
import { BookOpen, Globe } from 'lucide-react';

const icons = {
  website: Globe,
  linkedin: LinkedInIcon,
  github: SiGithub,
  x: SiX,
  youtube: SiYoutube,
  course: BookOpen,
  codementor: SiCodementor,
} satisfies Record<Link['kind'], unknown>;

export function LinkIcon({ kind, size = 15 }: { kind: Link['kind']; size?: number }) {
  const Icon = icons[kind];
  return <Icon size={size} aria-hidden="true" />;
}
