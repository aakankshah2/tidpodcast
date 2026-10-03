export type GuestProfile = {
  name: string;
  // Optional: a row with a name but no role still leads with the guest, which
  // is the point. Better blank than a job title we are not sure about.
  role?: string;
  // Optional subtitle override. Without it the directory shows whatever the
  // title parser left over, which repeats the guest's name on episodes whose
  // YouTube title ends in "ft. <guest>".
  topic?: string;
};

// Guest role lookup keyed by YouTube videoId.
// Add a new entry whenever you publish an episode and want the role to show in the directory.
// Anything not listed falls back to whatever the title parser extracts.
export const GUEST_PROFILES: Record<string, GuestProfile> = {
  aTK95ETRnxg: {
    name: "Malahar Pinnelli",
    role: "VP & Country Leader, 7-Eleven Global Solution Center India",
    topic: "Ep2: From GCC to Global Growth Hub: The 7-Eleven Playbook",
  },
  // Not a guest episode — the entry only stops the title parser splitting
  // "16 Impact-makers" at the hyphen.
  xOF4Tq_2vmM: {
    name: "Season 1 Recap",
    topic: "16 Impact-makers, 16 Journeys, 3 Acts, 1 Truth: 16 lessons for Founders",
  },
  "42ExkWGLLhM": {
    name: "Group Captain Shubhanshu Shukla",
    role: "Astronaut, Axiom Mission 4",
    topic: "S2E16: The 41 Year Wait — India's Second Orbit",
  },
  lsg8hvBEflw: {
    name: "Vijay Subramaniam",
    role: "Founder & Group CEO, Collective Artists Network",
    topic: "S2Ep15: Mahabharat is the baap of Game of Thrones",
  },
  r48cgtqKcAQ: {
    name: "Anil Chilla",
    topic: "Founder's Corner: EP2: Does The Ramayana matter in the Age of AI?",
  },
  nWt7xr4yK8I: {
    name: "Rebecca Port",
    topic: "Ep4: Digital Identity - Agents vs Humans",
  },
  mRzFo2O2hp4: {
    name: "Dr. Rajesh Puneyani",
    topic: "Ep3 Everyday Care, Global Scale - Inside Kenvue GCC in India",
  },
  jstfeUM53WA: {
    name: "Subhendu Panigrahi",
    role: "Co-founder & CEO, FOXO",
    topic: "Ep1: Living to 100: India’s Longevity Moment",
  },
  EtjjAmPeUv8: {
    name: "Ewout De Wit",
    topic: "S2E7: Tech, Trade & Trust: India–Netherlands and the Long Game",
  },
  "Z-9Q-XAHzMY": {
    name: "Jatin Varma",
    role: "Founder, Comic Con India",
    topic: "Ep4: Indian Fandom: COMIC-CONised",
  },
  dbRXcHDwvKk: {
    name: "Tarun Katial",
    role: "Founder & CEO, Coto · ex-CEO, ZEE5",
    topic: "Ep3: He Built BigFM & Zee5. Now Healing India!",
  },
  Ugqz_Fuw7Uw: {
    name: "Lalit Ahuja",
    role: "Founder & CEO, ANSR",
    topic: "EP1: The GCC Revolution of India",
  },
  oqMMEUa8T9o: {
    name: "Rajat Jadhav",
    role: "Co-founder & CEO, Bold Care",
    topic: "Ep16: From Taboo to Trust: Bold Care, Bold Talk",
  },
  wPZgRdPNSgU: {
    name: "Amit Banka",
    role: "Founder & CEO, WeNaturalists",
    topic: "Ep15: Boardrooms to BioDiversity: Building with Purpose",
  },
  fxm_EEExMnc: {
    name: "Vijay Rajagopal",
    topic: "EP14: Reimagining Innovation in the world of everyday Finance",
  },
  r2Pa7L1vsqY: {
    name: "Dr. Kushal Sanghvi",
    topic: "EP 13: Marketing Mayhem & Post Truth Branding",
  },
  "47tZ4q9zwgo": {
    name: "Ashray Malhotra",
    role: "Co-founder & CEO, Rephrase.ai",
    topic: "EP12: Synthetic Yet Real - The New Age of Personalized Video Content",
  },
  cIeX4JqATxA: {
    name: "Prantik Mazumdar",
    role: "Managing Director, Dentsu CXM Singapore",
    topic: "Singapore to India: AI, Brands, and a Sporting Revolution",
  },
  "kr7uDf-n6RM": {
    name: "Arvinder Gujral",
    role: "ex-Managing Director, Twitter Southeast Asia",
    topic: "Mini: From History to Hashtags: Shifting Sands of Engagement",
  },
  l_yMgZI7qrQ: {
    name: "Arjun Vaidya",
    role: "Co-founder, V3 Ventures · Founder, Dr. Vaidya's",
    topic: "EP11: Reinventing Ayurveda for the Billion User era & D2C investments",
  },
  F1ybw4y9vwA: {
    name: "Ritukar Vijay",
    role: "Founder & CEO, Ottonomy.IO",
    topic: "EP10: Robots on the Move: Disrupting Delivery with Ottonomy",
  },
  IT5Uv4zQ64c: {
    name: "Preeti Vyas",
    role: "President & CEO, Amar Chitra Katha",
    topic: "EP9: From Bookstores to Bedtime Stories: Storytelling with Purpose",
  },
  "9clLkvQSUYs": {
    name: "Vishakha Singh",
    role: "Actor, Producer & Entrepreneur",
    topic: "EP8: How to build a Multi-Faceted Career: Actor, Producer & Entrepreneur",
  },
  FyCBB5fb1EI: {
    name: "Vinayak Hegde",
    topic: "EP7 Nationalistic Interests, Humanitarian Efforts & Future of AI",
  },
  EPa0GZoL5GM: {
    name: "Aishwarya Pissay",
    role: "Motorsport World Champion",
    topic: "EP6: Motosports, Championships and Speed",
  },
  PxBviFsKqIg: {
    name: "Prof. Satya Chakravarthy",
    role: "Professor, IIT Madras & Founder, The ePlane Company",
    topic: "Ep5: Electric Wings & Flying Taxis: Revolutionising Urban Mobility",
  },
  m7njvrbiSpA: {
    name: "Vargab Bakshi",
    topic: "EP4: SHOPIFY, WIX and the ECommerce Boom in India",
  },
  "6g2ssUBs964": {
    name: "Sudeep Ralhan",
    role: "CHRO, Upstox",
    topic: "Ep3:Culture, DEI and People Leadership",
  },
  e7bRutzpyCY: {
    name: "Madan Padaki",
    role: "Founder & CEO, 1Bridge",
    topic: "EP2: Social Entrepreneurship, Innovation & Rubanomics",
  },
  "FurFgbG5s-U": {
    name: "Mabel Chacko",
    role: "Co-founder, Open Financial",
    topic: "Ep1: Unicorn, Payments & Chai-Biscuit",
  },
  RXVysfTfLTU: { name: "Paroma Chatterjee", role: "CEO, Revolut India" },
  "9xX6zGVmi-I": { name: "Amish Tripathi & Mukul Deora", role: "Founders, The Age of Bhaarat" },
  ohz9qVsZKvc: { name: "Howard Dawber", role: "Deputy Mayor, London" },
  eDHxchzMRAY: { name: "Pankaj Rai", role: "Chief Data Officer, Aditya Birla Group" },
  TMTcFqtu1fw: { name: "Sanjeev Gupta", role: "Innovation Lead, Karnataka" },
  mlgIgeQEg_M: { name: "Dr. Shubha", role: "Spirituality coach for leaders" },
  "CHBv-sMconw": { name: "Anand Gandhi & Zain Memon", role: "Creators, MAYA" },
  G71YHYnxJSE: { name: "Peeyush Ranjan", role: "Co-founder, Fermi.ai" },
  QNzp6k7ABCs: { name: "Ishaan Khanna", role: "CEO, Antara Assisted Care Services" },
  KGhzluwzY40: { name: "Belson Coutinho", role: "Co-Founder & COO, Akasa Air" },
  "6boCRQzRLKo": { name: "Richa Chadha", role: "Actor & Founder, Pushing Buttons Studios" },
};

export function getGuestProfile(videoId: string): GuestProfile | null {
  return GUEST_PROFILES[videoId] ?? null;
}
