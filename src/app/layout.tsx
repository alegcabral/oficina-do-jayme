import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { company } from "@/config/company";
import MobileCTA from "@/components/MobileCTA";

const displayFont = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.oficinadojayme.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: company.seo.title,
    template: `%s | ${company.name}`,
  },
  description: company.seo.description,
  keywords: company.seo.keywords,
  alternates: { canonical: "/" },
  openGraph: {
    title: company.seo.title,
    description: company.seo.description,
    url: siteUrl,
    siteName: company.name,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: company.images.facade,
        width: 960,
        height: 920,
        alt: `Fachada da ${company.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: company.seo.title,
    description: company.seo.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Dados estruturados AutoRepair (sem AggregateRating; a nota aparece
  // visualmente no site, conforme diretrizes).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: company.name,
    description: company.proposition,
    image: `${siteUrl}${company.images.facade}`,
    logo: `${siteUrl}${company.images.logo}`,
    telephone: company.phoneTelHref,
    url: siteUrl,
    sameAs: [company.instagramUrl],
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: `${company.address.neighborhood}, ${company.address.city}`,
      addressRegion: company.address.state,
      postalCode: company.address.zip,
      addressCountry: "BR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: company.hoursSchema.opens,
        closes: company.hoursSchema.closes,
      },
    ],
    areaServed: "Jabaquara, Zona Sul de São Paulo",
  };

  return (
    <html lang="pt-BR" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="bg-ink font-body text-paper antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Pular para o conteúdo
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <MobileCTA />
      </body>
    </html>
  );
}
