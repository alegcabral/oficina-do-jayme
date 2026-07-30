"use client";

import { motion, MotionValue, useReducedMotion, useTransform } from "framer-motion";
import PinnedScene from "@/components/motion/PinnedScene";
import { company } from "@/config/company";

/**
 * Cena "manifesto" após o hero: enquanto a rolagem avança, as palavras do
 * processo (Diagnóstico → Mecânica → Funilaria → Pintura → Acabamento)
 * entram e saem uma a uma, com um anel dourado crescendo ao fundo e a
 * linha dourada preenchendo o progresso — como um vídeo tocado pelo scroll.
 * Com prefers-reduced-motion, vira uma lista estática elegante.
 */
export default function ManifestoScene() {
  const reduceMotion = useReducedMotion();
  const words = company.processWords;

  if (reduceMotion) {
    return (
      <section className="border-y border-white/10 bg-graphite py-20">
        <div className="container-oj text-center">
          <p className="eyebrow mb-8">Precisão em cada detalhe</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {words.map((w) => (
              <li key={w} className="font-display text-3xl text-paper sm:text-4xl">
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <PinnedScene heightVh={110 + words.length * 55} className="border-y border-white/10 bg-graphite">
      {(progress) => (
        <div className="relative flex h-full items-center justify-center overflow-hidden">
          {/* Anel dourado crescendo com a rolagem */}
          <Ring progress={progress} />

          <p className="eyebrow absolute top-[14vh]">Precisão em cada detalhe</p>

          {words.map((word, i) => (
            <WordFrame
              key={word}
              progress={progress}
              index={i}
              total={words.length}
              word={word}
            />
          ))}

          {/* Linha dourada de progresso */}
          <motion.div
            aria-hidden="true"
            className="absolute bottom-[12vh] left-1/2 h-px w-[62vw] max-w-3xl -translate-x-1/2 bg-white/10"
          >
            <motion.div
              className="h-full origin-left bg-gold"
              style={{ scaleX: progress }}
            />
          </motion.div>
        </div>
      )}
    </PinnedScene>
  );
}

function Ring({ progress }: { progress: MotionValue<number> }) {
  const scale = useTransform(progress, [0, 1], [0.55, 1.35]);
  const rotate = useTransform(progress, [0, 1], [0, 60]);
  const opacity = useTransform(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  return (
    <motion.div
      aria-hidden="true"
      className="absolute h-[56vmin] w-[56vmin] rounded-full border border-gold/25"
      style={{ scale, rotate, opacity }}
    >
      <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-gold/60" />
      <span className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-gold/60" />
      <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-gold/60" />
      <span className="absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 bg-gold/60" />
    </motion.div>
  );
}

function WordFrame({
  progress,
  index,
  total,
  word,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  word: string;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const mid = 0.18 / total;

  const opacity = useTransform(
    progress,
    [start, start + mid, end - mid, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [start, start + mid, end - mid, end], [60, 0, 0, -60]);
  const scale = useTransform(progress, [start, end], [0.96, 1.04]);

  return (
    <motion.span
      className="absolute px-6 text-center font-display text-[clamp(2.6rem,10vw,7rem)] font-bold leading-none text-paper"
      style={{ opacity, y, scale }}
    >
      {index === total - 1 ? <span className="text-gold">{word}</span> : word}
    </motion.span>
  );
}
