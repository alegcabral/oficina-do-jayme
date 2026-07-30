# Onde trocar imagens, logo e vídeo

## Logo oficial

- `public/images/logo-oficial.webp` (e `.png`): a arte nova em alta
  qualidade fornecida pelo cliente (texto dourado + automóvel), com as
  **bordas esfumadas em transparência** para se dissolver no fundo escuro do
  site. Usada no rodapé, no CTA final e no manifest.
- `public/images/logo-header.webp`: variante horizontal apenas com o bloco
  de texto ("OFICINA DO JAYME" + assinatura), usada no **cabeçalho** para
  garantir legibilidade em altura pequena. Nada foi redesenhado — é um
  recorte da mesma arte, também com bordas esfumadas.
- Para usar a arte completa também no cabeçalho: em `src/config/company.ts`,
  troque `images.logoHeader` para `"/images/logo-oficial.webp"`.
- Para substituir por outra versão: sobrescreva os arquivos mantendo os
  nomes, ou ajuste os caminhos em `src/config/company.ts`.

## Artes originais da marca (geradas para o site)

Estas imagens NÃO são fotografias — são composições gráficas originais
(metal escuro, luz dourada, linhas técnicas) criadas para dar acabamento
cinematográfico sem fingir trabalhos reais:

| Arquivo | Usado em |
|---|---|
| `hero-bg.webp` | Fundo do hero (paralaxe 3D) |
| `cta-bg.webp` | Fundo do CTA final |
| `svc-mecanica.webp` | Card de Mecânica e seção "Diagnóstico antes da execução" |
| `svc-funilaria.webp` | Card de Funilaria |
| `svc-pintura.webp` | Card de Pintura e seção "Recuperar não é apenas esconder o dano" |
| `illus-pintura.webp` / `illus-funilaria.webp` / `illus-mecanica.webp` / `illus-oficina.webp` | Galeria, com selo "Ilustrativa" — substituir por fotos reais |

Quando houver fotos profissionais reais da oficina, basta trocar os caminhos
em `src/config/company.ts` (objeto `images`) e em `src/data/services.ts`.

## Fotos removidas a pedido do cliente

As fotos do primeiro envio (processo de pintura, pistola e ferramentas,
recortadas de uma colagem em baixa resolução) foram **removidas do site e do
projeto**. Os espaços que elas ocupavam usam agora artes ilustrativas da
marca, com selo "Ilustrativa" na galeria — prontos para receber fotografias
profissionais reais no futuro.

## Fotos reais em uso

| Arquivo | Usado em | Observação |
|---|---|---|
| `public/images/facade-real.webp` | Sobre, Localização, Galeria, Open Graph | Recorte do Street View fornecido, sem a interface do Google. A placa na foto mostra um telefone antigo — em tamanho de tela ele não é legível, mas recomenda-se substituir por uma foto atual da fachada assim que possível. |

As artes antigas com o carro amarelo e a placa com telefone 2864-0688 **não**
foram usadas no site (apenas a logo oficial foi mantida, conforme orientação).

## Como substituir qualquer foto

1. Converta a nova foto para `.webp` ou `.avif` (ex.: squoosh.app).
2. Salve em `public/images/` com o mesmo nome do arquivo atual **ou** com um
   nome novo, atualizando o caminho em `src/config/company.ts` (objeto
   `images`) ou em `src/config/gallery.ts`.

## Vídeo do hero (opcional)

1. Salve em `public/video/hero.mp4` (curto, sem áudio, comprimido).
2. Preencha `images.heroVideo` em `src/config/company.ts`.
3. Em `src/components/Hero.tsx`, troque o `<Image>` de fundo por
   `<video autoPlay muted loop playsInline poster={company.images.heroBackground}>`.
   O comentário no topo do componente indica o local.

## Galeria — adicionar novos trabalhos

Edite `src/config/gallery.ts`: adicione a foto em `public/images/` e crie um
item com categoria (Mecânica, Funilaria, Pintura ou Oficina) e uma descrição
NEUTRA (sem inventar modelo, prazo, preço ou resultado). Use `wide: true`
para a foto ocupar duas colunas. Itens `placeholder: true` mostram o selo
"Placeholder" até serem substituídos.

## Antes e depois

O componente já está pronto, mas **só aparece quando houver pares reais**
cadastrados em `src/data/beforeAfter.ts` (fotos do mesmo veículo e serviço).
Sem fotos reais, nada é exibido — nenhum resultado falso é mostrado.
