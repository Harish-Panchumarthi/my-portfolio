/**
 * All portfolio content lives here — edit this file to update the site.
 */
import { IconName } from '../shared/icon';

export interface Profile {
  name: string;
  firstName: string;
  headline: string;
  roles: string[];
  tagline: string;
  location: string;
  phone?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  /** Path to a resume file placed in /public, e.g. 'Harish-Panchumarthi-Resume.pdf' */
  resumeUrl?: string;
}

export const PROFILE: Profile = {
  name: 'Harish Panchumarthi',
  firstName: 'Harish',
  headline: 'Frontend Architect · Manager & Tech Lead',
  roles: [
    'Frontend Architect',
    'Angular Tech Lead',
    'Micro Frontend Specialist',
    'Performance Engineer',
    'Monorepo & DevEx Champion',
  ],
  tagline:
    '12+ years crafting fast, accessible, enterprise-grade web experiences — from AngularJS to Angular 21, React and NX-powered micro frontends for Fortune 500 clients.',
  location: 'Tampa, FL',
  phone: '(980) 643-1118',
  email: '',
  linkedin: '',
  github: '',
  resumeUrl: '',
};

export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'impact', label: 'Impact' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'recognition', label: 'Recognition' },
  { id: 'contact', label: 'Contact' },
];

export const ABOUT = {
  paragraphs: [
    'I’m a UI architect and engineering leader who loves turning sprawling, slow enterprise front-ends into fast, maintainable platforms that teams enjoy working on.',
    'Today I lead the front-end for Citi’s Global Liquidity Reporting System (GLRS) through Capgemini — guiding 20+ applications through four Angular upgrades, an NX monorepo transformation, and an ongoing Angular-to-React migration, all without slowing feature delivery.',
    'Across Citi, The Hartford, Walmart, Freddie Mac, T-Mobile and Sprint, I’ve shipped responsive, WCAG-compliant interfaces, introduced micro frontends, and built the automation that keeps code quality high so developers can focus on building.',
  ],
  facts: [
    { label: 'Based in', value: 'Tampa, FL' },
    { label: 'Currently', value: 'Manager & Tech Lead · Capgemini' },
    { label: 'Experience', value: '12+ years' },
    { label: 'Education', value: 'M.S. Computer Science · UAB' },
  ],
};

export interface Service {
  icon: IconName;
  title: string;
  text: string;
  color: string;
}

export const SERVICES: Service[] = [
  {
    icon: 'layers',
    title: 'Frontend Architecture',
    text: 'Scalable Angular & React platforms with shared libraries, enforced module boundaries and a single source of truth.',
    color: '#a855f7',
  },
  {
    icon: 'grid',
    title: 'Micro Frontends & Monorepos',
    text: 'NX workspaces hosting 20+ independently deployable apps with affected-only builds and computation caching.',
    color: '#ec4899',
  },
  {
    icon: 'zap',
    title: 'Performance Engineering',
    text: 'Load times from 15s to under 1s, builds from 15 min to under 60s, and forecasts from 2 days to 60 seconds.',
    color: '#f59e0b',
  },
  {
    icon: 'git',
    title: 'Framework Migrations',
    text: 'Zero-downtime upgrades — Angular 11 → 16 → 18 → 21 — and parallel Angular-to-React conversion strategies.',
    color: '#06b6d4',
  },
  {
    icon: 'bot',
    title: 'DevEx, Automation & AI',
    text: 'Husky + lint-staged gates, shared ESLint/Prettier configs, Dependabot/Renovate and AI-driven PR reviews.',
    color: '#6366f1',
  },
  {
    icon: 'eye',
    title: 'Accessibility & Quality',
    text: 'WCAG / 508 compliant, cross-browser, responsive UIs with SonarQube A ratings sustained across projects.',
    color: '#10b981',
  },
];

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  color: string;
}

