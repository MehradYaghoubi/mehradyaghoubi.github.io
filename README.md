# Mehrad Yaghoubi

Personal research and engineering portfolio: [mehradyaghoubi.github.io](https://mehradyaghoubi.github.io/).

I am Mehrad Yaghoubi (مهراد یعقوبی, also written Merhrad Yaghoubi), an M.Sc. student in Artificial Intelligence at Islamic Azad University, Karaj. I am preparing to defend my thesis on lip reading with deep neural networks and looking for a fully funded PhD position in computer vision, VSR or model optimization.

My research focuses on knowledge distillation and learning with uncertainty in lightweight models. My applied work includes a Persian travel chatbot, WordPress plugins and price-checking automation. I was also a co-founder in Fidar Technology Fartak for 1.5 years. That university startup project explored games informed by psychology for crime prevention and was not formally incorporated.

## Read the profile

- [English](https://mehradyaghoubi.github.io/) · [فارسی](https://mehradyaghoubi.github.io/fa/)
- [Academic CV](https://mehradyaghoubi.github.io/cv/) · [رزومه علمی](https://mehradyaghoubi.github.io/fa/cv/)

The English and Persian profiles and CVs share a consistent layout and equivalent content. Both CVs are available as readable web pages, PDFs and Word documents:

- [Academic CV (English)](https://mehradyaghoubi.github.io/cv/) · [PDF](https://mehradyaghoubi.github.io/resumes/Mehrad-Yaghoubi-Academic-CV.pdf) · [Word](https://mehradyaghoubi.github.io/resumes/Mehrad-Yaghoubi-Academic-CV.docx)
- [رزومه علمی (صفحه فارسی)](https://mehradyaghoubi.github.io/fa/cv/) · [PDF انگلیسی](https://mehradyaghoubi.github.io/resumes/Mehrad-Yaghoubi-Academic-CV.pdf)
- [AI Engineering Resume (English)](https://mehradyaghoubi.github.io/work-cv/) · [PDF](https://mehradyaghoubi.github.io/resumes/Mehrad-Yaghoubi-AI-Engineering-Resume.pdf) · [Word](https://mehradyaghoubi.github.io/resumes/Mehrad-Yaghoubi-AI-Engineering-Resume.docx)
- [رزومه کاری فارسی](https://mehradyaghoubi.github.io/fa/work-cv/) · [PDF](https://mehradyaghoubi.github.io/resumes/Mehrad-Yaghoubi-AI-Engineering-Resume-FA.pdf) · [Word](https://mehradyaghoubi.github.io/resumes/Mehrad-Yaghoubi-AI-Engineering-Resume-FA.docx)

## Research and selected work

- AI Specialist at Ghasedak Peik Shahr for two months in 2026. Developed a travel chatbot and WordPress integrations for Parsegasht and TaxiRooz, a competitor price checker, and an operator training dashboard and homepage theme for Parsegasht.
- Research on efficient VSR models and learning with uncertainty. The [VSR manuscript](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6831426) is under review at *The Visual Computer*. The [Go paper](https://arxiv.org/abs/2607.26946) is an arXiv preprint.
- [PyLipExtractor](https://github.com/MehradYaghoubi/pylipextractor), an open-source Python package for extracting lip regions from video.
- Web development for [Parseh Gasht](https://parsegasht.com/) and [shofazhyaghoubi.ir](http://shofazhyaghoubi.ir/).
- An API-based OCR tool and a personal RAG chatbot that is in development.

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

Each language has static HTML, its own canonical URL, reciprocal `hreflang` links and structured data. The site provides `robots.txt`, a six-page XML sitemap and an optional `llms.txt` overview. These help discovery but cannot guarantee indexing, ranking or inclusion in AI answers. No `unsafe-eval` or JavaScript string evaluation is required.

The owner confirmed verification in [Google Search Console](https://search.google.com/search-console/); the meta tag is retained. Inspect the English and Persian URLs, request indexing if available, and submit `https://mehradyaghoubi.github.io/sitemap.xml`. This requires owner or full-user access. Verification of the site does not grant control over the separate `github.com` domain or ensure indexing of a GitHub profile.

## Edit content and design

- `src/content.js`: facts, manuscripts and equivalent English/Persian copy.
- `scripts/generate-pages.mjs`: one static template, run before dev/build; checks locale fields, anchors, canonical URLs, language and verification-token presence.
- `src/style.css`: shared responsive design with logical properties for RTL/LTR.
- `src/main.js`: optional print button and section-preserving language links; content is readable without JavaScript.
- `index.html`, `fa/index.html`, `cv/index.html`, `fa/cv/index.html`, `work-cv/index.html`, `fa/work-cv/index.html` and `public/sitemap.xml`: generated; edit shared sources instead.
- `public/fonts/`: self-hosted IBM Plex Sans for English and Vazirmatn for Persian, with their licenses.
- [Research and design sources](docs/research-and-design.md).
