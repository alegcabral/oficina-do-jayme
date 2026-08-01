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
  const carX = useTransform(scrollYProgress, [0, 1], ["105vw", "-75vw"]);
  const carOpacity = useTransform(scrollYProgress, [0, 0.12, 0.85, 1], [0, 0.5, 0.5, 0]);
  const wheelRotate = useTransform(scrollYProgress, [0, 1], [0, -900]);
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
            ? "relative flex min-h-[100svh] items-center overflow-hidden pt-32 sm:pt-24"
            : "sticky top-0 flex h-screen items-center overflow-hidden pt-32 sm:pt-24"
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

        {/* Camada 2: silhueta de carro em traço dourado atravessando a cena.
            Desenho original em SVG (sem marca/modelo real), com as rodas
            girando conforme o carro avança dirigido pela rolagem. */}
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute top-[56%] w-[72vw] min-w-[480px] max-w-[1100px] -translate-y-1/2"
            style={{ x: carX, opacity: carOpacity }}
          >
            <svg
              viewBox="0 0 640 200"
              fill="none"
              className="h-auto w-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Carroceria */}
              <path
                d="M 20 148 C 34 124, 84 116, 138 112 C 184 106, 204 84, 252 76 C 306 68, 386 68, 424 82 C 462 94, 506 106, 560 116 C 600 124, 614 134, 618 148"
                stroke="rgba(212,179,116,0.9)"
                strokeWidth="2"
              />
              {/* Linha lateral de reflexo */}
              <path
                d="M 70 124 C 210 112, 420 100, 585 124"
                stroke="rgba(212,179,116,0.45)"
                strokeWidth="1.4"
              />
              {/* Base entre as caixas de roda */}
              <path d="M 20 148 L 104 148" stroke="rgba(212,179,116,0.9)" strokeWidth="2" />
              <path d="M 196 148 L 434 148" stroke="rgba(212,179,116,0.9)" strokeWidth="2" />
              <path d="M 526 148 L 618 148" stroke="rgba(212,179,116,0.9)" strokeWidth="2" />
              {/* Vidros */}
              <path
                d="M 262 84 C 306 77, 372 77, 408 88"
                stroke="rgba(212,179,116,0.5)"
                strokeWidth="1.4"
              />
              <path d="M 330 78 L 330 108" stroke="rgba(212,179,116,0.4)" strokeWidth="1.2" />
              {/* Rodas com raios girando */}
              <motion.g style={{ rotate: wheelRotate, originX: "0.5", originY: "0.5" }}>
                <circle cx="150" cy="148" r="32" stroke="rgba(212,179,116,0.9)" strokeWidth="2" />
                <circle cx="150" cy="148" r="14" stroke="rgba(212,179,116,0.6)" strokeWidth="1.4" />
                <path d="M 150 134 L 150 118 M 150 162 L 150 178 M 136 148 L 120 148 M 164 148 L 180 148" stroke="rgba(212,179,116,0.55)" strokeWidth="1.4" />
              </motion.g>
              <motion.g style={{ rotate: wheelRotate, originX: "0.5", originY: "0.5" }}>
                <circle cx="480" cy="148" r="32" stroke="rgba(212,179,116,0.9)" strokeWidth="2" />
                <circle cx="480" cy="148" r="14" stroke="rgba(212,179,116,0.6)" strokeWidth="1.4" />
                <path d="M 480 134 L 480 118 M 480 162 L 480 178 M 466 148 L 450 148 M 494 148 L 510 148" stroke="rgba(212,179,116,0.55)" strokeWidth="1.4" />
              </motion.g>
              {/* Farol e lanterna */}
              <path d="M 20 140 L 34 136" stroke="rgba(212,179,116,0.8)" strokeWidth="2" />
              <path d="M 618 140 L 604 136" stroke="rgba(212,179,116,0.8)" strokeWidth="2" />
            </svg>
          </motion.div>
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
              Jabaquara, São Paulo
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
