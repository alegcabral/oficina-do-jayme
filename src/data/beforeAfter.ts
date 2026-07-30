// ============================================================================
// PARES DE ANTES E DEPOIS
// ============================================================================
// O componente BeforeAfterSlider só é exibido quando este array tiver pelo
// menos um par REAL (fotos do mesmo veículo e do mesmo serviço).
//
// Para ativar:
// 1. Adicione as duas fotos em public/images/ (ex.: antes-01.webp, depois-01.webp)
// 2. Adicione um item aqui com os caminhos e uma descrição neutra.
//
// NÃO usar imagens ilustrativas ou de banco como se fossem resultados reais.
// ============================================================================

export interface BeforeAfterPair {
  id: string;
  before: string; // caminho da foto "antes"
  after: string; // caminho da foto "depois"
  label: string; // descrição neutra, ex.: "Reparo de funilaria realizado na oficina"
}

export const beforeAfterPairs: BeforeAfterPair[] = [
  // Exemplo (descomentar e ajustar quando houver fotos reais):
  // {
  //   id: "funilaria-porta-01",
  //   before: "/images/antes-01.webp",
  //   after: "/images/depois-01.webp",
  //   label: "Reparo de funilaria realizado na Oficina do Jayme",
  // },
];
