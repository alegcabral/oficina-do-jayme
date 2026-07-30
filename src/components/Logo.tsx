import Image from "next/image";
import { company } from "@/config/company";
import { cn } from "@/lib/utils";

/**
 * Logo OFICIAL da Oficina do Jayme (imagem fornecida pelo cliente).
 * Não redesenhar, não cortar, não duplicar o nome em texto ao lado.
 * A imagem usa object-fit: contain e é exibida por inteiro.
 */
export default function Logo({
  compact = false,
  size = "header",
}: {
  compact?: boolean;
  size?: "header" | "footer" | "large";
}) {
  const dims =
    size === "footer"
      ? "h-28 w-28"
      : size === "large"
        ? "h-36 w-36"
        : compact
          ? "h-12 w-12"
          : "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]";

  return (
    <span className={cn("relative block shrink-0 transition-all duration-300", dims)}>
      <Image
        src={company.images.logo}
        alt="Logo da Oficina do Jayme"
        fill
        sizes="160px"
        className="object-contain"
        priority={size === "header"}
      />
    </span>
  );
}
