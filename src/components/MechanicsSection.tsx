"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, Quote } from "lucide-react";
import { company } from "@/config/company";
import { buildWhatsAppUrl } from "@/lib/utils";

/** Seção de mecânica: diagnóstico antes da execução. */
export default function MechanicsSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-graphite py-24">
      {/* Linhas técnicas decorativas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,244,242,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(244,244,242,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container-oj grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(0 0 0 100%)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0 0 0 0%)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-2 aspect-[4/3] overflow-hidden rounded-sm border border-white/10 lg:order-1 lg:col-span-6"
        >
          <Image
            src={company.images.artMechanic}
            alt="Composição gráfica com círculos e linhas técnicas de diagnóstico"
            fill
            loading="lazy"
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite/60 via-transparent to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="order-1 lg:order-2 lg:col-span-6"
        >
          <p className="eyebrow mb-3">Mecânica</p>
          <h2 className="section-title">Diagnóstico antes da execução.</h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-mist">
            Antes de realizar o serviço, é importante entender corretamente o
            que o veículo precisa. Um diagnóstico coerente evita intervenções
            desnecessárias e ajuda a definir o reparo adequado.
          </p>

          <blockquote className="mt-8 flex items-start gap-3 rounded-sm border-l-2 border-gold bg-ink px-6 py-5">
            <Quote size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
            <p className="font-display text-xl uppercase tracking-wide text-paper">
              &ldquo;Só troca o que realmente precisa.&rdquo;
            </p>
          </blockquote>
          <p className="mt-2 text-xs text-mist/70">{company.rating.source}</p>

          <a
            href={buildWhatsAppUrl(company.whatsappMessages.mechanic)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-9"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Falar sobre um problema mecânico
          </a>
        </motion.div>
      </div>
    </section>
  );
}
