"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wrench, CarFront, Paintbrush, Sparkles, HelpCircle, MessageCircle } from "lucide-react";
import { company } from "@/config/company";
import { buildWhatsAppUrl, cn } from "@/lib/utils";

/**
 * "O que aconteceu com o seu veículo?" — orienta o primeiro contato.
 * Não fornece diagnóstico automático; apenas direciona a conversa no WhatsApp.
 */

interface Option {
  id: string;
  label: string;
  icon: typeof Wrench;
  guidance: string;
  buttonLabel: string;
  whatsappKey: keyof typeof company.whatsappMessages;
}

const options: Option[] = [
  {
    id: "mecanico",
    label: "Problema mecânico",
    icon: Wrench,
    guidance:
      "Conte o que o veículo está apresentando pelo WhatsApp. A avaliação mecânica identifica o que realmente precisa ser feito antes de qualquer serviço.",
    buttonLabel: "Solicitar avaliação mecânica",
    whatsappKey: "mechanic",
  },
  {
    id: "batida",
    label: "Batida ou amassado",
    icon: CarFront,
    guidance:
      "Envie fotos pelo WhatsApp para uma avaliação inicial. Dependendo do dano, será necessário analisar o veículo presencialmente.",
    buttonLabel: "Enviar fotos pelo WhatsApp",
    whatsappKey: "bodywork",
  },
  {
    id: "pintura",
    label: "Dano na pintura",
    icon: Paintbrush,
    guidance:
      "Riscos, desgaste ou diferenças de tonalidade podem ser avaliados a partir de fotos. A oficina confirma o serviço adequado após analisar o veículo.",
    buttonLabel: "Solicitar avaliação de pintura",
    whatsappKey: "paint",
  },
  {
    id: "acabamento",
    label: "Preciso recuperar o acabamento",
    icon: Sparkles,
    guidance:
      "Explique como está o veículo e envie fotos pelo WhatsApp. A avaliação indica o que pode ser feito para recuperar o acabamento.",
    buttonLabel: "Falar sobre o acabamento",
    whatsappKey: "bodyworkAndPaint",
  },
  {
    id: "nao-sei",
    label: "Ainda não sei identificar",
    icon: HelpCircle,
    guidance:
      "Sem problema. Descreva o que você percebeu no veículo e a oficina orienta os próximos passos a partir da conversa.",
    buttonLabel: "Iniciar conversa no WhatsApp",
    whatsappKey: "unsure",
  },
];

export default function ServiceSelector() {
  const [selected, setSelected] = useState<Option>(options[0]);

  return (
    <section className="border-y border-white/10 bg-graphite py-24">
      <div className="container-oj">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <p className="eyebrow mb-3">Comece por aqui</p>
          <h2 className="section-title">O que aconteceu com o seu veículo?</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div
            role="tablist"
            aria-label="Selecione a situação do seu veículo"
            className="flex flex-col gap-2.5"
          >
            {options.map((option) => {
              const Icon = option.icon;
              const active = selected.id === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="selector-panel"
                  onClick={() => setSelected(option)}
                  className={cn(
                    "flex items-center gap-4 rounded-sm border px-5 py-4 text-left transition-all duration-200",
                    active
                      ? "border-gold bg-gold/10 text-paper"
                      : "border-white/10 bg-ink text-mist hover:border-gold/40 hover:text-paper"
                  )}
                >
                  <Icon
                    size={20}
                    aria-hidden="true"
                    className={active ? "text-gold" : "text-mist"}
                  />
                  <span className="font-display text-lg uppercase tracking-wide">
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="selector-panel"
            role="tabpanel"
            className="flex flex-col justify-between rounded-sm border border-white/10 bg-ink p-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="font-display text-2xl tracking-wide text-gold">
                  {selected.label}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-mist">
                  {selected.guidance}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8">
              <a
                href={buildWhatsAppUrl(company.whatsappMessages[selected.whatsappKey])}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto"
              >
                <MessageCircle size={18} aria-hidden="true" />
                {selected.buttonLabel}
              </a>
              <p className="mt-4 text-xs text-mist/70">
                A avaliação começa pela conversa. O diagnóstico é confirmado pela
                oficina, não pelo site.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
