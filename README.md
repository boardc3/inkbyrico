# Ink by Rico

Marketing site for **Rick Coury (Rico)** — single-needle and fine-line tattoo artist,
Laguna Beach, Orange County.

Vite + React + Tailwind. Static build, deploys to Vercel with zero configuration.

---

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the production build
```

## Deploy

Push to GitHub, then import the repo at [vercel.com/new](https://vercel.com/new).
Vercel auto-detects Vite — Framework `Vite`, build `npm run build`, output `dist`.
`vercel.json` already rewrites all paths to `index.html` so `/aftercare` works on refresh.

## Structure

```
public/
  gallery/    63 tattoo photos (webp) — `wNN-t.webp` thumb, `wNN.webp` full
  studio/     8 photos of Rico / Laguna
  pairs/      reference-photo → finished-tattoo pairs for the drag slider
  motion/     4 AI motion clips + poster frames
src/
  data/site.js       ALL COPY LIVES HERE — edit text without touching components
  data/gallery.json  generated image manifest (alt text, tags, aspect ratios)
  components/        one file per section
  pages/             Home.jsx, Aftercare.jsx
```

## Editing content

**Text.** Everything the visitor reads is in `src/data/site.js` — hero copy, the
About paragraphs, FAQ, aftercare steps, press credits. No JSX required.

**Photos.** `src/data/gallery.json` drives the gallery. Each entry:

```json
{
  "id": "w12",
  "thumb": "/gallery/w12-t.webp",
  "full": "/gallery/w12.webp",
  "alt": "Golden retriever portrait on the upper arm",
  "tags": ["portraits"],
  "ratio": 0.8
}
```

To add work: drop a `-t.webp` (760px) and full (1500px) pair into `public/gallery/`
and add the entry. Valid tags: `fineline`, `portraits`, `nature`, `western`, `ocean`.

**Booking form.** Currently composes a `mailto:` to `inkbyrico@gmail.com` — no
backend, nothing to maintain. To capture submissions instead, replace `onSubmit`
in `src/components/Booking.jsx` with a POST to Formspree, Resend, or a Vercel
serverless function. The markup does not need to change.

## Content provenance

- Photography: Rick Coury, pulled from [@inkbyrico](https://www.instagram.com/inkbyrico/).
- Biographical quotes and the celebrity client list: [Stu News Laguna, Jan 3 2023](https://www.stunewslagunaarchives.com/index.php/archives-prior-to-2024/life-people-archive/22113-laguna-life-and-people-010323).
- Testimonials in `voices`: verbatim public Instagram comments, attributed by handle.
  Confirm Rico is comfortable with these before launch.
- `public/motion/*.mp4`: AI-generated from Rico's own photos (Higgsfield, Seedance 2.0).
  Labelled as such on the page.

## Before launch

- [ ] Confirm the studio wording — the site says "private studio, Laguna Beach"
      rather than the old Lo Cal Tattoo address, which Yelp lists as closed.
- [ ] Add `public/og.jpg` (1200×630) for link previews.
- [ ] Add `public/favicon.ico`.
- [ ] Point `<link rel="canonical">` in `index.html` at the real domain.

## Booking form delivery (Web3Forms)

The booking form POSTs to Web3Forms when `VITE_WEB3FORMS_KEY` is set (Vercel →
Settings → Environment Variables, then redeploy). The access key is public by
design and is tied to the inbox it was created for (inkbyrico@gmail.com). Without
the variable the form falls back to `mailto:`.

- [ ] Get an access key for inkbyrico@gmail.com at web3forms.com, set `VITE_WEB3FORMS_KEY`, redeploy, send a test enquiry.
