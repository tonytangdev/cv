import type { ComponentType } from 'react';

type Icon = ComponentType<{ size?: number; className?: string }>;

export type Project = {
  title: string;
  techStack: string[];
  description: string;
  link?: {
    label: string;
    href: string;
  };
};

export type Education = {
  school: string;
  degree: string;
  start: string;
  end: string;
};

export type Work = {
  company: string;
  link?: string;
  badges: string[];
  title: string;
  start: string;
  end: string;
  description: string[];
};

export type Contact = {
  label: string;
  href: string;
  icon: Icon;
  toolbar?: boolean;
};

export type Link = {
  label: string;
  href: string;
  icon: Icon;
};

export type Status = {
  color: 'active' | 'disabled' | 'pending' | 'blocked';
  label: string;
};

export type Data = {
  name: string;
  globalName?: string;
  lastUpdatedAt: Date;
  status: Status | null;
  location: string;
  bio: string;
  /** Short (~160 chars) summary used for meta descriptions. */
  description: string;
  summary: string;
  skills: string[];
  education: Education[];
  work: Work[];
  contacts: Contact[];
  projects: Project[];
  links: Link[];
};
