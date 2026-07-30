"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { company } from "@/config/company";
import { buildWhatsAppUrl, cn } from "@/lib/utils";
import Logo from "@/components/Logo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloqueia rolagem com o menu aberto e permite fechar com Escape
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-graphite/90 py-1.5 shadow-[0_1px_0_0_rgba(185,146,74,0.25)] backdrop-blur-md"
          : "bg-gradient-to-b from-ink/80 to-transparent py-3"
      )}
    >
      <div className="container-oj flex items-center justify-between">
        <a
          href="#inicio"
          aria-label={`${company.name} — voltar ao início`}
          className="flex items-center"
        >
          <Logo compact={scrolled} />
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-7 xl:flex">
          {company.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium uppercase tracking-wide text-mist transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden xl:block">
          <a
            href={buildWhatsAppUrl(company.whatsappMessages.default)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Pedir orçamento
          </a>
        </div>

        <button
          type="button"
          className="p-2 text-paper xl:hidden"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-ink xl:hidden"
          >
            <nav aria-label="Navegação móvel" className="container-oj flex flex-col gap-1 py-4">
              {company.nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.2 }}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-sm px-2 py-3 text-lg font-medium uppercase tracking-wide text-paper transition-colors hover:bg-white/5 hover:text-gold"
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href={buildWhatsAppUrl(company.whatsappMessages.default)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="btn-primary mt-3 w-full"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Pedir orçamento
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
