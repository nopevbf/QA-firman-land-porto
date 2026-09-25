import { SocialLink, PrimaryLink, QAProject, TestCase, BlogPost } from '../types';

export const PROFILE_INFO = {
  name: 'Firman QA',
  role: 'QA Engineer',
  title: 'Senior Quality Assurance Engineer',
  location: 'Yogyakarta & Jakarta, Indonesia',
  email: 'firajitio@gmail.com',
  whatsapp: 'https://wa.me/628122334455?text=Halo%20Firman%20QA,%20saya%20tertarik%20untuk%20berdiskusi%20tentang%20proyek%20QA',
  bio: 'Spesialis Quality Assurance & Test Automation dengan fokus pada kehandalan aplikasi web, mobile, serta integrasi sistem perhotelan & properti. Berpengalaman merancang arsitektur automated testing dari nol.',
  status: 'Tersedia untuk Konsultasi & Proyek QA',
  stats: [
    { label: 'Tahun Pengalaman', value: '5+', desc: 'Pengujian Web & Mobile' },
    { label: 'Automated Tests', value: '1.800+', desc: 'Cypress & Playwright' },
    { label: 'Test Pass Rate', value: '99.8%', desc: 'Stabilitas CI/CD' },
    { label: 'Bug Terdeteksi', value: '620+', desc: 'Sebelum Masuk Production' },
  ],
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    url: 'https://facebook.com/Mihawk22',
    icon: 'facebook',
    color: '#1877F2',
    handle: 'Mihawk22',
  },
  {
    id: 'twitter',
    name: 'Twitter / X',
    url: 'https://x.com/f.a.prasetyo',
    icon: 'twitter',
    color: '#000000',
    handle: '@f.a.prasetyo',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://instagram.com/firajitio',
    icon: 'instagram',
    color: '#E4405F',
    handle: '@firajitio',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/nopevbf',
    icon: 'linkedin',
    color: '#0A66C2',
    handle: 'nopevbf',
  },
];

export const PRIMARY_LINKS: PrimaryLink[] = [
  {
    id: 'dparagon',
    title: "D'PARAGON",
    subtitle: 'Jaringan Kost Eksklusif & Guest House Terbesar',
    description:
      'Pengujian ekstensif sistem pemesanan kamar, integrasi payment gateway (Xendit/Midtrans), portal penyewa, dan aplikasi internal operasional D’PARAGON di seluruh kota besar di Indonesia.',
    url: 'https://dparagon.com',
    badgeColor: '#3B82F6', // Blue as in image
    iconName: 'Building2',
    metrics: '99.9% Uptime Uji Transaksi',
    tag: 'Hospitality Tech',
    highlights: [
      'Automated E2E booking checkout flow',
      'Validasi integrasi smart lock & IoT kamar',
      'Cross-platform testing Android & iOS tenant app',
    ],
  },
  {
    id: 'blog',
    title: 'Blog',
    subtitle: 'Catatan & Artikel Seputar Software Testing',
    description:
      'Kumpulan artikel praktis seputar arsitektur QA automation, komparasi Cypress vs Playwright, strategi test data management, dan best practice penulisan bug report yang efektif.',
    url: 'https://blog.firmanqa.dev',
    badgeColor: '#22C55E', // Green as in image
    iconName: 'BookOpen',
    metrics: '25+ Artikel QA Mendalam',
    tag: 'Knowledge Sharing',
    highlights: [
      'Panduan Setup Playwright CI di GitHub Actions',
      'API Regression Testing dengan Postman Newman',
      'Pola Desain Page Object Model (POM) yang Bersih',
    ],
  },
  {
    id: 'youtube',
    title: 'YouTube Channel',
    subtitle: 'Tutorial Coding Test Automation & QA Career',
    description:
      'Kanal edukasi video mengenai tutorial step-by-step automated testing, live debugging, ulasan tools QA modern, dan sesi tanya jawab karir sebagai QA Engineer.',
    url: 'https://youtube.com/@firmanqa',
    badgeColor: '#EF4444', // Red as in image
    iconName: 'Youtube',
    metrics: '40+ Video Pembelajaran',
    tag: 'Video Tutorials',
    highlights: [
      'Series: Belajar Test Automation dari Dasar (Bahasa Indonesia)',
      'Live Demo: Automasi Web E-Commerce 0 ke 1',
      'Tips Wawancara Kerja QA Engineer',
    ],
  },
  {
    id: 'djuragan-kamar',
    title: 'Djuragan Kamar',
    subtitle: 'Platform Manajemen & Reservasi Properti',
    description:
      'Sistem Property Management System (PMS) untuk pemilik kos dan mitra. Meliputi pengujian modul inventaris kamar, rekonsiliasi keuangan otomatis, dan performa stress-testing saat promo musiman.',
    url: 'https://djuragankamar.com',
    badgeColor: '#EAB308', // Amber / Gold as in image
    iconName: 'Bed',
    metrics: '10.000+ Kamar Teruji',
    tag: 'Property Management',
    highlights: [
      'Stress test load testing saat flash sale menggunakan k6 & JMeter',
      'Uji modul laporan keuangan & pembagian komisi mitra',
      'Regression test berkala sebelum deployment release',
    ],
  },
];

