"use client";

import { motion } from "framer-motion";
import { SearchCheck, MessageSquare, BadgeCheck, Paintbrush } from "lucide-react";
import { company } from "@/config/company";

const icons = [SearchCheck, MessageSquare, BadgeCheck, Paintbrush];

/** Quatro pilares (Diferenciais), logo após a cena do manifesto. */
export default function TrustBar() {
  return (
    <section id="diferenciais" className="border-b border-white/10 bg-graphite">
      <div
        className="container-oj grid grid-cols-1 gap-x-8 gap-y-9 py-16 sm:grid-cols-2 lg:grid-cols-4"
        style={{ perspective: 1000 }}
      >
        {company.pillars.map((pillar, i) => {
          const Icon = icons[i % icons.length];
          return (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 26, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
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
