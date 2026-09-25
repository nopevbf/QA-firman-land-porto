import React, { useState } from 'react';
import { Mail, Menu, X, ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles, Smartphone, LayoutGrid } from 'lucide-react';
import { PROFILE_INFO } from '../data/profileData';

interface NavbarProps {
  viewMode: 'full' | 'card';
  setViewMode: (mode: 'full' | 'card') => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ viewMode, setViewMode, onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (viewMode === 'card') {
      setViewMode('full');
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#3F5A46] text-[#FAF7F1] flex items-center justify-center font-display font-bold text-lg shadow-sm border border-[#FAF7F1]/40">
            F·Q
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-[#2A2823] text-base sm:text-lg leading-tight">
                {PROFILE_INFO.name}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#3F5A46] bg-[#3F5A46]/10 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
                Active
              </span>
            </div>
            <p className="text-xs text-[#6B675F] font-medium leading-none mt-0.5">
              {PROFILE_INFO.role} · Software Quality Assurance
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection('links-hub')}
            className="text-sm font-semibold text-[#2A2823] hover:text-[#3F5A46] transition-colors cursor-pointer"
          >
            Tautan Utama
          </button>
          <button
            onClick={() => scrollToSection('qa-projects')}
            className="text-sm font-semibold text-[#6B675F] hover:text-[#3F5A46] transition-colors cursor-pointer"
          >
            Portofolio QA
          </button>
          <button
            onClick={() => scrollToSection('test-runner')}
            className="text-sm font-semibold text-[#6B675F] hover:text-[#3F5A46] transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Live Test Suite</span>
            <span className="text-[10px] bg-[#C1683F]/15 text-[#C1683F] font-bold px-1.5 py-0.2 rounded">Simulasi</span>
          </button>
          <button
            onClick={() => scrollToSection('skills-matrix')}
            className="text-sm font-semibold text-[#6B675F] hover:text-[#3F5A46] transition-colors cursor-pointer"
          >
            Keahlian
          </button>
          <button
            onClick={() => scrollToSection('contact-section')}
            className="text-sm font-semibold text-[#6B675F] hover:text-[#3F5A46] transition-colors cursor-pointer"
          >
            Kontak Email
          </button>
        </nav>

        {/* Desktop Mode Toggle & Contact Button */}
        <div className="hidden sm:flex items-center gap-3">
          {/* View mode segmented switcher */}
          <div className="flex items-center p-1 bg-[#2A2823]/5 rounded-xl border border-[#2A2823]/10 text-xs font-semibold">
            <button
              onClick={() => setViewMode('card')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'card'
                  ? 'bg-white text-[#2A2823] shadow-xs font-bold'
                  : 'text-[#6B675F] hover:text-[#2A2823]'
              }`}
              title="Tampilan kartu bio mirip referensi"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Bio Card</span>
            </button>
            <button
              onClick={() => setViewMode('full')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'full'
                  ? 'bg-white text-[#2A2823] shadow-xs font-bold'
                  : 'text-[#6B675F] hover:text-[#2A2823]'
              }`}
              title="Tampilan landing page lengkap"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Full Landing</span>
            </button>
          </div>

          <button
            onClick={onOpenContact}
            className="flex items-center gap-2 bg-[#3F5A46] hover:bg-[#284230] text-[#FAF7F1] px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow active:scale-98 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-[#FAF7F1]" />
            <span>Kirim Email</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'card' ? 'full' : 'card')}
            className="p-2 rounded-xl bg-white/80 border border-[#2A2823]/10 text-[#2A2823] text-xs font-bold flex items-center gap-1"
          >
            {viewMode === 'card' ? <LayoutGrid className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/80 border border-[#2A2823]/10 text-[#2A2823]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-[#2A2823]/10 bg-[#FAF7F1]/95 backdrop-blur-xl px-4 py-5 shadow-lg">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => scrollToSection('links-hub')}
              className="text-left px-3 py-2 text-sm font-bold text-[#2A2823] hover:bg-black/5 rounded-lg"
            >
              📌 Tautan Utama (D'PARAGON, Blog, YouTube)
            </button>
            <button
              onClick={() => scrollToSection('qa-projects')}
              className="text-left px-3 py-2 text-sm font-semibold text-[#2A2823] hover:bg-black/5 rounded-lg"
            >
              💼 Portofolio & Pengujian QA
            </button>
            <button
              onClick={() => scrollToSection('test-runner')}
              className="text-left px-3 py-2 text-sm font-semibold text-[#2A2823] hover:bg-black/5 rounded-lg flex items-center justify-between"
            >
              <span>⚙️ Live Test Suite Simulator</span>
              <span className="text-[10px] bg-[#C1683F]/15 text-[#C1683F] font-bold px-2 py-0.5 rounded">Interactive</span>
            </button>
            <button
              onClick={() => scrollToSection('skills-matrix')}
              className="text-left px-3 py-2 text-sm font-semibold text-[#2A2823] hover:bg-black/5 rounded-lg"
            >
              🛠️ Keahlian & Tools Testing
            </button>
            <button
              onClick={() => scrollToSection('contact-section')}
              className="text-left px-3 py-2 text-sm font-semibold text-[#2A2823] hover:bg-black/5 rounded-lg"
            >
              ✉️ Formulir Kontak Email
            </button>

            <div className="pt-3 border-t border-[#2A2823]/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-2.5 bg-[#3F5A46] text-[#FAF7F1] rounded-xl font-bold text-sm flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Kirim Pesan ke firajitio@gmail.com</span>
              </button>
              <div className="text-center text-xs text-[#6B675F] pt-1">
                Mode Aktif: {viewMode === 'card' ? 'Tampilan Bio Card' : 'Tampilan Landing Page Lengkap'}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
