# Website copy — full transcript for rewriting

Every piece of visible text on the site, in the order it appears, with an ID and an
explanation of what it is and where it sits. Arabic (`/`) and English (`/en/`) are the
same site in two languages.

---

## BRIEF FOR THE REWRITER (paste this part too)

**The business.** Rawae Al Intaj Plastic Factory (مصنع روائع الإنتاج للبلاستيك) — a plastic
factory in Riyadh, Saudi Arabia, in the Industrial City / Industrial Gate area. They
manufacture plastic film and bags: shopping bags, municipal and refuse sacks, food storage
bags, film on rolls, OEM/custom production, and printing on bags. They print in-house.
They sell wholesale/commercial volumes to businesses, not to consumers. The two selling
points running through the whole site: **they are the actual factory, not a middleman or
reseller**, and **the customer sets the spec** (size, gauge/thickness, colour, print,
quantity) and they build to it.

**Audience.** B2B buyers in Saudi Arabia: retail shops, restaurants, wholesalers,
factories, facilities/cleaning companies, logistics firms. Purchasing managers and owners.
They care about spec accuracy, consistency between batches, delivery on time, and price.

**Goal of every page section.** Get the reader to request a quote — by WhatsApp or the form.

**What's wrong with the current copy** (per the site owner): it reads like it was written by
AI. It's clipped, over-polished, and leans on em-dashes and neat parallel constructions in
almost every line. Aim for how a real factory owner would talk to a customer: plain,
concrete, confident, a bit more human, no marketing filler.

### Rules

1. **Keep both languages.** The Arabic is the primary version; English is for
   international/expat buyers. They should say the same thing, but the English should read
   like English, not like a translation of the Arabic.
2. **Respect the length limits.** This is a tight design. A "kicker" that grows from 2 words
   to 8 will break the layout. Limits are given per item — treat them as real.
3. **Do not change**: phone numbers, the email address, the company name, the address, the
   `01`–`06` numbering, or the "developed by shotix" credit.
4. **Arabic should be natural Saudi business Arabic** — formal enough for a company site,
   not stiff MSA-textbook, not slangy.
5. **Do not add claims that aren't already there.** No invented certifications, years in
   business, client counts, capacity figures, or awards. If a number isn't in this document,
   the factory hasn't given it to us.
6. Em-dashes are heavily overused in the current text. Cut most of them.

### How to return it

Give the result back as a plain list, one line per item, in this exact shape — nothing else:

```
HERO-H1-A | AR: <new arabic> | EN: <new english>
HERO-LEAD | AR: <new arabic> | EN: <new english>
```

Keep every ID, even the ones you didn't change. If an item should be deleted entirely, write
`DELETE` as the value. If you want to suggest a brand-new item, add it at the bottom with a
`NEW-` prefix and describe where it should go.

---

## 1. SEO — browser tab and Google result

Not visible on the page itself. The title shows in the browser tab and as the blue link in
Google; the description is the grey text under it.

| ID | What it is | Limit | Arabic (current) | English (current) |
|---|---|---|---|---|
| `SEO-TITLE` | Page title / Google headline | ~60 chars | مصنع روائع الإنتاج للبلاستيك \| تصنيع أفلام وأكياس بلاستيكية — الرياض | RAWAE AL INTAJ Plastic Factory \| Plastic Film & Bag Manufacturing — Riyadh |
| `SEO-DESC` | Google search snippet | 150–160 chars | مصنع روائع الإنتاج للبلاستيك في الرياض: تصنيع أفلام البلاستيك وأكياس التسوق والأكياس البلدية وأكياس النفايات وأكياس حفظ الأغذية، بمقاسات وسماكات وطباعة حسب مواصفات العميل. اطلب عرض سعر. | RAWAE AL INTAJ Plastic Factory, Riyadh: manufacturing plastic film, shopping bags, refuse and municipal sacks and food storage bags — made to your size, gauge and print. Request a quote. |

## 2. Header — the bar fixed at the top of every screen

Logo on one side, six nav links in the middle, a language toggle and a gold button on the
other side. On phones the links collapse into a hamburger menu.

