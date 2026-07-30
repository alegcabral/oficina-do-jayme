"use client";

import { MessageCircle, Phone, Navigation } from "lucide-react";
import { company } from "@/config/company";
import { buildWhatsAppUrl } from "@/lib/utils";

export default function MobileCTA() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 bg-ink/95 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-3">
        <a
          href={buildWhatsAppUrl(company.whatsappMessages.default)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 bg-gold py-3 text-ink"
        >
          <MessageCircle size={20} aria-hidden="true" />
          <span className="text-[0.65rem] font-semibold uppercase tracking-wide">
            WhatsApp
          </span>
        </a>
        <a
          href={`tel:${company.phoneTelHref}`}
          className="flex flex-col items-center gap-1 py-3 text-paper"
        >
          <Phone size={20} aria-hidden="true" />
          <span className="text-[0.65rem] font-semibold uppercase tracking-wide">
            Ligar
          </span>
        </a>
        <a
          href={company.mapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-3 text-paper"
        >
          <Navigation size={20} aria-hidden="true" />
          <span className="text-[0.65rem] font-semibold uppercase tracking-wide">
            Rotas
          </span>
        </a>
      </div>
    </div>
  );
}
