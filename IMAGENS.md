# Onde trocar imagens, logo e vídeo

## Logo oficial

- `public/images/logo-oficial.webp` (e `.png`): o emblema oficial fornecido
  pelo cliente (chave inglesa, pistola de pintura, carro estilizado e o
  texto "Oficina do Jayme"). O fundo branco original foi removido e as
  bordas receberam uma leve transição para transparência, para o emblema se
  integrar ao grafite escuro do site em vez de aparecer como um retângulo
  colado. Nenhum elemento da arte foi redesenhado ou recortado.
- Usada **sempre inteira**, com `object-fit: contain`, no cabeçalho, no
  rodapé, no CTA final e no manifest (ícone do site).
- Para trocar por uma versão em resolução ainda maior: sobrescreva os dois
  arquivos mantendo os nomes, ou ajuste `images.logo` em
  `src/config/company.ts`. Se a nova arte tiver outra proporção, atualize
  também o `aspectRatio` em `src/components/Logo.tsx` (linha com
  `style={{ aspectRatio: ... }}`).

## Fachada — aguardando foto real

Não há mais nenhuma fotografia (real ou de baixa resolução) da fachada no
site. Os espaços onde a fachada apareceria (seção "Sobre" e "Localização")
usam a arte ilustrativa `illus-oficina.webp`, com o selo **"Ilustrativa —
foto real em breve"** sobre a imagem, deixando claro para o visitante que
ainda não é uma foto real do local.

Assim que houver uma fotografia profissional da fachada:

1. Salve em `public/images/` (ex.: `facade.webp`).
2. Em `src/config/company.ts`, troque `images.facade` para o novo caminho.
3. Remova o selo "Ilustrativa" nos dois componentes: procure por
   `Ilustrativa — foto real em breve` em `src/components/About.tsx` e
   `src/components/Location.tsx` e apague o `<span>` correspondente.

## Artes originais da marca (geradas para o site)

Estas imagens NÃO são fotografias — são composições gráficas originais
(metal escuro, luz dourada, linhas técnicas) criadas para dar acabamento
cinematográfico sem fingir trabalhos reais:

| Arquivo | Usado em |
|---|---|
| `hero-bg.webp` | Fundo do hero (cena de rolagem) |
| `cta-bg.webp` | Fundo do CTA final |
| `svc-mecanica.webp` | Painel de Mecânica e seção "Diagnóstico antes da execução" |
| `svc-funilaria.webp` | Painel de Funilaria |
| `svc-pintura.webp` | Painel de Pintura e seção "Recuperar não é apenas esconder o dano" |
| `illus-pintura.webp` / `illus-funilaria.webp` / `illus-mecanica.webp` | Galeria, com selo "Ilustrativa" |
| `illus-oficina.webp` | Sobre, Localização e Galeria (categoria Oficina), com selo "Ilustrativa" |

Quando houver fotos profissionais reais de cada serviço, basta trocar os
caminhos em `src/data/services.ts` (cards de serviço) e em
`src/config/gallery.ts` (galeria), marcando `placeholder: false`.

## Como substituir qualquer imagem

1. Converta a nova foto para `.webp` ou `.avif` (ex.: squoosh.app).
2. Salve em `public/images/` com o mesmo nome do arquivo atual **ou** com um
   nome novo, atualizando o caminho correspondente em
   `src/config/company.ts`, `src/data/services.ts` ou
   `src/config/gallery.ts`.

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
para a foto ocupar duas colunas. Itens com `placeholder: true` mostram o
selo "Ilustrativa" até serem substituídos por `placeholder: false`.

## Antes e depois

O componente já está pronto, mas **só aparece quando houver pares reais**
cadastrados em `src/data/beforeAfter.ts` (fotos do mesmo veículo e serviço).
Sem fotos reais, nada é exibido — nenhum resultado falso é mostrado.
