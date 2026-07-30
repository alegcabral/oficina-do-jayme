"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, Navigation, Phone, MapPin, Clock } from "lucide-react";
import { company } from "@/config/company";
import { buildWhatsAppUrl } from "@/lib/utils";
import Logo from "@/components/Logo";

/** CTA final cinematográfico sobre fotografia real com iluminação dourada. */
export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-y border-gold/20 bg-ink py-28">
      <div className="absolute inset-0">
        <Image
          src={company.images.sprayGun}
          alt=""
          role="presentation"
          fill
          loading="lazy"
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 40%, rgba(185,146,74,0.14) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container-oj relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <Logo size="large" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 max-w-2xl font-display text-[clamp(2rem,6vw,3.6rem)] leading-[1.05] text-paper"
        >
          Seu carro precisa de <span className="text-gold">atenção?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-4 max-w-lg text-base text-mist"
        >
          Explique o problema e envie fotos pelo WhatsApp para iniciar uma
          avaliação.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-9 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href={buildWhatsAppUrl(company.whatsappMessages.photos)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Falar com a Oficina do Jayme
          </a>
          <a
            href={company.mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-base"
          >
            <Navigation size={20} aria-hidden="true" />
            Traçar rota
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-mist"
        >
          <span className="flex items-center gap-2">
            <Phone size={15} className="text-gold" aria-hidden="true" />
            {company.phoneDisplay}
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={15} className="text-gold" aria-hidden="true" />
            {company.address.street} — {company.address.neighborhood}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={15} className="text-gold" aria-hidden="true" />
            {company.hoursShort}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
