/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Mail, 
  Share2, 
  Check, 
  Copy, 
  ExternalLink, 
  CheckCircle2, 
  Send, 
  X, 
  Sparkles,
  Smartphone,
  Globe,
  Clock,
  ShieldCheck,
  Camera,
  Upload,
  ChevronRight,
  FolderKanban,
  ArrowLeft
} from 'lucide-react';
import { profileData, featuredLinks, socialLinks, projectsList, type ProjectItem } from './data/profileData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Navigasi ke projek dengan URL yang sesuai (misal: /projek/upload-foto-properti)
  const navigateToProject = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsProjectModalOpen(false);
    const newPath = `/projek/${project.slug}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({ projectId: project.id, slug: project.slug }, '', newPath);
    }
    document.title = `${project.name} — Firman QA`;
  };

  // Navigasi kembali ke halaman utama profil (reset URL ke '/')
  const navigateBackToHome = () => {
    setSelectedProject(null);
    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      window.history.pushState(null, '', '/');
    }
    document.title = 'Firman QA — Portfolio & Link Hub';
  };

  // Sinkronisasi otomatis URL browser (mendukung /projek/:slug, /:slug, search params, & tombol Back/Forward)
  useEffect(() => {
    const syncRouteWithState = () => {
      const rawPath = window.location.pathname.replace(/^\/+/, '').replace(/\/+$/, '');
      const searchParams = new URLSearchParams(window.location.search);
      const querySlug = searchParams.get('projek') || searchParams.get('project');
      const routeParam = searchParams.get('route');
      const rawHash = window.location.hash.replace(/^#\/?/, '').replace(/^\/+/, '').replace(/\/+$/, '');

      let targetSlug = querySlug;
      if (!targetSlug && routeParam) {
        const cleanedRoute = decodeURIComponent(routeParam).replace(/^\/+/, '').replace(/\/+$/, '');
        const rParts = cleanedRoute.split('/');
        if (rParts[0] === 'projek' && rParts[1]) {
          targetSlug = rParts[1];
        } else if (rParts[0]) {
          targetSlug = rParts[0];
        }
      }
      if (!targetSlug && rawPath) {
        const parts = rawPath.split('/');
        if (parts[0] === 'projek' && parts[1]) {
          targetSlug = parts[1];
        } else if (parts[0]) {
          targetSlug = parts[0];
        }
      }

      if (!targetSlug && rawHash) {
        const hashParts = rawHash.split('/');
        if (hashParts[0] === 'projek' && hashParts[1]) {
          targetSlug = hashParts[1];
        } else if (hashParts[0]) {
          targetSlug = hashParts[0];
        }
      }

      if (targetSlug) {
        const matched = projectsList.find(
          (p) =>
            p.slug.toLowerCase() === targetSlug!.toLowerCase() ||
            p.id.toLowerCase() === targetSlug!.toLowerCase()
        );
        if (matched) {
          setSelectedProject(matched);
          document.title = `${matched.name} — Firman QA`;
          return;
        }
      }

      setSelectedProject(null);
      document.title = 'Firman QA — Portfolio & Link Hub';
    };

    syncRouteWithState();
    window.addEventListener('popstate', syncRouteWithState);
    window.addEventListener('hashchange', syncRouteWithState);
    return () => {
      window.removeEventListener('popstate', syncRouteWithState);
      window.removeEventListener('hashchange', syncRouteWithState);
    };
  }, []);

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(profileData.avatarUrl);
  const [showFolderHint, setShowFolderHint] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Handle image loading fallback
  const handleImageError = () => {
    if (avatarSrc === '/profile/profile.jpg') {
      setAvatarSrc('/profile/profile.png');
    } else if (avatarSrc === '/profile/profile.png') {
      setAvatarSrc('/profile/profile.webp');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newUrl = URL.createObjectURL(file);
      setAvatarSrc(newUrl);
      setShowFolderHint(true);
      setTimeout(() => setShowFolderHint(false), 5000);
    }
  };

  // Contact Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formSent, setFormSent] = useState(false);

  // Helper for copying URL
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  // Helper for copying Email
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  // Helper for native share or modal fallback
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profileData.name} - ${profileData.title}`,
          text: `Cek profil dan portofolio ${profileData.name} (${profileData.title})`,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to share modal if user cancelled or error
      }
    }
    setIsShareOpen(true);
  };

  // Submit contact form -> trigger email client directly to firajitio@gmail.com
  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formMessage.trim()) return;

    const subjectText = encodeURIComponent(
      formSubject.trim() 
        ? `[Tawaran/Kontak] ${formSubject} - dari ${formName}` 
        : `[Inquiry Portfolio] Tawaran Kolaborasi QA - dari ${formName}`
    );

    const bodyContent = encodeURIComponent(
`Halo Firman,

Saya tertarik dengan profil dan portofolio Anda.

Detail Pengirim:
- Nama: ${formName}
- Email: ${formEmail || 'Tidak dicantumkan'}
- Perusahaan / Proyek: ${formCompany || '-'}

Pesan:
${formMessage}

---
Dikirim melalui formulir landing page Firman QA`
    );

    const mailtoUrl = `mailto:${profileData.email}?subject=${subjectText}&body=${bodyContent}`;
    window.location.href = mailtoUrl;

    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setIsContactOpen(false);
      setFormMessage('');
    }, 2500);
  };

  // Open Web Gmail directly
  const handleOpenGmailWeb = () => {
    const subject = encodeURIComponent(formSubject.trim() || `Tawaran Kerjasama QA untuk Firman`);
    const body = encodeURIComponent(
      `Halo Firman,\n\nNama: ${formName || '[Nama Anda]'}\nPerusahaan: ${formCompany || '[Perusahaan]'}\n\nPesan:\n${formMessage || '[Tulis pesan atau detail proyek di sini]'}`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${profileData.email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  // Tampilan Halaman Projek Lengkap dengan Navbar & Tombol Kembali
  if (selectedProject) {
    return (
      <div className="min-h-screen bg-[#FAF7F1] flex flex-col font-sans">
        {/* Navbar Projek */}
        <header className="h-14 sm:h-16 bg-[#284230] text-white px-3 sm:px-6 flex items-center justify-between border-b border-[#3F5A46] shadow-md sticky top-0 z-50">
          <div className="flex items-center gap-3">
            {/* Tombol Kembali ke Kartu Profil */}
            <button
              onClick={navigateBackToHome}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer border border-white/20 shadow-xs"
              title="Kembali ke Profil"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>

            <div className="h-5 w-px bg-white/20" />

            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-sm sm:text-base text-white tracking-tight">
                {selectedProject.name}
              </h1>
              <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                /projek/{selectedProject.slug}
              </span>
            </div>
          </div>

        </header>

        {/* Embedded Iframe Container */}
        <div className="flex-1 w-full bg-slate-900 relative flex flex-col">
          {selectedProject.url ? (
            <iframe
              src={selectedProject.url}
              title={selectedProject.name}
              className="w-full flex-1 border-0 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] bg-white"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-presentation"
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-white">
              <p className="text-lg font-bold mb-2">{selectedProject.name}</p>
              <p className="text-sm text-gray-300">Belum ada tautan yang dikonfigurasi.</p>
              <button
                onClick={navigateBackToHome}
                className="mt-4 px-4 py-2 bg-emerald-600 rounded-xl text-white font-semibold text-sm cursor-pointer"
              >
                Kembali
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FAF7F1] flex items-center justify-center p-3 sm:p-6 md:p-8 antialiased selection:bg-[#6F8F76] selection:text-white">
      {/* Background Ambient Decorative Accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-[#6F8F76]/10 to-[#C1683F]/10 rounded-full blur-3xl opacity-70" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#3F5A46]/5 rounded-full blur-2xl" />
      </div>

      {/* Main Single Centered Card Container */}
      <main className="w-full max-w-[430px] my-auto">
        <div className="bg-white/90 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 sm:p-7 shadow-[0_4px_24px_rgba(42,40,35,0.06),0_18px_48px_rgba(63,90,70,0.12)] transition-all">
          
          {/* Top Share Button */}
          <div className="flex items-center justify-end mb-4">
            <button
              onClick={handleShare}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2A2823]/5 hover:bg-[#2A2823]/10 active:scale-95 text-xs font-medium text-[#2A2823] transition-all cursor-pointer"
              title="Bagikan Tautan Profil"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Tersalin!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Bagikan</span>
                </>
              )}
            </button>
          </div>

          {/* Avatar with Verified Ring (Foto diambil dari /public/profile/profile.jpg) */}
          <div className="flex flex-col items-center text-center">
            {/* FITUR UNGGAH FOTO DIKOMENTARI (TIDAK AKTIF):
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
              aria-label="Upload foto profil"
            />
            */}

            <div className="relative mb-3 group">
              <div 
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-[#3F5A46] via-[#6F8F76] to-[#C1683F] shadow-md group-hover:scale-105 transition-transform duration-300"
              >
                <img 
                  src={avatarSrc} 
                  alt={profileData.name}
                  onError={handleImageError}
                  className="w-full h-full object-cover rounded-full bg-slate-100"
                  loading="eager"
                />

                {/* FITUR HOVER GANTI FOTO DIKOMENTARI:
                <div className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-[11px] font-medium p-1">
                  <Camera className="w-5 h-5 mb-0.5" />
                  <span>Ganti Foto</span>
                </div>
                */}
              </div>

              {/* Verified QA Shield */}
              <div 
                className="absolute bottom-1 right-1 w-7 h-7 bg-[#284230] text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                title="Verified QA Engineer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
              </div>
            </div>

            {/* Folder Location Info Pill */}
            {showFolderHint && (
              <div className="mb-2 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 animate-fade-in flex items-center gap-1.5 shadow-sm">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Foto aktif! Untuk permanen, taruh di <b>/public/profile/profile.jpg</b></span>
              </div>
            )}

            {/* Profile Info */}
            <h1 className="text-2xl sm:text-[26px] font-extrabold text-[#1C1C18] tracking-tight mb-1">
              {profileData.name}
            </h1>
            <p className="text-base font-semibold text-[#424843] mb-1.5">
              {profileData.title}
            </p>
            <p className="text-xs text-[#6B675F] max-w-[320px] leading-relaxed mb-5">
              Automated Testing • Cypress • Playwright • API Load Testing
            </p>

            {/* Social Icons Row */}
            <div className="flex items-center justify-center gap-3 mb-6">
              {/* Facebook */}
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook (Mihawk22)"
                title="Facebook: Mihawk22"
                className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-transform"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Twitter / X (Layar Hitam Modern) */}
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X (@f.a.prasetyo)"
                title="Twitter / X: @f.a.prasetyo"
                className="w-10 h-10 rounded-full bg-black hover:bg-neutral-800 text-white flex items-center justify-center shadow-sm border border-neutral-800 hover:scale-110 active:scale-95 transition-transform"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram (@firajitio)"
                title="Instagram: @firajitio"
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-transform"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (nopevbf)"
                title="LinkedIn: nopevbf"
                className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-transform"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* Copy Direct Email Button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Salin Email"
                title="Salin Email: firajitio@gmail.com"
                className="w-10 h-10 rounded-full bg-[#2F3E33] text-white flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-transform cursor-pointer"
              >
                {copiedEmail ? (
                  <Check className="w-5 h-5 text-emerald-300" />
                ) : (
                  <Copy className="w-4.5 h-4.5" />
                )}
              </button>
            </div>
          </div>

          {/* Primary Project Button triggering the Project Modal */}
          <div className="space-y-3 mb-5">
            <button
              type="button"
              onClick={() => setIsProjectModalOpen(true)}
              className="w-full py-3.5 px-4 rounded-xl flex items-center justify-between text-white font-bold text-[15px] sm:text-base tracking-wide transition-all duration-200 transform hover:-translate-y-0.5 shadow-md active:translate-y-0 bg-[#3B59FF] hover:bg-[#2F47D6] cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-lg bg-black/15 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white/95" />
                </span>
                <div className="text-left">
                  <span className="block drop-shadow-sm font-extrabold text-[15px] sm:text-[16px] leading-tight">D'PARAGON</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-semibold py-1.5 px-3 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30 transition-colors">
                <span>Pilih Projek</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          </div>

          {/* Thin Divider */}
          <div className="w-full h-px bg-[#2A2823]/10 my-4" />

          {/* Bottom Contact / Message Action */}
          <button
            type="button"
            onClick={() => setIsContactOpen(true)}
            className="w-full py-3 px-4 rounded-xl border border-[#2A2823]/15 hover:border-[#3F5A46] bg-[#FAF7F1]/80 hover:bg-white text-[#2A2823] font-semibold text-sm flex items-center justify-center gap-2.5 transition-all shadow-sm hover:shadow active:scale-[0.99] cursor-pointer"
          >
            <Mail className="w-4 h-4 text-[#C1683F]" />
            <span>Kirim Pesan / Tawaran Proyek ke Email</span>
          </button>

          {/* Micro Footer Bar */}
          <div className="flex items-center justify-between text-[11px] text-[#6B675F] mt-3.5 px-1 font-mono">
            <span className="inline-flex items-center gap-1.5 font-sans font-medium text-[#3F5A46]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Respons Cepat &lt; 24 Jam
            </span>
            <a
              href={`mailto:${profileData.email}`}
              className="hover:text-[#3F5A46] hover:underline"
              title="Kirim email langsung"
            >
              {profileData.email}
            </a>
          </div>

        </div>
      </main>

      {/* ================= MODAL: Projek 1 - 5 ================= */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xs w-full p-5 shadow-2xl border border-gray-100 relative">
            {/* Close button */}
            <button
              onClick={() => setIsProjectModalOpen(false)}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors cursor-pointer"
              title="Tutup Modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <h2 className="text-lg font-extrabold text-[#1C1C18] text-center mb-4 tracking-tight">
              Projek
            </h2>

            {/* Vertically stacked buttons: Projek 1 sampai 5 */}
            <div className="flex flex-col gap-2.5">
              {projectsList.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => navigateToProject(project)}
                  className="w-full py-3 px-4 rounded-xl font-bold text-center text-sm bg-[#FAF7F1] hover:bg-[#3B59FF] text-[#1C1C18] hover:text-white border border-gray-200 hover:border-[#3B59FF] shadow-2xs hover:shadow-md transition-all duration-150 cursor-pointer block active:scale-98"
                >
                  {project.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: Direct Contact & Email Form ================= */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[28px] max-w-md w-full p-6 sm:p-7 shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
              title="Tutup Form"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-5">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#3F5A46]/10 text-[#3F5A46] flex items-center justify-center mb-2.5">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#1C1C18]">Kirim Pesan ke Firman</h2>
              <p className="text-xs text-[#6B675F] mt-1">
                Terhubung langsung ke email resmi: <strong className="text-[#3F5A46]">firajitio@gmail.com</strong>
              </p>
            </div>

            {formSent ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-5 text-center my-4 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base">Aplikasi Email Terbuka!</h4>
                <p className="text-xs leading-relaxed text-emerald-700">
                  Draf email telah disiapkan. Klik kirim pada aplikasi email Anda atau gunakan tombol Gmail Web di bawah.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendEmail} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1C18] mb-1">
                    Nama Anda *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Contoh: Alex Pratama"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#3F5A46] focus:ring-2 focus:ring-[#3F5A46]/20 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C18] mb-1">
                      Email Anda
                    </label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#3F5A46] focus:ring-2 focus:ring-[#3F5A46]/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C18] mb-1">
                      Perusahaan / Startup
                    </label>
                    <input
                      type="text"
                      value={formCompany}
                      onChange={(e) => setFormCompany(e.target.value)}
                      placeholder="PT Tech Indonesia"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#3F5A46] focus:ring-2 focus:ring-[#3F5A46]/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C18] mb-1">
                    Subjek / Topik
                  </label>
                  <input
                    type="text"
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    placeholder="Contoh: Tawaran Freelance Automation QA / Konsultasi"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#3F5A46] focus:ring-2 focus:ring-[#3F5A46]/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C18] mb-1">
                    Pesan Anda *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Halo Firman, kami sedang mencari QA Engineer untuk kebutuhan testing sistem..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#3F5A46] focus:ring-2 focus:ring-[#3F5A46]/20 outline-none transition-all resize-none"
                  />
                </div>

                <div className="pt-1 space-y-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-[#3F5A46] hover:bg-[#284230] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Buka Aplikasi Email & Kirim</span>
                  </button>

                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink mx-3 text-[11px] text-gray-400 font-medium">atau</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                  </div>

                  <button
                    type="button"
                    onClick={handleOpenGmailWeb}
                    className="w-full py-2.5 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.5l8.073-6.007C21.69 2.279 24 3.434 24 5.457z"/>
                    </svg>
                    <span>Ketik Langsung di Gmail Web</span>
                  </button>
                </div>
              </form>
            )}

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
              <span>Alamat: firajitio@gmail.com</span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="text-[#3F5A46] font-semibold hover:underline"
              >
                {copiedEmail ? 'Email tersalin!' : 'Salin email'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 3: Share Modal Fallback ================= */}
      {isShareOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[24px] max-w-sm w-full p-6 shadow-2xl border border-gray-100 relative text-center">
            <button
              onClick={() => setIsShareOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
              title="Tutup"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 mx-auto rounded-full bg-[#6F8F76]/15 text-[#3F5A46] flex items-center justify-center mb-3">
              <Share2 className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-[#1C1C18] mb-1">Bagikan Kartu Profil</h3>
            <p className="text-xs text-[#6B675F] mb-4">
              Salin tautan ini untuk membagikan kartu Firman QA ke kolega atau recruiter:
            </p>

            <div className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-200 rounded-xl mb-4">
              <input
                type="text"
                readOnly
                value={window.location.href}
                className="w-full text-xs bg-transparent text-gray-700 outline-none truncate"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg bg-[#3F5A46] hover:bg-[#284230] text-white text-xs font-bold transition-all shrink-0 cursor-pointer"
              >
                {copiedLink ? 'Tersalin' : 'Salin'}
              </button>
            </div>

            <button
              onClick={() => setIsShareOpen(false)}
              className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
