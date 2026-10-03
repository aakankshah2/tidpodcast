export type GuestProfile = {
  name: string;
  role: string;
  // Optional subtitle override. Without it the directory shows whatever the
  // title parser left over, which repeats the guest's name on episodes whose
  // YouTube title ends in "ft. <guest>".
  topic?: string;
};

// Guest role lookup keyed by YouTube videoId.
// Add a new entry whenever you publish an episode and want the role to show in the directory.
// Anything not listed falls back to whatever the title parser extracts.
export const GUEST_PROFILES: Record<string, GuestProfile> = {
  "42ExkWGLLhM": {
    name: "Group Captain Shubhanshu Shukla",
    role: "Astronaut, Axiom Mission 4",
    topic: "S2E16: The 41 Year Wait — India's Second Orbit",
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
