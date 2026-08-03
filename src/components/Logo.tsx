import Image from "next/image";
import { company } from "@/config/company";
import { cn } from "@/lib/utils";

/**
 * Logo oficial da Oficina do Jayme (emblema em formato de escudo fornecido
 * pelo cliente, com o fundo original removido — incluindo descontaminação
 * de cor para não deixar halo claro — e integrado ao grafite escuro do
 * site). Exibida sempre inteira, com object-fit: contain.
 * A arte é quase quadrada (~0.98:1) — a altura é fixada por tamanho e a
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
        ? "h-12 sm:h-14"
        : "h-16 sm:h-20"
      : size === "footer"
        ? "h-24 sm:h-28"
        : "h-32 sm:h-40";

  return (
    <span
      className={cn(
        "relative block w-auto shrink-0 transition-all duration-300",
        heightClass
      )}
      style={{ aspectRatio: "955 / 975" }}
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
