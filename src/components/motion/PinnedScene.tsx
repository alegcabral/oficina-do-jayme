"use client";

import { ReactNode, useRef } from "react";
import { MotionValue, useScroll } from "framer-motion";

/**
 * Cena "pinada": o contêiner tem altura maior que a tela e o conteúdo fica
 * preso (sticky) enquanto o usuário rola. O progresso da rolagem (0 a 1)
 * é entregue ao conteúdo para dirigir as animações — efeito de vídeo
 * controlado pelo scroll, sem sequestrar a rolagem nativa.
 */
export default function PinnedScene({
  heightVh = 300,
  className,
  children,
}: {
  heightVh?: number;
  className?: string;
  children: (progress: MotionValue<number>) => ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} style={{ height: `${heightVh}vh` }} className={className}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {children(scrollYProgress)}
      </div>
    </div>
  );
}
