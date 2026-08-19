/**
 * Generates the social share images in assets/img/ from the brand mark.
 *
 * These are what WhatsApp, Twitter/X, LinkedIn, Telegram and iMessage render
 * when someone pastes a link to the site, so they have to be raster — no link
 * scraper reads SVG.
 *
 *   node scripts/make-og.js
 *
 * Requires a local Chrome (set CHROME_PATH to override) and Pillow for the
 * PNG -> JPEG step (python -m pip install pillow).
 *
 * Writes:
 *   og-image.jpg          1200x630  Arabic card   -> /      og:image
 *   og-image-en.jpg       1200x630  English card  -> /en/   og:image
 *   apple-touch-icon.png   180x180  logo tile     -> iOS home screen
 *   icon-192.png           192x192  logo tile     -> web manifest
 *   icon-512.png           512x512  logo tile     -> web manifest
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'assets', 'img');
const FONTS = path.join(ROOT, 'assets', 'fonts');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'rawae-og-'));

const CHROME = process.env.CHROME_PATH ||
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PYTHON = process.env.PYTHON || 'python';

/* ------------------------------------------------------------- tokens */
const C = {
  ink:       '#14130F',
  gold:      '#B58B3C',
  goldLight: '#E2C795',
  goldDeep:  '#8A6626',
  tile:      '#F2EDE1',
  paper:     '#F7F3EA',
  mutedDark: '#A79E8B',
};

/* The brand mark, identical geometry to assets/img/logo-mark.svg. */
const MARK = [
  '<path d="M142 184 L142 414"/>',
  '<path d="M142 184 L282 364 C326 422 366 430 366 392 L366 184"/>',
  '<path d="M366 184 L432 184 C522 184 522 304 432 304 L366 304"/>',
  '<path d="M398 304 L496 414"/>',
].join('');

const tile = (size) => [
  '<svg class="tile" width="' + size + '" height="' + size + '" viewBox="0 0 640 640">',
  '<rect width="640" height="640" rx="96" fill="' + C.tile + '"/>',
  '<g fill="none" stroke="' + C.gold + '" stroke-width="62"',
  ' stroke-linecap="round" stroke-linejoin="round">' + MARK + '</g>',
  '</svg>',
].join('');

/* Inlined as data URIs: a file:// page cannot fetch fonts from disk. */
function face(family, weight, file) {
  const b64 = fs.readFileSync(path.join(FONTS, file)).toString('base64');
  return "@font-face{font-family:'" + family + "';font-weight:" + weight + ';' +
         'font-style:normal;src:url(data:font/woff2;base64,' + b64 + ")format('woff2');}";
}

/* ---------------------------------------------------------------- cards */
const CARDS = [
  {
    name: 'og-image',
    lang: 'ar',
    dir: 'rtl',
    font: "'IBM Plex Sans Arabic'",
    faces: [
      face('IBM Plex Sans Arabic', 400, 'plex-arabic-arabic-400.woff2'),
      face('IBM Plex Sans Arabic', 700, 'plex-arabic-arabic-700.woff2'),
    ],
    title: 'مصنع روائع الإنتاج للبلاستيك',
    titleSize: 62,
    titleWeight: 700,
    sub: 'نصنع البلاستيك حسب طلبك',
    subSize: 34,
    meta: 'RAWAE AL INTAJ PLASTIC FACTORY &middot; RIYADH',
  },
  {
    name: 'og-image-en',
    lang: 'en',
    dir: 'ltr',
    font: "'IBM Plex Sans'",
    faces: [
      face('IBM Plex Sans', 400, 'plex-sans-latin-400.woff2'),
      face('IBM Plex Sans', 600, 'plex-sans-latin-600.woff2'),
    ],
    title: 'RAWAE AL INTAJ',
    titleSize: 68,
    titleWeight: 600,
    titleTrack: '-.01em',
    sub: 'Plastic bags and film, made to your spec',
    subSize: 31,
    meta: 'PLASTIC FACTORY &middot; RIYADH, SAUDI ARABIA',
  },
];

