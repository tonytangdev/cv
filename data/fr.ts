import { Data } from "@/types/data";

const data: Data = {
  name: "Tony Tang",
  lastUpdatedAt: new Date("2026-11-01"),
  status: {
    color: "active",
    label: "Ouvert aux missions freelance (soirs et week-ends)",
  },
  location: "Paris, France",
  headline: "Head of Engineering",
  tagline:
    "J'encadre des équipes qui construisent et font grandir des produits web, et je fais passer mon équipe à l'IA.",
  description:
    "Head of Engineering chez Fonts Ninja à Paris. 10 ans à construire des produits web, à la tête d'une équipe de 5 développeurs. TypeScript, NestJS, React, AWS.",
  summary: `Je suis Tony, Head of Engineering chez Fonts Ninja à Paris, avec environ 10 ans d'expérience dans le développement de produits web. J'encadre une équipe de 5 développeurs : je choisis nos technologies, je définis nos standards et je tranche les décisions techniques, et j'ai un impact direct sur la direction produit. Avant cela, j'ai passé 5 ans chez Planity, la plateforme n°1 de la réservation beauté en France, d'abord comme développeur puis à la tête d'une équipe de 4 à 6 développeurs. Aujourd'hui, je me concentre sur des systèmes qui traitent de grands volumes de données, et sur l'utilisation de l'IA pour changer la façon dont mon équipe travaille. J'ai également accompagné une vingtaine de développeurs en tant que mentor sur Codementor.`,
  highlights: [
    "J'encadre une équipe de 5 développeurs en tant que Head of Engineering chez Fonts Ninja.",
    "5 ans chez Planity, la plateforme n°1 de la réservation beauté en France (plus de 40 000 salons, environ 10M de rendez-vous par mois), dont les 3 dernières à la tête d'une équipe de 4 à 6 développeurs.",
    "Recrutement de 2 développeurs seniors, et accompagnement d'une vingtaine de développeurs en tant que mentor. La plupart des développeurs que j'ai encadrés chez Planity ont été promus.",
    "Pilotage d'une migration sans interruption de service qui a rendu le tableau de bord des salons Planity beaucoup plus rapide et corrigé des totaux faux depuis longtemps.",
    "Je fais passer mon équipe à l'IA : les erreurs de production sont désormais triées par l'IA, et les développeurs comme notre Product Owner l'utilisent pour explorer le code.",
  ],
  services: [
    {
      title: "Créer ou relancer un produit web",
      description:
        "Applications web, API et outils internes, de la première version à la mise en production, conçus pour que votre équipe puisse les maintenir.",
    },
    {
      title: "Back-end et traitement de données",
      description:
        "Des systèmes qui collectent et traitent de grands volumes de données de façon fiable : web scrapers, files de messages et tâches de fond.",
    },
    {
      title: "Faire passer votre équipe à l'IA",
      description:
        "Mise en place d'outils et de méthodes d'IA pour que vos développeurs livrent plus vite, sans baisser la qualité.",
    },
    {
      title: "Direction technique à temps partiel",
      description:
        "Décisions techniques, revue de code, recrutement et mentorat pour les équipes sans profil senior.",
    },
  ],
  leadershipSkills: [
    "Management d'équipe technique",
    "Leadership",
    "Recrutement",
    "Mentorat",
    "Revue de code",
    "Planification des livraisons",
    "Décisions techniques",
    "Adoption de l'IA",
  ],
  skillGroups: [
    {
      label: "Langages et frameworks",
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
      skills: ["System Design", "Architecture hexagonale", "Web scraping"],
    },
    {
      label: "Données et messages",
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
      label: "IA",
      skills: ["Claude Code", "Automatisation IA (LLM)"],
    },
    {
      label: "Paiement et e-commerce",
      skills: ["Stripe", "Shopify"],
    },
  ],
  work: [
    {
      company: "Fonts Ninja",
      companyDescription:
        "Édite une extension de navigateur qui identifie les polices de n'importe quel site (900k utilisateurs sur Chrome), et Font Radar, un service qui trouve les sites utilisant des polices sans licence pour que les fonderies typographiques soient rémunérées.",
      link: "https://fonts.ninja",
      badges: [],
      title: "Head of Engineering",
      start: "févr. 2026",
      end: "Aujourd'hui",
      highlights: [
        "J'encadre une équipe de 5 développeurs : je choisis les technologies, je définis les standards et je tranche lorsque l'équipe n'est pas d'accord sur une solution.",
        "Impact direct sur la direction produit, dans une structure plus petite avec davantage de responsabilités que mon poste précédent.",
        "Recrutement de 2 développeurs seniors, dont l'un travaille aujourd'hui avec nous à distance depuis la Corée.",
        "Je fais passer l'équipe à l'IA : l'IA trie désormais nos erreurs de production, et les développeurs comme notre Product Owner l'utilisent pour explorer le code.",
        "Pilotage de la modernisation progressive de notre traitement des données, planifiée pour limiter au maximum les interruptions de service.",
      ],
      details: [
        "Définition des standards de code de l'équipe et respect de l'architecture hexagonale à travers les revues de code ; j'interviens sur chaque projet pour valider les solutions lorsque les développeurs ont des doutes.",
        "Pilotage de la migration des files de messages legacy en base de données vers BullMQ et Redpanda : les parties les plus simples ou les plus utiles d'abord, chaque flux de données cartographié et chaque étape planifiée.",
        "Automatisation du tri des erreurs AWS et Sentry par l'IA, et mise en place d'une analyse du code par IA.",
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
      title: "Développeur Back-End",
      start: "avr. 2025",
      end: "févr. 2026",
      highlights: [
        "Arrivé en tant que développeur back-end sur les systèmes derrière les deux produits.",
        "Travail sur les robots de Font Radar, qui scannent 30M de nouveaux sites par jour pour trouver ceux qui utilisent le plus probablement des polices sans licence.",
        "Développement et maintenance de nombreuses automatisations et d'outils de collecte de données.",
      ],
      details: [
        "Début de la migration des files de messages legacy en base de données vers BullMQ et Redpanda, pour lancer de nombreux workers en parallèle sur une base en croissance constante et suivre facilement leur progression.",
        "Développement et maintenance de web scrapers.",
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
        "Web scraping",
      ],
    },
    {
      company: "Planity",
      companyDescription:
        "La plateforme n°1 de la réservation beauté en France : plus de 40 000 salons et environ 10M de rendez-vous par mois, également en Belgique et en Allemagne.",
      link: "https://planity.com",
      badges: [],
      title: "Lead Developer",
      start: "févr. 2022",
      end: "févr. 2025",
      highlights: [
        "Direction d'une équipe passée de 4 à 6 développeurs en 3 ans, l'une des équipes créées lorsque Planity a structuré son équipe technique.",
        "Accompagnement des développeurs avec qui je travaillais : la plupart ont été promus, et certains sont devenus Lead Developers à leur tour.",
        "Estimation des délais, planification des livraisons et revue du travail de l'équipe (lisibilité, justesse et sécurité).",
        "Pilotage de la migration sans interruption de service du tableau de bord de statistiques des salons : beaucoup plus rapide, moins coûteux, et des totaux faux depuis longtemps corrigés.",
      ],
      details: [
        "Migration du tableau de bord de Firebase vers Elasticsearch, en remplaçant les caches précalculés par des agrégations à la volée.",
        "Validation de l'approche par une preuve de concept, puis conception de la migration : double écriture, reprise idempotente et reprenable de millions d'enregistrements avec AWS Step Functions et Lambda, vérification de chaque total salon par salon, et bascule par feature flag répétée en préproduction.",
        "La majeure partie de mon temps consacrée à la revue de pull requests plutôt qu'à l'écriture de code.",
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
      title: "Développeur Web Fullstack",
      start: "févr. 2020",
      end: "févr. 2022",
      highlights: [
        "Développement de fonctionnalités pour l'application de réservation grand public, sur web et mobile, et pour Planity Pro, le logiciel de gestion des salons.",
        "Développement d'un système de caisse pour les salons en Allemagne, et intégration du paiement en ligne et de Shopify.",
        "Conception de fonctionnalités d'envergure, et mises en production planifiées pour que les clients encore sur d'anciennes versions de l'application ne soient pas impactés.",
      ],
      details: [
        "Travail sur le back-end AWS (Lambda, S3, API Gateway, OpenSearch) et sur les mises à jour en temps réel avec Firebase et Firestore.",
        "Intégration de Stripe et Shopify, et travail sur le sharding de la base de données.",
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
      companyDescription: "Banque de détail française.",
      link: "https://www.lcl.fr",
      badges: ["alternance"],
      title: "Analyste Programmeur",
      start: "nov. 2017",
      end: "oct. 2019",
      highlights: [
        "Ajout de fonctionnalités à une application bancaire interne utilisée au quotidien par de nombreux collaborateurs.",
        "Collaboration avec d'autres équipes pour intégrer les nouvelles fonctionnalités au système existant.",
        "Écriture de tests automatisés pour garantir la fiabilité de cette application critique.",
      ],
      details: ["L'application reposait sur une ancienne version de Java."],
      techStack: ["Java"],
    },
    {
      company: "FWA",
      link: "https://fwa.eu",
      badges: ["alternance"],
      title: "Développeur Web",
      start: "août 2016",
      end: "oct. 2017",
      highlights: [
        "Maintenance d'une application web métier complexe.",
        "Optimisation de requêtes en base de données et participation à des migrations de bases de données.",
      ],
      details: [
        "L'application était développée en C# et ASP.NET avec le système de templates interne de l'entreprise.",
      ],
      techStack: ["C#", "ASP.NET", "SQL", "MySQL"],
    },
  ],
  education: [
    {
      school: "Supinfo",
      kind: "degree",
      degree: "Expert en Informatique et Systèmes d'Information (Bac+5)",
      start: "2014",
      end: "2019",
    },
    {
      school: "Amazon Web Services",
      kind: "certification",
      degree:
        "Certification AWS Solutions Architect – Associate (SAA-C01, expirée)",
      start: "oct. 2018",
      end: "nov. 2020",
    },
  ],
  projects: [
    {
      title: "Extension Fonts Ninja",
      techStack: ["TypeScript", "Extension de navigateur"],
      description:
        "Identifie n'importe quelle police sur n'importe quel site en un clic, grâce à Font DNA, un algorithme maison qui analyse le vrai fichier de police plutôt que le CSS. 900k utilisateurs sur Chrome (noté 4,4/5), également disponible sur Firefox et Safari.",
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
        "Web scraping",
      ],
      description:
        "Protection des licences pour les fonderies typographiques. Un ensemble de robots et de jobs scanne plus de 30M de nouveaux sites par jour (issus de CTDomains), alimente une base de plus d'1 milliard de sites et 10M d'applications, et identifie ceux qui utilisent des polices sans la licence appropriée, afin que les fonderies soient rémunérées pour leur travail.",
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
        "La plateforme n°1 de la réservation beauté en France, avec 15M d'utilisateurs par mois, également présente en Belgique et en Allemagne. J'ai travaillé sur les applications web et mobile.",
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
        "Logiciel de gestion pour les professionnels de la beauté, sur web, tablette et téléphone : agenda et gestion des rendez-vous en temps réel, et système de caisse utilisé en France, en Belgique et en Allemagne.",
      link: {
        label: "pro.planity.com",
        href: "https://pro.planity.com",
      },
    },
    {
      title: "Mentorat sur Codementor",
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
        "Accompagnement d'une vingtaine de développeurs sur Codementor, sur leurs projets React, Next.js, Node.js, TypeScript et MongoDB.",
      link: {
        label: "codementor.io",
        href: "https://www.codementor.io/@tonytangdev",
      },
    },
  ],
  email: "tony@tonytang.dev",
  links: [
    { label: "tonytang.dev", href: "https://tonytang.dev/fr/", kind: "website" },
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
      label: "Learn Effect (cours)",
      href: "https://learn-effect-ts.tonytang.dev",
      kind: "course",
    },
  ],
};

export default data;
