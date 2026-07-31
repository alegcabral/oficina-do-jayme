"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { beforeAfterPairs } from "@/data/beforeAfter";

/**
 * Comparação antes/depois com controle deslizante (mouse, toque e teclado).
 * IMPORTANTE: a seção só é renderizada quando houver pares REAIS cadastrados
 * em src/data/beforeAfter.ts. Sem fotos reais, nada é exibido — nenhum
 * resultado falso é apresentado ao visitante.
 */
export default function BeforeAfterSlider() {
  if (beforeAfterPairs.length === 0) return null;
  return (
    <section className="border-y border-white/10 bg-graphite py-24">
      <div className="container-oj">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <p className="eyebrow mb-3">Resultados</p>
          <h2 className="section-title">Antes e depois</h2>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {beforeAfterPairs.map((pair) => (
            <ComparisonCard
              key={pair.id}
              before={pair.before}
              after={pair.after}
              label={pair.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonCard({
  before,
  after,
  label,
}: {
  before: string;
  after: string;
  label: string;
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <figure>
      <div
        ref={containerRef}
        className="relative aspect-[4/3] cursor-ew-resize touch-none select-none overflow-hidden rounded-sm border border-white/10"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          updateFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (dragging.current) updateFromClientX(e.clientX);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
      >
        <Image src={after} alt={`${label} (depois)`} fill className="object-cover" sizes="(min-width:1024px) 50vw, 100vw" />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image src={before} alt={`${label} (antes)`} fill className="object-cover" sizes="(min-width:1024px) 50vw, 100vw" />
        </div>

        <span className="absolute left-3 top-3 rounded-sm bg-ink/80 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-paper">
          Antes
        </span>
        <span className="absolute right-3 top-3 rounded-sm bg-gold px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
          Depois
        </span>

        {/* Linha e alça do controle, também operável por teclado */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 w-0.5 bg-gold"
          style={{ left: `${position}%` }}
        />
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(position)}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label={`Comparar antes e depois: ${label}`}
          className="absolute inset-x-0 bottom-0 h-full w-full opacity-0"
        />
      </div>
      <figcaption className="mt-3 text-sm text-mist">{label}</figcaption>
    </figure>
  );
}
