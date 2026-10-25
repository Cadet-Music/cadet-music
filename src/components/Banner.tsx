import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore, STICKER_DEFS, BANNER_BGS } from '../store';

const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export default function Banner() {
  const { user, setCurrentView, setBannerBg, addBannerSticker, removeBannerSticker, updateBannerSticker } = useStore();
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);

  if (!user) return null;

  const handleBannerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedSticker) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    addBannerSticker({
      id: Date.now().toString(),
      x,
      y,
      rotation: Math.random() * 30 - 15,
    });
    setSelectedSticker(null);
  };

  const handleStickerDrag = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const banner = e.currentTarget.closest('[data-banner]');
    if (!banner) return;
    
    const rect = banner.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    updateBannerSticker(id, { x, y });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1720]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1a2332] border-b border-[#c8c8c8] dark:border-[#2a3545] px-4 py-4 sticky top-0 z-50">
        <div className="max-w-xl mx-auto flex items-center gap-4">
          <button
            onClick={() => setCurrentView('leaderboard')}
            className="text-[#5a6577] dark:text-[#9aa3b0] hover:text-[#1a2332] dark:hover:text-white transition-colors flex items-center gap-2"
          >
            <ChevronLeftIcon />
            <span className="text-sm font-medium">Back</span>
          </button>
          <h1 className="text-lg font-semibold text-[#1a2332] dark:text-white">Customize Banner</h1>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-6">
        {/* Banner Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6"
        >
          <p className="text-xs font-semibold text-[#5a6577] dark:text-[#9aa3b0] uppercase tracking-wide mb-2">
            Preview
          </p>
          <div
            data-banner
            onClick={handleBannerClick}
            className={`rounded-xl h-40 relative overflow-hidden cursor-${selectedSticker ? 'crosshair' : 'default'} border-2 ${
              selectedSticker ? 'border-[#c9a84c] border-dashed' : 'border-transparent'
            }`}
            style={{ background: user.bannerBg }}
          >
            {user.bannerStickers.map((s) => {
              const stickerIdx = parseInt(s.id);
              const stickerKey = user.progress.stickers[stickerIdx];
              const stickerDef = STICKER_DEFS[stickerKey];
              
              return (
                <motion.div
                  key={s.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute text-3xl cursor-move select-none"
                  style={{
                    left: `${s.x}%`,
                    top: `${s.y}%`,
                    transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('Remove this sticker?')) {
                      removeBannerSticker(s.id);
                    }
                  }}
                >
                  {stickerDef?.icon || '⭐'}
                </motion.div>
              );
            })}
            
            {selectedSticker && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white/80 text-sm font-medium bg-black/30 px-3 py-1.5 rounded-lg">
                  Click to place sticker
                </p>
              </div>
            )}

            {user.bannerStickers.length === 0 && !selectedSticker && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white/60 text-sm">Select a sticker below, then click here to place it</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Background Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <p className="text-xs font-semibold text-[#5a6577] dark:text-[#9aa3b0] uppercase tracking-wide mb-3">
            Background
          </p>
          <div className="grid grid-cols-3 gap-2">
            {BANNER_BGS.map((bg, i) => (
              <motion.button
                key={bg}
                onClick={() => setBannerBg(bg)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`h-16 rounded-lg border-2 transition-all ${
                  user.bannerBg === bg ? 'border-[#c9a84c] ring-2 ring-[#c9a84c]/30' : 'border-transparent'
                }`}
                style={{ background: bg }}
              />
            ))}
          </div>
        </motion.div>

        {/* Sticker Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xs font-semibold text-[#5a6577] dark:text-[#9aa3b0] uppercase tracking-wide mb-3">
            Your Stickers ({user.progress.stickers.length})
          </p>
          {user.progress.stickers.length === 0 ? (
            <div className="card text-center py-8">
              <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">
                Complete lessons and goals to earn stickers
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {user.progress.stickers.map((stickerKey, i) => {
                const sticker = STICKER_DEFS[stickerKey];
                const isSelected = selectedSticker === stickerKey;
                
                return (
                  <motion.button
                    key={stickerKey}
                    onClick={() => setSelectedSticker(isSelected ? null : stickerKey)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center gap-1 border-2 transition-all ${
                      isSelected 
                        ? 'border-[#c9a84c] bg-[#c9a84c]/10' 
                        : 'border-[#c8c8c8] dark:border-[#2a3545] bg-white dark:bg-[#1a2332]'
                    }`}
                  >
                    <span className="text-2xl">{sticker?.icon}</span>
                    <span className="text-[9px] font-medium text-[#5a6577] dark:text-[#9aa3b0] text-center leading-tight px-1">
                      {sticker?.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="card mt-6 bg-[#c9a84c]/5 border-[#c9a84c]/30 dark:bg-[#c9a84c]/10"
        >
          <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">
            <span className="font-semibold text-[#1a2332] dark:text-white">How to use: </span>
            1. Select a sticker below, 2. Click on the banner to place it, 3. Click a placed sticker to remove it
          </p>
        </motion.div>
      </div>
    </div>
  );
}
