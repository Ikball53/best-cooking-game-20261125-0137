// main.ts — Ember & Thyme entry harness.
//
// Copies game/ and screenshots/ from this repo into the output directory
// (MAKEFUN_OUTPUT_DIR, default /output) and writes dossier.json built with
// the kit's vendored buildDossier. Run with: node main.ts
// (Node 22+ strips types natively; no build step needed).
import { buildDossier, DOSSIER_MAX_BYTES, DOSSIER_MAX_IMAGES, GAME_PATH_MAX_BYTES, INDEX_HTML_MAX_BYTES } from "./vendor/makefun-game.ts";
import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)));
const outputDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");

mkdirSync(outputDir, { recursive: true });

for (const dir of ["game", "screenshots"]) {
  const src = join(repoRoot, dir);
  if (!existsSync(src)) throw new Error(`missing ${dir}/ in ${repoRoot}`);
  cpSync(src, join(outputDir, dir), { recursive: true, force: true });
  console.log(`copied ${dir}/ -> ${join(outputDir, dir)}`);
}

// Caps for the dossier builder, taken from the kit's own exported limits.
const caps = {
  text_max_bytes: DOSSIER_MAX_BYTES,
  image_max_bytes: DOSSIER_MAX_IMAGES,
  total_max_bytes: DOSSIER_MAX_BYTES,
  game_path_max_bytes: GAME_PATH_MAX_BYTES,
  index_html_max_bytes: INDEX_HTML_MAX_BYTES,
  dossier_max_bytes: DOSSIER_MAX_BYTES,
  dossier_max_images: DOSSIER_MAX_IMAGES,
};

// buildDossier returns the dossier as canonical JSON bytes (a Uint8Array).
// Write those exact bytes so the gate's byte-for-byte rebuild matches.
const dossier = await buildDossier(repoRoot, caps);
const dossierPath = join(outputDir, "dossier.json");
writeFileSync(dossierPath, dossier);
console.log(`dossier written: ${dossierPath} (${dossier.length} bytes)`);

// Verify the output is complete before reporting success: the game must be
// present, the cover + extra screenshots must exist, and the dossier must
// parse back as JSON.
import { readdirSync, readFileSync } from "node:fs";
if (!existsSync(join(outputDir, "game", "index.html")))
  throw new Error("output is missing game/index.html");
const shots = readdirSync(join(outputDir, "screenshots")).filter(f => /\.(png|jpe?g)$/i.test(f)).sort();
if (shots.length < 3) throw new Error(`output holds only ${shots.length} screenshot(s), need at least 3`);
const parsed = JSON.parse(readFileSync(dossierPath, "utf8"));
console.log(`verified: ${shots.length} screenshots (${shots.join(", ")}), dossier.json parses (keys: ${Object.keys(parsed).join(", ")})`);
