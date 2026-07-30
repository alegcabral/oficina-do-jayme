# Oficina do Jayme — Site institucional

Site completo, responsivo e pronto para publicação da **Oficina do Jayme**
(mecânica, funilaria e pintura automotiva no Jabaquara, São Paulo).

Construído com **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**
e **Framer Motion**.

---

## 1. Instalação

Pré-requisito: Node.js 18.18 ou superior.

```bash
npm install
```

## 2. Rodar localmente (desenvolvimento)

```bash
npm run dev
```

Acesse `http://localhost:3000`.

## 3. Gerar build de produção

```bash
npm run build
npm run start
```

`npm run build` também gera o `sitemap.xml` e o `robots.txt` automaticamente
(arquivos `src/app/sitemap.ts` e `src/app/robots.ts`).

## 4. Publicar o site

O projeto pode ser publicado em qualquer serviço com suporte a Next.js, por
exemplo:

- **Vercel** (recomendado, mesma empresa do Next.js): conecte o repositório
  e o deploy é automático a cada push.
- **Netlify**, com o plugin oficial do Next.js.
- Qualquer VPS com Node.js, rodando `npm run build && npm run start`.

Antes de publicar, defina a variável de ambiente `NEXT_PUBLIC_SITE_URL` com
o domínio final (ver `.env.example`), para que o SEO, o sitemap e as tags
Open Graph apontem para a URL correta.

## 5. Onde editar o conteúdo

**Você não precisa mexer em vários arquivos para atualizar o site.**

| O que mudar | Onde editar |
|---|---|
| Telefone, endereço, horário, mensagens de WhatsApp, links, SEO | `src/config/company.ts` |
| Serviços (títulos, descrições, CTAs) | `src/data/services.ts` |
| Depoimentos | `src/data/reviews.ts` |
| Perguntas frequentes | `src/data/faq.ts` |
| Pares de antes e depois | `src/data/beforeAfter.ts` |
| Itens da galeria de trabalhos | `src/config/gallery.ts` |
| Logo, fotos e vídeo | `public/images/` — ver `IMAGENS.md` na raiz do projeto |
| Política de privacidade | `src/app/privacidade/page.tsx` |

## 6. Estrutura do projeto

```
src/
  app/
    layout.tsx        # Metadata, fontes, dados estruturados (JSON-LD)
    page.tsx           # Monta todas as seções da página inicial
    globals.css         # Estilos globais e tokens visuais
    privacidade/        # Página de política de privacidade
    sitemap.ts           # Gera sitemap.xml
    robots.ts             # Gera robots.txt
    icon.svg               # Favicon
  components/            # Um componente por seção do site
  config/
    company.ts            # Configuração central (ver acima)
    gallery.ts              # Configuração da galeria
  lib/
    utils.ts               # Helpers: link do WhatsApp, máscara de telefone etc.
public/
  images/                  # Fotos reais e placeholders (ver IMAGENS.md)
IMAGENS.md                  # Guia de onde trocar cada imagem/vídeo
```

## 7. Formulário de orçamento e WhatsApp

O formulário de orçamento **não envia e-mails nem salva dados em um banco**.
Ao ser enviado, ele monta uma mensagem organizada e abre o WhatsApp
(`wa.me`) já com o texto preenchido, para o número (11) 98294-2318.

Campos com upload de foto servem apenas para avisar que o cliente tem fotos
— elas devem ser anexadas manualmente dentro da conversa do WhatsApp.

## 8. Checklist antes de publicar

- [ ] Confirmar telefone (11) 98294-2318 em todos os botões
- [ ] Confirmar horário 8h30–19h, segunda a sexta
- [ ] Substituir imagens de baixa resolução por fotos originais (ver `IMAGENS.md`)
- [ ] Preencher `googleProfileUrl` em `company.ts` com o link do Google
- [ ] Definir `NEXT_PUBLIC_SITE_URL` com o domínio definitivo
- [ ] Rodar `npm run build` e revisar quaisquer erros/avisos
- [ ] Testar em 320px, 375px, 390px, 430px, tablet e desktop
- [ ] Testar todos os links de WhatsApp, ligação e rota
- [ ] Testar navegação por teclado e leitor de tela no formulário

## 9. Resumo dos testes executados

Verificações feitas em ambiente de desenvolvimento (sem acesso à internet,
portanto sem `npm install` completo — ver observação abaixo):

- Checagem estática com TypeScript (tsc) em todos os arquivos `src/`: os
  únicos erros restantes decorrem da ausência de `node_modules` (tipos do
  React e do Node), que desaparecem após `npm install`.
- Busca automatizada confirmando que NENHUM arquivo contém: telefone antigo
  (2864-0688), horários antigos (8h, 8h–18h) ou a grafia incorreta "Jaime".
- Conferência de todos os imports entre componentes (todos resolvem).
- Revisão manual de: links wa.me com mensagens codificadas, links tel:,
  links de rota, validação do formulário, foco visível, labels, skip link,
  prefers-reduced-motion, safe-area da barra mobile.

**Importante:** o ambiente onde o projeto foi gerado não tem acesso à
internet, então `npm install`, `npm run lint` e `npm run build` não puderam
ser executados aqui. Rode os três comandos localmente antes de publicar e
corrija qualquer aviso que apareça.

## 10. Licença de conteúdo

Todo o texto foi escrito especificamente para a Oficina do Jayme, sem dados
inventados (garantias, anos de experiência, certificações, números de
clientes) que não tenham sido informados pelo cliente.
