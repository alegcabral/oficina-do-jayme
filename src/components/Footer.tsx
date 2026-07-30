import { MessageCircle, Instagram, Navigation, Phone } from "lucide-react";
import { company } from "@/config/company";
import { buildWhatsAppUrl } from "@/lib/utils";
import Logo from "@/components/Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-graphite pb-32 pt-16 lg:pb-16">
      <div className="container-oj grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          {/* Logo oficial, completa, sem repetir o nome em texto ao lado */}
          <Logo size="footer" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist">
            Mecânica, funilaria e pintura de alto padrão no Jabaquara, Zona Sul
            de São Paulo.
          </p>
          <a
            href={buildWhatsAppUrl(company.whatsappMessages.default)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Solicitar avaliação
          </a>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-paper">
            Serviços
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-mist">
            <li><a href="#servicos" className="hover:text-gold">Mecânica</a></li>
            <li><a href="#servicos" className="hover:text-gold">Funilaria</a></li>
            <li><a href="#servicos" className="hover:text-gold">Pintura de alto padrão</a></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-paper">
            Navegação
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-mist">
            {company.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-gold">{item.label}</a>
              </li>
            ))}
            <li>
              <a href="/privacidade" className="hover:text-gold">
                Política de privacidade
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-paper">
            Contato
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-mist">
            <li>{company.phoneDisplay}</li>
            <li>{company.address.street}</li>
            <li>
              {company.address.neighborhood}, {company.address.city} – {company.address.state}
            </li>
            <li>CEP {company.address.zip}</li>
            <li>{company.hoursShort}</li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a
              href={company.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Oficina do Jayme"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/15 text-mist transition-colors hover:border-gold hover:text-gold"
            >
              <Instagram size={17} aria-hidden="true" />
            </a>
            <a
              href={`tel:${company.phoneTelHref}`}
              aria-label="Ligar para a Oficina do Jayme"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/15 text-mist transition-colors hover:border-gold hover:text-gold"
            >
              <Phone size={17} aria-hidden="true" />
            </a>
            <a
              href={company.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Traçar rota até a Oficina do Jayme"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/15 text-mist transition-colors hover:border-gold hover:text-gold"
            >
              <Navigation size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="container-oj mt-12 border-t border-white/10 pt-6 text-xs text-mist/60">
        © {year} {company.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
