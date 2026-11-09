import { Data } from "@/types/data";

const data: Data = {
  name: "Tony Tang",
  lastUpdatedAt: new Date("2026-11-01"),
  status: {
    color: "active",
    label: "Open to freelance (evenings & weekends)",
  },
  location: "Paris, France",
  headline: "Head of Engineering",
  tagline:
    "I lead teams that build and scale web products, and I'm taking my team AI-first.",
  description:
    "Head of Engineering at Fonts Ninja in Paris. 10 years building web products, leading a team of 5 developers. TypeScript, NestJS, React, AWS.",
  summary: `I'm Tony, Head of Engineering at Fonts Ninja in Paris, with around 10 years of experience building web products. I lead a team of 5 developers: I choose our technologies, set our standards and make the final technical calls, and I have a direct say in the product direction. Before that, I spent 5 years at Planity, France's leading beauty booking platform, first as a developer and then leading a team of 4 to 6 developers. Today I focus on systems that handle large volumes of data, and on using AI to change how my team works. I have also mentored around 20 developers on Codementor.`,
  highlights: [
    "Lead a team of 5 developers as Head of Engineering at Fonts Ninja.",
    "5 years at Planity, France's leading beauty booking platform (40,000+ salons, around 10M appointments a month), the last 3 leading a team of 4 to 6 developers.",
    "Hired 2 senior developers, and mentored around 20 developers. Most of the developers I led at Planity were promoted.",
    "Led a zero-downtime migration that made Planity's salon dashboard much faster and fixed long-standing wrong totals.",
    "Taking my team AI-first: production errors are now triaged by AI, and developers and our Product Owner use AI to explore the codebase.",
  ],
  services: [
    {
      title: "Build or rescue a web product",
      description:
        "Web apps, APIs and back-office tools, from the first version to production, built so your team can maintain them.",
    },
    {
      title: "Backend and data pipelines",
      description:
        "Systems that collect and process large volumes of data reliably: web scrapers, queues and background jobs.",
    },
    {
      title: "Make your team AI-first",
      description:
        "Set up AI tools and workflows so your developers ship faster without lowering quality.",
    },
    {
      title: "Part-time tech leadership",
      description:
        "Technical decisions, code review, hiring and mentoring for teams without a senior lead.",
    },
  ],
  leadershipSkills: [
    "Engineering Management",
    "Team Leadership",
    "Hiring",
    "Mentoring",
    "Code Review",
    "Delivery Planning",
    "Technical Decision-Making",
    "AI Adoption",
  ],
  skillGroups: [
    {
      label: "Languages & frameworks",
      skills: [
        "TypeScript",
        "Node.js",
        "NestJS",
        "Next.js",
        "React",
        "React Native",
        "Redux",
        "XState",
      ],
    },
    {
      label: "Architecture",
      skills: ["System Design", "Hexagonal Architecture", "Web Scraping"],
    },
    {
      label: "Data & messaging",
      skills: [
        "SQL",
        "MySQL",
        "NoSQL",
        "Elasticsearch",
        "BullMQ",
        "Redpanda (Kafka)",
        "Firebase",
        "Firestore",
        "Algolia",
      ],
    },
    {
      label: "Cloud",
      skills: [
        "AWS ECS",
        "AWS SQS",
        "AWS Lambda",
        "AWS S3",
        "AWS Step Functions",
        "AWS DynamoDB",
        "AWS API Gateway",
        "AWS OpenSearch",
        "Cloudflare",
      ],
    },
    {
      label: "AI",
      skills: ["Claude Code", "AI automation (LLMs)"],
    },
    {
      label: "Payments & commerce",
      skills: ["Stripe", "Shopify"],
    },
  ],
  work: [
    {
      company: "Fonts Ninja",
      companyDescription:
        "Makes a browser extension that identifies the fonts on any website (900k users on Chrome), and Font Radar, a service that finds websites using fonts without a license so that type foundries get paid.",
      link: "https://fonts.ninja",
      badges: [],
      title: "Head of Engineering",
      start: "Feb 2026",
      end: "Present",
      highlights: [
        "Lead a team of 5 developers: I choose the technologies, set the standards and make the final call when the team disagrees on a solution.",
        "Have a direct say in the product direction, in a smaller company with broader responsibilities than my previous role.",
        "Hired 2 senior developers, one of whom now works with us remotely from Korea.",
        "Taking the team AI-first: AI now triages our production errors, and both the developers and our Product Owner use AI to explore the codebase.",
        "Leading the step-by-step modernisation of how we process data, planned to keep downtime to a minimum.",
      ],
      details: [
        "Set the team's coding standards and enforce hexagonal architecture through code review; I step into every project to validate solutions when developers have doubts.",
        "Leading the migration from legacy database queues to BullMQ and Redpanda: easiest or most valuable parts first, every data flow mapped and each step planned.",
        "Automated AWS and Sentry error triage with AI, and set up AI codebase analysis.",
      ],
      techStack: [
        "NestJS",
        "TypeScript",
        "Next.js",
        "MySQL",
        "BullMQ",
        "Redpanda",
        "AWS SQS",
        "AWS ECS",
        "AWS S3",
        "AWS Lambda",
        "Cloudflare",
        "Claude Code",
      ],
    },
    {
      company: "Fonts Ninja",
      link: "https://fonts.ninja",
      badges: [],
      title: "Backend Developer",
      start: "Apr 2025",
      end: "Feb 2026",
      highlights: [
        "Joined as a backend developer on the systems behind both products.",
        "Worked on the Font Radar robots, which scan 30M new websites a day to find those most likely to be using fonts without a license.",
        "Built and maintained many automations and data-collection tools.",
      ],
      details: [
        "Started migrating legacy database queues to BullMQ and Redpanda, so that many workers can run in parallel on an ever-growing database and their progress is easy to track.",
        "Built and maintained web scrapers.",
      ],
      techStack: [
        "NestJS",
        "TypeScript",
        "MySQL",
        "BullMQ",
        "Redpanda",
        "AWS SQS",
        "AWS ECS",
        "AWS S3",
        "AWS Lambda",
        "Web Scraping",
      ],
    },
    {
      company: "Planity",
      companyDescription:
        "France's leading beauty booking platform: 40,000+ salons and around 10M appointments a month, also in Belgium and Germany.",
      link: "https://planity.com",
      badges: [],
      title: "Lead Developer",
      start: "Feb 2022",
      end: "Feb 2025",
      highlights: [
        "Led a team that grew from 4 to 6 developers over 3 years, one of the teams created as Planity scaled its engineering.",
        "Mentored the developers I worked with: most of them were promoted, and some became Lead Developers themselves.",
        "Estimated project timelines, planned delivery and reviewed the team's work for readability, correctness and security.",
        "Led the zero-downtime move of the salon statistics dashboard to a new system: it became much faster, cheaper to run, and long-standing wrong totals were fixed.",
      ],
      details: [
        "Migrated the dashboard from Firebase to Elasticsearch, replacing precomputed caches with query-time aggregations.",
        "Validated the approach with a proof of concept, then designed the migration: dual-writes, an idempotent and resumable backfill of millions of records with AWS Step Functions and Lambda, per-salon validation of every total, and a feature-flag cutover rehearsed in preprod.",
        "Spent most of my time reviewing pull requests rather than writing code.",
      ],
      techStack: [
        "Elasticsearch",
        "Firebase",
        "AWS Step Functions",
        "AWS Lambda",
      ],
    },
    {
      company: "Planity",
      link: "https://planity.com",
      badges: [],
      title: "Fullstack Web Developer",
      start: "Feb 2020",
      end: "Feb 2022",
      highlights: [
        "Built features for the public booking app, on web and mobile, and for Planity Pro, the software salons use to run their business.",
        "Built a point-of-sale system for salons in Germany, and integrated online payments and Shopify.",
        "Designed large features, and planned releases so that customers still on older versions of the app kept working.",
      ],
      details: [
        "Worked on the AWS backend (Lambda, S3, API Gateway, OpenSearch) and on real-time updates with Firebase and Firestore.",
        "Integrated Stripe and Shopify, and worked on database sharding.",
      ],
      techStack: [
        "React",
        "React Native",
        "Redux",
        "XState",
        "Firebase",
        "Firestore",
        "AWS Lambda",
        "AWS S3",
        "AWS API Gateway",
        "AWS OpenSearch",
        "Algolia",
        "Stripe",
        "Shopify",
      ],
    },
    {
      company: "LCL",
      companyDescription: "French retail bank.",
      link: "https://www.lcl.fr",
      badges: ["work-study"],
      title: "Software Engineer",
      start: "Nov 2017",
      end: "Oct 2019",
      highlights: [
        "Added features to an internal banking application that many employees depended on every day.",
        "Worked with other teams to integrate new features into the existing system.",
        "Wrote automated tests to keep this business-critical application reliable.",
      ],
      details: ["The application was built on an older version of Java."],
      techStack: ["Java"],
    },
    {
      company: "FWA",
      link: "https://fwa.eu",
      badges: ["work-study"],
      title: "Web Developer",
      start: "Aug 2016",
      end: "Oct 2017",
      highlights: [
        "Maintained a complex business web application.",
        "Made database queries faster and took part in database migrations.",
      ],
      details: [
        "The application was built with C# and ASP.NET on the company's in-house template system.",
      ],
      techStack: ["C#", "ASP.NET", "SQL", "MySQL"],
    },
  ],
  education: [
    {
      school: "Supinfo",
      kind: "degree",
      degree: "Expert in Computer Science and Information Systems (Master's level)",
      start: "2014",
      end: "2019",
    },
    {
      school: "Amazon Web Services",
      kind: "certification",
      degree: "AWS Certified Solutions Architect – Associate (SAA-C01, expired)",
      start: "Oct 2018",
      end: "Nov 2020",
    },
  ],
  projects: [
    {
      title: "Learn Effect",
      techStack: ["Effect", "TypeScript"],
      description:
        "A narrated video course that teaches Effect TypeScript by fixing the bugs developers already ship: typed errors, retries, timeouts, dependency injection and resource leaks. 67 animated-code lessons, 18 of them free, teaching Effect v4 with a v3 edition included.",
      link: {
        label: "learn-effect-ts.tonytang.dev",
        href: "https://learn-effect-ts.tonytang.dev",
      },
    },
    {
      title: "Fonts Ninja Extension",
      techStack: ["TypeScript", "Browser extension"],
      description:
        "Identifies any font on any website in one click, using Font DNA, an in-house algorithm that analyses the actual font file rather than the CSS. 900k users on Chrome (rated 4.4/5), also available on Firefox and Safari.",
      link: {
        label: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/fonts-ninja/eljapbgkmlngdpckoiiibecpemleclhh",
      },
    },
    {
      title: "Font Radar",
      techStack: [
        "NestJS",
        "TypeScript",
        "MySQL",
        "BullMQ",
        "Redpanda",
        "AWS SQS",
        "AWS ECS",
        "AWS Lambda",
        "Web Scraping",
      ],
      description:
        "License enforcement for type foundries. A set of robots and jobs scans over 30M new websites a day (from CTDomains), builds a database of 1B+ websites and 10M+ apps, and finds those using fonts without the appropriate license, so that foundries get paid for their work.",
      link: {
        label: "fontradar.com",
        href: "https://www.fontradar.com",
      },
    },
    {
      title: "Planity",
      techStack: [
        "React",
        "React Native",
        "XState",
        "Firebase",
        "Firestore",
        "AWS Lambda",
        "AWS API Gateway",
        "AWS DynamoDB",
        "AWS S3",
        "Algolia",
        "Stripe",
      ],
      description:
        "France's leading beauty booking platform, with 15M users a month, also available in Belgium and Germany. I worked on both the web and mobile apps.",
      link: {
        label: "planity.com",
        href: "https://planity.com",
      },
    },
    {
      title: "Planity Pro",
      techStack: [
        "React",
        "Redux",
        "Redux Saga",
        "Firebase",
        "Firestore",
        "AWS Lambda",
        "AWS Step Functions",
        "AWS DynamoDB",
        "AWS OpenSearch",
        "Algolia",
        "Stripe",
      ],
      description:
        "Management software for salon professionals on web, tablet and phone: real-time calendar and appointment management, plus a point-of-sale system used in France, Belgium and Germany.",
      link: {
        label: "pro.planity.com",
        href: "https://pro.planity.com",
      },
    },
    {
      title: "Mentoring on Codementor",
      techStack: [
        "React",
        "Next.js",
        "Node.js",
        "TypeScript",
        "JavaScript",
        "MongoDB",
        "HTML",
        "CSS",
      ],
      description:
        "Mentored around 20 developers on Codementor, helping them with their React, Next.js, Node.js, TypeScript and MongoDB projects.",
      link: {
        label: "codementor.io",
        href: "https://www.codementor.io/@tonytangdev",
      },
    },
  ],
  email: "tony@tonytang.dev",
  links: [
    { label: "tonytang.dev", href: "https://tonytang.dev/", kind: "website" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/tony-tang-671248b1/",
      kind: "linkedin",
    },
    { label: "GitHub", href: "https://github.com/tonytangdev", kind: "github" },
    { label: "X", href: "https://x.com/TonyTangdev", kind: "x" },
    {
      label: "YouTube",
      href: "https://www.youtube.com/channel/UCaJEuCzLyx6nEDOg0_kvldw",
      kind: "youtube",
    },
    {
      label: "Learn Effect (course)",
      href: "https://learn-effect-ts.tonytang.dev",
      kind: "course",
    },
  ],
};

export default data;
