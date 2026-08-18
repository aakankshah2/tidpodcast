import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ConvexProviderClient } from "@/components/ConvexProviderClient";
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

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#abhay-tandon`,
  name: "Abhay Tandon",
  url: SITE_URL,
  image: `${SITE_URL}/abhay.jpg`,
  jobTitle: "Founder & Host, TID Collective",
  description:
    "Abhay Tandon is the founder of TID Collective and host of TID Podcast (The Innovators and Disruptors Podcast). A global corporate-innovation leader, TEDx 2025 speaker, and angel investor in 30+ early-stage startups, he has represented India at the G20 Summit and led 50+ deep-tech projects across NanoTech, Drones, Haptics, AR/VR/XR and Quantum Computing.",
  nationality: { "@type": "Country", name: "India" },
  worksFor: {
    "@type": "Organization",
    name: "TID Collective",
    url: SITE_URL,
  },
  sameAs: [
    "https://www.linkedin.com/in/abhaytandon/",
    "https://www.youtube.com/@TheInnovatorsandDisruptorsPodc",
    "https://www.instagram.com/theinnovatorsanddisruptors/",
    "https://open.spotify.com/show/19fdhWlhtNnRn3HuAzEKAO",
    "https://podcasts.apple.com/gb/podcast/the-innovators-and-disruptors-podcast/id1798971388",
  ],
  knowsAbout: [
    "Corporate Innovation",
    "Entrepreneurship",
    "Venture Capital",
    "Deep Technology",
    "Startups",
    "India's innovation ecosystem",
    "Global Capability Centres",
  ],
  award: [
    "Top 10 Corporate Innovation Leaders, India 2021",
    "IAMAI Gold Award for Innovation in e-Commerce",
    "Trailblazer Award — Karnataka Ecosystem",
  ],
  memberOf: [
    { "@type": "Organization", name: "Forbes Technology Council" },
    { "@type": "Organization", name: "TiE", url: "https://tie.org" },
  ],
};

const podcastSeriesSchema = {
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  name: SHOW_NAME,
  alternateName: "TID Podcast",
  description: SHOW_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  author: { "@id": `${SITE_URL}/#abhay-tandon` },
  inLanguage: "en",
  countryOfOrigin: "IN",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastSeriesSchema) }}
        />
      </head>
      <body
        style={{ fontFamily: `var(--font-inter), system-ui, sans-serif` }}
        className={`${inter.variable} ${bricolage.variable} ${jetbrainsMono.variable}`}
      >
        <ConvexProviderClient>{children}</ConvexProviderClient>
        <Analytics />
      </body>
    </html>
  );
}
