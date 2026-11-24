export const PROFILE = {
  name: 'Okikiola Gbeleyi',
  firstName: 'Okikiola',
  lastName: 'Gbeleyi',
  role: 'Software Engineer',
  location: 'Lagos, Nigeria',
  shortLocation: 'LAGOS',
  email: 'okikday@gmail.com',
  github: 'https://github.com/okikday',
  linkedin: 'https://linkedin.com/in/okikiola-gbeleyi',
  pubdev: 'https://pub.dev/packages/kickin',
  cvUrl: 'https://drive.google.com/file/d/1RV5YuJ316r3LEOaBuitCorY0A31FQDgP/view?usp=sharing',
  education: 'B.Sc. Computer Science · University of Lagos',
} as const

export const SLIDE_NAV = [
  { id: 'work', index: '01', label: 'Work', href: '#work' },
  { id: 'journey', index: '02', label: 'Journey', href: '#journey' },
  { id: 'craft', index: '03', label: 'Craft', href: '#craft' },
] as const

export type OrbitProjectId =
  | 'kickin'
  | 'kickin-network'
  | 'flutter-samples'
  | 'maternal-ai'
  | 'fintech-sprint'
  | 'github-more'

export interface OrbitProject {
  id: OrbitProjectId
  title: string
  tag: string
  summary: string
  href?: string
  linkLabel?: string
}

export const ORBIT_PROJECTS: OrbitProject[] = [
  {
    id: 'kickin',
    title: 'Kickin',
    tag: 'pub.dev · 5k+',
    summary: 'Four-package open-source Flutter toolkit on pub.dev eliminating app boilerplate.',
    href: 'https://pub.dev/packages/kickin',
    linkLabel: 'pub.dev',
  },
  {
    id: 'kickin-network',
    title: 'kickin_network',
    tag: 'Dio Client',
    summary: 'Centralized token-refresh and retry-on-failure Dio interceptor unifying 57 production endpoints.',
    href: 'https://pub.dev/packages/kickin',
    linkLabel: 'pub.dev',
  },
  {
    id: 'flutter-samples',
    title: 'Flutter Samples',
    tag: 'Upstream PR',
    summary: "Diagnosed and fixed a retained memory leak in Google's official Flutter examples (examples/image_list).",
    href: 'https://github.com/flutter/flutter/commits?author=Okikday',
    linkLabel: 'Commits',
  },
  {
    id: 'maternal-ai',
    title: 'Maternal AI',
    tag: "Cavista '25",
    summary: 'AI maternal health platform built from concept to working prototype with a 4-person team.',
  },
  {
    id: 'fintech-sprint',
    title: 'Fintech Build',
    tag: "GTCO '25",
    summary: 'Functional fintech prototype architected and pitched to the finals out of 120+ teams in 48 hours.',
  },
  {
    id: 'github-more',
    title: 'Open Source',
    tag: 'GitHub',
    summary: 'Mobile experiments, packages, and architectural utilities maintained in the open.',
    href: 'https://github.com/okikday',
    linkLabel: 'GitHub',
  },
]

export type JourneyNodeId = 'render' | 'product' | 'systems' | 'direction'

export interface JourneyNode {
  id: JourneyNodeId
  year: string
  shortLabel: string
  role: string
  organization: string
  span: string
  essence: string
}

export const JOURNEY_NODES: JourneyNode[] = [
  {
    id: 'render',
    year: "'25",
    shortLabel: 'Render',
    role: 'Software Engineer Intern',
    organization: 'MoneySmith',
    span: 'Early 2025',
    essence: 'Profiled Flutter rebuild cascades via DevTools, cutting UI frame render times from 17ms+ to ~5ms.',
  },
  {
    id: 'product',
    year: "'25",
    shortLabel: 'Product',
    role: 'Software Engineer Intern',
    organization: 'Fixeroni',
    span: 'Mid 2025',
    essence: 'Crafted multi-screen product interfaces from Figma specs with Firebase-backed network flows.',
  },
  {
    id: 'systems',
    year: "'25–26",
    shortLabel: 'Systems',
    role: 'Software Engineer',
    organization: 'ScholarArk',
    span: '2025 — 2026',
    essence:
      'Led a migration from 27 ChangeNotifiers to 46 Riverpod Notifiers across 9 feature modules and unified 57 API call sites.',
  },
  {
    id: 'direction',
    year: "'26—",
    shortLabel: 'Direction',
    role: 'Software Director',
    organization: 'NACOS, UNILAG',
    span: '2026 — Present',
    essence: 'Directing student software engineering tracks, onboarding, Git review standards, and AI-assisted workflows.',
  },
]

export type ToolKey = 'flutter' | 'dart' | 'swift' | 'python' | 'riverpod' | 'firebase' | 'git' | 'architecture'

export const TOOLS: { id: ToolKey; label: string }[] = [
  { id: 'flutter', label: 'Flutter' },
  { id: 'dart', label: 'Dart' },
  { id: 'swift', label: 'Swift' },
  { id: 'python', label: 'Python' },
  { id: 'riverpod', label: 'Riverpod' },
  { id: 'firebase', label: 'Firebase' },
  { id: 'git', label: 'Git' },
  { id: 'architecture', label: 'Architecture' },
]

export type HonourId = 'cavista' | 'gtco' | 'flutter'

export interface HonourItem {
  id: HonourId
  badge: string
  title: string
  detail: string
  href?: string
}

export const HONOURS: HonourItem[] = [
  {
    id: 'cavista',
    badge: '2nd Runner-Up',
    title: "Cavista Hackathon '25",
    detail: 'Led a 4-person engineering team building an AI maternal health prototype.',
  },
  {
    id: 'gtco',
    badge: '6th / 120+',
    title: "GTCO Squad '25",
    detail: 'Led a 5-person finalist team shipping a functional fintech build in 48 hours.',
  },
  {
    id: 'flutter',
    badge: 'Upstream PR',
    title: 'Google Flutter Samples',
    detail: 'Resolved a memory leak in examples/image_list under production review standards.',
    href: 'https://github.com/flutter/flutter/commits?author=Okikday',
  },
]
