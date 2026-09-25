import React, { useState } from 'react';
import {
  CheckCircle2,
  ExternalLink,
  Layers,
  ShieldCheck,
  Zap,
  Cpu,
  BookOpen,
  ArrowRight,
  Sparkles,
  GitBranch,
  Terminal,
  FolderGit2,
} from 'lucide-react';
import { QA_PROJECTS, BLOG_POSTS, SKILL_CATEGORIES, PROFILE_INFO } from '../data/profileData';
import { QAProject } from '../types';

interface BentoShowcaseProps {
  onOpenContactWithSubject: (subject: string) => void;
}

export const BentoShowcase: React.FC<BentoShowcaseProps> = ({ onOpenContactWithSubject }) => {
  const [activeProjectTab, setActiveProjectTab] = useState<string>(QA_PROJECTS[0].id);

  const selectedProject = QA_PROJECTS.find((p) => p.id === activeProjectTab) || QA_PROJECTS[0];

  return (
    <div className="w-full space-y-6">
      {/* Bento Grid Row 1: Key Metrics & Project Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="qa-projects">
        {/* Project Deep Dive Card (Span 8 on desktop, radius 28px) */}
        <div className="lg:col-span-8 glass-card rounded-[28px] p-6 sm:p-8 border border-white/80 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C1683F]">
                  Studi Kasus Pengujian
                </span>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#2A2823] mt-0.5">
                  Proyek & Framework Otomasi
                </h3>
              </div>

              {/* Project selector tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-[#2A2823]/5 rounded-xl self-start sm:self-auto overflow-x-auto max-w-full">
                {QA_PROJECTS.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setActiveProjectTab(project.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      activeProjectTab === project.id
                        ? 'bg-white text-[#3F5A46] shadow-xs'
                        : 'text-[#6B675F] hover:text-[#2A2823]'
                    }`}
                  >
                    {project.title.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Project Content */}
            <div className="space-y-4 pt-1">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#6B675F]">
                  <span className="font-semibold text-[#3F5A46]">{selectedProject.role}</span>
                  <span>·</span>
                  <span>{selectedProject.subtitle}</span>
                </div>
                <h4 className="font-display font-bold text-lg text-[#2A2823] mt-1">
                  {selectedProject.title}
                </h4>
                <p className="text-sm text-[#2A2823]/80 leading-relaxed mt-1.5">
                  {selectedProject.description}
                </p>
              </div>

              {/* Results & Value Delivered */}
              <div className="p-4 rounded-2xl bg-white/70 border border-[#2A2823]/8 space-y-2">
                <div className="text-xs font-bold text-[#3F5A46] uppercase tracking-wide">
                  Hasil & Pencapaian Kualitas:
                </div>
                {selectedProject.results.map((res, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#2A2823]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>

              {/* Tools Stack Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-semibold text-[#6B675F]">Stack:</span>
                {selectedProject.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-[#FAF7F1] border border-[#2A2823]/10 text-[#2A2823]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#2A2823]/10 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#3F5A46] bg-[#3F5A46]/10 px-3 py-1 rounded-full">
              {selectedProject.coverage}
            </span>
            <button
              onClick={() => onOpenContactWithSubject(`Tanya tentang arsitektur ${selectedProject.title}`)}
              className="text-xs font-bold text-[#C1683F] hover:text-[#9A4621] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Konsultasikan Pengujian Serupa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* QA Core Metrics Card (Span 4 on desktop, radius 22px) */}
        <div className="lg:col-span-4 glass-card rounded-[22px] p-6 sm:p-7 border border-white/80 shadow-md flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#3F5A46]">
              Statistik Kualitas
            </span>
            <h3 className="font-display font-extrabold text-xl text-[#2A2823] mt-1">
              Standar QA Firman
            </h3>
            <p className="text-xs text-[#6B675F] mt-1">
              Metrik nyata dari pipeline automated regression dan pengujian multi-platform.
            </p>

            <div className="grid grid-cols-2 gap-3.5 mt-5">
              {PROFILE_INFO.stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-white/80 border border-[#2A2823]/8 flex flex-col justify-between"
                >
                  <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#3F5A46] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="font-bold text-xs text-[#2A2823] mt-1">{stat.label}</div>
                  <div className="text-[11px] text-[#6B675F] leading-tight mt-0.5">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 p-3.5 rounded-xl bg-[#F1ECE1] border border-[#2A2823]/10 text-xs text-[#2A2823]">
            <div className="font-bold text-[#3F5A46] flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-4 h-4 text-[#3F5A46]" />
              <span>Zero-Critical Defect Policy</span>
            </div>
            <p className="text-[11px] text-[#6B675F] leading-relaxed">
              Setiap rilis production diverifikasi melalui smoke test wajib dan sanity checking otomatis.
            </p>
          </div>
        </div>
      </div>

      {/* Bento Grid Row 2: Skills & Tooling Arsenal + Knowledge Blog */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="skills-matrix">
        {/* Testing Skills Matrix (Span 7, radius 22px) */}
        <div className="lg:col-span-7 glass-card rounded-[22px] p-6 sm:p-7 border border-white/80 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#3F5A46]">
                Keahlian & Tooling
              </span>
              <h3 className="font-display font-extrabold text-xl text-[#2A2823] mt-0.5">
                QA Tech Stack & Ekosistem
              </h3>
            </div>
            <div className="p-2 rounded-xl bg-[#3F5A46]/10 text-[#3F5A46]">
              <Cpu className="w-5 h-5" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/70 border border-[#2A2823]/8">
                <div className="font-display font-bold text-xs text-[#3F5A46] uppercase tracking-wider mb-2.5">
                  {cat.title}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item, itemIdx) => (
                    <span
                      key={itemIdx}
                      className="text-xs bg-[#FAF7F1] px-2.5 py-1 rounded-md border border-[#2A2823]/10 text-[#2A2823] font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Blog Articles Preview (Span 5, radius 22px) */}
        <div className="lg:col-span-5 glass-card rounded-[22px] p-6 sm:p-7 border border-white/80 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C1683F]">
                  Edukasi & Publikasi
                </span>
                <h3 className="font-display font-extrabold text-xl text-[#2A2823] mt-0.5">
                  Artikel Blog Terkini
                </h3>
              </div>
              <div className="p-2 rounded-xl bg-[#C1683F]/10 text-[#C1683F]">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-3">
              {BLOG_POSTS.map((post) => (
                <div
                  key={post.id}
                  className="p-3.5 rounded-xl bg-white/70 border border-[#2A2823]/8 hover:border-[#3F5A46]/30 transition-all group"
                >
                  <div className="flex items-center justify-between text-[11px] text-[#6B675F] mb-1">
                    <span className="font-semibold text-[#3F5A46]">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#2A2823] group-hover:text-[#3F5A46] transition-colors leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-[11px] text-[#6B675F] mt-1 line-clamp-2 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#2A2823]/10 flex items-center justify-between">
            <span className="text-xs text-[#6B675F]">Update berkala setiap bulan</span>
            <a
              href="https://blog.firmanqa.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#3F5A46] hover:underline flex items-center gap-1"
            >
              <span>Buka Blog Lengkap</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
