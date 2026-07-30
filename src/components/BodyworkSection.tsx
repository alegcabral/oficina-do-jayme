"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { company } from "@/config/company";
import { buildWhatsAppUrl } from "@/lib/utils";

/** Seção editorial de funilaria e pintura, com fotos reais do processo. */
export default function BodyworkSection() {
  return (
    <section className="relative overflow-hidden bg-ink py-24">
      <div className="container-oj grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5"
        >
          <p className="eyebrow mb-3">Funilaria e pintura</p>
          <h2 className="section-title">Recuperar não é apenas esconder o dano.</h2>
          <p className="mt-5 text-base leading-relaxed text-mist">
            Um bom reparo exige atenção ao alinhamento, à preparação da
            superfície, à tonalidade e ao acabamento. Cada etapa influencia
            diretamente o resultado final.
          </p>

          <a
            href={buildWhatsAppUrl(company.whatsappMessages.bodyworkAndPaint)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-9"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Solicitar avaliação de funilaria e pintura
          </a>
        </motion.div>

        {/* Composição assimétrica com duas fotos reais */}
        <div className="relative lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[16/10] overflow-hidden rounded-sm border border-gold/25"
          >
            <Image
              src={company.images.painting}
              alt="Profissional realizando pintura automotiva na Oficina do Jayme"
              fill
              loading="lazy"
              className="object-cover"
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="absolute -bottom-8 -left-4 hidden w-52 overflow-hidden rounded-sm border border-white/15 shadow-2xl sm:block lg:-left-8 lg:w-64"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={company.images.sprayGun}
                alt="Pistola de pintura utilizada no processo"
                fill
                loading="lazy"
                className="object-cover"
                sizes="256px"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