export const STATS: Stat[] = [
  { value: 12, suffix: '+', label: 'Years building for the web', color: '#a855f7' },
  { value: 20, suffix: '+', label: 'Enterprise apps in one monorepo', color: '#ec4899' },
  { value: 94, suffix: '%', label: 'Faster application load time', color: '#f59e0b' },
  { value: 93, suffix: '%', label: 'Faster full-workspace builds', color: '#06b6d4' },
  { value: 4, label: 'Major Angular upgrades led', color: '#6366f1' },
  { value: 0, label: 'Critical vulnerabilities, sustained', color: '#10b981' },
];

export interface Win {
  title: string;
  context: string;
  before: string;
  after: string;
  /** Width of the "after" bar relative to "before" (0–100). */
  ratio: number;
  gradient: string;
}

export const WINS: Win[] = [
  {
    title: 'Application load time',
    context: 'Micro frontends, NX lazy loading & shared session management for GLRS.',
    before: '15 sec',
    after: '< 1 sec',
    ratio: 6,
    gradient: 'linear-gradient(90deg,#a855f7,#ec4899)',
  },
  {
    title: 'Full-workspace build',
    context: 'Custom NX executors, parallelized pipeline & affected-only CI.',
    before: '15+ min',
    after: '< 60 sec',
    ratio: 7,
    gradient: 'linear-gradient(90deg,#f59e0b,#f43f5e)',
  },
  {
    title: 'Liquidity forecast calculation',
    context: 'Targeted rendering & algorithmic optimizations for CCAR analysts.',
    before: '2 days',
    after: '< 60 sec',
    ratio: 2,
    gradient: 'linear-gradient(90deg,#06b6d4,#6366f1)',
  },
];

export interface SkillGroup {
  id: string;
  label: string;
  color: string;
  skills: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    color: '#a855f7',
    skills: [
      'Angular (6 → 21)',
      'AngularJS',
      'React',
      'TypeScript',
      'JavaScript (ES6+)',
      'HTML5',
      'CSS3 / SCSS',
      'RxJS',
      'NgRx',
      'Redux',
      'PrimeNG',
      'Bootstrap',
      'jQuery',
      'D3.js',
    ],
  },
  {
    id: 'architecture',
    label: 'Architecture & Tooling',
    color: '#ec4899',
    skills: [
      'Micro Frontends',
      'NX / Nrwl',
      'Monorepo & Multi-Repo',
      'Shared Libraries',
      'Webpack',
      'Babel',
      'Gulp / Grunt',
      'npm / bower',
      'ESLint',
      'Prettier',
      'Husky + lint-staged',
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    color: '#06b6d4',
    skills: [
      'AWS (EC2, S3, Lambda, CloudFront)',
      'GCP (Cloud Run, GKE, Cloud Build)',
      'Docker',
      'Kubernetes',
      'OpenShift',
      'Helm',
      'Argo CD',
      'GitHub Actions',
      'Jenkins',
      'CircleCI',
      'GitLab CI',
      'Apache / Tomcat / NGINX',
    ],
  },
  {
    id: 'backend',
    label: 'Backend & Data',
    color: '#f59e0b',
    skills: [
      'Node.js',
      'Express.js',
      'Spring Boot',
      'Java',
      'Python',
      'REST APIs',
      'JWT / Passport.js',
      'MongoDB',
      'Oracle',
      'SQL Server',
      'MySQL',
      'PostgreSQL',
    ],
  },
  {
    id: 'quality',
    label: 'Quality & Practices',
    color: '#10b981',
    skills: [
      'Jasmine',
      'Karma',
      'Jest',
      'Enzyme',
      'Protractor',
      'SonarQube',
      'Dependabot',
      'Renovate',
      'Delphi AI reviews',
      'WCAG / 508',
      'Agile / Scrum',
      'Git / SVN',
    ],
  },
];

export const MARQUEE = [
  'Angular 21',
  'React',
  'TypeScript',
  'NX',
  'Micro Frontends',
  'RxJS',
  'NgRx',
  'Redux',
  'Node.js',
  'Spring Boot',
  'AWS',
  'GCP',
  'Docker',
  'Kubernetes',
  'Argo CD',
  'GitHub Actions',
  'SonarQube',
  'WCAG',
];

