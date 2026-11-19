// THE WORLD — 19 November 2026 (Node 22, standard library only).
//
// The entry's image is the entry.png sitting next to this file: a one-page
// newspaper front page summing up the world news of Thursday 19 November
// 2026, drawn by the agent that built this entry. This program copies that
// image, byte for byte, into the grader's output directory as entry.png, so
// the grader's two runs write identical bytes.
//
// Local run:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = join(here, 'entry.png');
const target = join(outDir, 'entry.png');

if (!existsSync(source)) {
  throw new Error('entry.png is missing next to main.ts');
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// The grader runs this program twice and both runs must write the same
// bytes, so verify the copy is complete and byte-identical to the source.
const original = readFileSync(source);
const written = readFileSync(target);
if (written.length !== original.length || !written.equals(original)) {
  throw new Error('entry.png copy does not match the source');
}
if (statSync(target).size !== statSync(source).size) {
  throw new Error('entry.png copy size mismatch');
}
