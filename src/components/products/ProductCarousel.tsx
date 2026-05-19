import React, { useRef, useState } from 'react';
import { Box, Typography, IconButton, Link } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { motion, AnimatePresence } from 'motion/react';
import CardProduct from './CardProduct';
import type { Product } from '@/utils/mocks/Products';
import { CARD_VARIANT } from '@/types/product.type';
import { colors } from '@/theme/palette';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductCarouselProps {
  title: string;
  products: Product[];
  highlightedProduct?: Product;
  onShowAll?: () => void;
  /** How many regular cards to show at once (default: 4) */
  visibleCount?: number;
}

// ─── Nav Button ───────────────────────────────────────────────────────────────

interface NavButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ direction, onClick, disabled }) => (
  <IconButton
    onClick={onClick}
    disabled={disabled}
    size="small"
    sx={{
      width: 40,
      height: 40,
      borderRadius: '50%',
      backgroundColor: disabled ? colors.neutral[100] : colors.white,
      border: '1.5px solid',
      borderColor: colors.neutral[300],
      color: disabled ? colors.neutral[400] : colors.content.muted,
      transition: 'all 0.2s ease',
      '&:hover:not(:disabled)': {
        backgroundColor: colors.brand.orange,
        borderColor: colors.brand.orange,
        color: colors.white,
      },
    }}
  >
    {direction === 'left' ? (
      <ChevronLeftIcon sx={{ fontSize: 20 }} />
    ) : (
      <ChevronRightIcon sx={{ fontSize: 20 }} />
    )}
  </IconButton>
);

// ─── ProductCarousel ──────────────────────────────────────────────────────────

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  products,
  highlightedProduct,
  onShowAll,
  visibleCount = 4,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const canGoBack = startIndex > 0;
  const canGoForward = startIndex + visibleCount < products.length;

  const handlePrev = () => {
    if (!canGoBack) return;
    setDirection(-1);
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    if (!canGoForward) return;
    setDirection(1);
    setStartIndex((prev) => Math.min(products.length - visibleCount, prev + 1));
  };

  const visibleProducts = products.slice(startIndex, startIndex + visibleCount);

  const enterX = direction > 0 ? 60 : -60;
  const exitX = direction > 0 ? -60 : 60;

  return (
    <Box sx={{ width: '100%' }}>
      {/* ── Row: Destacado + Carousel ────────────────────────────────────── */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: highlightedProduct ? '280px 1fr' : '1fr',
          gap: 3,
          alignItems: 'start',
        }}
      >
        {/* Highlighted card — always visible, no animation */}
        {highlightedProduct && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{ height: '100%' }}
          >
            <CardProduct product={highlightedProduct} variant={CARD_VARIANT.FEATURED} />
          </motion.div>
        )}

        {/* Right side: header + cards */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Header row */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
              {/* h2 — Títulos de sección dentro del dashboard */}
              <Typography variant="h2" sx={{ fontSize: '22px' }}>
                {title}
              </Typography>
              {onShowAll && (
                <Link
                  component="button"
                  onClick={onShowAll}
                  underline="none"
                  sx={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#F15A22',
                    cursor: 'pointer',
                    '&:hover': { color: '#C44010' },
                  }}
                >
                  Mostrar todo
                </Link>
              )}
            </Box>

            {/* Nav buttons */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <NavButton
                direction="left"
                onClick={handlePrev}
                disabled={!canGoBack}
              />
              <NavButton
                direction="right"
                onClick={handleNext}
                disabled={!canGoForward}
              />
            </Box>
          </Box>

          {/* Cards grid with animation */}
          <Box
            ref={constraintsRef}
            sx={{ overflow: 'hidden', position: 'relative' }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: `repeat(${visibleCount}, 1fr)`,
                gap: 2,
              }}
            >
              <AnimatePresence mode="popLayout">
                {visibleProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ x: enterX, opacity: 0, scale: 0.97 }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: 0.32,
                        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                      },
                    }}
                    exit={{
                      x: exitX,
                      opacity: 0,
                      scale: 0.97,
                      transition: { duration: 0.2, ease: 'easeIn' },
                    }}
                    layout
                    style={{ minWidth: 0 }}
                  >
                    <CardProduct product={product} variant="default" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCarousel;