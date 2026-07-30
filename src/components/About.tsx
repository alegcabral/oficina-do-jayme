"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { company } from "@/config/company";

export default function About() {
  return (
    <section id="sobre" className="bg-ink py-24">
      <div className="container-oj grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-2 lg:order-1 lg:col-span-6"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-white/10">
            <Image
              src={company.images.facade}
              alt={`Fachada real da ${company.name}, no Jabaquara`}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs uppercase tracking-wide text-mist">
            <MapPin size={14} className="text-gold" aria-hidden="true" />
            {company.address.street} — {company.address.neighborhood}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="order-1 lg:order-2 lg:col-span-6"
        >
          <p className="eyebrow mb-3">Sobre a oficina</p>
          <h2 className="section-title">{company.about.title}</h2>
          <div className="mt-6 flex flex-col gap-4">
            {company.about.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-mist">{p}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
