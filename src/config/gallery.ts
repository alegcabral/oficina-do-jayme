// ============================================================================
// CONFIGURAÇÃO DA GALERIA DE TRABALHOS
// ============================================================================
// Para adicionar um novo trabalho: coloque a foto em public/images/ e crie um
// novo item abaixo com categoria válida e descrição NEUTRA (sem inventar
// modelo, prazo, preço ou resultado). Itens com placeholder: true exibem selo
// "Placeholder" e devem ser substituídos por fotos reais.
// ============================================================================

export type GalleryCategory = "Mecânica" | "Funilaria" | "Pintura" | "Oficina";

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  title: string; // descrição neutra e verdadeira
  image: string;
  placeholder: boolean;
  wide?: boolean; // ocupa 2 colunas no layout editorial
}

export const galleryCategories: GalleryCategory[] = [
  "Mecânica",
  "Funilaria",
  "Pintura",
  "Oficina",
];

export const galleryItems: GalleryItem[] = [
  {
    id: "pintura-01",
    category: "Pintura",
    title: "Processo de pintura automotiva na Oficina do Jayme",
    image: "/images/painting-real.webp",
    placeholder: false,
    wide: true,
  },
  {
    id: "pintura-02",
    category: "Pintura",
    title: "Etapa de trabalho realizada na oficina",
    image: "/images/spray-gun-real.webp",
    placeholder: false,
  },
  {
    id: "oficina-01",
    category: "Oficina",
    title: "Imagem da estrutura da Oficina do Jayme",
    image: "/images/tools-real.webp",
    placeholder: false,
  },
  {
    id: "oficina-02",
    category: "Oficina",
    title: "Fachada da Oficina do Jayme, no Jabaquara",
    image: "/images/facade-real.webp",
    placeholder: false,
    wide: true,
  },
  {
    id: "funilaria-01",
    category: "Funilaria",
    title: "Imagem ilustrativa — substituir por foto real de funilaria",
    image: "/images/illus-funilaria.webp",
    placeholder: true,
  },
  {
    id: "mecanica-01",
    category: "Mecânica",
    title: "Imagem ilustrativa — substituir por foto real de mecânica",
    image: "/images/illus-mecanica.webp",
    placeholder: true,
  },
];
