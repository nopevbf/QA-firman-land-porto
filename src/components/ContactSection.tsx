import React, { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  Copy,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Phone,
  Clock,
  MapPin,
  Check,
  FileDown,
} from 'lucide-react';
import { PROFILE_INFO } from '../data/profileData';
import { ContactFormData } from '../types';

interface ContactSectionProps {
  initialSubject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialSubject = '' }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    category: 'Tawaran Proyek QA / Freelance',
    message: '',
  });

  const [subject, setSubject] = useState(initialSubject || '');
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  // Sync initialSubject if prop updates
  React.useEffect(() => {
    if (initialSubject) {
      setSubject(initialSubject);
    }
  }, [initialSubject]);

  const categories = [
    'Tawaran Proyek QA / Freelance',
    'Lowongan QA Engineer (Full-time / Remote)',
    'Audit & Konsultasi Test Automation',
    'Pertanyaan Seputar Blog & Tutorial',
    'Kolaborasi Lainnya',
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const generateMailtoUrl = () => {
    const finalSubject = subject.trim() || `[Inquiry] ${formData.category} - Dari ${formData.name || 'Pengunjung Website'}`;
    const bodyContent = `Halo Firman QA,\n\nNama: ${formData.name || 'Pengunjung'}\nEmail: ${formData.email || 'Belum dicantumkan'}\nKategori: ${formData.category}\n\nPesan:\n${formData.message}\n\n---\nDikirim melalui Form Kontak Website firmanqa.dev`;
    return `mailto:${PROFILE_INFO.email}?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(bodyContent)}`;
  };

  const generateGmailWebUrl = () => {
    const finalSubject = subject.trim() || `[Inquiry] ${formData.category} - Dari ${formData.name || 'Pengunjung Website'}`;
    const bodyContent = `Halo Firman QA,\n\nNama: ${formData.name || 'Pengunjung'}\nEmail: ${formData.email || 'Belum dicantumkan'}\nKategori: ${formData.category}\n\nPesan:\n${formData.message}\n\n---\nDikirim melalui Form Kontak Website firmanqa.dev`;
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PROFILE_INFO.email)}&su=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(bodyContent)}`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Mohon lengkapi Nama, Email, dan Pesan Anda.');
      return;
    }

    setSubmitted(true);
    // Automatically trigger opening email client
    const mailto = generateMailtoUrl();
    window.location.href = mailto;
  };

  const handleCopyDraft = () => {
    const draft = `Penerima: ${PROFILE_INFO.email}
Subjek: ${subject.trim() || `[Inquiry] ${formData.category} - Dari ${formData.name}`}
Pengirim: ${formData.name} (${formData.email})

Pesan:
${formData.message}`;
    navigator.clipboard.writeText(draft);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  const downloadVCard = () => {
    const vcardContent = `BEGIN:VCARD
