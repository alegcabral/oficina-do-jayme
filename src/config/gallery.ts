// ============================================================================
// CONFIGURAÇÃO DA GALERIA DE TRABALHOS
// ============================================================================
// Para adicionar um novo trabalho REAL: coloque a foto em public/images/ e
// crie um item abaixo com categoria válida, descrição NEUTRA (sem inventar
// modelo, prazo, preço ou resultado) e placeholder: false.
// Itens com placeholder: true usam artes ilustrativas da marca e exibem o
// selo "Ilustrativa" — substitua por fotos reais assim que existirem.
// ============================================================================

export type GalleryCategory = "Mecânica" | "Funilaria" | "Pintura" | "Oficina";

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  title: string;
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
    id: "oficina-fachada",
    category: "Oficina",
    title: "Fachada da Oficina do Jayme, no Jabaquara",
    image: "/images/facade-real.webp",
    placeholder: false,
    wide: true,
  },
  {
    id: "pintura-illus",
    category: "Pintura",
    title: "Imagem ilustrativa (substituir por foto real de pintura)",
    image: "/images/illus-pintura.webp",
    placeholder: true,
  },
  {
    id: "funilaria-illus",
    category: "Funilaria",
    title: "Imagem ilustrativa (substituir por foto real de funilaria)",
    image: "/images/illus-funilaria.webp",
    placeholder: true,
  },
  {
    id: "mecanica-illus",
    category: "Mecânica",
    title: "Imagem ilustrativa (substituir por foto real de mecânica)",
    image: "/images/illus-mecanica.webp",
    placeholder: true,
  },
  {
    id: "oficina-illus",
    category: "Oficina",
    title: "Imagem ilustrativa (substituir por foto real da estrutura)",
    image: "/images/illus-oficina.webp",
    placeholder: true,
    wide: true,
  },
];