| ID | What it is | Limit | Arabic (current) | English (current) |
|---|---|---|---|---|
| `NAV-SKIP` | Hidden "skip to content" link for keyboard/screen-reader users | 3 words | تخطَّ إلى المحتوى | Skip to content |
| `BRAND-1` | Company name beside the logo mark | as-is | روائع الإنتاج للبلاستيك | Rawae Al Intaj |
| `BRAND-2` | Small line under the name (English page only) | 4 words | — | Plastic Factory · Riyadh |
| `NAV-1` | Nav link → about section | 1 word | المصنع | Factory |
| `NAV-2` | Nav link → products | 1 word | المنتجات | Products |
| `NAV-3` | Nav link → production process | 1 word | الإنتاج | Production |
| `NAV-4` | Nav link → quality | 1 word | الجودة | Quality |
| `NAV-5` | Nav link → sectors served | 1 word | القطاعات | Sectors |
| `NAV-6` | Nav link → contact | 1 word | تواصل | Contact |
| `HEAD-CTA` | Gold button, top right. The main call to action | 3 words | اطلب عرض سعر | Request a Quote |

## 3. Mobile menu — full-screen menu behind the hamburger

Eight numbered links (01–08) plus two buttons at the bottom. Includes two sections the
desktop nav leaves out.

| ID | What it is | Limit | Arabic (current) | English (current) |
|---|---|---|---|---|
| `MNAV-1` | Menu link 01 | 1–2 words | المصنع | Factory |
| `MNAV-2` | Menu link 02 | 1–2 words | المنتجات | Products |
| `MNAV-3` | Menu link 03 | 1–2 words | الإنتاج | Production |
| `MNAV-4` | Menu link 04 | 1–2 words | الجودة | Quality |
| `MNAV-5` | Menu link 05 | 1–2 words | الرؤية والرسالة | Vision & Mission |
| `MNAV-6` | Menu link 06 | 1–2 words | القطاعات | Sectors |
| `MNAV-7` | Menu link 07 | 1–2 words | من المصنع | Inside the plant |
| `MNAV-8` | Menu link 08 | 1–2 words | تواصل معنا | Contact |
| `MNAV-CTA1` | Gold button at the bottom of the menu | 3 words | اطلب عرض سعر | Request a Quote |
| `MNAV-CTA2` | WhatsApp button at the bottom of the menu | 2 words | واتساب مباشر | WhatsApp |

## 4. Hero — the first full screen, video of the factory floor behind it

Big headline over a dark video. The second half of the headline is highlighted in gold.
Below it: one line of supporting text, two buttons, and a strip of four short proof points.

| ID | What it is | Limit | Arabic (current) | English (current) |
|---|---|---|---|---|
| `HERO-H1-A` | Headline, first line — the largest text on the site | ~25 chars | أفلام وأكياس بلاستيكية | Plastic film and bags, |
| `HERO-H1-B` | Headline, second line, shown in **gold** — should be the punchy half | ~18 chars | على مواصفاتك | built to your spec |
| `HERO-LEAD` | One supporting sentence under the headline | ~70 chars | مقاس، سماكة، طباعة، وكمية — تحددها أنت، ونُنفّذها داخل مصنعنا. | Size, gauge, print and quantity — you set them, we run them in-house. |
| `HERO-CTA1` | Gold button | 3 words | اطلب عرض سعر | Request a Quote |
| `HERO-CTA2` | Secondary WhatsApp button | 1 word | واتساب | WhatsApp |
| `HERO-STRIP-1` | Proof point 1 of 4, tiny text in a row with an icon | 2–3 words | تصنيع حسب الطلب | Made to order |
| `HERO-STRIP-2` | Proof point 2 of 4 | 2–3 words | طباعة داخل المصنع | In-house printing |
| `HERO-STRIP-3` | Proof point 3 of 4 | 2–3 words | كميات جملة | Wholesale volumes |
| `HERO-STRIP-4` | Proof point 4 of 4 | 2–3 words | توريد للمشاريع | Project supply |

## 5. About — "we are the factory" section

A small label, a two-part heading where one word is italicised for emphasis, one sentence,
then three short fact pairs. A photo sits beside it with a dark badge overlapping its corner.

