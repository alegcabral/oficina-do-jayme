"use client";

import Image from "next/image";
import {
  motion,
  MotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import PinnedScene from "@/components/motion/PinnedScene";
import { company } from "@/config/company";
import { services, Service } from "@/data/services";
import { buildWhatsAppUrl } from "@/lib/utils";

/**
 * Deck de serviços "scrollytelling": três painéis em tela cheia que se
 * sobrepõem um ao outro conforme a rolagem avança, como cenas de um vídeo.
 * Com prefers-reduced-motion (ou leitores de tela), os três painéis são
 * renderizados como seções normais empilhadas — todo o conteúdo permanece
 * na ordem do documento e acessível.
 */
export default function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="servicos" className="bg-ink">
      <div className="container-oj pb-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="eyebrow mb-3">Serviços</p>
          <h2 className="section-title">
            Mecânica, funilaria e pintura em um só lugar.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-mist">
            A Oficina do Jayme cuida tanto do funcionamento quanto da
            recuperação visual do seu veículo, com atenção ao diagnóstico, à
            execução e ao acabamento.
          </p>
        </motion.div>
      </div>

      {reduceMotion ? (
        <div className="flex flex-col">
          {services.map((service, i) => (
            <StaticPanel key={service.id} service={service} index={i} />
          ))}
        </div>
      ) : (
        <PinnedScene heightVh={100 * (services.length + 1)}>
          {(progress) => (
            <div className="relative h-full">
              {services.map((service, i) => (
                <DeckPanel
                  key={service.id}
                  service={service}
                  index={i}
                  total={services.length}
                  progress={progress}
                />
              ))}
            </div>
          )}
        </PinnedScene>
      )}
    </section>
  );
}

function PanelContent({ service, index }: { service: Service; index: number }) {
  return (
    <div className="container-oj relative z-10 flex h-full flex-col justify-end pb-[16vh] pt-28 sm:justify-center sm:pb-0">
      <span className="font-display text-sm tracking-[0.35em] text-gold">
        {String(index + 1).padStart(2, "0")} / 03
      </span>
      <h3 className="mt-4 font-display text-[clamp(2.6rem,8vw,5.5rem)] font-bold leading-[0.95] text-paper">
        {service.title}
        {service.highlight && (
          <span className="block bg-gradient-to-r from-gold-dark via-gold to-gold-light bg-clip-text text-transparent">
            {service.highlight}
          </span>
        )}
      </h3>
      <p className="mt-5 max-w-md text-base leading-relaxed text-mist sm:text-lg">
        {service.description}
      </p>
      <div className="mt-8">
        <a
          href={buildWhatsAppUrl(company.whatsappMessages[service.whatsappKey])}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          <MessageCircle size={18} aria-hidden="true" />
          {service.cta}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

function PanelBackground({ service }: { service: Service }) {
  return (
    <>
      <Image
        src={service.image}
        alt={service.imageAlt}
        fill
        loading="lazy"
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-ink/30" />
    </>
  );
}

function DeckPanel({
  service,
  index,
  total,
  progress,
}: {
  service: Service;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Painel i entra durante o trecho [(i-1)/total, i/total] da rolagem
  const enterStart = (index - 1) / total;
  const enterEnd = index / total;
  const exitStart = index / total;
  const exitEnd = (index + 1) / total;

  const y = useTransform(
    progress,
    [Math.max(0, enterStart), Math.max(0.0001, enterEnd)],
    index === 0 ? ["0%", "0%"] : ["100%", "0%"]
  );
  const scale = useTransform(progress, [exitStart, exitEnd], [1, 0.94]);
  const dim = useTransform(progress, [exitStart, exitEnd], [1, 0.45]);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden border-t border-gold/20 bg-ink"
      style={{ y, zIndex: index }}
    >
      <motion.div
        className="relative h-full w-full"
        style={index < total - 1 ? { scale, opacity: dim } : {}}
      >
        <PanelBackground service={service} />
        <PanelContent service={service} index={index} />
      </motion.div>
    </motion.div>
  );
}

function StaticPanel({ service, index }: { service: Service; index: number }) {
  return (
    <div className="relative min-h-[85vh] overflow-hidden border-t border-gold/20">
      <PanelBackground service={service} />
      <PanelContent service={service} index={index} />
    </div>
  );
}
