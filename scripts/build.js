/**
 * Build the plug-in: npm run build
 *
 * Zips plugin/ into dist/TheLordOfTheRingsLCG-Bleed.seext, after checking it:
 * the manifest's catalogue ID, and that every script, component and resource
 * of this plug-in that its files refer to exists.
 *
 *   --timestamp 2026-11-20-9-30-0-0   set the catalogue timestamp in the bundle
 *                                     (releases do this; plugin/ is unchanged)
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { zipSync } from "fflate";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const SOURCE = join(ROOT, "plugin");
export const PLUGIN_FILE = "TheLordOfTheRingsLCG-Bleed.seext";
/** This plug-in's own resource folder. */
const OWN = "TheLordOfTheRingsLCG-Bleed/";
/** Strange Eons' catalogue ID: a fixed UUID and a release timestamp. */
const CATALOGUE_ID = /^id = CATALOGUEID\{([0-9a-f-]{36}):(\d{4}(?:-\d{1,3}){6})\}$/m;
const TEXT = /\.(js|settings|properties|classmap)$|^eons-plugin$/;

/** A catalogue timestamp for a date: year-month-day-hour-minute-second-millisecond (UTC). */
export const catalogueTimestamp = (date) =>
  [
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    date.getUTCMilliseconds(),
  ].join("-");

/** Every file under plugin/, by its path in the bundle ("resources/…"). */
function sourceFiles() {
  const files = new Map();
  const walk = (folder) => {
    for (const entry of readdirSync(folder, { withFileTypes: true })) {
      const path = join(folder, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (entry.name !== ".DS_Store")
        files.set(relative(SOURCE, path).split(sep).join("/"), readFileSync(path));
    }
  };
  walk(SOURCE);
  return files;
}

/** Problems with the plug-in's files, as messages. */
function check(files) {
  const problems = [];
  const text = (path) => files.get(path).toString("latin1");
  const resource = (path) => files.has(`resources/${path}`);
  if (!files.has("eons-plugin")) return ["plugin/eons-plugin is missing."];
  const manifest = text("eons-plugin");
  if (!CATALOGUE_ID.test(manifest)) problems.push("eons-plugin: the `id = CATALOGUEID{…}` line is missing or malformed.");
  for (const [, script] of manifest.matchAll(/^res:\/\/(\S+)$/gm))
    if (!resource(script)) problems.push(`eons-plugin: plug-in script ${script} is missing.`);
  for (const [path] of files) {
    if (!TEXT.test(path.split("/").at(-1))) continue;
    const content = text(path);
    if (path.endsWith(".classmap"))
      for (const [, script] of content.matchAll(/diy:(\S+\.js)/g))
        if (!resource(script)) problems.push(`${path}: component script ${script} is missing.`);
    // References to this plug-in's own resources (frames, icons, images, text).
    for (const [reference] of content.matchAll(/TheLordOfTheRingsLCG-Bleed\/[\w./-]+\.(?:png|jp2|js|settings|classmap)/g)) {
      if (!resource(reference)) problems.push(`${path}: ${reference} is missing.`);
    }
  }
  if (![...files.keys()].some((path) => path.startsWith(`resources/${OWN}`)))
    problems.push(`plugin/resources/${OWN} is missing.`);
  return problems;
}

/** Zip plugin/ into dist/, optionally with a new catalogue timestamp. */
export function build({ timestamp } = {}) {
  const files = sourceFiles();
  const problems = check(files);
  if (problems.length) throw new Error(`The plug-in has problems:\n- ${[...new Set(problems)].join("\n- ")}`);
  if (timestamp) {
    if (!/^\d{4}(-\d{1,3}){6}$/.test(timestamp)) throw new Error(`Not a catalogue timestamp: ${timestamp}`);
    const manifest = files.get("eons-plugin").toString("latin1").replace(CATALOGUE_ID, (_, uuid) => `id = CATALOGUEID{${uuid}:${timestamp}}`);
    files.set("eons-plugin", Buffer.from(manifest, "latin1"));
  }
  // The root file first, then everything else in a stable order.
  const zip = {};
  for (const path of ["eons-plugin", ...[...files.keys()].filter((p) => p !== "eons-plugin").sort()])
    zip[path] = new Uint8Array(files.get(path));
  const file = join(ROOT, "dist", PLUGIN_FILE);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, zipSync(zip, { level: 6 }));
  const id = CATALOGUE_ID.exec(files.get("eons-plugin").toString("latin1"));
  return { file, files: files.size, timestamp: id[2] };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const index = process.argv.indexOf("--timestamp");
  try {
    const result = build({ timestamp: index >= 0 ? process.argv[index + 1] : undefined });
    console.log(`Built ${result.files} files (catalogue timestamp ${result.timestamp}) → ${result.file}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