| ID | What it is | Limit | Arabic (current) | English (current) |
|---|---|---|---|---|
| `ABOUT-KICKER` | Small gold label above the heading | 2–3 words | نبذة عن المصنع | About the factory |
| `ABOUT-H2-A` | Heading, part 1 (before the emphasised word) | ~10 chars | مصنع | A factory that |
| `ABOUT-H2-EM` | Heading, the **italic emphasised** word | 1–2 words | يُنتج | makes it |
| `ABOUT-H2-B` | Heading, part 3 (after the emphasis) | ~15 chars | لا وسيط يُورّد | not a middleman |
| `ABOUT-LEAD` | The one sentence under the heading | ~80 chars | نتحكم بالمنتج من الفيلم حتى التعبئة — فتصل المواصفة كما طلبتها. | We control the product from film to packing — so the spec you asked for is the spec you get. |
| `ABOUT-FACT-1K` | Fact 1, label | 1 word | التحكم | Control |
| `ABOUT-FACT-1V` | Fact 1, value | ~25 chars | من الفيلم حتى التعبئة | Film through to packing |
| `ABOUT-FACT-2K` | Fact 2, label | 1 word | الطباعة | Printing |
| `ABOUT-FACT-2V` | Fact 2, value | ~25 chars | داخل المصنع | On our own line |
| `ABOUT-FACT-3K` | Fact 3, label | 1 word | التوريد | Supply |
| `ABOUT-FACT-3V` | Fact 3, value | ~25 chars | كميات تجارية | Commercial volumes |
| `ABOUT-BADGE-K` | Dark badge on the photo, top line | 1 word | الرياض | Riyadh |
| `ABOUT-BADGE-V` | Dark badge, bottom line (the location) | ~35 chars | المدينة الصناعية / البوابة الصناعية | Industrial City / Industrial Gate |

## 6. Products — six cards in a grid

Each card is a numbered box with a title and a one-line descriptor underneath, and links to
the quote form. Titles must stay short or the cards look unbalanced.

| ID | What it is | Limit | Arabic (current) | English (current) |
|---|---|---|---|---|
| `PROD-KICKER` | Small gold label | 1 word | المنتجات | Products |
| `PROD-H2` | Section heading | ~15 chars | ما نُنتجه | What we make |
| `PROD-LEAD` | Sentence beside the heading | ~70 chars | ستة خطوط — كلها قابلة للتخصيص بالمقاس والسماكة والطباعة. | Six lines — every one of them customisable by size, gauge and print. |
| `PROD-1-TITLE` | Card 01 title | ~20 chars | أكياس التسوق | Shopping bags |
| `PROD-1-TAG` | Card 01 descriptor | ~25 chars | مطبوعة وغير مطبوعة | Printed and plain |
| `PROD-2-TITLE` | Card 02 title | ~20 chars | أكياس بلدية ونفايات | Municipal & refuse sacks |
| `PROD-2-TAG` | Card 02 descriptor | ~25 chars | سماكات متدرجة | Graded gauges |
| `PROD-3-TITLE` | Card 03 title | ~20 chars | أكياس حفظ الأغذية | Food storage bags |
| `PROD-3-TAG` | Card 03 descriptor | ~25 chars | للمطاعم والتجزئة | Kitchens and retail |
| `PROD-4-TITLE` | Card 04 title | ~20 chars | أفلام بالبكرة | Film on rolls |
| `PROD-4-TAG` | Card 04 descriptor | ~25 chars | عرض وسماكة حسب الطلب | Width and gauge to order |
| `PROD-5-TITLE` | Card 05 title | ~20 chars | تصنيع حسب الطلب | Made to order |
| `PROD-5-TAG` | Card 05 descriptor | ~25 chars | OEM بمواصفتك | OEM to your spec |
| `PROD-6-TITLE` | Card 06 title | ~20 chars | الطباعة على الأكياس | Bag printing |
| `PROD-6-TAG` | Card 06 descriptor | ~25 chars | بشعارك وبياناتك | Your logo and details |

## 7. Colour showcase — four clickable photo cards of refuse sacks

Sits directly under the products grid. Clicking a card opens a photo gallery. The four
labels are colour names printed over the photos.

| ID | What it is | Limit | Arabic (current) | English (current) |
|---|---|---|---|---|
| `COLOR-KICKER` | Small gold label | 2 words | الألوان المتوفرة | Colours in stock |
| `COLOR-H3` | Heading for this block | ~40 chars | أكياس النفايات — بعدة ألوان وسماكات | Refuse sacks — multiple colours and gauges |
| `COLOR-LEAD` | Instruction line under it | ~40 chars | اضغط على أي بطاقة لتصفح صور المنتج. | Tap a card to browse the product photos. |
| `COLOR-1` | Label on photo card 1 | 1 word | أصفر | Yellow |
| `COLOR-2` | Label on photo card 2 | 1 word | أسود | Black |
| `COLOR-3` | Label on photo card 3 | 1 word | أبيض | White |
| `COLOR-4` | Label on photo card 4 | 1 word | أزرق | Blue |