function cardHtml(c) {
  const css = [
    c.faces.join(''),
    face('IBM Plex Mono', 500, 'plex-mono-latin-500.woff2'),
    '*{margin:0;padding:0;box-sizing:border-box}',
    'html,body{width:1200px;height:630px}',
    'body{background:' + C.ink + ';font-family:' + c.font + ',sans-serif;',
    '-webkit-font-smoothing:antialiased;display:flex;align-items:center;',
    'justify-content:center;position:relative;overflow:hidden}',
    /* Warm key light from above, echoing the site's dark sections. */
    '.glow{position:absolute;inset:0;background:',
    'radial-gradient(1100px 620px at 50% -14%,rgba(181,139,60,.28),transparent 62%),',
    'radial-gradient(760px 500px at 6% 106%,rgba(181,139,60,.13),transparent 60%)}',
    '.grid{position:absolute;inset:0;background-image:',
    'linear-gradient(to right,rgba(226,199,149,.05) 1px,transparent 1px),',
    'linear-gradient(to bottom,rgba(226,199,149,.05) 1px,transparent 1px);',
    'background-size:100px 100px;',
    '-webkit-mask-image:radial-gradient(900px 520px at 50% 42%,#000 30%,transparent 78%)}',
    '.frame{position:absolute;inset:26px;border:1px solid rgba(226,199,149,.13)}',
    '.stack{position:relative;text-align:center;padding:0 92px}',
    '.tile{display:block;margin:0 auto 40px;box-shadow:0 24px 60px -24px rgba(0,0,0,.75)}',
    'h1{font-size:' + c.titleSize + 'px;font-weight:' + c.titleWeight + ';',
    'letter-spacing:' + (c.titleTrack || '0') + ';line-height:1.16;color:' + C.paper + '}',
    'p{margin-top:18px;font-size:' + c.subSize + 'px;font-weight:400;',
    'line-height:1.35;color:' + C.goldLight + '}',
    '.rule{width:64px;height:2px;margin:38px auto 0;',
    'background:linear-gradient(90deg,transparent,' + C.gold + ',transparent)}',
    /* The Latin strapline stays LTR even on the Arabic card. */
    ".meta{margin-top:26px;font-family:'IBM Plex Mono',monospace;font-weight:500;",
    'font-size:16px;letter-spacing:.26em;color:' + C.mutedDark + ';',
    'direction:ltr;unicode-bidi:isolate}',
    '.bar{position:absolute;inset:auto 0 0 0;height:8px;background:linear-gradient(90deg,',
    C.goldDeep + ',' + C.gold + ' 38%,' + C.goldLight + ' 66%,' + C.gold + ')}',
  ].join('');

  return [
    '<!doctype html>',
    '<html lang="' + c.lang + '" dir="' + c.dir + '"><head><meta charset="utf-8">',
    '<style>' + css + '</style></head><body>',
    '<div class="glow"></div><div class="grid"></div><div class="frame"></div>',
    '<div class="stack">',
    tile(150),
    '<h1>' + c.title + '</h1>',
    '<p>' + c.sub + '</p>',
    '<div class="rule"></div>',
    '<div class="meta">' + c.meta + '</div>',
    '</div>',
    '<div class="bar"></div>',
    '</body></html>',
  ].join('');
}

/* Square icon: the favicon tile at the raster sizes iOS and Android want. */
function iconHtml(size) {
  return [
    '<!doctype html><html><head><meta charset="utf-8"><style>',
    '*{margin:0;padding:0}',
    'html,body{width:' + size + 'px;height:' + size + 'px;background:transparent}',
    'svg{display:block}',
    '</style></head><body>' + tile(size) + '</body></html>',
  ].join('');
}

/* ------------------------------------------------------------------ run */
function shoot(html, outPng, w, h, transparent) {
  const src = path.join(TMP, path.basename(outPng, '.png') + '.html');
  fs.writeFileSync(src, html, 'utf8');
  const args = [
    '--headless',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--virtual-time-budget=3000',
    '--window-size=' + w + ',' + h,
    '--screenshot=' + outPng,
  ];
  if (transparent) args.push('--default-background-color=00000000');
  args.push('file:///' + src.replace(/\\/g, '/'));
  execFileSync(CHROME, args, { stdio: 'ignore' });
  if (!fs.existsSync(outPng)) throw new Error('Chrome produced no output for ' + outPng);
}

const TO_JPEG = [
  'import sys',
  'from PIL import Image',
  "Image.open(sys.argv[1]).convert('RGB').save(",
  "    sys.argv[2], 'JPEG', quality=int(sys.argv[3]), optimize=True, progressive=True)",
].join('\n');

function toJpeg(png, jpg, quality) {
  execFileSync(PYTHON, ['-c', TO_JPEG, png, jpg, String(quality)], { stdio: 'inherit' });
  fs.unlinkSync(png);
}

const written = [];

for (const c of CARDS) {
  const png = path.join(TMP, c.name + '.png');
  const jpg = path.join(OUT, c.name + '.jpg');
  shoot(cardHtml(c), png, 1200, 630, false);
  toJpeg(png, jpg, 88);
  written.push([c.name + '.jpg', fs.statSync(jpg).size]);
}

for (const icon of [[180, 'apple-touch-icon'], [192, 'icon-192'], [512, 'icon-512']]) {
  const out = path.join(OUT, icon[1] + '.png');
  shoot(iconHtml(icon[0]), out, icon[0], icon[0], true);
  written.push([icon[1] + '.png', fs.statSync(out).size]);
}

fs.rmSync(TMP, { recursive: true, force: true });
for (const w of written) console.log('  ' + w[0].padEnd(22) + (w[1] / 1024).toFixed(1) + ' KB');
