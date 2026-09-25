import React from 'react';
import { X, ExternalLink, ShieldCheck, CheckCircle2, Mail, BookOpen, Youtube, Building2, Bed, Share2 } from 'lucide-react';
import { PrimaryLink } from '../types';
import { BLOG_POSTS } from '../data/profileData';

interface FeaturedLinksModalProps {
  link: PrimaryLink | null;
  onClose: () => void;
  onOpenContact: (subjectDefault?: string) => void;
}

export const FeaturedLinksModal: React.FC<FeaturedLinksModalProps> = ({ link, onClose, onOpenContact }) => {
  if (!link) return null;

  const handleDiscussProject = () => {
    onClose();
    onOpenContact(`Diskusi Proyek seputar ${link.title}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg glass-card rounded-[28px] overflow-hidden bg-[#FAF7F1] border border-white/90 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with color accent */}
        <div
          className="p-6 text-white relative overflow-hidden"
          style={{ backgroundColor: link.badgeColor }}
        >
          {/* Subtle noise/glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-2xl" />

          <div className="flex items-center justify-between relative z-10">
            <span className="text-xs font-bold tracking-wider uppercase bg-black/20 px-2.5 py-1 rounded-md">
              {link.tag || 'Tautan Resmi'}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 relative z-10">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">
              {link.title}
            </h3>
            <p className="text-white/90 text-sm font-medium mt-1">
              {link.subtitle}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-5">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B675F] mb-1.5">
              Gambaran & Peran QA
            </h4>
            <p className="text-sm text-[#2A2823] leading-relaxed">
              {link.description}
            </p>
          </div>

          {/* Key QA Highlights */}
          {link.highlights && link.highlights.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B675F] mb-2.5">
                Cakupan & Fokus Pengujian
              </h4>
              <div className="space-y-2">
                {link.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#2A2823]">
                    <CheckCircle2 className="w-4 h-4 text-[#3F5A46] shrink-0 mt-0.5" />
                    <span className="leading-snug">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Special content for Blog */}
          {link.id === 'blog' && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B675F] mb-2">
                Artikel QA Terpopuler
              </h4>
              <div className="space-y-2">
                {BLOG_POSTS.map((post) => (
                  <div
                    key={post.id}
                    className="p-3 rounded-xl bg-white/70 border border-[#2A2823]/8 hover:border-[#3F5A46]/30 transition-all text-xs"
                  >
                    <div className="flex items-center justify-between text-[#6B675F] text-[11px] mb-1">
                      <span>{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <div className="font-bold text-[#2A2823]">{post.title}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Metric badge */}
          {link.metrics && (
            <div className="p-3.5 rounded-xl bg-[#F1ECE1] border border-[#2A2823]/10 flex items-center justify-between">
              <span className="text-xs font-medium text-[#6B675F]">Tolok Ukur Kualitas:</span>
              <span className="text-xs font-bold text-[#3F5A46]">{link.metrics}</span>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl bg-[#3F5A46] hover:bg-[#284230] text-[#FAF7F1] text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <span>Kunjungi {link.title}</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={handleDiscussProject}
              className="py-3 px-4 rounded-xl bg-white hover:bg-white/80 text-[#C1683F] border border-[#C1683F]/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#C1683F]" />
              <span>Diskusi dengan Firman</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