## 8. Production process — six numbered stages, dark section

A sticky photo on one side; the six stages scroll past it. Each stage is a number, a short
title, and one sentence. This is the "how we make it" story.

| ID | What it is | Limit | Arabic (current) | English (current) |
|---|---|---|---|---|
| `PROC-KICKER` | Small gold label | 2 words | قدرات المصنع | Capability |
| `PROC-H2` | Section heading | ~25 chars | من الحبيبة إلى الكرتون | From resin to carton |
| `PROC-LEAD` | Sentence under the heading | ~70 chars | ست مراحل داخل المصنع — كل واحدة نقطة ضبط للمواصفة. | Six stages in-house — each one a control point on the spec. |
| `PROC-1-T` | Stage 01 title | 1–2 words | الخامة | Resin |
| `PROC-1-D` | Stage 01 sentence | ~55 chars | نختارها حسب وظيفة المنتج والحمل المطلوب. | Selected for the job the product has to do. |
| `PROC-2-T` | Stage 02 title | 1–2 words | نفخ الفيلم | Extrusion |
| `PROC-2-D` | Stage 02 sentence | ~55 chars | عرض وسماكة مضبوطان على طلبك. | Width and gauge held to your order. |
| `PROC-3-T` | Stage 03 title | 1–2 words | الطباعة | Printing |
| `PROC-3-D` | Stage 03 sentence | ~55 chars | تصميمك المعتمد، على نفس الخط. | Your approved artwork, on the same line. |
| `PROC-4-T` | Stage 04 title | 1–2 words | القص واللحام | Cutting & sealing |
| `PROC-4-D` | Stage 04 sentence | ~55 chars | المقاس النهائي والمقابض حسب المنتج. | Final size, handles to suit the product. |
| `PROC-5-T` | Stage 05 title | 1–2 words | الفحص | Inspection |
| `PROC-5-D` | Stage 05 sentence | ~55 chars | أثناء التشغيل — لا بعد انتهاء الدفعة. | During the run — not after the batch. |
| `PROC-6-T` | Stage 06 title | 1–2 words | التعبئة والتسليم | Packing & delivery |
| `PROC-6-D` | Stage 06 sentence | ~55 chars | جاهز للشحن وفق الجدول المتفق عليه. | Ready to ship on the agreed schedule. |

## 9. Spec row — six "what you can customise" pairs

A single row of six label/value pairs, directly under the process section. Very tight space.

| ID | What it is | Limit | Arabic (current) | English (current) |
|---|---|---|---|---|
| `SPEC-1K` | Spec 1 label | 1 word | المقاس | Size |
| `SPEC-1V` | Spec 1 value | ~20 chars | حسب الطلب | To order |
| `SPEC-2K` | Spec 2 label | 1 word | السماكة | Gauge |
| `SPEC-2V` | Spec 2 value | ~20 chars | حسب الاستخدام | To the application |
| `SPEC-3K` | Spec 3 label | 1 word | اللون | Colour |
| `SPEC-3V` | Spec 3 value | ~20 chars | حسب الطلب | To order |
| `SPEC-4K` | Spec 4 label | 1 word | الطباعة | Print |
| `SPEC-4V` | Spec 4 value | ~20 chars | بتصميم العميل | Your artwork |
| `SPEC-5K` | Spec 5 label | 1 word | الكمية | Quantity |
| `SPEC-5V` | Spec 5 value | ~20 chars | جملة وتوريد متكرر | Wholesale & repeat |
| `SPEC-6K` | Spec 6 label | 1 word | التعبئة | Packing |
| `SPEC-6V` | Spec 6 value | ~20 chars | حسب اتفاق التسليم | Per delivery terms |

## 10. Quality — four claims over a dark photo

Each claim is a number with a gold line above it and one short phrase. Not full sentences.

