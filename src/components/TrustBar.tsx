"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SearchCheck, MessageSquare, BadgeCheck, Paintbrush } from "lucide-react";
import { company } from "@/config/company";

const icons = [SearchCheck, MessageSquare, BadgeCheck, Paintbrush];

/**
 * Transição após o hero: linha dourada + palavras do processo em movimento
 * lento, seguidas dos quatro pilares (Diferenciais).
 */
export default function TrustBar() {
  const reduceMotion = useReducedMotion();
  const words = company.processWords;

  return (
    <section id="diferenciais" className="border-y border-white/10 bg-graphite">
      {/* Faixa de palavras do processo — movimento lento e sofisticado */}
      <div className="relative overflow-hidden border-b border-white/10 py-7">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gold-line"
        />
        <div
          className={
            reduceMotion
              ? "flex flex-wrap justify-center gap-x-10 gap-y-2"
              : "flex w-max animate-marquee gap-0"
          }
          aria-label={`Processo: ${words.join(", ")}`}
        >
          {(reduceMotion ? [words] : [words, words]).map((set, si) => (
            <div key={si} className="flex shrink-0 items-center" aria-hidden={si > 0}>
              {set.map((word) => (
                <span
                  key={`${si}-${word}`}
                  className="flex items-center px-8 font-display text-xl uppercase tracking-[0.3em] text-mist sm:text-2xl"
                >
                  {word}
                  <span aria-hidden="true" className="ml-16 h-1.5 w-1.5 rounded-full bg-gold" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Quatro pilares */}
      <div className="container-oj grid grid-cols-1 gap-x-8 gap-y-9 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {company.pillars.map((pillar, i) => {
          const Icon = icons[i % icons.length];
          return (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className="group flex items-start gap-4"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-gold/40 text-gold transition-colors group-hover:border-gold group-hover:bg-gold/10">
                <Icon size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-lg tracking-wide text-paper">
                  {pillar.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-mist">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
