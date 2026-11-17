YWC21 (Young Webmaster Camp ครั้งที่ 21) speaks in the voice of **"Re:Humanize the Web"** — an ancient, star-charted night where a digital hand reaches for a human one. Everything is navy sky, champagne gold and old parchment: warm, a little mystical, never techy-neon.

## Content fundamentals

- Write Thai first; English appears as a small tracked label beneath it (`section-th` title → `label` "GALLERY"). Never the reverse.
- Mix Thai and English naturally in body copy for camp terms: Content, Marketing, Programming, Design stay in English.
- Address applicants as "น้องๆ" / "คุณ" in a warm, inviting tone; short sentences, no slang overload.
- The camp is **YWC21** (no space) in running text and **YWC 21** (with space) only as a display numeral. Ordinal is **21st** — never "21th".
- The "human" motif is multi-script: HOMO · 人間 · 사람 · ἄνθρωπος · انسان · Human. Use it in `ScriptMarquee`, not as body copy.
- No emoji in UI copy.

## Visual foundations

**Colour.** The primary theme is `night`: `surface` (navy #192851) with `ink` (champagne) headings and `ink-body` paragraphs. Use `surface-deep` for bands and vignettes. Gold is the only accent: `accent` / `gold-solid` for actions and selected states, `logo-gold`, `gold-highlight` and `gold-shadow` only when reproducing the metallic bevel of the mark. `parchment` is a material, not a background colour — use it for torn-edge cards and the Timeline box on night, or as the whole ground in the `parchment` theme (print, documents). `celestial-blue` is light, not paint: glows and halos only, never text or fills. `placeholder-gray` and `media-gray` are builder placeholders — never ship them.

**Type.** Thai display is `thai-display` (Chonburi-like high-contrast serif) in `hero-th`, `section-th`, `card-th`. Latin numerals and "YWC 21" use `numeral` (Playfair-like serif). The caps camp name uses `wordmark` (Oswald-like condensed sans). Everything else — body, labels, buttons — is `sans` (Prompt). Font families are the closest Google Fonts matches to the Figma source; confirm the real families before production.

**Spacing & layout.** Generous: `space-22` between sections, `space-8` from heading to content, `space-12` between cards on desktop (about a third of a card's width). Content is centred with wide side margins (≈17% of the viewport each side on desktop, `space-4` on mobile). A section heading is always centred: Thai title, then the English `label` `space-2` below.

**Shape.** Nearly square: `radius-xs` for tiles and media, `radius-sm` for buttons, `radius-full` only for emblems. Parchment edges are torn (SVG displacement), never rounded.

**Depth.** No neutral grey drop shadows on navy. Light comes from gold and the sky: `glow-gold` around emblems, `glow-celestial` behind the hero logo, `drop-parchment` under paper cards only.

**Motion.** Slow and ambient: the multi-script marquee drifts (~40s per loop); glows may breathe. Respect `prefers-reduced-motion` — stop all loops.

**States.** Focus is a solid 2px `focus` ring with 2px offset. Hover on gold brightens toward `gold-highlight`; selected MajorTile gets an `accent` outline plus `glow-gold`.

## Iconography & imagery

- The mark: the zodiac ring of scripts (ཀ, 𓂀, α, A, 漢, 한, あ, अ …) around a compass star, with a brushed **W** and **21st**. Always use the supplied logo files under Logos; never redraw it.
- `ywc21-logo-glow.png` for the hero on night (it carries its own blue halo). `ywc21-logo-compass-st.png` for general use on navy or parchment. `ywc21-logo-compass-th.png` reads "21th" — a typo; do not use until corrected.
- Imagery: Creation-of-Adam hands (pixel ↔ human), night ocean with a sailing ship, star charts. No stock-tech imagery, no blue-purple gradients.
- No icon set exists in the source yet; use simple 1.5px line glyphs in `ink` when needed and flag them.


---

## Consuming this system (generated — do not edit)

Every path named below is under `project/` in this design system: read `project/api/tokens.md`, not `api/tokens.md`.

If the text above differs on what to load or read, follow this section.

`components/bundle.js` defines `window.YWC21` (6 components); `components/bundle.css` is its stylesheet; `tokens.css` is every token as a CSS variable plus `@font-face` for the fonts. `components/bundle.css` reads its variables from `tokens.css`. The bundle needs react 18 (not packed in this system: bring your own copy) (`window.React`), react-dom 18 (not packed in this system: bring your own copy) (`window.ReactDOM`), loaded before it. Build any UI by mounting these components; never hand-build a control or draw an icon the system provides.

- **Standalone page:** inline `tokens.css` and `components/bundle.css` in a `<style>`, then the library files and `components/bundle.js` as classic scripts (a file containing `</style`, `</script` or `<!--` breaks an inline element: write the sequence `<\/style`, `<\/script` or `\x3C!--` in your copy, or load that file by URL).
- **Design canvas:** bring `components/bundle.css`, `components/bundle.js` and `components/index.d.ts` (for the editor’s props panel) onto the canvas in full, as the canvas type’s design-system components reference says (a server-side copy first where it offers one); load the stylesheet before the script; skip the library files (the artboard supplies React); mount with `<x-import component-from-global-scope="YWC21.<Comp>" …>`.
- **Slides deck, or any surface that cannot run the bundle:** tokens only — the values are on `api/tokens.md`; the deck takes `tokens.json` by file path for its colour pickers.

**Read, per thing:** a component’s props, parts and examples: `api/components/<Comp>.md`; token values: `api/tokens.md`; stored assets and their paths: `api/assets/<Group>.md`. After this README, fetch the cards and fonts you need in ONE message as parallel calls — none depends on another.

**Two rules.** Before you use a thing — a component, a token group, an icon, an asset — read its card from the index below; a value you did not read from a card is a guess. `tokens.json`, `manifest.json`, `components/index.d.ts` and `design-system.json` are sources for tools: hand them over. `components/<Comp>/README.md` and `assets/<Group>/README.md` are the long-form second read a card links to; `SKILL.md` and `artifact-type/` beside them are authoring guidance, not needed to consume the system.

## Index (generated — do not edit)

**Tokens**

- `api/tokens.md` — Every token: surface, text, fill, palette, type, spacing, radius, shadow. (7.6k)

**Icons and assets**

- `api/assets/Logos.md` — 2 files, by asset id. (1.4k)
- `api/assets/Illustrations.md` — 22 files, by asset id. (2.8k)

**Components** (`api/components/<Comp>.md`, 6)

- **Layout**: `SectionHeading` — Centred Thai section title with a small tracked English label beneath — the heading of every section on the site
- **Actions**: `Button` — Call-to-action button — an intentional addition: the Figma source has no button yet, but the site needs "สมัครเลย" and secondary links
- **Content**: `ParchmentCard` — Torn-edge parchment card — used for the four "ทำไมต้อง YWC21" reasons and the Timeline entries · `MajorTile` — Tall navy-to-gold gradient tile for choosing one of the four camp majors (Content, Marketing, Programming, Design)
- **Decoration**: `ScriptMarquee` — Band of the word "human" written in many scripts, drifting slowly — the visual shorthand for Re:Humanize the Web
- **Navigation**: `DiamondDots` — Diamond-shaped indicator for the Gallery carousel
