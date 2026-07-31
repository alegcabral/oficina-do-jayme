"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Phone, MessageCircle, Navigation, Instagram, ExternalLink, Map } from "lucide-react";
import { company } from "@/config/company";
import { buildWhatsAppUrl } from "@/lib/utils";

/**
 * Seção de localização. O mapa do Google só é carregado após interação
 * (clique em "Carregar mapa") para não pesar o carregamento inicial.
 */
export default function Location() {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section id="localizacao" className="border-t border-white/10 bg-graphite py-24">
      <div className="container-oj">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <p className="eyebrow mb-3">Localização</p>
          <h2 className="section-title">
            No Jabaquara, Zona Sul de São Paulo
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4 lg:col-span-3"
          >
            {/* Mapa sob demanda */}
            <div className="relative h-[340px] overflow-hidden rounded-sm border border-white/10 lg:h-[400px]">
              {mapLoaded ? (
                <iframe
                  title={`Mapa com a localização da ${company.name}`}
                  src={company.mapsEmbedUrl}
                  className="h-full w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setMapLoaded(true)}
                  className="group flex h-full w-full flex-col items-center justify-center gap-3 bg-ink text-mist transition-colors hover:text-gold"
                  aria-label="Carregar o mapa do Google com a localização da oficina"
                >
                  <Map size={36} aria-hidden="true" className="text-gold" />
                  <span className="text-sm font-semibold uppercase tracking-wide">
                    Carregar mapa
                  </span>
                  <span className="max-w-xs text-center text-xs text-mist/70">
                    O mapa do Google é carregado apenas quando você precisar,
                    para manter o site rápido.
                  </span>
                </button>
              )}
            </div>

            <div className="relative aspect-[16/7] overflow-hidden rounded-sm border border-white/10">
              <Image
                src={company.images.facade}
                alt="Composição gráfica ilustrativa representando a fachada da oficina"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
              <span className="absolute bottom-3 left-3 rounded-sm bg-ink/80 px-2.5 py-1 text-[0.65rem] uppercase tracking-wide text-gold">
                Ilustrativa — foto real em breve
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-between gap-8 rounded-sm border border-white/10 bg-ink p-7 lg:col-span-2"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-paper">Endereço</p>
                  <p className="mt-1 text-sm leading-relaxed text-mist">
                    {company.address.street}
                    <br />
                    {company.address.neighborhood}
                    <br />
                    {company.address.city} – {company.address.state}
                    <br />
                    CEP {company.address.zip}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-paper">Horário de atendimento</p>
                <ul className="flex flex-col gap-1 text-sm text-mist">
                  {company.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-4">
                      <span>{h.day}</span>
                      <span className={h.open ? "text-paper" : "text-mist/50"}>{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-gold" aria-hidden="true" />
                <span className="text-sm text-mist">{company.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-3">
                <Instagram size={18} className="shrink-0 text-gold" aria-hidden="true" />
                <span className="text-sm text-mist">{company.instagramHandle}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a href={company.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full">
                <Navigation size={17} aria-hidden="true" />
                Traçar rota
              </a>
              <a href={company.mapsPlaceUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full">
                <ExternalLink size={17} aria-hidden="true" />
                Abrir no Google Maps
              </a>
              <a href={`tel:${company.phoneTelHref}`} className="btn-secondary w-full">
                <Phone size={17} aria-hidden="true" />
                Ligar agora
              </a>
              <a href={company.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full">
                <Instagram size={17} aria-hidden="true" />
                Abrir Instagram
              </a>
              <a
                href={buildWhatsAppUrl(company.whatsappMessages.default)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full"
              >
                <MessageCircle size={17} aria-hidden="true" />
                Chamar no WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
