"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion, useTransform } from "framer-motion";

/** Processo de atendimento em 6 etapas, com linha de progresso na rolagem
 * e um pequeno carro que desce pela linha marcando o avanço. */

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

          {/* Pequeno carro descendo pela linha conforme o progresso */}
          {!reduceMotion && <TimelineCar progress={progress} />}

          <ol className="flex flex-col gap-12">
            {steps.map((step, i) => {
              const leftSide = i % 2 === 0;
              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="relative sm:w-1/2 sm:min-h-[3rem]"
                  style={
                    leftSide
                      ? { marginRight: "auto" }
                      : { marginLeft: "auto" }
                  }
                >
                  {/* Número: no mobile fica à esquerda; no desktop, sobre a
                      linha central (à direita do bloco esquerdo, à esquerda
                      do bloco direito). Sem classes conflitantes de left/right. */}
                  <span
                    aria-hidden="true"
                    className={
                      "absolute top-0 flex h-11 w-11 items-center justify-center rounded-full border border-gold bg-ink font-display text-lg text-gold " +
                      (leftSide
                        ? "left-0 sm:left-auto sm:-right-[1.375rem]"
                        : "left-0 sm:-left-[1.375rem]")
                    }
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div
                    className={
                      "pl-16 " +
                      (leftSide
                        ? "sm:pl-0 sm:pr-16 sm:text-right"
                        : "sm:pl-16")
                    }
                  >
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

/**
 * Carro pequeno que percorre a linha vertical do processo, do topo (1rem)
 * até a base (1rem antes do fim), seguindo o mesmo valor de progresso da
 * rolagem que preenche a linha dourada. Alinhado ao mesmo eixo da linha
 * (left-[1.4rem] no celular, centro no desktop).
 */
function TimelineCar({ progress }: { progress: import("framer-motion").MotionValue<number> }) {
  // 1rem a calc(100% - 1rem), na MESMA base de altura da linha (top-4/bottom-4).
  const top = useTransform(progress, [0, 1], ["1rem", "calc(100% - 1rem)"]);
  const wheelRotate = useTransform(progress, [0, 1], [0, 620]);

  return (
    // "inset-y-0" dá altura real (100% do contêiner da timeline) a este
    // elemento-âncora — sem isso, o "top" em porcentagem do carro era
    // calculado contra uma altura zero e ele não percorria a linha inteira.
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-[1.4rem] z-10 sm:left-1/2"
    >
      <motion.div
        className="absolute left-0"
        style={{ top, x: "-50%", y: "-50%" }}
      >
        <svg
          viewBox="0 0 64 28"
          className="h-6 w-14 drop-shadow-[0_0_6px_rgba(212,179,116,0.5)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 3 20 C 5 13, 12 11, 18 11 C 21 7, 27 5, 36 5 C 44 5, 50 8, 54 12 C 58 13, 61 15, 61 20"
            stroke="#d4b374"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M 3 20 L 12 20" stroke="#d4b374" strokeWidth="2" strokeLinecap="round" />
          <path d="M 24 20 L 40 20" stroke="#d4b374" strokeWidth="2" strokeLinecap="round" />
          <path d="M 52 20 L 61 20" stroke="#d4b374" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M 22 11 C 27 8, 33 8, 37 11"
            stroke="#d4b374"
            strokeOpacity="0.6"
            strokeWidth="1.3"
          />
          <circle cx="18" cy="20" r="5.5" fill="#0a0a0b" stroke="#d4b374" strokeWidth="2" />
          <circle cx="46" cy="20" r="5.5" fill="#0a0a0b" stroke="#d4b374" strokeWidth="2" />
          <motion.path
            d="M 18 15.5 L 18 24.5 M 13.5 20 L 22.5 20"
            stroke="#d4b374"
            strokeWidth="1.2"
            style={{ rotate: wheelRotate, transformBox: "fill-box", transformOrigin: "center" }}
          />
          <motion.path
            d="M 46 15.5 L 46 24.5 M 41.5 20 L 50.5 20"
            stroke="#d4b374"
            strokeWidth="1.2"
            style={{ rotate: wheelRotate, transformBox: "fill-box", transformOrigin: "center" }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
