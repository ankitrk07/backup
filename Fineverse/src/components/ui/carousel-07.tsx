"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface Slide {
  image: string;
  title: string;
  description: string;
  badge: string;
  href?: string;
  price?: string;
  originalPrice?: string;
}

const defaultSlides: Slide[] = [
  {
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    title: "Mountain Trek",
    description: "Scale new heights and embrace the hiker's journey.",
    badge: "Adventure",
  },
  {
    image: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80",
    title: "River Rafting",
    description: "Feel the adrenaline rush as you navigate the wild rapids.",
    badge: "Extreme",
  },
  {
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    title: "Forest Walk",
    description: "Deep dive into the silence of the ancient woods.",
    badge: "Nature",
  },
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    title: "Azure Beach",
    description: "Unwind on the crystal clear shores of a tropical paradise.",
    badge: "Paradise",
  },
  {
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    title: "Spiritual Path",
    description: "Discover inner peace through ancient wisdom.",
    badge: "Serenity",
  },
];

interface CarouselConfig {
  distanceDivisor: number;
  velocityDivisor: number;
  sensitivity: number;
  xMultiplier: number;
  yMultiplier: number;
  rotationMultiplier: number;
  scaleReduction: number;
}

const getCarouselConfig = (width: number): CarouselConfig => {
  if (width < 640) {
    return {
      distanceDivisor: 120,
      velocityDivisor: 500,
      sensitivity: 180,
      xMultiplier: 90,
      yMultiplier: 20,
      rotationMultiplier: 8,
      scaleReduction: 0.06,
    };
  }
  if (width < 1024) {
    return {
      distanceDivisor: 160,
      velocityDivisor: 650,
      sensitivity: 220,
      xMultiplier: 130,
      yMultiplier: 30,
      rotationMultiplier: 10,
      scaleReduction: 0.09,
    };
  }
  return {
    distanceDivisor: 200,
    velocityDivisor: 800,
    sensitivity: 250,
    xMultiplier: 170,
    yMultiplier: 40,
    rotationMultiplier: 12,
    scaleReduction: 0.12,
  };
};

export interface CarouselStackedProps {
  slides?: Slide[];
  className?: string;
  onCardClick?: (slide: Slide, index: number) => void;
}

export const CarouselStacked = ({
  slides = defaultSlides,
  className,
  onCardClick,
}: CarouselStackedProps) => {
  const scrollProgress = useMotionValue(0);
  const startProgress = React.useRef(0);
  const isDraggingRef = React.useRef(false);
  const [windowWidth, setWindowWidth] = React.useState(0);

  const total = slides.length;

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const config = React.useMemo(
    () => getCarouselConfig(windowWidth),
    [windowWidth],
  );

  const handleDragStart = () => {
    isDraggingRef.current = true;
    startProgress.current = scrollProgress.get();
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 50);

    const dragDistance = info.offset.x;
    const velocity = info.velocity.x;

    const distanceShift = -dragDistance / config.distanceDivisor;
    const velocityShift = -velocity / config.velocityDivisor;

    let totalShift = Math.round(distanceShift + velocityShift);
    totalShift = Math.max(-3, Math.min(3, totalShift));

    const target = Math.round(startProgress.current) + totalShift;

    animate(scrollProgress, target, {
      type: "spring",
      stiffness: 200,
      damping: 30,
      mass: 1,
    });
  };

  const handleCardSelect = (slide: Slide, index: number) => {
    if (isDraggingRef.current) return;
    if (onCardClick) {
      onCardClick(slide, index);
    } else if (slide.href) {
      window.location.href = slide.href;
    }
  };

  return (
    <div className={cn("flex flex-col items-center justify-center w-full py-6 select-none", className)}>
      <div className="relative w-full max-w-7xl h-80 sm:h-[28rem] lg:h-[32rem] flex items-center justify-center">
        {/* Drag Surface */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={handleDragStart}
          onDrag={(_, info) => {
            const delta = -info.delta.x / config.sensitivity;
            scrollProgress.set(scrollProgress.get() + delta);
          }}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
        />

        {slides.map((slide, i) => (
          <Card
            key={i}
            slide={slide}
            index={i}
            total={total}
            progress={scrollProgress}
            config={config}
            onSelect={() => handleCardSelect(slide, i)}
          />
        ))}
      </div>
    </div>
  );
};

interface CardProps {
  slide: Slide;
  index: number;
  total: number;
  progress: MotionValue<number>;
  config: CarouselConfig;
  onSelect: () => void;
}

const Card = ({ slide, index, total, progress, config, onSelect }: CardProps) => {
  const offset = useTransform(progress, (p) => {
    let diff = (index - p) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  });

  const x = useTransform(offset, (o) => o * config.xMultiplier);
  const rotate = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return o * config.rotationMultiplier;
  });
  const y = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return absO * config.yMultiplier;
  });
  const scale = useTransform(
    offset,
    (o) => 1 - Math.abs(o) * config.scaleReduction,
  );
  const opacity = useTransform(
    offset,
    [-total / 2, -total / 2 + 0.5, 0, total / 2 - 0.5, total / 2],
    [0, 1, 1, 1, 0],
  );
  const zIndex = useTransform(offset, (o) =>
    Math.round(100 - Math.abs(o) * 10),
  );

  return (
    <motion.div
      style={{
        x,
        rotate,
        y,
        scale,
        opacity,
        zIndex,
      }}
      onClick={onSelect}
      className={cn(
        "absolute rounded-2xl overflow-hidden bg-muted group pointer-events-none transition-shadow",
        "w-44 h-56 sm:w-56 sm:h-80 lg:w-64 lg:h-96 shadow-xl",
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={slide.image}
        alt={slide.title}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-110"
      />

      <motion.div
        style={{
          opacity: useTransform(
            offset,
            [-2, -0.5, 0, 0.5, 2],
            [0.5, 0.2, 0, 0.2, 0.5],
          ),
        }}
        className="absolute inset-0 bg-black pointer-events-none"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

      {slide.badge && (
        <Badge className="absolute top-3 right-3 sm:top-5 sm:right-5 lg:top-6 lg:right-6 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold uppercase tracking-widest text-black shadow-md border-0 pointer-events-none">
          {slide.badge}
        </Badge>
      )}

      <div className="absolute bottom-4 left-3 right-3 sm:bottom-6 sm:left-5 sm:right-5 lg:bottom-8 lg:left-6 lg:right-6 text-white text-center sm:text-left pointer-events-none">
        <motion.p
          style={{
            opacity: useTransform(offset, [-0.5, 0, 0.5], [0, 1, 0]),
          }}
          className="text-sm sm:text-base lg:text-lg font-bold leading-tight mb-1 drop-shadow-md line-clamp-2"
        >
          {slide.title}
        </motion.p>
        {slide.price && (
          <motion.div
            style={{
              opacity: useTransform(offset, [-0.5, 0, 0.5], [0, 1, 0]),
            }}
            className="flex items-center gap-2 mb-1"
          >
            <span className="font-bold text-white text-sm sm:text-base drop-shadow-sm">
              {slide.price}
            </span>
            {slide.originalPrice && (
              <span className="text-white/60 line-through text-xs">
                {slide.originalPrice}
              </span>
            )}
          </motion.div>
        )}
        {slide.description && (
          <motion.p
            style={{
              opacity: useTransform(offset, [-0.5, 0, 0.5], [0, 1, 0]),
            }}
            className="hidden sm:block text-xs text-white/70 line-clamp-2 italic font-medium"
          >
            {slide.description}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default CarouselStacked;
