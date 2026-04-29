import { access, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dataPath = path.join(root, "data", "logos.json");
const data = JSON.parse(await readFile(dataPath, "utf8"));

let missingFiles = 0;
let missingMetadata = 0;

for (const logo of data.logos) {
  try {
    await access(path.join(root, logo.file));
  } catch {
    missingFiles += 1;
  }

  if (!logo.company || !logo.sector || !logo.industry || !logo.oneLine) {
    missingMetadata += 1;
  }
}

if (missingFiles || missingMetadata) {
  console.error(`Missing logo files: ${missingFiles}`);
  console.error(`Missing metadata fields: ${missingMetadata}`);
  process.exit(1);
}

console.log(`Validated ${data.logos.length} logos`);
