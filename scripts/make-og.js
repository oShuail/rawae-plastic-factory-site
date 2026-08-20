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
const MARK = '<path transform="translate(80 153) scale(.5627)" d="M30,0L66,0 83,2 100,7 112,12 122,19 133,28 143,39 159,62 218,167 392,479 405,497 412,504 417,506 421,504 422,500 421,469 422,453 422,267 423,257 426,252 437,246 458,244 518,245 534,244 657,244 679,245 698,243 720,232 730,225 739,216 745,207 750,195 754,175 754,161 751,148 746,137 739,126 731,120 720,112 708,107 692,102 669,99 447,99 432,96 428,93 427,88 423,58 424,23 426,13 428,8 431,5 436,5 517,5 528,4 638,4 688,6 718,11 745,20 765,28 789,43 810,61 823,77 837,102 846,126 852,149 853,166 852,190 847,216 841,234 832,252 814,277 800,291 783,304 765,315 740,324 718,329 716,330 715,334 717,340 843,561 848,572 849,580 846,585 839,589 828,590 769,590 756,588 748,582 615,347 609,340 602,338 520,337 516,337 515,339 514,365 513,376 513,388 513,494 512,508 508,532 502,549 497,561 489,571 478,580 466,586 457,589 430,593 410,593 398,591 376,585 363,579 349,569 336,556 326,544 315,528 102,140 99,136 95,135 92,137 92,142 92,566 89,574 84,581 78,585 68,588 54,590 28,590 16,588 9,585 6,581 3,574 0,559 0,33 3,17 7,9 16,3 29,1Z"/>';

const tile = (size) => [
  '<svg class="tile" width="' + size + '" height="' + size + '" viewBox="0 0 640 640">',
  '<rect width="640" height="640" rx="96" fill="' + C.tile + '"/>',
  '<g fill="' + C.gold + '">' + MARK + '</g>',
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