| ID | What it is | Limit | Arabic (current) | English (current) |
|---|---|---|---|---|
| `QUAL-KICKER` | Small gold label | 1 word | الجودة | Quality |
| `QUAL-H2` | Section heading — currently the strongest line on the site | ~35 chars | المواصفة اتفاق، لا تقدير | A spec is an agreement, not an estimate |
| `QUAL-1` | Claim 01 | ~30 chars | عيّنة معتمدة قبل الإنتاج | Approved sample before the run |
| `QUAL-2` | Claim 02 | ~30 chars | فحص أثناء التشغيل | Checks during production |
| `QUAL-3` | Claim 03 | ~30 chars | ثبات بين الدفعات | Batch-to-batch consistency |
| `QUAL-4` | Claim 04 | ~30 chars | خامة تناسب الاستخدام | Resin matched to the use |

## 11. Vision & mission — two cards

⚠️ **This section has a label but no heading.** Every other section has one. Worth adding —
suggest one as `NEW-VM-H2` if you think it needs it.

| ID | What it is | Limit | Arabic (current) | English (current) |
|---|---|---|---|---|
| `VM-KICKER` | Small gold label | 2–3 words | الرؤية والرسالة | Vision & mission |
| `VM-1-K` | Card 1 label | 1 word | الرؤية | Vision |
| `VM-1-P` | Card 1 body — the vision statement | ~110 chars | أن نكون الخيار الأول في المملكة لتصنيع الأفلام والأكياس البلاستيكية للقطاعات التجارية والصناعية. | To be the first choice in the Kingdom for plastic film and bag manufacturing across commercial and industrial sectors. |
| `VM-2-K` | Card 2 label | 1 word | الرسالة | Mission |
| `VM-2-P` | Card 2 body — the mission statement | ~110 chars | منتج مطابق للمواصفة، وتسليم في موعده — في كل طلب، وليس في الأول فقط. | A product that matches the agreed spec, delivered on time — on every order, not just the first one. |

## 12. Sectors — six photo cards in a horizontal row

On phones this becomes a swipeable rail. Each card is a photo with a number and a short
label. These are the customer types.

| ID | What it is | Limit | Arabic (current) | English (current) |
|---|---|---|---|---|
| `SECT-KICKER` | Small gold label | 1 word | القطاعات | Sectors |
| `SECT-H2` | Section heading | ~20 chars | من نُورّد لهم | Who we supply |
| `SECT-1` | Card 01 label | 2–3 words | التجزئة والمتاجر | Retail & stores |
| `SECT-2` | Card 02 label | 2–3 words | الأغذية والمطاعم | Food & restaurants |
| `SECT-3` | Card 03 label | 2–3 words | الجملة والتوزيع | Wholesale & distribution |
| `SECT-4` | Card 04 label | 2–3 words | المصانع | Factories |
| `SECT-5` | Card 05 label | 2–3 words | المنشآت والنظافة | Facilities & cleaning |
| `SECT-6` | Card 06 label | 2–3 words | الخدمات اللوجستية | Logistics |

## 13. Why us — six numbered reasons

⚠️ **Also has a label but no heading**, and each reason is only a title with **no supporting
line**. This is the weakest section on the site — six bare phrases in a grid. Consider
writing a short line for each (add them as `NEW-WHY-1-D` … `NEW-WHY-6-D`).

| ID | What it is | Limit | Arabic (current) | English (current) |
|---|---|---|---|---|
| `WHY-KICKER` | Small gold label, doubles as the section title | 2–3 words | لماذا روائع الإنتاج؟ | Why Rawae Al Intaj |
| `WHY-1` | Reason 01 | 2–3 words | مصنع مباشر | Direct from the factory |
| `WHY-2` | Reason 02 | 2–3 words | مواصفات مرنة | Flexible specifications |
| `WHY-3` | Reason 03 | 2–3 words | طباعة داخلية | Printing in-house |
| `WHY-4` | Reason 04 | 2–3 words | جودة ثابتة | Consistent quality |
| `WHY-5` | Reason 05 | 2–3 words | كميات تجارية | Commercial volumes |
| `WHY-6` | Reason 06 | 2–3 words | رد سريع | Fast response |

## 14. Photo gallery — four photos from inside the factory

⚠️ **Label but no heading** here too. Captions sit under each photo.