export interface Job {
  company: string;
  via?: string;
  project?: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  tech: string[];
  color: string;
  current?: boolean;
}

export const EXPERIENCE: Job[] = [
  {
    company: 'Citi',
    via: 'Capgemini America',
    project: 'Global Liquidity Reporting System (GLRS)',
    role: 'Manager, Tech Lead',
    period: 'Dec 2021 — Present',
    location: 'Tampa, FL',
    current: true,
    color: '#a855f7',
    summary:
      'Leading the front-end platform for GLRS — forecasting and reporting liquidity metrics for Citi’s CCAR process across 20+ enterprise applications.',
    highlights: [
      'Led 4 successive Angular upgrades (v11 → 16 → 18 → 21) across 20+ apps with zero downtime, keeping the portfolio on LTS throughout.',
      'Cut application load time from 15s to under 1s (94%) via micro frontends, NX lazy loading and shared session management.',
      'Reduced liquidity forecast UI calculation time from 2 days to under 60 seconds through rendering and algorithmic optimizations.',
      'Architected the NX monorepo consolidating 20+ Angular apps — enforced module boundaries, affected builds and caching cut CI times 80%+.',
      'Authored custom NX executors and build scripts that took full-workspace builds from 15+ minutes to under 60 seconds (93%).',
      'Leading the Angular-to-React conversion: component hierarchy, hooks-based state and parallel migration with full Spring Boot compatibility.',
      'Built a shared library layer and shared configuration repo (ESLint, TypeScript, Prettier) — 100% config consistency across 20 apps.',
      'Integrated Delphi AI into CI/CD for automated PR reviews, and Dependabot + Renovate for a zero-critical-vulnerability posture.',
      'Led the Bitbucket → GitHub migration with branch protection, PR templates and GitHub Actions workflows.',
      'Owned Apache, Tomcat & NGINX configuration — reverse proxy, caching headers, gzip and load balancing for micro frontends.',
      'Sustained a SonarQube A rating while running sprint planning, backlog refinement and technical design sessions.',
    ],
    tech: ['Angular 21', 'React', 'TypeScript', 'NX', 'Micro Frontends', 'PrimeNG', 'RxJS', 'Spring Boot', 'NGINX', 'SonarQube', 'Delphi AI', 'GitHub Actions'],
  },
  {
    company: 'The Hartford',
    via: 'Capgemini America',
    project: 'Auto Claims FNOL (Personal & Commercial)',
    role: 'Lead Developer',
    period: 'Jul 2021 — Nov 2021',
    color: '#ec4899',
    summary:
      'Rebuilt the First Notification of Loss claims experience in Angular 11 — delivered on schedule in a 5-month engagement.',
    highlights: [
      'Built the complete UI layer — claim submission, policy data population and damage reporting — at full parity with the legacy system.',
      'Reverse-engineered all legacy business logic without documentation and re-implemented it with improved structure.',
      'Achieved full WCAG compliance — keyboard navigation, ARIA and screen-reader support — with the accessibility testing team.',
      'Built a reusable Action Menu and HUK-based components that standardized interactions across the entire app.',
      'Implemented Google Analytics on every component, giving the client full funnel and drop-off visibility.',
      'Served as Build Master for DEV/QA and kept a SonarQube A rating throughout.',
    ],
    tech: ['Angular 11', 'TypeScript', 'RxJS', 'HUK Components', 'SCSS', 'Karma', 'Jenkins', 'SonarQube'],
  },
  {
    company: 'Walmart',
    role: 'Senior UI / Front End Developer',
    period: 'Jun 2018 — Jul 2021',
    location: 'Arkansas',
    color: '#f59e0b',
    summary:
      'Architected a micro frontend platform and shipped Angular, React and full-stack MEAN/MERN applications deployed across AWS and GCP.',
    highlights: [
      'Architected a Micro Frontend solution with Nrwl/NX — independent deployments and a shared component library across 20+ apps.',
      'Integrated React and Angular micro-apps into one NX workspace; affected builds and caching cut CI times by 80%+.',
      'Built React apps with Redux, React Router and Webpack/Babel, and Angular 8 SPAs with NgRx and HTTP interceptors.',
      'Engineered MEAN/MERN services with Express, MongoDB and JWT auth, containerized with Docker on GCP GKE.',
      'Led an Angular 8 proof-of-concept that set organization-wide standards for components, routing and cloud deployment.',
      'Established Jasmine, Karma, Jest and Enzyme testing practices enforced as quality gates in CI.',
    ],
    tech: ['Angular 8', 'React', 'Redux', 'NgRx', 'NX', 'Node.js', 'MongoDB', 'AWS', 'GCP', 'Docker', 'Kubernetes', 'Argo CD'],
  },
  {
    company: 'Freddie Mac',
    role: 'Senior Angular Developer',
    period: 'Dec 2017 — Jun 2018',
    location: 'McLean, VA',
    color: '#06b6d4',
    summary: 'Built enterprise-scale financial applications in Angular 6 within an Agile/Scrum team.',
    highlights: [
      'Implemented authentication & authorization integrated with Java Spring RESTful services.',
      'Built reusable Angular 6 components including generic Action Menu modules with RxJS and strong typing.',
      'Served as Build Master — owned Jenkins pipelines and coordinated DEV, QA and PROD releases with zero downtime.',
    ],
    tech: ['Angular 6', 'TypeScript', 'RxJS', 'SCSS', 'Jenkins', 'Karma'],
  },
  {
    company: 'T-Mobile',
    role: 'UI Developer',
    period: 'Aug 2015 — Nov 2017',
    location: 'Irving, TX',
    color: '#6366f1',
    summary: 'Developed responsive, accessible UI modules with AngularJS, jQuery and Bootstrap.',
    highlights: [
      'Built modular AngularJS apps with custom directives, services and factories.',
      'Optimized AJAX/REST integrations to reduce server round-trips and improve perceived performance.',
      'Resolved cross-browser rendering issues across IE, Firefox, Safari and Chrome with QA.',
    ],
    tech: ['AngularJS', 'jQuery', 'Bootstrap', 'REST', 'Jasmine', 'Karma'],
  },
  {
    company: 'Sprint',
    role: 'Front End Developer',
    period: 'Feb 2014 — Jul 2015',
    location: 'Kansas City, MO',
    color: '#10b981',
    summary: 'Built feature-rich pages for customer-facing telecom portals.',
    highlights: [
      'Implemented AngularJS custom directives and factories for clean controller communication.',
      'Applied CSS sprites and CORS to cut HTTP requests and enable secure cross-domain calls.',
      'Authored Jasmine unit and Protractor end-to-end test suites.',
    ],
    tech: ['AngularJS', 'jQuery', 'AJAX', 'Protractor', 'SoapUI'],
  },
];

export const EDUCATION = [
  {
    degree: 'Master’s in Computer Science',
    school: 'University of Alabama at Birmingham',
    place: 'Birmingham, AL',
  },
  {
    degree: 'B.Tech, Electronics & Computer Engineering',
    school: 'KL University',
    place: 'Andhra Pradesh, India',
  },
];

export const AWARDS = [
  { title: 'Gem Award', org: 'Capgemini', year: '2024' },
  {
    title: 'Client Appreciations',
    org: 'Citi',
    year: 'Multiple',
    note: 'For successful deliveries and revamping their tech stack and environments.',
  },
];

export const CERTIFICATIONS = [
  'Cyber Security Certification',
  'Aspiring Architect',
  'Connected Manager',
  'Android App Development Internship',
  'IoT & Cyber Security Project Expo — IoT mobile robot with camera',
];

export const TALKS = [
  'Android App Development — ICICS',
  'Remote-controlled humanoid robot for unsafe areas — ICICS',
  'Remote Water Quality Monitoring using IoT — paper publication',
];
