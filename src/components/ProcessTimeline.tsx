"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/** Processo de atendimento em 6 etapas, com linha de progresso na rolagem. */

const steps = [
  {
    title: "Primeiro contato",
    text: "O cliente explica o problema e informa o veículo.",
  },
  {
    title: "Envio de fotos",
    text: "Quando aplicável, as imagens ajudam em uma avaliação inicial.",
  },
  {
    title: "Avaliação do veículo",
    text: "A oficina analisa o problema e identifica o serviço necessário.",
  },
  {
    title: "Orçamento",
    text: "As informações sobre o serviço são apresentadas antes da execução.",
  },
  {
    title: "Realização do serviço",
    text: "O trabalho é executado de acordo com o que foi avaliado.",
  },
  {
    title: "Entrega",
    text: "O veículo é entregue após a conclusão do serviço.",
  },
];

export default function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.6"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section className="bg-ink py-24">
      <div className="container-oj">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="eyebrow mb-3">Processo de atendimento</p>
          <h2 className="section-title">Do primeiro contato à avaliação do veículo.</h2>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Linha base + linha de progresso animada pela rolagem */}
          <div
            aria-hidden="true"
            className="absolute bottom-4 left-[1.4rem] top-4 w-px bg-white/10 sm:left-1/2"
          />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-4 left-[1.4rem] top-4 w-px origin-top bg-gold sm:left-1/2"
            style={{ scaleY: reduceMotion ? 1 : progress }}
          />

          <ol className="flex flex-col gap-12">
            {steps.map((step, i) => {
              const even = i % 2 === 0;
              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className={`relative flex items-start gap-6 pl-14 sm:w-1/2 sm:pl-0 ${
                    even
                      ? "sm:mr-auto sm:flex-row-reverse sm:pr-14 sm:text-right"
                      : "sm:ml-auto sm:pl-14"
                  }`}
                >
                  <span
                    className={`absolute left-0 flex h-11 w-11 items-center justify-center rounded-full border border-gold bg-ink font-display text-lg text-gold sm:left-auto ${
                      even ? "sm:-right-[1.4rem]" : "sm:-left-[1.4rem]"
                    }`}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl tracking-wide text-paper">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-mist">{step.text}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <p className="mx-auto mt-16 max-w-2xl rounded-sm border border-gold/30 bg-graphite p-5 text-center text-sm text-mist">
          A análise por fotos é inicial. O orçamento definitivo pode depender de
          uma avaliação presencial.
        </p>
      </div>
    </section>
  );
}