export const QA_PROJECTS: QAProject[] = [
  {
    id: 'dparagon-suite',
    title: "D'PARAGON Mobile & Web Testing Framework",
    subtitle: 'End-to-End Automation & Payment Reliability',
    role: 'Lead QA Engineer',
    description:
      'Membangun framework otomasi berbasis Playwright & TypeScript untuk memvalidasi alur pemesanan kamar harian, mingguan, dan bulanan secara end-to-end tanpa kendala.',
    coverage: '94% Core Flow Automation',
    tools: ['Playwright', 'TypeScript', 'Docker', 'GitHub Actions', 'Postman'],
    results: [
      'Mengurangi waktu regression testing dari 18 jam menjadi 32 menit',
      'Menemukan 42 bug edge-case pada sistem kalkulasi deposit sebelum rilis',
      'Integrasi automated report Slack setiap pipeline testing selesai',
    ],
  },
  {
    id: 'djuragan-pms',
    title: 'Djuragan Kamar PMS & Revenue Management',
    subtitle: 'High Concurrency API & Stress Testing',
    role: 'QA Engineer',
    description:
      'Pengujian performa backend mikroservis reservasi menggunakan k6 dan JMeter untuk memastikan sistem tahan terhadap lonjakan pengunjung tahun ajaran baru mahasiswa.',
    coverage: '120+ Endpoint API Teruji',
    tools: ['Postman', 'k6', 'JMeter', 'Grafana', 'JIRA'],
    results: [
      'Memvalidasi batas maksimal 3.500 concurrent request per detik',
      'Optimasi query database lambat yang terdeteksi selama stress test',
      'Mencegah insiden overbooking kamar kos secara sistematis',
    ],
  },
  {
    id: 'qa-boilerplate',
    title: 'Production-Ready QA Automation Boilerplate',
    subtitle: 'Open Source Testing Template',
    role: 'Creator & Maintainer',
    description:
      'Template proyek automation testing siap pakai yang mencakup Page Object Model, konfigurasi multi-environment, parallel execution, dan visual regression snapshot.',
    coverage: 'Open Source Repository',
    tools: ['TypeScript', 'Cypress', 'Playwright', 'Allure Report'],
    results: [
      'Digunakan oleh lebih dari 500+ QA engineer pemula',
      'Struktur folder bersih dan dokumentasi lengkap berbahasa Indonesia',
    ],
  },
];

