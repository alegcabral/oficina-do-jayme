import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { company } from "@/config/company";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Política de privacidade da ${company.name}.`,
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pb-16 pt-40 lg:pb-0">
        <div className="container-oj max-w-3xl pb-24">
          <p className="eyebrow mb-3">{company.name}</p>
          <h1 className="section-title mb-8">Política de Privacidade</h1>

          <div className="flex flex-col gap-6 text-sm leading-relaxed text-mist">
            <p>
              Esta página explica, de forma simples, como as informações
              enviadas pelo formulário de orçamento deste site são utilizadas.
            </p>

            <section>
              <h2 className="mb-2 font-display text-xl uppercase tracking-wide text-paper">
                Quais informações o formulário coleta
              </h2>
              <p>
                O formulário de orçamento coleta nome, telefone, marca e
                modelo do veículo, ano, serviço desejado e uma descrição do
                problema relatado. A indicação de que você possui fotos do
                veículo também é registrada, mas nenhuma foto é enviada
                automaticamente por este formulário — elas devem ser anexadas
                diretamente na conversa do WhatsApp.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-display text-xl uppercase tracking-wide text-paper">
                Como os dados são usados
              </h2>
              <p>
                As informações preenchidas são usadas exclusivamente para
                montar a mensagem enviada ao WhatsApp da {company.name}, com o
                objetivo de dar andamento ao seu atendimento e orçamento.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-display text-xl uppercase tracking-wide text-paper">
                Sobre o WhatsApp
              </h2>
              <p>
                O WhatsApp é uma plataforma de mensagens externa, operada pela
                Meta/WhatsApp Inc., e possui sua própria política de
                privacidade. Ao continuar uma conversa pelo WhatsApp, o
                tratamento das mensagens também está sujeito às regras dessa
                plataforma.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-display text-xl uppercase tracking-wide text-paper">
                Solicitação de exclusão de dados
              </h2>
              <p>
                Para solicitar a exclusão de informações enviadas por você,
                entre em contato diretamente pelo telefone/WhatsApp{" "}
                {company.phoneDisplay}.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-display text-xl uppercase tracking-wide text-paper">
                Compartilhamento de dados
              </h2>
              <p>
                Nenhuma informação enviada por este site é vendida a
                terceiros.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-display text-xl uppercase tracking-wide text-paper">
                Responsável pelo tratamento
              </h2>
              <p>
                Razão social, CNPJ e e-mail de contato do encarregado de dados
                serão informados aqui assim que estiverem disponíveis. Campo
                configurável em{" "}
                <code>src/app/privacidade/page.tsx</code>.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-display text-xl uppercase tracking-wide text-paper">
                Cookies
              </h2>
              <p>
                Este site não utiliza cookies de análise no momento. Caso o
                Google Analytics ou ferramenta semelhante seja adicionado no
                futuro, um aviso de consentimento apropriado será exibido
                antes da coleta de dados.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
