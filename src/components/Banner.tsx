import { useRef, useState } from 'react';
import { motion, useMotionValue, type PanInfo } from 'framer-motion';
import { useStore, STICKER_DEFS, BANNER_BGS, type BannerSticker } from '../store';
import Footer from './Footer';

const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

/** Resolve the emoji for a placed sticker, with legacy fallback:
 *  pre-migration placements stored only a timestamp id and were rendered by
 *  indexing into progress.stickers — keep those looking stable. */
export function stickerIcon(s: BannerSticker, earnedStickers: string[]): string {
  if (s.stickerId && STICKER_DEFS[s.stickerId]) return STICKER_DEFS[s.stickerId].icon;
  const idx = parseInt(s.id, 10);
  if (!Number.isNaN(idx)) {
    const legacyKey = earnedStickers[idx];
    if (legacyKey && STICKER_DEFS[legacyKey]) return STICKER_DEFS[legacyKey].icon;
  }
  return '⭐';
}

const MAX_PLACED_STICKERS = 24;
const clampPercent = (v: number) => Math.min(97, Math.max(3, v));

export default function Banner() {
  const { user, setCurrentView, setBannerBg, addBannerSticker, removeBannerSticker, updateBannerSticker } = useStore();
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  /** Set true on drag so the synthetic click after pointerup doesn't remove the sticker. */
  const didDragRef = useRef(false);

  if (!user) return null;

  const handleBannerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedSticker || didDragRef.current) {
      didDragRef.current = false;
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = clampPercent(((e.clientX - rect.left) / rect.width) * 100);
    const y = clampPercent(((e.clientY - rect.top) / rect.height) * 100);

    if (user.bannerStickers.length >= MAX_PLACED_STICKERS) {
      setSelectedSticker(null);
      return;
    }

    addBannerSticker({
      id: crypto.randomUUID(),
      stickerId: selectedSticker,
      x,
      y,
      rotation: Math.random() * 30 - 15,
      scale: 1,
      zIndex: user.bannerStickers.length + 1,
    });
    setSelectedSticker(null);
  };

  /** Drag ended → commit final position as banner-relative percent, reset offsets. */
  const handleDragEnd = (s: BannerSticker, _e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    didDragRef.current = true;
    const banner = bannerRef.current;
    if (!banner) return;

    // Momentum is disabled, so info.offset is the exact final delta.
    const x = clampPercent(s.x + (info.offset.x / banner.clientWidth) * 100);
    const y = clampPercent(s.y + (info.offset.y / banner.clientHeight) * 100);

    updateBannerSticker(s.id, { x, y });
    s.x = x;
    s.y = y;
  };

  const handleStickerTap = (s: BannerSticker) => {
    // A tap (no preceding drag) removes; drags are handled in handleDragEnd.
    if (didDragRef.current) {
      didDragRef.current = false;
      return;
    }
    if (confirm('Remove this sticker?')) {
      removeBannerSticker(s.id);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1720]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1a2332] border-b border-[#c8c8c8] dark:border-[#2a3545] px-4 py-4 sticky top-0 z-50">
        <div className="max-w-xl mx-auto flex items-center gap-4">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="text-[#5a6577] dark:text-[#9aa3b0] hover:text-[#1a2332] dark:hover:text-white transition-colors flex items-center gap-2 min-h-[48px] px-2 -ml-2 rounded-lg"
            aria-label="Back to dashboard"
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
            ref={bannerRef}
            data-banner
            onClick={handleBannerClick}
            className={`rounded-xl h-40 sm:h-48 relative overflow-hidden touch-none select-none ${
              selectedSticker ? 'cursor-crosshair border-2 border-[#c9a84c] border-dashed' : ''
            }`}
            style={{ background: user.bannerBg }}
          >
            {user.bannerStickers.map((s) => (
              <DraggableSticker
                key={s.id}
                sticker={s}
                icon={stickerIcon(s, user.progress.stickers)}
                containerRef={bannerRef}
                onDragEnd={handleDragEnd}
                onTap={handleStickerTap}
              />
            ))}

            {selectedSticker && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-white/90 text-sm font-medium bg-black/40 px-3 py-1.5 rounded-lg">
                  Tap to place “{STICKER_DEFS[selectedSticker]?.name}”
                </p>
              </div>
            )}

            {user.bannerStickers.length === 0 && !selectedSticker && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-white/70 text-sm px-4 text-center">
                  Pick a sticker below, tap the banner to place it, then drag to arrange
                </p>
              </div>
            )}
          </div>
          {user.bannerStickers.length >= MAX_PLACED_STICKERS && (
            <p className="text-xs text-[#c44536] mt-2">
              Banner is full ({MAX_PLACED_STICKERS} stickers max) — remove one to place another.
            </p>
          )}
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
            {BANNER_BGS.map((bg) => (
              <motion.button
                key={bg}
                onClick={() => setBannerBg(bg)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Choose this background"
                className={`h-16 min-h-[48px] rounded-lg border-2 transition-all ${
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
              {user.progress.stickers.map((stickerKey) => {
                const sticker = STICKER_DEFS[stickerKey];
                const isSelected = selectedSticker === stickerKey;

                return (
                  <motion.button
                    key={stickerKey}
                    onClick={() => setSelectedSticker(isSelected ? null : stickerKey)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-pressed={isSelected}
                    className={`aspect-square min-h-[48px] rounded-lg flex flex-col items-center justify-center gap-1 border-2 transition-all ${
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
            1. Tap a sticker below, 2. Tap the banner to place it, 3. Drag placed stickers to
            rearrange, 4. Tap a placed sticker (without dragging) to remove it. Works with touch
            and mouse — dragging never scrolls the page.
          </p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

interface DraggableStickerProps {
  sticker: BannerSticker;
  icon: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onDragEnd: (s: BannerSticker, e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onTap: (s: BannerSticker) => void;
}

/**
 * A single placed sticker. Framer Motion drag with explicit pixel bounds
 * computed from the live banner element, `touch-action: none` so touch
 * drags never scroll the window, and no momentum so the committed position
 * exactly matches where the finger/mouse lifted (no state race).
 */
function DraggableSticker({ sticker, icon, containerRef, onDragEnd, onTap }: DraggableStickerProps) {
  const elRef = useRef<HTMLDivElement>(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);


  return (
    <motion.div
      ref={elRef}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      drag
      dragMomentum={false}
      dragElastic={0.06}
      dragConstraints={containerRef}
      style={{
        x: mvX,
        y: mvY,
        left: `${sticker.x}%`,
        top: `${sticker.y}%`,
        rotate: sticker.rotation,
        scale: sticker.scale ?? 1,
        zIndex: sticker.zIndex ?? 1,
        touchAction: 'none',
      }}
      className="absolute cursor-move select-none text-3xl sm:text-4xl p-1"
      whileDrag={{ scale: (sticker.scale ?? 1) * 1.15 }}
      onDragEnd={(e, info) => {
        // Reset offsets BEFORE committing so the re-render at the new
        // stored % lands exactly under the pointer.
        mvX.set(0);
        mvY.set(0);
        onDragEnd(sticker, e, info);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onTap(sticker);
      }}
      aria-label={`Placed sticker ${icon}. Drag to move, tap to remove.`}
    >
      {icon}
    </motion.div>
  );
}