VERSION:3.0
FN:Firman QA
N:QA;Firman;;;
TITLE:QA Engineer
EMAIL;TYPE=INTERNET:${PROFILE_INFO.email}
TEL;TYPE=CELL:+628122334455
URL:https://blog.firmanqa.dev
NOTE:Senior Quality Assurance Engineer - Web & Mobile Automation Testing
END:VCARD`;

    const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'firman-qa-contact.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="contact-section" className="w-full py-6 scroll-mt-20">
      <div className="glass-card rounded-[28px] p-6 sm:p-8 md:p-10 border border-white/80 shadow-lg relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C1683F]/8 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Quick Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C1683F]">
                Terhubung Langsung
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#2A2823] tracking-tight mt-1">
                Formulir Kontak Email
              </h2>
              <p className="text-sm text-[#6B675F] mt-2 leading-relaxed">
                Punya kebutuhan testing otomasi, audit sistem, atau ingin mendiskusikan peluang karir? Kirim pesan langsung ke inbox email saya.
              </p>
            </div>

            {/* Direct Email Card with 1-click Copy */}
            <div className="p-4 rounded-2xl bg-white/80 border border-[#2A2823]/10 shadow-xs">
              <div className="text-xs font-semibold text-[#6B675F] mb-1">
                Alamat Email Resmi:
              </div>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`mailto:${PROFILE_INFO.email}`}
                  className="font-mono text-sm sm:text-base font-bold text-[#3F5A46] hover:underline truncate"
                >
                  {PROFILE_INFO.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1.5 rounded-lg bg-[#FAF7F1] hover:bg-[#F1ECE1] text-xs font-semibold text-[#2A2823] border border-[#2A2823]/15 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  title="Salin alamat email"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Practical Contact Metas */}
            <div className="space-y-3 text-xs text-[#6B675F]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#3F5A46]/10 text-[#3F5A46] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#2A2823]">Waktu Respon Cepat</div>
                  <div>Rata-rata dibalas dalam 2–12 jam kerja</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#3F5A46]/10 text-[#3F5A46] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#2A2823]">Lokasi & Zona Waktu</div>
                  <div>Yogyakarta / Jakarta, Indonesia (WIB · UTC+7)</div>
                </div>
              </div>
            </div>

            {/* Quick Actions: WhatsApp & vCard */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href={PROFILE_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat via WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={downloadVCard}
                className="py-2.5 px-3 rounded-xl bg-white hover:bg-white/80 border border-[#2A2823]/15 text-[#2A2823] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-[#3F5A46]" />
                <span>Simpan Kontak (vCard)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Sender Name */}
                <div>
                  <label className="block text-xs font-bold text-[#2A2823] mb-1.5">
                    Nama Lengkap <span className="text-[#C1683F]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#2A2823]/15 text-sm text-[#2A2823] placeholder-[#6B675F]/60 focus:outline-none focus:ring-2 focus:ring-[#3F5A46] focus:border-transparent transition-all"
                  />
                </div>

                {/* Sender Email */}
                <div>
                  <label className="block text-xs font-bold text-[#2A2823] mb-1.5">
                    Email Anda <span className="text-[#C1683F]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nama@perusahaan.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#2A2823]/15 text-sm text-[#2A2823] placeholder-[#6B675F]/60 focus:outline-none focus:ring-2 focus:ring-[#3F5A46] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Inquiry Category */}
              <div>
                <label className="block text-xs font-bold text-[#2A2823] mb-1.5">
                  Kategori Kebutuhan
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#2A2823]/15 text-sm text-[#2A2823] focus:outline-none focus:ring-2 focus:ring-[#3F5A46] focus:border-transparent transition-all cursor-pointer"
                >
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-bold text-[#2A2823] mb-1.5">
                  Subjek Email
                </label>
                <input
                  type="text"
                  placeholder="Ringkasan topik atau nama proyek"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#2A2823]/15 text-sm text-[#2A2823] placeholder-[#6B675F]/60 focus:outline-none focus:ring-2 focus:ring-[#3F5A46] focus:border-transparent transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-[#2A2823] mb-1.5">
                  Detail Pesan <span className="text-[#C1683F]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ceritakan gambaran sistem yang ingin diuji, jadwal proyek, atau pertanyaan yang ingin Anda diskusikan bersama Firman..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#2A2823]/15 text-sm text-[#2A2823] placeholder-[#6B675F]/60 focus:outline-none focus:ring-2 focus:ring-[#3F5A46] focus:border-transparent transition-all resize-y"
                />
              </div>

              {/* Delivery Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                {/* Main Submit: Mailto */}
                <button
                  type="submit"
                  className="flex-1 py-3 px-5 rounded-xl bg-[#3F5A46] hover:bg-[#284230] text-[#FAF7F1] font-display font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim ke Email (Default Mail Client)</span>
                </button>

                {/* Option 2: Direct Gmail Web compose */}
                <a
                  href={generateGmailWebUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-[#FAF7F1] hover:bg-white text-[#C1683F] border border-[#C1683F]/30 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  title="Buka langsung di Gmail Web"
                >
                  <ExternalLink className="w-4 h-4 text-[#C1683F]" />
                  <span>Buka di Gmail Web</span>
                </a>
              </div>

              {/* Option 3: Copy draft */}
              <div className="flex items-center justify-between pt-1 text-xs text-[#6B675F]">
                <span>Tujuan pengiriman: <strong className="text-[#3F5A46]">firajitio@gmail.com</strong></span>
                <button
                  type="button"
                  onClick={handleCopyDraft}
                  className="text-xs text-[#3F5A46] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  {copiedDraft ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Draf Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Draf Pesan</span>
                    </>
                  )}
                </button>
              </div>

              {/* Success Notification Bar if submitted */}
              {submitted && (
                <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-300/60 text-emerald-900 text-xs sm:text-sm space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-2 font-bold text-emerald-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Draf Email Telah Disiapkan untuk firajitio@gmail.com</span>
                  </div>
                  <p className="text-emerald-800/90 leading-relaxed text-xs">
                    Jika aplikasi email Anda tidak terbuka secara otomatis, Anda dapat mengklik tombol <strong>"Buka di Gmail Web"</strong> di atas atau salin draf pesan untuk dikirim secara manual.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
