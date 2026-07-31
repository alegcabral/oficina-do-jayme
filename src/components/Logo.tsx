import Image from "next/image";
import { company } from "@/config/company";
import { cn } from "@/lib/utils";

/**
 * Logo oficial da Oficina do Jayme (emblema fornecido pelo cliente, com o
 * fundo original removido e as bordas esfumadas para integrar ao grafite
 * escuro do site). Exibida sempre inteira, com object-fit: contain.
 * A arte é um emblema largo (~2.1:1) — a altura é fixada por tamanho e a
 * largura acompanha via aspect-ratio, sem distorcer nem cortar.
 */
export default function Logo({
  compact = false,
  size = "header",
}: {
  compact?: boolean;
  size?: "header" | "footer" | "large";
}) {
  const heightClass =
    size === "header"
      ? compact
        ? "h-10 sm:h-11"
        : "h-12 sm:h-14"
      : size === "footer"
        ? "h-20 sm:h-24"
        : "h-28 sm:h-32";

  return (
    <span
      className={cn(
        "relative block w-auto shrink-0 transition-all duration-300",
        heightClass
      )}
      style={{ aspectRatio: "1082 / 516" }}
    >
      <Image
        src={company.images.logo}
        alt="Logo da Oficina do Jayme"
        fill
        sizes="260px"
        className="object-contain"
        priority={size === "header"}
      />
    </span>
  );
}
