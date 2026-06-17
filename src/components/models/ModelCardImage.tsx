'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import type { ModelColor } from '@/data/models';

export default function ModelCardImage({
  productNum,
  colors,
  name,
}: {
  productNum: string;
  colors: ModelColor[];
  name: string;
}) {
  const [index, setIndex] = useState(0);
  const loadedRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startSlideshow() {
    if (intervalRef.current || colors.length <= 1) return;
    intervalRef.current = setInterval(
      () => setIndex((i) => (i + 1) % colors.length),
      3500,
    );
  }

  function onImageLoad() {
    loadedRef.current += 1;
    if (loadedRef.current >= colors.length) startSlideshow();
  }

  useEffect(() => {
    // Fallback: start after 4s even if some images never fire onLoad
    const fallback = setTimeout(startSlideshow, 4000);
    return () => {
      clearTimeout(fallback);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <>
      {colors.map((c, i) => (
        <Image
          key={c.id}
          src={`/productpics/template ${productNum} ${c.id}.webp`}
          alt={i === 0 ? name : ''}
          fill
          className="object-cover transition-opacity duration-700"
          style={{ opacity: i === index ? 1 : 0 }}
          priority={i === 0}
          onLoad={onImageLoad}
        />
      ))}
    </>
  );
}
