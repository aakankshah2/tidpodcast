import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

const SITE_URL = "https://tidpodcast.in";
const SHOW_NAME = "The Innovators and Disruptors Podcast";
const SHOW_DESCRIPTION =
  "India's founders, builders, and disruptors — unfiltered. Abhay Tandon interviews the operators, investors, and iconoclasts actually building India's future.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SHOW_NAME} | TID Podcast`,
    template: "%s | TID Podcast",
  },
  description: SHOW_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SHOW_NAME,
    title: `${SHOW_NAME} | TID Podcast`,
    description: SHOW_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: SHOW_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SHOW_NAME} | TID Podcast`,
    description: SHOW_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

const podcastSeriesSchema = {
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  name: SHOW_NAME,
  alternateName: "TID Podcast",
  description: SHOW_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  author: {
    "@type": "Person",
    name: "Abhay Tandon",
    url: "https://www.linkedin.com/in/abhaytandon/",
  },
  inLanguage: "en",
  countryOfOrigin: "IN",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastSeriesSchema) }}
        />
      </head>
      <body
        style={{ fontFamily: `var(--font-inter), system-ui, sans-serif` }}
        className={`${inter.variable} ${bricolage.variable} ${jetbrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
