import React, { useState } from 'react';
import {
  ExternalLink,
  Info,
  Check,
  Share2,
  Mail,
  Copy,
  ChevronRight,
  ShieldCheck,
  Building2,
  BookOpen,
  Youtube,
  Bed,
} from 'lucide-react';
import { PROFILE_INFO, SOCIAL_LINKS, PRIMARY_LINKS } from '../data/profileData';
import { PrimaryLink } from '../types';

interface BioCardProps {
  onSelectLink: (link: PrimaryLink) => void;
  onOpenContact: () => void;
}

export const BioCard: React.FC<BioCardProps> = ({ onSelectLink, onOpenContact }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Firman QA — QA Engineer',
        text: 'Profil & tautan resmi Firman QA (Quality Assurance Engineer)',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2200);
    }
  };

  // Helper to map icon name to icon component
  const renderLinkIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-5 h-5" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5" />;
      case 'Youtube':
        return <Youtube className="w-5 h-5" />;
      case 'Bed':
        return <Bed className="w-5 h-5" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Main Reference-Inspired Bio Card Container */}
      <div className="relative glass-card rounded-[28px] p-6 sm:p-8 transition-all duration-300 hover:shadow-xl border border-white/80">
        {/* Subtle decorative glow in top corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#6F8F76]/10 rounded-full blur-2xl pointer-events-none -z-10" />

        {/* Top Action Bar: Share & Status */}
        <div className="flex items-center justify-between mb-5 text-xs text-[#6B675F]">
          <span className="inline-flex items-center gap-1.5 font-medium bg-[#3F5A46]/10 text-[#3F5A46] px-2.5 py-1 rounded-full text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
            QA Verified Profile
          </span>
          <button
            onClick={handleShare}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-black/5 text-[#6B675F] hover:text-[#2A2823] transition-colors cursor-pointer text-xs font-semibold"
            title="Bagikan tautan profil"
          >
            {copiedShare ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                <span className="text-[#22C55E]">Tersalin!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Bagikan</span>
              </>
            )}
          </button>
        </div>

        {/* Profile Avatar */}
        <div className="flex flex-col items-center text-center">
          <div className="relative group">
            {/* Avatar Photo Frame */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-[#3F5A46] via-[#6F8F76] to-[#C1683F] shadow-md transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 relative">
                {/* High fidelity illustrated photo representing Firman QA */}
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                  alt="Firman QA"
                  className="w-full h-full object-cover object-center filter saturate-105"
                  onError={(e) => {
                    // Fallback avatar if external image fails
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Fallback avatar visual */}
                <div className="absolute inset-0 bg-[#284230] flex flex-col items-center justify-center text-[#FAF7F1] -z-10">
                  <span className="font-display font-bold text-2xl">F·Q</span>
                  <span className="text-[10px] text-[#FAF7F1]/80 mt-0.5">QA Engineer</span>
                </div>
              </div>
            </div>

            {/* Verification Badge */}
            <div
              className="absolute bottom-1 right-1 bg-[#3F5A46] text-white p-1.5 rounded-full border-2 border-white shadow-sm"
              title="Verified Software QA Engineer"
            >
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          {/* Name & Title (Matched to the original card) */}
          <h1 className="mt-4 font-display font-bold text-2xl sm:text-[28px] text-[#2A2823] tracking-tight">
            {PROFILE_INFO.name}
          </h1>
          <p className="text-base text-[#6B675F] font-semibold mt-1">
            {PROFILE_INFO.role}
          </p>

          {/* Subtle location / bio tagline */}
          <p className="text-xs text-[#6B675F]/80 max-w-xs mt-1.5 line-clamp-2">
            Automated Testing · Cypress · Playwright · API Load Testing
          </p>

          {/* Social Icons Row (Facebook, Twitter, Instagram, LinkedIn + Email) */}
          <div className="flex items-center justify-center gap-3.5 mt-5">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm"
              aria-label="Facebook Firman QA"
              title="Facebook"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* Twitter / X */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm"
              aria-label="Twitter Firman QA"
              title="Twitter / X"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm"
              aria-label="Instagram Firman QA"
              title="Instagram"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm"
              aria-label="LinkedIn Firman QA"
              title="LinkedIn"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* Direct Email quick action button */}
            <button
              onClick={handleCopyEmail}
              className="w-10 h-10 rounded-full bg-[#3F5A46] text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm cursor-pointer"
              title={`Salin email: ${PROFILE_INFO.email}`}
              aria-label="Salin email"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 4 Colored Primary Buttons from the user's reference image */}
        <div className="mt-8 flex flex-col gap-3.5" id="links-hub">
          {PRIMARY_LINKS.map((link) => {
            // Colors matching original image:
            // 1. D'PARAGON -> Vibrant Royal Blue (#3B82F6 or #2F54EB)
            // 2. Blog -> Vibrant Grass Green (#22C55E or #389E0D)
            // 3. YouTube -> Vibrant Vermilion Red (#EF4444 or #CF1322)
            // 4. Djuragan Kamar -> Warm Amber/Gold (#EAB308 or #D48806)
            let btnClass = '';
            if (link.id === 'dparagon') {
              btnClass =
                'bg-gradient-to-r from-[#3B5FE3] to-[#2B4CD6] hover:from-[#2B4CD6] hover:to-[#1E3AA8] text-white shadow-blue-500/20';
            } else if (link.id === 'blog') {
              btnClass =
                'bg-gradient-to-r from-[#3BB85E] to-[#2FA550] hover:from-[#2FA550] hover:to-[#22823D] text-white shadow-emerald-500/20';
            } else if (link.id === 'youtube') {
              btnClass =
                'bg-gradient-to-r from-[#E24C45] to-[#D33C35] hover:from-[#D33C35] hover:to-[#B72C26] text-white shadow-red-500/20';
            } else if (link.id === 'djuragan-kamar') {
              btnClass =
                'bg-gradient-to-r from-[#DCA422] to-[#CF9515] hover:from-[#CF9515] hover:to-[#B6800C] text-white shadow-amber-500/20';
            }

            return (
              <div key={link.id} className="relative group">
                <button
                  onClick={() => onSelectLink(link)}
                  className={`w-full py-4 px-6 rounded-xl font-display font-bold text-base sm:text-lg flex items-center justify-between transition-all duration-200 transform group-hover:-translate-y-0.5 shadow-md active:translate-y-0 cursor-pointer ${btnClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="p-1 rounded-lg bg-white/20">
                      {renderLinkIcon(link.iconName)}
                    </span>
                    <span className="tracking-wide">{link.title}</span>
                  </div>

                  <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-medium hidden sm:inline bg-black/15 px-2 py-0.5 rounded">
                      Detail QA
                    </span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Quick Contact & Info Card Footer */}
        <div className="mt-8 pt-5 border-t border-[#2A2823]/10 flex flex-col gap-3">
          <button
            onClick={onOpenContact}
            className="w-full py-3.5 px-4 rounded-xl bg-[#FAF7F1] hover:bg-white text-[#3F5A46] border border-[#3F5A46]/30 font-display font-bold text-sm flex items-center justify-center gap-2 transition-all hover:border-[#3F5A46] cursor-pointer shadow-xs"
          >
            <Mail className="w-4 h-4 text-[#C1683F]" />
            <span>Kirim Pesan / Tawaran Proyek ke Email</span>
          </button>

          <div className="flex items-center justify-between text-[11px] text-[#6B675F] px-1">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              Respons Cepat &lt; 24 Jam
            </span>
            <span className="font-mono text-[#3F5A46] font-semibold">{PROFILE_INFO.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
