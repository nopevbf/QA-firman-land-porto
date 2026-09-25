import React, { useRef, useState, useEffect } from 'react';
import { Camera, Image as ImageIcon, Check } from 'lucide-react';
import { profileData } from '../data/profileData';

interface FirmanAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  editable?: boolean;
}

// Candidate paths in public folder where the user can place their photo
const CANDIDATE_PATHS = [
  '/profile/avatar.png',
  '/profile/linkedin_profile-badge.png',
  '/profile/profile.png',
  '/profile/avatar.jpg',
  '/profile/profile.jpg',
  '/avatar.png',
  '/linkedin_profile-badge.png',
];

export const FirmanAvatar: React.FC<FirmanAvatarProps> = ({ size = 'lg', editable = true }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [hasCustomUpload, setHasCustomUpload] = useState<string | null>(() => {
    return localStorage.getItem('firman_custom_avatar');
  });
  const [imgSrc, setImgSrc] = useState<string>(() => {
    const saved = localStorage.getItem('firman_custom_avatar');
    if (saved) return saved;
    return CANDIDATE_PATHS[0];
  });
  const [isHovered, setIsHovered] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [allCandidatesFailed, setAllCandidatesFailed] = useState(false);

  // If candidate fails to load, try next candidate path in the folder
  const handleImageError = () => {
    if (hasCustomUpload) {
      // If custom uploaded base64 failed, fallback to candidates
      setHasCustomUpload(null);
      setImgSrc(CANDIDATE_PATHS[0]);
      return;
    }

    if (candidateIndex < CANDIDATE_PATHS.length - 1) {
      const nextIndex = candidateIndex + 1;
      setCandidateIndex(nextIndex);
      setImgSrc(CANDIDATE_PATHS[nextIndex]);
    } else {
      // If none found in public folder yet, show clean fallback placeholder with folder hint
      setAllCandidatesFailed(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setImgSrc(result);
          setHasCustomUpload(result);
          setAllCandidatesFailed(false);
          try {
            localStorage.setItem('firman_custom_avatar', result);
          } catch (err) {
            console.warn('Storage quota error:', err);
          }
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 3000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Dimensions
  const dimensionClass =
    size === 'lg' ? 'w-28 h-28 sm:w-32 sm:h-32' : size === 'md' ? 'w-24 h-24' : 'w-16 h-16';

  return (
    <div className="relative inline-block select-none">
      <div
        className={`relative ${dimensionClass} rounded-full overflow-hidden shadow-lg border-[3px] border-white transition-all duration-200 group bg-stone-100 ${
          editable ? 'cursor-pointer hover:shadow-xl hover:scale-102' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => editable && fileInputRef.current?.click()}
        title={
          editable
            ? 'Foto diambil dari folder public/profile/ (klik untuk pilih file langsung dari perangkat)'
            : undefined
        }
      >
        {!allCandidatesFailed ? (
          <img
            key={imgSrc}
            src={imgSrc}
            alt={profileData.name}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
            onError={handleImageError}
            onLoad={() => setAllCandidatesFailed(false)}
          />
        ) : (
          /* Visual placeholder if folder public/profile is not yet populated */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#3F5A46]/10 to-[#6F8F76]/20 p-2 text-center text-[#284230]">
            <ImageIcon className="w-7 h-7 mb-1 text-[#3F5A46]" />
            <span className="text-[10px] font-semibold leading-tight text-[#284230]">
              Taruh foto di:
            </span>
            <span className="text-[9px] font-mono text-[#6F8F76] break-all leading-none mt-0.5 font-bold">
              public/profile/
            </span>
          </div>
        )}

        {/* Hover overlay for user convenience */}
        {editable && isHovered && (
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] flex flex-col items-center justify-center text-white transition-opacity duration-200">
            <Camera className="w-5 h-5 mb-1 text-white animate-bounce" />
            <span className="text-[10px] font-bold tracking-tight uppercase px-1 text-center">
              Pilih Foto
            </span>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Success Notification Pill if user uploaded an image */}
      {uploadSuccess && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 whitespace-nowrap z-10 animate-fade-in">
          <Check className="w-3 h-3" /> Foto Diperbarui!
        </div>
      )}

      {/* Camera change button at bottom right */}
      {editable && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Upload atau ganti foto profil"
          className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#3F5A46] hover:bg-[#284230] text-white flex items-center justify-center border-2 border-white shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer z-10"
          title="Klik untuk memilih foto dari perangkat Anda atau simpan ke public/profile/"
        >
          <Camera className="w-4 h-4 text-emerald-200" />
        </button>
      )}
    </div>
  );
};
