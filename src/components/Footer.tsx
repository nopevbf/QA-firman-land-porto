import React from 'react';
import { ArrowUp, Mail, ShieldCheck, Heart } from 'lucide-react';
import { PROFILE_INFO, SOCIAL_LINKS } from '../data/profileData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full mt-16 border-t border-[#2A2823]/10 bg-[#F1ECE1]/60 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-lg text-[#2A2823]">
              {PROFILE_INFO.name}
            </span>
            <span className="text-xs text-[#6B675F]">· {PROFILE_INFO.role}</span>
          </div>
          <p className="text-xs text-[#6B675F] mt-1 max-w-sm">
            Menjamin mutu kode dan keandalan sistem dari tahap arsitektur hingga deployment ke pengguna akhir.
          </p>
        </div>

        {/* Center: Direct Contact */}
        <div className="flex flex-col items-center text-center">
          <a
            href={`mailto:${PROFILE_INFO.email}`}
            className="text-xs font-mono font-bold text-[#3F5A46] hover:underline flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{PROFILE_INFO.email}</span>
          </a>
          <span className="text-[11px] text-[#6B675F] mt-0.5">
            Respons dalam 2–12 jam kerja
          </span>
        </div>

        {/* Back to top button */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-[#6B675F]">
            © {new Date().getFullYear()} Firman QA
          </span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-white hover:bg-[#FAF7F1] border border-[#2A2823]/10 text-[#2A2823] transition-colors cursor-pointer"
            aria-label="Kembali ke atas"
            title="Kembali ke atas"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
