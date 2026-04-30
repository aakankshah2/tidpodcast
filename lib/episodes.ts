import type { Episode } from "./types";

// Add episodes here as you publish them.
// Run them through PostPod first — paste the generated show notes,
// chapters, and pull quotes directly into the fields below.
export const episodes: Episode[] = [
  {
    slug: "amish-tripathi-mukul-deora-indian-mythology-gaming",
    title: "Amish Tripathi & Mukul Deora on Indian Mythology Meets Gaming",
    guest: "Amish Tripathi & Mukul Deora",
    guestRole: "Author & Co-founder, Bhaarat Games",
    topic: "Indian mythology, gaming, and building cultural IP",
    publishedAt: "2026-04-01",
    duration: "PT1H22M",
    season: 2,
    episode: 8,
    description:
      "Amish Tripathi and Mukul Deora on why India's mythological canon is the world's greatest untapped gaming universe — and what it takes to build it.",
    showNotes: `Amish Tripathi, India's bestselling mythological fiction author, joins Mukul Deora, co-founder of Bhaarat Games, for a wide-ranging conversation on cultural IP, storytelling at scale, and what the Age of Bhaarat means for Indian gaming.

**In this episode:**
- Why Ramayana and Mahabharata are the greatest story universes never fully adapted for games
- How Amish approaches world-building across novels and now interactive media
- The investor thesis behind betting on Indian cultural IP in 2024
- What global gaming studios get wrong about India
- Building for 1.4 billion players who think in Sanskrit

**Guest bios:**
Amish Tripathi is the author of the Shiva Trilogy and Ram Chandra Series, with over 7 million books sold. He is India's fastest-selling fiction author.

Mukul Deora is a Mumbai-based entrepreneur and investor, and co-founder of Bhaarat Games, building India's first mythology-native gaming studio.`,
    pullQuotes: [
      "Every great game needs a mythology. India has the greatest mythology ever written — we just haven't built the games yet.",
      "The mistake global studios make is thinking India is a market. It's a civilisation. You have to build for the civilisation.",
      "Ramayana isn't a story about a king. It's a story about dharma under impossible pressure. That's a game.",
    ],
    chapters: [
      { timestamp: "00:00", title: "Introductions", summary: "Amish and Mukul on how they met and why Indian mythology in gaming is inevitable." },
      { timestamp: "08:14", title: "The mythology gap", summary: "Why India's story universe has never been fully adapted for interactive media." },
      { timestamp: "18:30", title: "World-building for games", summary: "How Amish approaches building universes that work across novels and games." },
      { timestamp: "31:05", title: "The investor thesis", summary: "Mukul on why he bet on cultural IP and what the market looks like in 2024." },
      { timestamp: "44:20", title: "Building for Bharat", summary: "Designing for 1.4 billion players who think in Sanskrit, not English." },
      { timestamp: "58:10", title: "What global studios get wrong", summary: "The mistakes Western gaming companies make when entering India." },
      { timestamp: "01:10:00", title: "What's next", summary: "First titles, launch timeline, and the long game for Bhaarat Games." },
    ],
    youtubeId: "REPLACE_WITH_YOUTUBE_ID",
    tags: ["gaming", "mythology", "India", "cultural IP", "startups"],
  },
  {
    slug: "paroma-chatterjee-revolut-india",
    title: "Paroma Chatterjee on Building Revolut's India GCC",
    guest: "Paroma Chatterjee",
    guestRole: "India Head, Revolut",
    topic: "Global fintech, India GCCs, and what it means to build for a billion",
    publishedAt: "2026-03-18",
    duration: "PT1H11M",
    season: 2,
    episode: 9,
    description:
      "Paroma Chatterjee on scaling Revolut's India GCC, what global fintech looks like from Bengaluru, and why India is the most important engineering bet of the decade.",
    showNotes: `Paroma Chatterjee, India Head at Revolut, joins Abhay for a conversation on what it actually takes to build a global fintech operation from India — and why the GCC model is changing how the world's best companies think about talent.`,
    pullQuotes: [
      "India isn't a back office anymore. It's where the product gets built.",
      "The best engineers in the world are in Bengaluru. The question is whether global companies know how to work with them.",
    ],
    chapters: [
      { timestamp: "00:00", title: "Paroma's path to Revolut", summary: "From investment banking to leading Revolut's India operations." },
      { timestamp: "12:30", title: "What a GCC actually is", summary: "Demystifying global capability centres and why they're not outsourcing." },
      { timestamp: "28:00", title: "Building fintech in India", summary: "Regulatory landscape, talent, and what's different about Indian fintech users." },
      { timestamp: "45:15", title: "The talent question", summary: "How Revolut finds and retains world-class engineers in a competitive market." },
      { timestamp: "58:40", title: "What's next for Revolut India", summary: "Products, scale, and the 5-year plan." },
    ],
    youtubeId: "REPLACE_WITH_YOUTUBE_ID",
    tags: ["fintech", "Revolut", "GCC", "India", "banking"],
  },
];

export function getAllEpisodes(): Episode[] {
  return [...episodes].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getEpisodeBySlug(slug: string): Episode | undefined {
  return episodes.find((e) => e.slug === slug);
}

export function getRelatedEpisodes(currentSlug: string, count = 3): Episode[] {
  return getAllEpisodes()
    .filter((e) => e.slug !== currentSlug)
    .slice(0, count);
}
