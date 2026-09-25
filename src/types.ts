export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  color: string;
  handle: string;
}

export interface PrimaryLink {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  badgeColor: string;
  iconName: string;
  metrics?: string;
  tag?: string;
  highlights?: string[];
}

export interface QAProject {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  description: string;
  coverage: string;
  tools: string[];
  results: string[];
  link?: string;
}

export interface TestCase {
  id: string;
  name: string;
  category: 'E2E' | 'API' | 'Integration' | 'Security';
  status: 'idle' | 'running' | 'passed' | 'failed';
  duration?: number;
  assertion: string;
}

export interface BlogPost {
  id: string;
  title: string;
  readTime: string;
  date: string;
  category: string;
  summary: string;
  link: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  category: string;
  message: string;
}
