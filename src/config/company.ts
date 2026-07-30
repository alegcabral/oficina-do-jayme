// ============================================================================
// CONFIGURAÇÃO CENTRAL DA OFICINA DO JAYME
// ============================================================================
// ÚNICO lugar para editar telefone, endereço, horário, textos, mensagens,
// links e SEO. Nenhum componente repete esses dados.
// ============================================================================

export const company = {
  name: "Oficina do Jayme",
  tagline: "Mecânica, funilaria e pintura de alto padrão",

  proposition:
    "Mecânica, funilaria e pintura de alto padrão no Jabaquara, com atendimento direto, diagnóstico transparente e atenção em cada etapa do serviço.",

  // ---------------------------------------------------------------------
  // CONTATO — alterar telefone aqui reflete em todo o site
  // ---------------------------------------------------------------------
  phoneDisplay: "(11) 98294-2318",
  phoneRaw: "5511982942318", // usado nos links wa.me
  phoneTelHref: "+5511982942318", // usado nos links tel:

  // ---------------------------------------------------------------------
  // ENDEREÇO — alterar endereço aqui reflete em todo o site
  // ---------------------------------------------------------------------
  address: {
    street: "Avenida Eng. George Corbisier, nº 1001",
    neighborhood: "Jabaquara",
    city: "São Paulo",
    state: "SP",
    zip: "04345-000",
  },

  // Link de rota (abre a navegação até o endereço)
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Avenida+Eng.+George+Corbisier%2C+1001%2C+Jabaquara%2C+S%C3%A3o+Paulo+-+SP%2C+04345-000",
  // Link para abrir o local no Google Maps
  mapsPlaceUrl:
    "https://www.google.com/maps/search/?api=1&query=Avenida+Eng.+George+Corbisier%2C+1001%2C+Jabaquara%2C+S%C3%A3o+Paulo+-+SP%2C+04345-000",
  // Embed do mapa (carregado sob demanda na seção Localização)
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Avenida+Eng.+George+Corbisier,+1001,+Jabaquara,+S%C3%A3o+Paulo+-+SP,+04345-000&output=embed",
  // TODO: substituir pelo link direto do Perfil da Empresa no Google, quando disponível
  googleProfileUrl: "",

  instagramHandle: "@oficinadojayme",
  instagramUrl: "https://www.instagram.com/oficinadojayme",

  // ---------------------------------------------------------------------
  // HORÁRIO — alterar horário aqui reflete em todo o site
  // ---------------------------------------------------------------------
  hours: [
    { day: "Segunda a sexta-feira", time: "8h30 às 19h", open: true },
    { day: "Sábado", time: "Fechado", open: false },
    { day: "Domingo", time: "Fechado", open: false },
  ],
  hoursShort: "Segunda a sexta, das 8h30 às 19h",
  hoursSchema: { opens: "08:30", closes: "19:00" },

  // ---------------------------------------------------------------------
  // AVALIAÇÃO GOOGLE (não alterar a nota sem base real)
  // ---------------------------------------------------------------------
  rating: {
    value: 4.3,
    count: 18,
    source: "Avaliações publicadas por clientes no Google.",
  },

  region: "Jabaquara · Zona Sul de São Paulo",

  // ---------------------------------------------------------------------
  // MENSAGENS DE WHATSAPP (codificadas automaticamente em lib/utils.ts)
  // ---------------------------------------------------------------------
  whatsappMessages: {
    default:
      "Olá, Jayme! Encontrei a oficina pelo site e gostaria de solicitar uma avaliação para o meu veículo.",
    mechanic:
      "Olá, Jayme! Encontrei a oficina pelo site e gostaria de solicitar uma avaliação mecânica para o meu veículo.",
    bodywork:
      "Olá, Jayme! Encontrei a oficina pelo site e gostaria de solicitar uma avaliação de funilaria. Posso enviar fotos do veículo?",
    paint:
      "Olá, Jayme! Encontrei a oficina pelo site e gostaria de solicitar uma avaliação de pintura automotiva.",
    bodyworkAndPaint:
      "Olá, Jayme! Encontrei a oficina pelo site e gostaria de solicitar uma avaliação de funilaria ou pintura. Posso enviar fotos do veículo?",
    photos:
      "Olá, Jayme! Encontrei a oficina pelo site e gostaria de enviar fotos do meu veículo para uma avaliação inicial.",
    unsure:
      "Olá, Jayme! Encontrei a oficina pelo site. Ainda não sei identificar o problema do meu veículo e gostaria de uma avaliação.",
  },

  // ---------------------------------------------------------------------
  // NAVEGAÇÃO
  // ---------------------------------------------------------------------
  nav: [
    { label: "Início", href: "#inicio" },
    { label: "Serviços", href: "#servicos" },
    { label: "Diferenciais", href: "#diferenciais" },
    { label: "Trabalhos", href: "#trabalhos" },
    { label: "Avaliações", href: "#avaliacoes" },
    { label: "Sobre", href: "#sobre" },
    { label: "Localização", href: "#localizacao" },
  ],

  // ---------------------------------------------------------------------
  // PILARES (Diferenciais)
  // ---------------------------------------------------------------------
  pillars: [
    {
      title: "Diagnóstico transparente",
      description: "Clareza sobre o que o veículo precisa antes de qualquer serviço.",
    },
    {
      title: "Atendimento direto",
      description: "Conversa objetiva, sem intermediários, do contato à entrega.",
    },
    {
      title: "Serviço de alto padrão",
      description: "Execução cuidadosa na mecânica, na funilaria e na pintura.",
    },
    {
      title: "Cuidado no acabamento",
      description: "Atenção ao alinhamento, à tonalidade e ao resultado final.",
    },
  ],

  processWords: ["Diagnóstico", "Mecânica", "Funilaria", "Pintura", "Acabamento"],

  // ---------------------------------------------------------------------
  // SOBRE
  // ---------------------------------------------------------------------
  about: {
    title: "Uma oficina para quem procura confiança e serviço bem executado.",
    paragraphs: [
      "A Oficina do Jayme atende no Jabaquara com serviços de mecânica, funilaria e pintura de alto padrão. O atendimento é direto, com atenção ao que o veículo realmente precisa e clareza antes da realização do serviço.",
      "Do diagnóstico mecânico à recuperação da lataria e da pintura, cada trabalho exige cuidado na avaliação, na execução e no acabamento.",
    ],
  },

  // ---------------------------------------------------------------------
  // SEO
  // ---------------------------------------------------------------------
  seo: {
    title: "Oficina do Jayme | Mecânica, Funilaria e Pintura no Jabaquara",
    description:
      "Mecânica, funilaria e pintura de alto padrão no Jabaquara. Solicite uma avaliação da Oficina do Jayme pelo WhatsApp.",
    keywords: [
      "Oficina do Jayme",
      "oficina no Jabaquara",
      "oficina mecânica no Jabaquara",
      "mecânico no Jabaquara",
      "funilaria no Jabaquara",
      "pintura automotiva no Jabaquara",
      "funilaria e pintura na Zona Sul",
      "oficina automotiva na Zona Sul de São Paulo",
    ],
  },

  // ---------------------------------------------------------------------
  // IMAGENS — ver IMAGENS.md na raiz para instruções de substituição
  // ---------------------------------------------------------------------
  images: {
    logo: "/images/logo-oficial.webp", // LOGO OFICIAL completa (texto + carro), bordas esfumadas
    // Variante horizontal só com o bloco de texto, para o cabeçalho (legibilidade).
    // Para usar a arte completa também no cabeçalho, aponte para logo-oficial.webp.
    logoHeader: "/images/logo-header.webp",
    heroVideo: "", // TODO: opcional, /video/hero.mp4 (ver IMAGENS.md)
    // Artes originais da marca (geradas para o site — não são fotos):
    heroBackground: "/images/hero-bg.webp",
    ctaBackground: "/images/cta-bg.webp",
    artMechanic: "/images/svc-mecanica.webp",
    artBodywork: "/images/svc-funilaria.webp",
    artPaint: "/images/svc-pintura.webp",
    // Fotos reais fornecidas pelo cliente:
    facade: "/images/facade-real.webp", // fachada real (Street View recortado)
    painting: "/images/painting-real.webp",
    sprayGun: "/images/spray-gun-real.webp",
    tools: "/images/tools-real.webp",
  },
};

export type Company = typeof company;