| ID | What it is | Limit | Arabic (current) | English (current) |
|---|---|---|---|---|
| `GAL-KICKER` | Small gold label | 2 words | من المصنع | Inside the plant |
| `GAL-1` | Photo caption 1 | 2–3 words | خط الإنتاج | Production line |
| `GAL-2` | Photo caption 2 | 2–3 words | مخزون البكرات | Roll stock |
| `GAL-3` | Photo caption 3 | 2–3 words | وحدة الطباعة | Printing unit |
| `GAL-4` | Photo caption 4 | 2–3 words | التعبئة والشحن | Packing & dispatch |

## 15. CTA band — full-width gold-edged strip near the bottom

A last push before the form. Heading, one line, two buttons.

| ID | What it is | Limit | Arabic (current) | English (current) |
|---|---|---|---|---|
| `CTA-H2` | Heading | ~35 chars | أرسل مواصفتك، واستلم عرض سعر | Send your spec, get a quote |
| `CTA-P` | Supporting line | ~60 chars | المنتج، المقاس، السماكة، الكمية — والباقي علينا. | Product, size, gauge, quantity — we take it from there. |
| `CTA-BTN1` | Gold button | 3 words | اطلب عرض سعر | Request a Quote |
| `CTA-BTN2` | WhatsApp button | 1 word | واتساب | WhatsApp |

## 16. Quote form — the main conversion point

Ten fields. Labels sit above each box; the grey text inside each box is the placeholder
example. Two submit buttons: WhatsApp opens a pre-filled chat, Email sends it to the inbox.

| ID | What it is | Limit | Arabic (current) | English (current) |
|---|---|---|---|---|
| `FORM-KICKER` | Small gold label | 2–3 words | طلب عرض سعر | Request a quote |
| `FORM-H2` | Section heading | ~25 chars | نبدأ من مواصفتك | It starts with your spec |
| `FORM-LEAD` | Sentence under the heading — lowers the barrier to submitting | ~70 chars | املأ ما تعرفه واترك الباقي — نسأل عمّا ينقص. | Fill in what you know and leave the rest — we'll ask for the gaps. |
| `F-NAME-L` | Field label (required) | 1–2 words | الاسم | Name |
| `F-NAME-P` | Placeholder inside the box | 2 words | الاسم الكامل | Full name |
| `F-COMP-L` | Field label | 1–2 words | الجهة / الشركة | Company |
| `F-COMP-P` | Placeholder | 1 word | اختياري | Optional |
| `F-PHONE-L` | Field label (required) | 1–2 words | رقم الجوال | Phone |
| `F-PHONE-P` | Placeholder — keep the number format | as-is | 05XXXXXXXX | +966 5X XXX XXXX |
| `F-MAIL-L` | Field label | 1–2 words | البريد الإلكتروني | Email |
| `F-MAIL-P` | Placeholder — keep as an email pattern | as-is | name@company.com | name@company.com |
| `F-PROD-L` | Field label (required) | 1 word | المنتج | Product |
| `F-PROD-0` | Dropdown, empty state | 2–3 words | اختر المنتج… | Choose a product… |
| `F-PROD-1` | Dropdown option 1 | 2–3 words | أكياس تسوق | Shopping bags |
| `F-PROD-2` | Dropdown option 2 | 2–3 words | أكياس بلدية / نفايات | Municipal / refuse sacks |
| `F-PROD-3` | Dropdown option 3 | 2–3 words | أكياس حفظ الأغذية | Food storage bags |
| `F-PROD-4` | Dropdown option 4 | 2–3 words | أفلام بالبكرة | Film on rolls |
| `F-PROD-5` | Dropdown option 5 | 2–3 words | تصنيع حسب الطلب (OEM) | Made to order (OEM) |
| `F-PROD-6` | Dropdown option 6 | 2–3 words | طباعة على أكياس | Bag printing |
| `F-PROD-7` | Dropdown option 7 — the "not sure" escape hatch | 4 words | غير محدد — أحتاج استشارة | Not sure — need advice |
| `F-SIZE-L` | Field label | 1 word | المقاس | Size |
| `F-SIZE-P` | Placeholder — keep it a concrete example | ~18 chars | مثال: 30 × 50 سم | e.g. 30 × 50 cm |
| `F-THICK-L` | Field label | 1 word | السماكة | Gauge |
| `F-THICK-P` | Placeholder — keep a concrete example | ~18 chars | مثال: 40 ميكرون | e.g. 40 micron |
| `F-QTY-L` | Field label | 2 words | الكمية التقريبية | Approx. quantity |
| `F-QTY-P` | Placeholder — keep a concrete example | ~15 chars | مثال: 500 كجم | e.g. 500 kg |
| `F-PRINT-L` | Field label | 1 word | الطباعة | Printing |
| `F-PRINT-0` | Dropdown, empty state | 1–2 words | اختر… | Choose… |
| `F-PRINT-1` | Dropdown option | 1–2 words | بدون طباعة | No printing |
| `F-PRINT-2` | Dropdown option | 1–2 words | لون واحد | Single colour |
| `F-PRINT-3` | Dropdown option | 1–2 words | متعددة الألوان | Multi-colour |
| `F-PRINT-4` | Dropdown option | 1–2 words | لم أقرر بعد | Undecided |
| `F-NOTES-L` | Field label | 1 word | ملاحظات | Notes |
| `F-NOTES-P` | Placeholder | ~30 chars | نوع الاستخدام، موعد الاحتياج… | Application, timing… |
| `FORM-NOTE` | Small grey note above the buttons explaining what each does | ~130 chars | واتساب: تُفتح محادثة جاهزة ببيانات طلبك — راجعها قبل الإرسال. البريد: يصل الطلب إلينا مباشرة دون مغادرة الصفحة. | WhatsApp opens a chat pre-filled with your enquiry — review it before sending. Email delivers it to us directly, without leaving the page. |
| `FORM-BTN-WA` | Green WhatsApp submit button | 3 words | إرسال عبر واتساب | Send via WhatsApp |
| `FORM-BTN-MAIL` | Outlined email submit button | 2 words | إرسال بالبريد | Send by email |

