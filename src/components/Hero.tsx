"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { MessageCircle, MapPin, Star, Clock, ChevronDown } from "lucide-react";
import Image from "next/image";
import { company } from "@/config/company";
import { buildWhatsAppUrl } from "@/lib/utils";

/**
 * Hero "scrollytelling": a seção tem 200vh e o conteúdo fica preso (sticky)
 * enquanto a rolagem dirige a cena como um vídeo — o fundo aproxima, um
 * texto gigante de contorno atravessa a tela, o conteúdo se inclina em
 * perspectiva e dissolve. A rolagem nativa nunca é bloqueada.
 * Com prefers-reduced-motion, vira um hero estático de uma tela.
 */
export default function Hero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const giantX = useTransform(scrollYProgress, [0, 1], ["24%", "-60%"]);
  const giantOpacity = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0, 0.14, 0.14, 0]);
  const contentY = useTransform(scrollYProgress, [0.35, 1], ["0%", "-30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0.45, 0.9], [1, 0]);
  const contentRotateX = useTransform(scrollYProgress, [0.35, 1], [0, 10]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  const lineReveal = (delay: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { y: "110%" },
    animate: reduceMotion ? { opacity: 1 } : { y: "0%" },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative bg-ink"
      style={{ height: reduceMotion ? "auto" : "200vh" }}
    >
      <div
        className={
          reduceMotion
            ? "relative flex min-h-[100svh] items-center overflow-hidden"
            : "sticky top-0 flex h-screen items-center overflow-hidden"
        }
        style={{ perspective: 1200 }}
      >
        {/* Camada 1: arte de fundo aproximando com a rolagem */}
        <motion.div
          className="absolute inset-0"
          style={reduceMotion ? {} : { scale: bgScale, y: bgY }}
        >
          <Image
            src={company.images.heroBackground}
            alt=""
            role="presentation"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/10 to-ink/50" />

        {/* Camada 2: palavra gigante de contorno atravessando a cena */}
        {!reduceMotion && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[26vw] font-bold leading-none text-transparent"
            style={{
              x: giantX,
              opacity: giantOpacity,
              WebkitTextStroke: "1px rgba(212,179,116,0.9)",
            }}
          >
            alto padrão
          </motion.span>
        )}

        {/* Linha dourada de progresso da cena */}
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-gold/70"
            style={{ scaleX: lineScale }}
          />
        )}

        {/* Camada 3: conteúdo comercial */}
        <motion.div
          className="container-oj relative z-10"
          style={
            reduceMotion
              ? {}
              : {
                  y: contentY,
                  opacity: contentOpacity,
                  rotateX: contentRotateX,
                  transformStyle: "preserve-3d",
                }
          }
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="eyebrow mb-5"
          >
            Oficina automotiva no Jabaquara
          </motion.p>

          <h1 className="max-w-4xl font-display text-[clamp(2.4rem,7.5vw,5.2rem)] font-bold leading-[1.02] text-paper">
            <span className="block overflow-hidden">
              <motion.span className="block" {...lineReveal(0.25)}>
                Seu carro bem cuidado,
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span className="block text-gold" {...lineReveal(0.38)}>
                da mecânica ao acabamento.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg"
          >
            Mecânica, funilaria e pintura{" "}
            <strong className="font-semibold text-paper">de alto padrão</strong>,
            com atendimento direto e atenção ao que o seu veículo realmente
            precisa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href={buildWhatsAppUrl(company.whatsappMessages.default)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Solicitar avaliação
            </a>
            <a href="#servicos" className="btn-secondary text-base">
              Conhecer os serviços
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-sm text-mist"
          >
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-gold" aria-hidden="true" />
              Jabaquara — São Paulo
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} className="text-gold" aria-hidden="true" />
              {company.hoursShort}
            </span>
            <span className="flex items-center gap-2">
              <Star size={16} className="fill-gold text-gold" aria-hidden="true" />
              {company.rating.value.toLocaleString("pt-BR")} no Google ·{" "}
              {company.rating.count} avaliações
            </span>
          </motion.div>
        </motion.div>

        <motion.span
          aria-hidden="true"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-mist sm:block"
          style={reduceMotion ? {} : { opacity: cueOpacity }}
        >
          <motion.span
            className="block"
            animate={reduceMotion ? {} : { y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown size={26} aria-hidden="true" />
          </motion.span>
        </motion.span>
      </div>
    </section>
  );
}
