"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, MapPin, Star, Clock, ChevronDown } from "lucide-react";
import Image from "next/image";
import { company } from "@/config/company";
import { buildWhatsAppUrl } from "@/lib/utils";

/**
 * Hero cinematográfico em camadas: foto real + overlays + textura + tipografia.
 * O título é revelado por linhas com máscara (overflow-hidden + translateY).
 * Para usar vídeo no lugar da foto, ver instruções em IMAGENS.md.
 */
export default function Hero() {
  const reduceMotion = useReducedMotion();

  const lineReveal = (delay: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { y: "110%" },
    animate: reduceMotion ? { opacity: 1 } : { y: "0%" },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink"
    >
      {/* Camada 1: fotografia real com zoom muito suave */}
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? {} : { scale: 1.08 }}
        animate={reduceMotion ? {} : { scale: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
      >
        <Image
          src={company.images.heroBackground}
          alt=""
          role="presentation"
          fill
          priority
          className="object-cover opacity-45"
          sizes="100vw"
        />
      </motion.div>

      {/* Camada 2: overlays de leitura e profundidade */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/20 to-ink/60" />

      {/* Camada 3: linhas técnicas discretas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,244,242,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(244,244,242,0.6) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />

      {/* Linha dourada de entrada */}
      <motion.div
        aria-hidden="true"
        className="absolute left-0 top-1/2 h-px w-full bg-gold-line"
        initial={reduceMotion ? { opacity: 0 } : { scaleX: 0, opacity: 0.9 }}
        animate={reduceMotion ? { opacity: 0 } : { scaleX: 1, opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        style={{ transformOrigin: "left" }}
      />

      <div className="container-oj relative z-10 pb-24 pt-32">
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
          <strong className="font-semibold text-paper">de alto padrão</strong>, com
          atendimento direto e atenção ao que o seu veículo realmente precisa.
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
      </div>

      {/* Indicação de rolagem */}
      <motion.a
        href="#diferenciais"
        aria-label="Rolar para a próxima seção"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-mist transition-colors hover:text-gold sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        <motion.span
          className="block"
          animate={reduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={26} aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
}
