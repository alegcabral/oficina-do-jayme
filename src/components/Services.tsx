"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import { company } from "@/config/company";
import { services } from "@/data/services";
import { buildWhatsAppUrl, cn } from "@/lib/utils";

/**
 * Três serviços confirmados em cards editoriais assimétricos.
 * No desktop, o card de Pintura (alto padrão) recebe maior destaque.
 */
export default function Services() {
  return (
    <section id="servicos" className="bg-ink py-24">
      <div className="container-oj">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-4 max-w-2xl"
        >
          <p className="eyebrow mb-3">Serviços</p>
          <h2 className="section-title">
            Mecânica, funilaria e pintura em um só lugar.
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-14 max-w-2xl text-base leading-relaxed text-mist"
        >
          A Oficina do Jayme cuida tanto do funcionamento quanto da recuperação
          visual do seu veículo, com atenção ao diagnóstico, à execução e ao
          acabamento.
        </motion.p>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {services.map((service, i) => {
            // Layout assimétrico: pintura ocupa mais espaço
            const span =
              service.id === "pintura"
                ? "lg:col-span-12"
                : "lg:col-span-6";
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className={cn(
                  "group relative overflow-hidden rounded-sm border border-white/10 bg-graphite transition-colors hover:border-gold/50",
                  span
                )}
              >
                <div
                  className={cn(
                    "grid grid-cols-1",
                    service.id === "pintura" && "md:grid-cols-2"
                  )}
                >
                  <div className="relative aspect-[16/9] overflow-hidden md:aspect-auto md:min-h-[280px]">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/20 to-transparent md:bg-gradient-to-r" />
                    <span className="absolute left-5 top-5 font-display text-sm tracking-[0.35em] text-gold">
                      {service.eyebrow}
                    </span>
                  </div>

                  <div className="flex flex-col justify-between p-7 sm:p-9">
                    <div>
                      <h3 className="font-display text-3xl leading-tight text-paper sm:text-4xl">
                        {service.title}
                        {service.highlight && (
                          <span className="mt-1 block bg-gradient-to-r from-gold-dark via-gold to-gold-light bg-clip-text text-transparent">
                            {service.highlight}
                          </span>
                        )}
                      </h3>
                      <p className="mt-4 max-w-md text-sm leading-relaxed text-mist sm:text-base">
                        {service.description}
                      </p>
                    </div>
                    <a
                      href={buildWhatsAppUrl(company.whatsappMessages[service.whatsappKey])}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gold transition-transform group-hover:translate-x-0.5"
                    >
                      <MessageCircle size={16} aria-hidden="true" />
                      {service.cta}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