### Form system messages (shown after pressing a button)

| ID | What it is | Limit | Arabic (current) | English (current) |
|---|---|---|---|---|
| `MSG-REQUIRED` | Red error under an empty required field | ~25 chars | هذا الحقل مطلوب | This field is required |
| `MSG-PHONE` | Red error for a malformed phone number | ~25 chars | أدخل رقم جوال صحيح | Enter a valid phone number |
| `MSG-SENDING` | Status while the email is being sent | ~20 chars | جارٍ الإرسال… | Sending… |
| `MSG-SENT` | Success message after the email goes through | ~60 chars | تم استلام طلبك — سنعاود التواصل معك قريبًا. | Thanks — your request has been received. We will be in touch shortly. |
| `MSG-FAILED` | Failure message | ~60 chars | تعذّر إرسال البريد. أعد المحاولة أو استخدم واتساب. | The email could not be sent. Try again, or use WhatsApp. |
| `MSG-SUBJECT` | Subject line of the email that reaches the factory | ~60 chars | طلب عرض سعر — مصنع روائع الإنتاج للبلاستيك | Quote request — RAWAE AL INTAJ Plastic Factory |

## 17. Contact details — beside the form

Four rows with icons, then a clickable map card. **Do not change the numbers, email or
address** — only the labels in front of them.

| ID | What it is | Limit | Arabic (current) | English (current) |
|---|---|---|---|---|
| `CON-1K` | Label for the main number | 2–3 words | هاتف / واتساب | Phone / WhatsApp |
| `CON-2K` | Label for the second number | 2 words | هاتف إضافي | Second line |
| `CON-3K` | Label for the email | 1–2 words | البريد الإلكتروني | Email |
| `CON-4K` | Label for the location | 1 word | الموقع | Location |
| `CON-4V` | The location itself | ~30 chars | الرياض — المدينة الصناعية | Riyadh — Industrial City |
| `MAP-LABEL` | Map card, main line | ~35 chars | المدينة الصناعية / البوابة الصناعية | Industrial City / Industrial Gate |
| `MAP-SUB` | Map card, small line under it | ~25 chars | افتح على خرائط جوجل ↗ | Open in Google Maps ↗ |

## 18. Footer

| ID | What it is | Limit | Arabic (current) | English (current) |
|---|---|---|---|---|
| `FOOT-BLURB` | Short description under the logo | ~100 chars | تصنيع أفلام وأكياس بلاستيكية بمقاسات وسماكات وطباعة حسب الطلب — الرياض، المملكة العربية السعودية. | Plastic film and bags manufactured to your size, gauge and print — Riyadh, Saudi Arabia. |
| `FOOT-H4-1` | Heading over the first link column | 1 word | الموقع | Site |
| `FOOT-H4-2` | Heading over the second link column | 1 word | تواصل | Contact |
| `FOOT-COPY` | Copyright line (the year fills in automatically) | ~50 chars | مصنع روائع الإنتاج للبلاستيك — جميع الحقوق محفوظة. | RAWAE AL INTAJ Plastic Factory. All rights reserved. |

