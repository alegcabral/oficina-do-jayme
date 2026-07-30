import Image from "next/image";
import { company } from "@/config/company";
import { cn } from "@/lib/utils";

/**
 * Logo oficial da Oficina do Jayme (arte fornecida pelo cliente, com bordas
 * esfumadas para integrar ao fundo escuro do site).
 * - header: variante horizontal com o bloco de texto (legível em altura pequena)
 * - footer / large: arte completa com o automóvel
 * Sempre exibida inteira, com object-fit: contain.
 */
export default function Logo({
  compact = false,
  size = "header",
}: {
  compact?: boolean;
  size?: "header" | "footer" | "large";
}) {
  const isHeader = size === "header";
  const src = isHeader ? company.images.logoHeader : company.images.logo;

  const dims = isHeader
    ? compact
      ? "h-11 w-[5.2rem]"
      : "h-14 w-[6.5rem] sm:h-16 sm:w-[7.4rem]"
    : size === "footer"
      ? "h-40 w-36"
      : "h-52 w-44";

  return (
    <span className={cn("relative block shrink-0 transition-all duration-300", dims)}>
      <Image
        src={src}
        alt="Logo da Oficina do Jayme"
        fill
        sizes={isHeader ? "120px" : "180px"}
        className="object-contain"
        priority={isHeader}
      />
    </span>
  );
}
