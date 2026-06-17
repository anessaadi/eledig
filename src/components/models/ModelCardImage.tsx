'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { ModelColor } from '@/data/models';

export default function ModelCardImage({
  productNum,
  colors,
  name,
  fallback,
}: {
  productNum: string;
  colors: ModelColor[];
  name: string;
  fallback: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (colors.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % colors.length), 1000);
    return () => clearInterval(id);
  }, [colors.length]);

  const src = `/productpics/template ${productNum} ${colors[index].id}.webp`;

  return (
    <Image
      key={src}
      src={src}
      alt={name}
      fill
      className="object-cover transition-opacity duration-500"
      onError={(e) => { (e.currentTarget as HTMLImageElement).src = fallback; }}
    />
  );
}