Footer link labels repeat `NAV-1`–`NAV-5`; they'll be updated to match automatically.

## 19. Floating bar — sticky buttons at the bottom on phones

Three small buttons that appear once you scroll past the hero. Extremely tight — one word each.

| ID | What it is | Limit | Arabic (current) | English (current) |
|---|---|---|---|---|
| `BAR-1` | Call button | 1 word | اتصل | Call |
| `BAR-2` | WhatsApp button | 1 word | واتساب | WhatsApp |
| `BAR-3` | Quote button | 1–2 words | عرض سعر | Quote |

## 20. Image descriptions (alt text)

Never displayed. Read aloud by screen readers and used by Google Images. They should
describe what is literally in the photo, not sell.

| ID | Which photo | Arabic (current) | English (current) |
|---|---|---|---|
| `ALT-HERO` | Hero background still | صالة الإنتاج داخل مصنع روائع الإنتاج مع أبراج نفخ الفيلم وبكرات الخام | The production floor at RAWAE AL INTAJ Plastic Factory, with film-blowing towers and stacked raw rolls |
| `ALT-ABOUT` | Photo in the about section | ونش كهربائي يرفع بكرة فيلم مطبوعة بجانب وحدة الطباعة | An overhead hoist lifting a roll of printed film beside the printing unit |
| `ALT-PROC` | Photo in the process section | صالة الإنتاج ومحطات نفخ الفيلم داخل مصنع روائع الإنتاج | The production floor and film-blowing stations inside the RAWAE AL INTAJ factory |
| `ALT-COLOR-1..4` | The four sack colour photos | أكياس نفايات [صفراء/سوداء/بيضاء/زرقاء] من إنتاج روائع الإنتاج | [Yellow/Black/White/Blue] refuse sacks by RAWAE AL INTAJ |
| `ALT-SECT-1..6` | The six sector photos | مطابقة لعناوين القطاعات أعلاه | Match the sector labels above |
| `ALT-GAL-1` | Gallery photo 1 | خط الإنتاج مع أبراج نفخ الفيلم ولوحات التحكم | The production line with film-blowing towers and control panels |
| `ALT-GAL-2` | Gallery photo 2 | مخزون بكرات الفيلم وعامل يشغّل خط الطباعة | Stock of film rolls with an operator running the printing line |
| `ALT-GAL-3` | Gallery photo 3 | وحدة الطباعة الفلكسوغرافية مع ونش رفع البكرات | The flexographic printing unit with a roll-lifting hoist |
| `ALT-GAL-4` | Gallery photo 4 | خط قص ولحام الأكياس داخل المصنع | The bag cutting-and-sealing line inside the factory |

## 21. Screen-reader labels

Announced to blind users only. Purely functional — rewrite only if the current wording is
unclear. `NAV-ARIA` (التنقل الرئيسي / Main navigation), `MENU-ARIA` (القائمة / Menu),
`LIGHTBOX-ARIA` (معرض صور المنتج / Product photo gallery), close/previous/next buttons
(إغلاق، السابق، التالي), `FAB-ARIA` (تواصل عبر واتساب / Chat on WhatsApp), and
`BAR-ARIA` (إجراءات سريعة / Quick actions).

---

## Things worth fixing while you're rewriting

1. **Three sections have no heading** — Vision & Mission, Why Us, and the photo gallery each
   have only a small gold label. Every other section has a proper heading. They look
   unfinished next to the rest.
2. **"Why us" is six bare phrases** with nothing under them. It's the section most likely to
   be skimmed past. One short line under each would do a lot.
3. **The em-dash appears in roughly a dozen lines.** It's the single strongest "AI wrote
   this" tell in the current copy.
4. **Nothing on the site is specific to this factory.** No founding year, no machine count,
   no delivery time, no minimum order quantity, no named client. Every line could belong to
   any plastic factory. If the owner can supply even three real numbers — years operating,
   monthly capacity, typical lead time, minimum order — dropping them into the About, Why Us
   and Quality sections would change the site more than any rewording will.
