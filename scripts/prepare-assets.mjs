import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

await mkdir('public/assets/optimized', { recursive: true });
await cp('assets', 'public/assets', { recursive: true });
// The original legacy PDF is preserved in assets/. Public downloads use the authoritative source.
const graduateResume = 'content-sources/resume/IBRAHIM_RESUME_Graduate.pdf';
await cp(graduateResume, 'public/assets/resume/Ibrahim-Sharif-Graduate-Resume.pdf');
await cp(graduateResume, 'public/assets/resume/Ibrahim Sharif Resume v4.pdf');
await mkdir('src/app/fonts', { recursive: true });
for (const [family, files] of Object.entries({
  geist: [
    'geist-latin-400-normal.woff2',
    'geist-latin-500-normal.woff2',
    'geist-latin-600-normal.woff2',
  ],
  'geist-mono': ['geist-mono-latin-400-normal.woff2'],
  'instrument-serif': [
    'instrument-serif-latin-400-normal.woff2',
    'instrument-serif-latin-400-italic.woff2',
  ],
})) {
  for (const file of files)
    await cp(`node_modules/@fontsource/${family}/files/${file}`, `src/app/fonts/${file}`);
  await cp(`node_modules/@fontsource/${family}/LICENSE`, `src/app/fonts/${family}-LICENSE.txt`);
}
for (const width of [800, 1600]) {
  await sharp('assets/img/dashboard.png')
    .resize({ width })
    .webp({ quality: 85 })
    .toFile(`public/assets/optimized/automark-${width}.webp`);
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#f4f1e8"/><path d="M64 94h1072M64 560h1072" stroke="#b4bfa7"/><text x="64" y="72" fill="#263d30" font-family="sans-serif" font-weight="600" font-size="40" letter-spacing="-5">is.</text><text x="1136" y="66" text-anchor="end" fill="#52614a" font-family="sans-serif" font-size="17">IBRAHIM SHARIF · SOFTWARE ENGINEER</text><text x="64" y="214" fill="#171b1a" font-family="sans-serif" font-size="30">Hey, I’m Ibrahim.</text><text x="60" y="323" fill="#171b1a" font-family="sans-serif" font-size="85" letter-spacing="-4">I like figuring things out.</text><text x="64" y="425" fill="#263d30" font-family="Georgia,serif" font-style="italic" font-size="95" letter-spacing="-3">And building them.</text><text x="64" y="530" fill="#52614a" font-family="sans-serif" font-size="20">Across the stack. Distributed systems. Applied AI.</text><text x="1136" y="595" text-anchor="end" fill="#52614a" font-family="sans-serif" font-size="18">Sydney, Australia / ibrahimsheriiff.com</text></svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/og-image.png');
const caseSocial = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#dfe7d9"/><path d="M64 105h1072M64 526h1072" stroke="#a7b79a"/><text x="64" y="74" fill="#263d30" font-family="sans-serif" font-weight="600" font-size="38" letter-spacing="-4">is.</text><text x="1136" y="70" text-anchor="end" fill="#455c3d" font-family="sans-serif" font-size="18">IBRAHIM SHARIF / ENGINEERING CASE STUDY</text><text x="64" y="183" fill="#455c3d" font-family="monospace" font-size="23">AUTOMARK</text><text x="60" y="290" fill="#171b1a" font-family="sans-serif" font-size="84" letter-spacing="-4">From commit</text><text x="64" y="394" fill="#263d30" font-family="Georgia,serif" font-size="100" font-style="italic" letter-spacing="-3">to feedback.</text><text x="64" y="477" fill="#455c3d" font-family="sans-serif" font-size="24">Full-stack integration. Independent workers. Tested end to end.</text><text x="64" y="579" fill="#455c3d" font-family="sans-serif" font-size="20">Western Sydney University · Backend Lead · 2025</text></svg>`;
await sharp(Buffer.from(caseSocial)).png().toFile('public/automark-og.png');
await writeFile(
  'public/icon.svg',
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#263d30"/><text x="13" y="47" font-family="Arial,sans-serif" font-size="43" font-weight="bold" letter-spacing="-6" fill="#f4f1e8">is.</text></svg>',
);
// Preserve the identity of originals; only generated copies belong in public/.
const manifest = JSON.parse(
  await readFile('.local/recovery/manifest.json', 'utf8').catch(() => '{}'),
);
if (Object.keys(manifest).length)
  console.log(
    `Prepared static assets; ${Object.keys(manifest).length} original files recorded in recovery manifest.`,
  );
console.log(`Static image variants and social preview ready in ${path.resolve('public')}`);

// Genuine React UI, captured offline from the pinned EquityGuard source.
await mkdir('public/assets/equityguard', { recursive: true });
await cp(
  'content-sources/equityguard/react-watchlist.png',
  'public/assets/equityguard/react-watchlist.png',
);
for (const width of [800, 1600]) {
  await sharp('content-sources/equityguard/react-watchlist.png')
    .resize({ width })
    .webp({ quality: 86 })
    .toFile(`public/assets/equityguard/watchlist-${width}.webp`);
}
const equitySocial = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f4f1e8"/><rect x="900" width="300" height="630" fill="#d5dece"/><path d="M64 104h1072M64 526h1072" stroke="#a7b79a"/><text x="64" y="74" fill="#263d30" font-family="sans-serif" font-weight="600" font-size="38" letter-spacing="-4">is.</text><text x="1136" y="70" text-anchor="end" fill="#455c3d" font-family="monospace" font-size="17">ENGINEERING STUDIES / 02</text><text x="64" y="177" fill="#455c3d" font-family="monospace" font-size="23">EQUITYGUARD</text><text x="60" y="292" fill="#171b1a" font-family="sans-serif" font-size="85" letter-spacing="-4">An agent with tools.</text><text x="64" y="403" fill="#263d30" font-family="Georgia,serif" font-size="100" font-style="italic" letter-spacing="-3">And boundaries.</text><text x="64" y="478" fill="#455c3d" font-family="sans-serif" font-size="23">React / FastAPI / Custom agent loop / Six tools</text><text x="64" y="579" fill="#455c3d" font-family="sans-serif" font-size="19">Ibrahim Sharif · Independent full-stack engineering</text><g fill="none" stroke="#5b7154" stroke-width="1.5"><circle cx="1010" cy="555" r="10"/><path d="M1020 555h30m0 0 20-16h43m-63 16h63m-63 0 20 16h43"/></g></svg>`;
await sharp(Buffer.from(equitySocial)).png().toFile('public/equityguard-og.png');

// Original editorial artwork, not a DAITA application screenshot or Deloitte branding.
const daitaSocial = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#ded2bd"/><path d="M64 100h1072M64 525h1072" stroke="#a29e89"/><text x="64" y="72" fill="#263d30" font-family="sans-serif" font-weight="600" font-size="38" letter-spacing="-4">is.</text><text x="1136" y="67" text-anchor="end" fill="#4e5946" font-family="monospace" font-size="17">DAITA / ENGINEERING CASE STUDY</text><text x="64" y="170" fill="#4e5946" font-family="monospace" font-size="19">UNIVERSITY–INDUSTRY COLLABORATION / MARCH–JUNE 2025</text><text x="60" y="287" fill="#171b1a" font-family="sans-serif" font-size="83" letter-spacing="-4">Less manual review.</text><text x="64" y="394" fill="#263d30" font-family="Georgia,serif" font-size="97" font-style="italic" letter-spacing="-3">A clearer workflow.</text><text x="64" y="476" fill="#4e5946" font-family="sans-serif" font-size="22">Inconsistent documents → structured, reviewable information</text><text x="64" y="577" fill="#4e5946" font-family="sans-serif" font-size="18">Ibrahim Sharif / Western Sydney University</text><path d="M1000 548h80v45h-80zm10 12h60m-60 11h60m-60 11h38" fill="none" stroke="#708063"/></svg>`;
await sharp(Buffer.from(daitaSocial)).png().toFile('public/daita-og.png');

await mkdir('public/assets/mediquery', { recursive: true });
await cp(
  'content-sources/mediquery/landing-offline.png',
  'public/assets/mediquery/landing-offline.png',
);
await sharp('content-sources/mediquery/landing-offline.png')
  .resize({ width: 1000 })
  .webp({ quality: 87 })
  .toFile('public/assets/mediquery/landing-1000.webp');
for (const [slug, name, headline, emphasis, background] of [
  ['mediquery', 'MEDIQUERY', 'An answer is only as good', 'as its evidence.', '#e0e7d7'],
  [
    'returns-agent',
    'RETURNS &amp; RESOLUTION AGENT',
    'Let AI understand.',
    'Let rules decide.',
    '#d8dfcc',
  ],
]) {
  const artwork = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="${background}"/><path d="M64 104h1072M64 526h1072" stroke="#a3b293"/><text x="64" y="75" fill="#263d30" font-family="sans-serif" font-weight="600" font-size="38" letter-spacing="-4">is.</text><text x="64" y="180" fill="#4b6040" font-family="monospace" font-size="22">${name}</text><text x="60" y="297" fill="#171b1a" font-family="sans-serif" font-size="77" letter-spacing="-3">${headline}</text><text x="64" y="410" fill="#263d30" font-family="Georgia,serif" font-style="italic" font-size="100" letter-spacing="-3">${emphasis}</text><text x="64" y="484" fill="#4b6040" font-family="sans-serif" font-size="23">Independent software engineering / Ibrahim Sharif</text><text x="64" y="579" fill="#4b6040" font-family="monospace" font-size="18">THE CURIOUS ENGINEER / ENGINEERING STUDIES</text></svg>`;
  await sharp(Buffer.from(artwork)).png().toFile(`public/${slug}-og.png`);
}

// Bespoke Lab social artwork: logical linework, no fake live-system imagery.
for (const [slug, title, emphasis] of [
  ['lab', 'Let’s take things apart.', 'And see how they work.'],
  ['lab-automark', 'Accepting', 'isn’t finishing.'],
]) {
  const artwork = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#20382c"/><path d="M64 100h1072M64 535h1072" stroke="#61775f"/><text x="64" y="73" fill="#f4f1e8" font-family="sans-serif" font-weight="600" font-size="38" letter-spacing="-4">is.</text><text x="1136" y="70" text-anchor="end" fill="#c0cdbb" font-family="monospace" font-size="18">THE ENGINEERING LAB</text><text x="60" y="233" fill="#f4f1e8" font-family="sans-serif" font-size="80" letter-spacing="-4">${title}</text><text x="64" y="339" fill="#d0d8af" font-family="Georgia,serif" font-size="88" font-style="italic" letter-spacing="-3">${emphasis}</text><g fill="none" stroke="#a8b997" stroke-width="2"><path d="M80 436h90m120 0h65m130 0h80m100 0h160"/><rect x="170" y="410" width="120" height="52"/><path d="M186 423v26m15-26v26m15-26v26m15-26v26m15-26v26"/><rect x="355" y="393" width="130" height="26"/><rect x="355" y="425" width="130" height="26"/><rect x="355" y="457" width="130" height="26"/><path d="m595 435 14 14 25-31"/></g><text x="64" y="588" fill="#c0cdbb" font-family="sans-serif" font-size="20">Ibrahim Sharif / Change one thing. Follow the consequences.</text></svg>`;
  await sharp(Buffer.from(artwork)).png().toFile(`public/${slug}-og.png`);
}

for (const [slug, title, emphasis, bg, sketch] of [
  [
    'equityguard',
    'A tool call.',
    'Something to inspect.',
    '#dfe6d4',
    '<path d="M80 455h800"/><rect x="80" y="425" width="200" height="60"/><rect x="380" y="425" width="200" height="60"/><rect x="680" y="425" width="200" height="60"/>',
  ],
  [
    'mediquery',
    'Follow the evidence.',
    'All the way to a sentence.',
    '#e6eadb',
    '<path d="M90 405h160v105H90zm25 25h110m-110 20h110m-110 20h70M300 455h160m20-50h160v105H480zm25 25h110m-110 20h110m-110 20h70M690 455h160"/>',
  ],
  [
    'returns-agent',
    'First, ask.',
    'Then let rules decide.',
    '#dcd9c6',
    '<path d="M80 455h240m0 0 90-35h240m-330 35 90 35h240"/><circle cx="320" cy="455" r="10"/>',
  ],
  [
    'daita',
    'Messy on arrival.',
    'Reviewable by design.',
    '#ded4c1',
    '<path d="M80 410h360v100H80zm180 0v100M95 440h330M95 470h330M510 455h100m50-45h360v100H660zm180 0v100m-165-70h330m-330 30h330"/>',
  ],
]) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="${bg}"/><path d="M64 100h1072M64 535h1072" stroke="#8f9f80"/><text x="64" y="70" fill="#263d30" font-family="sans-serif" font-size="38" font-weight="600">is.</text><text x="1136" y="65" text-anchor="end" fill="#405136" font-family="monospace" font-size="18">THE ENGINEERING LAB / ${slug.toUpperCase()}</text><text x="60" y="225" fill="#263d30" font-family="sans-serif" font-size="78" letter-spacing="-3">${title}</text><text x="64" y="330" fill="#3f5734" font-family="Georgia,serif" font-style="italic" font-size="82" letter-spacing="-3">${emphasis}</text><g fill="none" stroke="#5c7450" stroke-width="2">${sketch}</g><text x="64" y="585" fill="#405136" font-family="sans-serif" font-size="20">Ibrahim Sharif / A browser-only engineering experiment</text></svg>`;
  await sharp(Buffer.from(svg)).png().toFile(`public/lab-${slug}-og.png`);
}
