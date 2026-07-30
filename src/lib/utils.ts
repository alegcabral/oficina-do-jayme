import { company } from "@/config/company";

/** Junta classes condicionalmente (substituto leve para clsx). */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Monta a URL do WhatsApp (wa.me) com a mensagem já codificada.
 * Sempre usar esta função para criar links de WhatsApp no site,
 * assim garantimos que o número e a codificação estão sempre corretos.
 */
export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${company.phoneRaw}?text=${encoded}`;
}

/** Aplica máscara de telefone brasileiro (celular) enquanto o usuário digita. */
export function maskPhoneBR(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const len = digits.length;

  if (len === 0) return "";
  if (len <= 2) return `(${digits}`;
  if (len <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (len <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/** Valida se um telefone brasileiro digitado tem 10 ou 11 dígitos. */
export function isValidPhoneBR(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10 || digits.length === 11;
}
