import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import path from "path";
import { YoutubeTranscript } from "youtube-transcript";

const SITEMAP_URL = "https://tidpodcast.in/sitemap.xml";

type Paragraph = { start: number; text: string };
type TranscriptStore = Record<string, Paragraph[]>;

async function getVideoIdsFromSitemap(): Promise<string[]> {
  const res = await fetch(SITEMAP_URL);
  const xml = await res.text();
  const matches = xml.matchAll(/episodes\/yt\/([A-Za-z0-9_-]+)/g);
  const ids = new Set<string>();
  for (const m of matches) ids.add(m[1]);
  return [...ids];
}

const OUTPUT = path.join(process.cwd(), "data", "transcripts.json");

function decodeHtml(s: string): string {
  return s
    .replace(/&amp;#39;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

async function fetchOne(videoId: string): Promise<Paragraph[] | null> {
  try {
    const raw = await YoutubeTranscript.fetchTranscript(videoId, { lang: "en" }).catch(
      () => YoutubeTranscript.fetchTranscript(videoId)
    );
    if (!raw?.length) return null;
    const out: Paragraph[] = [];
    const CHUNK = 15;
    for (let i = 0; i < raw.length; i += CHUNK) {
      const slice = raw.slice(i, i + CHUNK);
      const text = slice.map((r) => decodeHtml(r.text).trim()).join(" ").replace(/\s+/g, " ");
      out.push({ start: slice[0].offset, text });
    }
    return out;
  } catch (e) {
    return null;
  }
}

async function main() {
  console.log("reading video IDs from live sitemap...");
  const ids = await getVideoIdsFromSitemap();
  console.log(`got ${ids.length} episode video IDs\n`);

  // Preserve existing transcripts so a single failure doesn't wipe everything
  const existing: TranscriptStore = existsSync(OUTPUT)
    ? JSON.parse(readFileSync(OUTPUT, "utf8"))
    : {};

  const store: TranscriptStore = { ...existing };
  let success = 0;
  let skipped = 0;
  let cached = 0;

  for (const videoId of ids) {
    if (store[videoId]) {
      console.log(`  [cached] ${videoId}  ${store[videoId].length} sections`);
      cached++;
      continue;
    }
    process.stdout.write(`  [fetch ] ${videoId}  `);
    const t = await fetchOne(videoId);
    if (t) {
      store[videoId] = t;
      console.log(`${t.length} sections`);
      success++;
    } else {
      console.log("skip (no captions)");
      skipped++;
    }
    // be polite
    await new Promise((r) => setTimeout(r, 800));
  }

  mkdirSync(path.dirname(OUTPUT), { recursive: true });
  writeFileSync(OUTPUT, JSON.stringify(store, null, 2));

  const totalKB = Math.round(JSON.stringify(store).length / 1024);
  console.log(`\nwrote ${Object.keys(store).length} transcripts (${totalKB}KB) → ${OUTPUT}`);
  console.log(`  ${cached} already cached, ${success} new fetched, ${skipped} skipped`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