export const INITIAL_TEST_SUITE: TestCase[] = [
  {
    id: 'test-1',
    name: 'AUTH_01: Validasi Login & Token Refresh',
    category: 'Security',
    status: 'idle',
    assertion: 'Expect JWT access token valid and refresh flow works seamlessly',
  },
  {
    id: 'test-2',
    name: "BOOKING_02: Reservasi Kamar D'PARAGON & Payment",
    category: 'E2E',
    status: 'idle',
    assertion: 'Verify end-to-end checkout creates booking code and invoice',
  },
  {
    id: 'test-3',
    name: 'API_03: Djuragan Kamar Endpoints Response Time < 200ms',
    category: 'API',
    status: 'idle',
    assertion: 'Assert GET /api/v1/rooms latency is below 200ms under load',
  },
  {
    id: 'test-4',
    name: 'UI_04: Responsivitas Layar & Audit Aksesibilitas (WCAG AA)',
    category: 'Integration',
    status: 'idle',
    assertion: 'Check viewport adaptation (360px to 1440px) and focus indicators',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Migrasi dari Cypress ke Playwright: Pelajaran dari 1.500+ Test Suite',
    readTime: '6 min baca',
    date: 'Februari 2026',
    category: 'Automation',
    summary:
      'Bagaimana tim kami memotong durasi execution time hingga 60% dan mengeliminasi flaky test dengan fitur auto-waiting di Playwright.',
    link: '#',
  },
  {
    id: 'post-2',
    title: 'Strategi Pengujian Payment Gateway: Menguji Kejadian Nyata Tanpa Uang Asli',
    readTime: '8 min baca',
    date: 'Januari 2026',
    category: 'Payment QA',
    summary:
      'Teknik mocking webhook, penanganan idempotency, dan verifikasi callback transaksi pada sistem perhotelan & reservasi kamar.',
    link: '#',
  },
  {
    id: 'post-3',
    title: 'Shift-Left Testing: Menemukan Cacat Desain Sebelum Baris Kode Pertama Ditulis',
    readTime: '5 min baca',
    date: 'Desember 2025',
    category: 'Best Practices',
    summary:
      'Kolaborasi erat antara QA, Product Manager, dan UI Designer untuk memvalidasi user stories dan acceptance criteria sedini mungkin.',
    link: '#',
  },
];

export const SKILL_CATEGORIES = [
  {
    title: 'Automated Testing',
    items: ['Playwright', 'Cypress', 'Selenium WebDriver', 'Appium (Mobile)', 'Jest / Vitest'],
  },
  {
    title: 'API & Performance',
    items: ['Postman & Newman', 'k6 Load Testing', 'Apache JMeter', 'REST & GraphQL', 'Charles Proxy'],
  },
  {
    title: 'CI/CD & Environment',
    items: ['GitHub Actions', 'GitLab CI', 'Docker Containers', 'Linux / Bash Scripting'],
  },
  {
    title: 'QA Management',
    items: ['JIRA & Confluence', 'TestRail', 'Agile / Scrum Sprint', 'Root Cause Analysis (RCA)'],
  },
];

export const profileData = {
  name: 'Firman QA',
  title: 'QA Engineer',
  role: 'Quality Assurance & Test Automation Specialist',
  avatarUrl: '/profile/profile.jpg',
  email: 'firajitio@gmail.com',
  location: 'Yogyakarta & Jakarta, Indonesia',
  bio: 'Automated Testing • Cypress • Playwright • API Load Testing',
  status: 'Tersedia untuk Pekerjaan & Proyek QA'
};

export const socialLinks = {
  facebook: 'https://facebook.com/Mihawk22',
  twitter: 'https://x.com/f.a.prasetyo',
  instagram: 'https://instagram.com/firajitio',
  linkedin: 'https://linkedin.com/in/nopevbf',
  email: 'firajitio@gmail.com'
};

export interface ProjectItem {
  id: string;
  name: string;
  slug: string;
  url?: string;
}

export const projectsList: ProjectItem[] = [
  { 
    id: 'projek-1', 
    name: 'Upload Foto Properti', 
    slug: 'upload-foto-properti',
    url: 'https://photo-upload-ivory.vercel.app/' 
  },
  { id: 'projek-2', name: 'Projek 2', slug: 'projek-2', url: 'https://dparagon.com' },
  { id: 'projek-3', name: 'Projek 3', slug: 'projek-3', url: 'https://dparagon.com' },
  { id: 'projek-4', name: 'Projek 4', slug: 'projek-4', url: 'https://dparagon.com' },
  { id: 'projek-5', name: 'Projek 5', slug: 'projek-5', url: 'https://dparagon.com' },
];

export const featuredLinks = [
  {
    id: 'dparagon',
    title: "D'PARAGON",
    subtitle: '',
    description: "Pengujian menyeluruh sistem pemesanan kamar online, integrasi payment gateway, dan aplikasi mobile tenant D'PARAGON.",
    url: 'https://dparagon.com',
    bgColor: 'bg-[#3B59FF]',
    hoverColor: 'hover:bg-[#2F47D6]',
    stats: [
      'Automated E2E booking checkout flow',
      'Validasi integrasi payment gateway (VA, QRIS, CC)',
      'Cross-platform test Android & iOS tenant app'
    ]
  }
];


