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
  const [ready, setReady] = useState(false);
  const loadedRef = useRef(0);

  function onImageLoad() {
    loadedRef.current += 1;
    if (loadedRef.current >= colors.length) setReady(true);
  }

  useEffect(() => {
    if (!ready || colors.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % colors.length), 3000);
    return () => clearInterval(id);
  }, [ready, colors.length]);

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
