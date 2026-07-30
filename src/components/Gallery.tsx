"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryCategories, galleryItems, GalleryCategory } from "@/config/gallery";
import { cn } from "@/lib/utils";

/**
 * Galeria editorial com filtros, modal acessível (Escape, setas do teclado,
 * gestos de toque) e carregamento progressivo das imagens.
 */
export default function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory | "Todos">("Todos");
  const [active, setActive] = useState<number | null>(null);

  const filtered =
    filter === "Todos"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((a) => (a === null ? a : (a + 1) % filtered.length)),
    [filtered.length]
  );
  const prev = useCallback(
    () => setActive((a) => (a === null ? a : (a - 1 + filtered.length) % filtered.length)),
    [filtered.length]
  );

  // Teclado no modal: Escape fecha, setas navegam
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, next, prev]);

  return (
    <section id="trabalhos" className="bg-ink py-24">
      <div className="container-oj">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-2xl"
        >
          <p className="eyebrow mb-3">Trabalhos</p>
          <h2 className="section-title">A oficina no dia a dia</h2>
        </motion.div>

        <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filtrar galeria por categoria">
          {(["Todos", ...galleryCategories] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={filter === cat}
              onClick={() => {
                setFilter(cat);
                setActive(null);
              }}
              className={cn(
                "rounded-sm border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors",
                filter === cat
                  ? "border-gold bg-gold text-ink"
                  : "border-white/15 text-mist hover:border-gold/50 hover:text-gold"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Layout editorial: itens "wide" ocupam 2 colunas */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.button
                key={item.id}
                layout
                type="button"
                onClick={() => setActive(i)}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className={cn(
                  "group relative overflow-hidden rounded-sm border border-white/10 text-left",
                  item.wide ? "col-span-2 aspect-[2/1]" : "aspect-square"
                )}
                aria-label={`Ampliar imagem: ${item.title}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
                {item.placeholder && (
                  <span className="absolute bottom-2 left-2 rounded-sm bg-ink/80 px-2 py-1 text-[0.65rem] uppercase tracking-wide text-gold">
                    Placeholder
                  </span>
                )}
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 via-transparent to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="text-xs font-medium text-paper">{item.title}</span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {active !== null && filtered[active] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4"
            role="dialog"
            aria-modal="true"
            aria-label={filtered[active].title}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Fechar visualização"
              className="absolute right-5 top-5 z-10 text-paper transition-colors hover:text-gold"
            >
              <X size={30} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Imagem anterior"
              className="absolute left-3 z-10 hidden text-paper transition-colors hover:text-gold sm:block"
            >
              <ChevronLeft size={34} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Próxima imagem"
              className="absolute right-3 z-10 hidden text-paper transition-colors hover:text-gold sm:block"
            >
              <ChevronRight size={34} aria-hidden="true" />
            </button>

            <motion.div
              key={filtered[active].id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-sm border border-gold/30"
            >
              <Image
                src={filtered[active].image}
                alt={filtered[active].title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
            <p className="pointer-events-none absolute bottom-7 px-8 text-center text-sm text-mist">
              {filtered[active].title}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
