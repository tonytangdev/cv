/**
 * One locale's CV. The page reads top to bottom as: a plain-language half for
 * recruiters and clients (headline, highlights, services, experience), then a
 * technical half (grouped skills, projects) for engineers.
 *
 * Everything here is rendered visibly; the JSON-LD, Markdown and PDF versions
 * are generated from the same data so they never claim more than the page.
 */

export type Link = {
  /** Visible label, e.g. "LinkedIn". */
  label: string;
  href: string;
  /** Kind of link, picks the icon and the schema.org mapping. */
  kind: 'website' | 'linkedin' | 'github' | 'x' | 'youtube' | 'course' | 'codementor';
};

export type Status = {
  color: 'active' | 'disabled' | 'pending' | 'blocked';
  label: string;
};

export type Service = {
  title: string;
  description: string;
};

export type Work = {
  company: string;
  /** One plain-language sentence on what the company does. */
  companyDescription?: string;
  link?: string;
  /** e.g. "work-study" */
  badges: string[];
  title: string;
  /** "MMM YYYY", e.g. "Feb 2026" (or the locale's equivalent). */
  start: string;
  /** "MMM YYYY", or the locale's word for "Present". */
  end: string;
  /** Outcomes in plain language, readable without a tech background. */
  highlights: string[];
  /** How it was done, for engineers. */
  details: string[];
  techStack: string[];
};

export type Education = {
  school: string;
  /** schema.org: degree from a school, or a certification. */
  kind: 'degree' | 'certification';
  degree: string;
  start: string;
  end: string;
};

export type Project = {
  title: string;
  description: string;
  techStack: string[];
  link?: {
    label: string;
    href: string;
  };
};

export type SkillGroup = {
  label: string;
  skills: string[];
};

export type Data = {
  name: string;
  lastUpdatedAt: Date;
  status: Status | null;
  location: string;
  /** Job title, e.g. "Head of Engineering". */
  headline: string;
  /** One plain-language sentence under the name. */
  tagline: string;
  /** Short (~160 chars) summary used for meta descriptions. */
  description: string;
  summary: string;
  /** 3–5 plain-language achievements shown at the top. */
  highlights: string[];
  /** What freelance clients can hire me for. */
  services: Service[];
  /** People skills, shown in the plain-language half. */
  leadershipSkills: string[];
  /** Technical skills, shown in the technical half. */
  skillGroups: SkillGroup[];
  work: Work[];
  education: Education[];
  projects: Project[];
  email: string;
  links: Link[];
};
