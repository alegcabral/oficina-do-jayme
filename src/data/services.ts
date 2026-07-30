// Dados dos três serviços confirmados. Não adicionar serviços não confirmados.
import { company } from "@/config/company";

export interface Service {
  id: string;
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  cta: string;
  whatsappKey: keyof typeof company.whatsappMessages;
  image: string;
  imageAlt: string;
}

export const services: Service[] = [
  {
    id: "mecanica",
    eyebrow: "01",
    title: "Mecânica",
    description:
      "Avaliação e reparos mecânicos realizados de acordo com a necessidade identificada no veículo.",
    cta: "Solicitar avaliação mecânica",
    whatsappKey: "mechanic",
    image: company.images.tools,
    imageAlt: "Ferramentas organizadas na Oficina do Jayme",
  },
  {
    id: "funilaria",
    eyebrow: "02",
    title: "Funilaria",
    description:
      "Recuperação de danos na lataria com atenção ao alinhamento das peças e à preparação para o acabamento.",
    cta: "Solicitar avaliação de funilaria",
    whatsappKey: "bodywork",
    image: company.images.sprayGun,
    imageAlt: "Preparação de veículo para pintura na Oficina do Jayme",
  },
  {
    id: "pintura",
    eyebrow: "03",
    title: "Pintura",
    highlight: "de alto padrão",
    description:
      "Preparação e pintura automotiva com atenção à superfície, à tonalidade e ao acabamento final.",
    cta: "Solicitar avaliação de pintura",
    whatsappKey: "paint",
    image: company.images.painting,
    imageAlt: "Profissional realizando pintura automotiva na Oficina do Jayme",
  },
];
