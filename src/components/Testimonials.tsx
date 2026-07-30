"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, StarHalf, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { company } from "@/config/company";
import { reviews } from "@/data/reviews";

/**
 * Carrossel de avaliações acessível: controles visíveis, toque, teclado,
 * pausa na interação e card seguinte parcialmente visível no celular.
 * A representação de estrelas é coerente com a nota 4,3 (4 cheias + parcial).
 */
export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = ((i % reviews.length) + reviews.length) % reviews.length;
    const card = track.children[clamped] as HTMLElement | undefined;
    if (card) {
      track.scrollTo({ left: card.offsetLeft - 16, behavior: "smooth" });
      setIndex(clamped);
    }
  }, []);

  // Avanço automático lento, pausado durante a interação
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => scrollTo(index + 1), 7000);
    return () => window.clearInterval(id);
  }, [index, paused, scrollTo]);

  return (
    <section id="avaliacoes" className="bg-graphite py-24">
      <div className="container-oj">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div className="max-w-xl">
            <p className="eyebrow mb-3">Avaliações</p>
            <h2 className="section-title">O que dizem os clientes</h2>
          </div>

          <div className="flex items-center gap-4 rounded-sm border border-gold/30 bg-ink px-6 py-4">
            <span className="font-display text-4xl text-paper">
              {company.rating.value.toLocaleString("pt-BR")}
            </span>
            <div>
              <div
                className="flex items-center gap-0.5"
                role="img"
                aria-label={`Nota ${company.rating.value.toLocaleString("pt-BR")} de 5 no Google`}
              >
                {[0, 1, 2, 3].map((i) => (
                  <Star key={i} size={16} className="fill-gold text-gold" aria-hidden="true" />
                ))}
                {/* Quinta estrela parcial — coerente com 4,3 */}
                <span className="relative" aria-hidden="true">
                  <Star size={16} className="text-mist/40" />
                  <StarHalf size={16} className="absolute inset-0 fill-gold text-gold" />
                </span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-wide text-mist">
                {company.rating.count} avaliações no Google
              </p>
            </div>
          </div>
        </motion.div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
        >
          <div
            ref={trackRef}
            className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label="Depoimentos de clientes"
            aria-roledescription="carrossel"
          >
            {reviews.map((text, i) => (
              <blockquote
                key={i}
                className="flex w-[82%] shrink-0 snap-start flex-col rounded-sm border border-white/10 bg-ink p-7 sm:w-[46%] lg:w-[31%]"
                aria-roledescription="slide"
                aria-label={`Depoimento ${i + 1} de ${reviews.length}`}
              >
                <Quote size={20} className="mb-4 text-gold/60" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-paper">&ldquo;{text}&rdquo;</p>
              </blockquote>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-xs text-mist/70">{company.rating.source}</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollTo(index - 1)}
                aria-label="Depoimento anterior"
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/15 text-paper transition-colors hover:border-gold hover:text-gold"
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollTo(index + 1)}
                aria-label="Próximo depoimento"
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/15 text-paper transition-colors hover:border-gold hover:text-gold"
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {company.googleProfileUrl ? (
          <a
            href={company.googleProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary mt-8"
          >
            Ver perfil no Google
          </a>
        ) : null}
      </div>
    </section>
  );
}
