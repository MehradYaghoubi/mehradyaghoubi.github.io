# Mehrad Yaghoubi

Personal research and engineering portfolio: [mehradyaghoubi.github.io](https://mehradyaghoubi.github.io/).

Mehrad Yaghoubi (مهراد یعقوبی) is completing an M.Sc. in Artificial Intelligence at Islamic Azad University, Karaj, and preparing for his thesis defense. His work spans PyTorch computer vision, visual speech recognition (VSR), efficient models, API-based AI tools and a RAG chatbot in development. He is seeking machine-learning engineering opportunities in inference and applied AI.

## Read the profile

- [English](https://mehradyaghoubi.github.io/) · [فارسی](https://mehradyaghoubi.github.io/fa/)
- [Academic CV](https://mehradyaghoubi.github.io/cv/) · [رزومهٔ علمی](https://mehradyaghoubi.github.io/fa/cv/)

Both languages share a layout and equivalent content. The public CV is printable HTML; the original private PDF is excluded from publication.

## Research and selected work

- **Visual speech recognition:** research on efficient lip-reading models and uncertainty-guided learning.
- **Research papers:** [SSRN manuscript](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6831426) (listed on the author's CV as under peer review at *The Visual Computer*) and [arXiv preprint](https://arxiv.org/abs/2607.26946).
- **PyLipExtractor:** [open-source Python package](https://github.com/MehradYaghoubi/pylipextractor) for extracting lip regions from video.
- **Web projects:** [Parseh Gasht](https://parsegasht.com/) (custom WordPress theme) and [shofazhyaghoubi.ir](http://shofazhyaghoubi.ir/).
- **AI tools:** an API-based OCR project and a retrieval-augmented (RAG) chatbot in development.

## Profiles

- [GitHub](https://github.com/MehradYaghoubi)
- [Google Scholar](https://scholar.google.com/citations?user=7X057KcAAAAJ)
- [ORCID](https://orcid.org/0009-0001-8116-5864)
- [ResearchGate](https://www.researchgate.net/profile/Merhrad-Yaghoubi)
- [LinkedIn](https://www.linkedin.com/in/mehrad-yaghoubi)

For a concise, machine-readable research overview, see the site's [`llms.txt`](https://mehradyaghoubi.github.io/llms.txt). Search crawlers are allowed by [`robots.txt`](https://mehradyaghoubi.github.io/robots.txt), and the public pages are listed in the [XML sitemap](https://mehradyaghoubi.github.io/sitemap.xml).

## Run locally

Requires Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
```

Create a production build with:

```sh
npm run build
```

## Deployment

The `main` branch is deployed to GitHub Pages by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The published site is `https://mehradyaghoubi.github.io/`.

## Search indexing

Each language has static HTML, its own canonical URL, reciprocal `hreflang` links and structured data. The site provides `robots.txt`, a four-page XML sitemap and an optional `llms.txt` overview. These help discovery but cannot guarantee indexing, ranking or inclusion in AI answers. No `unsafe-eval` or JavaScript string evaluation is required.

The owner confirmed verification in [Google Search Console](https://search.google.com/search-console/); the meta tag is retained. Inspect the English and Persian URLs, request indexing if available, and submit `https://mehradyaghoubi.github.io/sitemap.xml`. This requires owner or full-user access. Verification of the site does not grant control over the separate `github.com` domain or ensure indexing of a GitHub profile.

## Edit content and design

- `src/content.js`: facts, manuscripts and equivalent English/Persian copy.
- `scripts/generate-pages.mjs`: one static template, run before dev/build; checks locale fields, anchors, canonical URLs, language and verification-token presence.
- `src/style.css`: shared responsive design with logical properties for RTL/LTR.
- `src/main.js`: optional print button and section-preserving language links; content is readable without JavaScript.
- `index.html`, `fa/index.html`, `cv/index.html`, `fa/cv/index.html` and `public/sitemap.xml`: generated; edit shared sources instead.
- `public/fonts/`: self-hosted WOFF2 fonts and licenses; visitors need no third-party font request.
- [Research and design sources](docs/research-and-design.md).
