# Kokone Imaizumi Portfolio
## Design & Development Specification

Version: 1.0.0  
Target: GitHub Pages static site  
Current implementation: `index.html` + `styles.css` + `app.js`

## 1. Concept

Theme:

> まだ知らないを、おもしろいへ。

This portfolio is not a simple design gallery. It is a story-driven portfolio that communicates Kokone's way of moving: meeting people, finding questions, and shaping what she learns into something that reaches others.

Core statement:

> 人に会い、問いを見つけ、伝わる形をデザインする。

Keywords:

- Design
- Technology
- SNS
- Competition
- Event
- Hobby
- Interview
- Fieldwork
- Writing

## 2. Art Direction

Mood:

- Quiet excitement
- Editorial, refined, spacious
- Cute and cool, but not childish
- Monotone plus one accent color
- Hand-drawn illustration warmth

Color:

- Background: `#FAFAF7`
- Text: `#242424`
- Ink / navy: `#172344`
- Primary: `#3F6B5B`
- Secondary: `#577590`
- Gold: `#B68D5B`

Typography:

- Japanese display: `A P-OTF A1 Mincho StdN`, Ryumin fallback
- Japanese body: `A P-OTF A1Gothic StdN`, Zen Kaku Gothic fallback
- English / numbers: `Podkova`, Outfit fallback
- Signature: temporary script font; final version should be replaced with a handwritten SVG asset

## 3. Opening Motion

Loading progress:

- Display only numbers and `%`
- No bar
- No `Loading` text
- Show every integer from `0%` to `100%`
- Progress timing intentionally varies
- Required image waits at `99%`; after load completion, progress reaches `100%`

Opening visual:

- Particles start immediately
- Main illustration appears after 2 seconds
- Scroll is disabled during opening
- After `100%`, opening fades out and the site header appears

## 4. Hero

Hero contents:

- Left copy: `まだ知らないを、おもしろいへ。`
- Center illustration: girl, globe, orbiting objects
- Right vertical role: `Designer / Planner`
- Bottom signature: `Kokone Imaizumi`
- Bottom label: `Portfolio`
- Scroll cue

Hero asset:

- `assets/hero-illustration.png`
- Current asset is a generated illustration based on the approved direction
- Final custom illustration can replace this file without changing code

## 5. Common UI

Header:

- Fixed after opening
- Left: small rotating globe + `Kokone Imaizumi / Portfolio`
- Right: `TOP / ABOUT / NEWS / WORKS / CONTACT`
- Current section is highlighted with primary color
- Hover color is gold
- Small globe rotation is synced with scroll position

Mobile navigation:

- Desktop nav is hidden
- `Menu` button opens a full-screen navigation
- Background scroll is locked while open
- Esc closes the menu

Back to top:

- Appears after scrolling
- Smooth scrolls to top

## 6. Page Structure

Current static pages/sections:

1. Hero
2. About statement
3. Profile and keyword list
4. Vertical timeline
5. News preview
6. Works journey
7. Ending message
8. Contact
9. Footer

Future pages:

- `/works`
- `/works/{slug}`
- `/news`
- `/news/{slug}`
- `/contact`

## 7. Data Model

Current implementation stores content in `app.js`:

- `WORKS`
- `NEWS`
- `TAGS`

Future improvement:

- Move data to `data/works.json`
- Move data to `data/news.json`
- Keep UI rendering separate from content updates

## 8. Works

Features:

- Tag filter
- Search
- Scroll-linked walking progress line
- Work cards
- Work modal

Initial tags:

- All
- Design
- Technology
- SNS
- Competition
- Event
- Hobby

Modal:

- Opens from a work card
- Includes category, title, summary, role, tools, learning
- Background blur
- Esc close
- Close button
- Focus returns to the clicked card

## 9. News

News is designed as an update area similar to note.

Current behavior:

- Latest 3 placeholder items are shown
- Empty state should be shown if no news exists

Future behavior:

- Article detail page
- External note link support
- Category filtering

## 10. Accessibility

Implemented:

- Semantic header/nav/main/footer
- `aria-current="location"` for active section
- Dialog role for modal
- Esc close support
- Focus visible styles
- Decorative particles are hidden from interaction
- Reduced motion CSS fallback

Future improvements:

- Full focus trap for modal
- More detailed screen-reader text for external links
- `prefers-reduced-motion` JavaScript branch for all scripted animation

## 11. Performance

Current approach:

- Static GitHub Pages site
- No framework bundle
- One hero image
- Lightweight DOM particles
- IntersectionObserver for section and work reveal

Future approach:

- If migrated to React/Next.js, split components and data as described in the larger design system spec
- Optimize hero image size and add responsive image variants

## 12. Implementation Notes

Files:

- `index.html`: page structure
- `styles.css`: visual system, responsive layout, motion
- `app.js`: data, rendering, opening sequence, filters, modal, nav state
- `assets/hero-illustration.png`: hero art

Do not:

- Replace the hero with CSS-drawn character art
- Add childish anime-like facial changes
- Overuse blue
- Turn the page into a generic card-heavy portfolio
- Remove the loading progress requirement

## 13. Release Checklist

- [x] Hero image renders
- [x] Loading reaches `100%`
- [x] Header appears after loading
- [x] Desktop navigation works
- [x] Mobile menu opens/closes
- [x] Works render from data
- [x] Works search works
- [x] Work modal opens/closes
- [x] No horizontal overflow on desktop/mobile
- [x] GitHub Pages compatible static files
