import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { site, papers, content } from '../src/content.js';

const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const link = (url, label, extra = '') => `<a href="${escape(url)}" ${extra}>${escape(label)}</a>`;
const profileLinks = () => site.profiles.map(([label, url]) => link(url, label)).join('');
const route = (lang, cv = false, type = 'academic') => `${lang === 'fa' ? '/fa' : ''}${cv ? type === 'work' ? '/work-cv' : '/cv' : ''}/`;
const ids = ['overview', 'papers', 'research', 'software', 'experience', 'education', 'contact'];

function diagram(paper, c) {
  const labels = paper.id === 'egosd'
    ? (c.lang === 'fa' ? ['ویدئو', 'مدل معلم', 'عدم‌قطعیت', 'مدل سبک'] : ['Video', 'Teacher', 'Uncertainty gate', 'Lightweight model'])
    : (c.lang === 'fa' ? ['وضعیت بازی', 'مدل باور', 'عدم‌قطعیت', 'تصمیم'] : ['Board state', 'Belief model', 'Uncertainty gate', 'Decision']);
  return `<figure class="paper-figure"><svg viewBox="0 0 180 180" role="img" aria-label="${escape(c.figure)}"><g fill="none" stroke="#6d8fa5" stroke-width="1.5"><path d="M90 38v12m0 26v12m0 26v12"/><path d="m86 45 4 5 4-5m-8 38 4 5 4-5m-8 38 4 5 4-5"/>${[12,50,88,126].map((y,i)=>`<rect x="15" y="${y}" width="150" height="26" rx="4" fill="${i===3?'#dceaf2':'#f0f5f8'}"/>`).join('')}</g><g fill="#284b63" text-anchor="middle" font-size="14" font-family="inherit">${labels.map((label,i)=>`<text x="90" y="${30+i*38}">${label}</text>`).join('')}</g></svg><figcaption>${c.figure}</figcaption></figure>`;
}

function paperList(c, cv) {
  return papers.map((p) => `<article class="paper ${cv ? 'cv-paper' : ''}">${cv ? '' : diagram(p, c)}<div class="paper-copy"><p class="paper-status">${p.year} · ${escape(p.status[c.lang])}</p><h3 lang="en" dir="ltr">${link(p.url, p.title)}</h3>${c.lang === 'fa' ? `<p class="translated-title">${p.titleFa}</p>` : ''}<p class="authors" lang="en" dir="ltr">${escape(p.authors).replace('Mehrad Yaghoubi', '<strong>Mehrad Yaghoubi</strong>')}</p><p>${escape(p.summary[c.lang])}</p><div class="text-links">${link(p.url, c.paper)}${p.doi ? link(p.doi, c.doi) : ''}</div>${cv ? '' : `<details><summary>${c.abstract}</summary><p>${escape(p.abstract[c.lang])}</p></details>`}</div></article>`).join('');
}

const sectionHead = (title, intro = '') => `<header class="section-heading"><h2>${title}</h2>${intro ? `<p>${intro}</p>` : ''}</header>`;
function education(c) {
  return `<div class="education-item"><h3>${c.msc}</h3><p>${c.institution} · ${c.mscState}</p><p>${c.mscGpa}</p><p>${c.mscThesis}</p></div><div class="education-item"><h3>${c.bsc}</h3><p>${c.institution} · ${c.bscPeriod}</p><p>${c.bscGpa}</p></div>`;
}
function experience(c, items = c.experienceItems) {
  return items.map((item) => `<article class="education-item"><h3>${escape(item.role)}</h3><p>${escape(item.employer)} · ${escape(item.period)}</p>${item.summary ? `<p>${escape(item.summary)}</p>` : ''}${item.highlights.length ? `<ul>${item.highlights.map((highlight) => `<li>${escape(highlight)}</li>`).join('')}</ul>` : ''}</article>`).join('');
}
function software(c, cv) {
  return `<article class="featured-project"><h3>${link('https://github.com/MehradYaghoubi/pylipextractor', 'PyLipExtractor')}</h3><p>${c.extractor}</p><div class="text-links">${link('https://github.com/MehradYaghoubi/pylipextractor', c.source)}${link('https://pypi.org/project/pylipextractor/', c.package)}</div></article><div class="project-list">${[
    ['Parseh Gasht', c.parseh, 'https://parsegasht.com/', c.visit],
    [c.lang === 'fa' ? 'شوفاژ یعقوبی' : 'Shofazh Yaghoubi', c.shop, 'http://shofazhyaghoubi.ir/', c.visit],
    [c.ocrTitle, c.ocr, '', c.built], [c.chatbotTitle, c.chatbot, '', c.inProgress],
  ].map(([name, description, url, action]) => `<article><h3>${escape(name)}</h3><p>${description}</p>${url ? link(url, action) : `<p class="secondary project-state">${action}</p>`}</article>`).join('')}</div>`;
}

function profile(c) {
  const navigation = ids.map((id, i) => link(`#${id}`, c.nav[i])).join('');
  return `<div class="site-shell"><aside class="sidebar"><a class="wordmark" href="${route(c.lang)}" aria-label="${escape(c.name)}" dir="ltr">m<span>.</span>y<span>.</span></a><p class="sidebar-name">${c.name}</p><p class="sidebar-role">${c.role}</p><p class="sidebar-location">${c.location}</p><nav aria-label="${c.navigation}">${navigation}</nav><div class="sidebar-bottom">${link(route(c.lang, true), c.cv)}${link(route(c.lang, true, 'work'), c.workCv)}${link(route(c.lang === 'en' ? 'fa' : 'en'), c.language, `data-language-link lang="${c.lang === 'en' ? 'fa' : 'en'}" aria-label="${c.languageLabel}"`)}</div></aside><main id="main" class="reading-panel"><section id="overview" class="overview"><h1>${c.name}</h1><p class="other-name" lang="${c.lang === 'en' ? 'fa' : 'en'}" dir="${c.lang === 'en' ? 'rtl' : 'ltr'}">${c.otherName}</p><p class="intro">${c.intro}</p><p>${c.bio}</p><p>${c.bioTwo}</p><div class="hero-actions">${link(`mailto:${site.email}`, c.email, 'class="button primary"')}${link(route(c.lang, true), c.cv, 'class="button"')}${link(route(c.lang, true, 'work'), c.workCv, 'class="button"')}</div><div class="profile-links" aria-label="${c.lang === 'en' ? 'Academic profiles' : 'پروفایل‌های علمی'}">${profileLinks()}</div><aside class="opportunity"><h2>${c.opportunity}</h2><p>${c.opportunityBody}</p></aside></section><section id="papers">${sectionHead(c.publications, c.papersIntro)}${paperList(c, false)}</section><section id="research">${sectionHead(c.researchTitle, c.researchIntro)}<div class="research-list">${c.research.map(([title, question]) => `<article><h3>${title}</h3><p>${question}</p></article>`).join('')}</div></section><section id="software">${sectionHead(c.projects, c.projectsIntro)}${software(c, false)}</section><section id="experience">${sectionHead(c.experience)}${experience(c)}</section><section id="education">${sectionHead(c.education)}${education(c)}<h3>${c.skills}</h3><p class="skills" dir="ltr">${c.skillList.join(' · ')}</p></section><section id="contact">${sectionHead(c.contact)}<p>${c.contactBody}</p><p class="contact-email" dir="ltr">${link(`mailto:${site.email}`, site.email)}</p><p>${c.cvNote} ${link(route(c.lang, true), c.cv)} · ${link(route(c.lang, true, 'work'), c.workCv)}</p></section><footer><p>${c.footer}</p><p>${c.updated}</p></footer></main></div>`;
}

function cvPage(c, type) {
  const work = type === 'work';
  const heading = work ? c.workCvHeading : c.cvHeading;
  const intro = work ? c.workCvIntro : c.cvIntro;
  const summary = work ? `<section>${sectionHead(c.skills)}<p dir="ltr">${c.skillList.join(' · ')}</p></section>` : `<section>${sectionHead(c.focus)}<p>${c.research.map(([title]) => title).join(' · ')}</p></section>`;
  const sections = work
    ? `<section>${sectionHead(c.experience)}${experience(c, c.experienceItems.slice(0, 2))}</section>${summary}<section>${sectionHead(c.projects)}${software(c, true)}</section><section>${sectionHead(c.education)}${education(c)}</section><section>${sectionHead(c.researchTeaching)}${experience(c, c.experienceItems.slice(2))}</section>`
    : `<section>${sectionHead(c.publications)}${paperList(c, true)}</section>${summary}<section>${sectionHead(c.skills)}<p dir="ltr">${c.skillList.join(' · ')}</p></section><section>${sectionHead(c.education)}${education(c)}</section><section>${sectionHead(c.projects)}${software(c, true)}</section><section>${sectionHead(c.experience)}${experience(c)}</section>`;
  const filename = (work ? 'Mehrad-Yaghoubi-AI-Engineering-Resume' : 'Mehrad-Yaghoubi-Academic-CV') + (work && c.lang === 'fa' ? '-FA' : '');
  const downloads = `<a href="/resumes/${filename}.pdf">${c.lang === 'fa' && !work ? 'PDF انگلیسی' : c.downloadPdf}</a><a href="/resumes/${filename}.docx">${c.lang === 'fa' && !work ? 'Word انگلیسی' : c.downloadWord}</a>`;
  return `<main id="main" class="cv-page"><nav class="cv-toolbar" aria-label="${c.navigation}">${link(route(c.lang), c.back)}<div>${link(route(c.lang, true, work ? 'academic' : 'work'), work ? c.cv : c.workCv)}${link(route(c.lang === 'en' ? 'fa' : 'en', true, type), c.language, 'data-language-link')}${downloads}<button class="print-button" hidden>${c.print}</button></div></nav><header class="cv-header"><h1>${c.name}</h1><p class="cv-kind">${heading}</p><p class="other-name" lang="${c.lang === 'en' ? 'fa' : 'en'}" dir="${c.lang === 'en' ? 'rtl' : 'ltr'}">${c.otherName}</p><p>${intro}</p><p>${c.location} · <bdi>${link(`mailto:${site.email}`, site.email)}</bdi></p><div class="profile-links">${profileLinks()}</div></header>${sections}<footer><p>${c.updated}</p>${link(route(c.lang), c.home)}</footer></main>`;
}

function documentPage(c, cv, type = 'academic') {
  const legacyAnchors = { overview: ['home', 'profile'], papers: ['publications'], software: ['work'], education: ['about'] };
  const body = cv ? cvPage(c, type) : profile(c).replace(/(<section id="([^"]+)"[^>]*>)/g, (tag, _, id) => tag + (legacyAnchors[id] || []).map((alias) => `<span id="${alias}" aria-hidden="true"></span>`).join(''));
  const url = site.url + route(c.lang, cv, type);
  const title = cv ? type === 'work' ? c.workCvTitle : c.cvTitle : c.title;
  const description = cv ? type === 'work' ? c.workCvDescription : c.cvDescription : c.description;
  const person = {
    '@type': 'Person', '@id': `${site.url}/#person`, name: site.name,
    alternateName: [site.nameFa, 'مهراد يعقوبي', 'MehradYaghoubi', 'Merhrad Yaghoubi', 'M. Yaghoubi'], url: `${site.url}/`,
    email: `mailto:${site.email}`, sameAs: site.profiles.map(([, value]) => value),
    affiliation: { '@type': 'CollegeOrUniversity', name: 'Islamic Azad University, Karaj' },
    knowsAbout: ['Computer vision', 'Visual speech recognition', 'Lip reading', 'Knowledge distillation', 'Efficient deep learning', 'Model optimization', 'Belief modules', 'Uncertainty-aware learning', 'Belief-guided decision making', 'PyTorch', 'CUDA'],
  };
  const schema = { '@context': 'https://schema.org', '@graph': [person, {
    '@type': 'ProfilePage', '@id': `${url}#webpage`, url, name: title, description,
    inLanguage: c.lang, mainEntity: { '@id': `${site.url}/#person` }, dateModified: site.updated,
    hasPart: papers.map((p) => ({ '@type': 'ScholarlyArticle', name: p.title, url: p.url, datePublished: p.year, author: p.authors.split(', ').map((name) => ({ '@type': 'Person', name })) })),
  }] };
  return `<!doctype html>
<html lang="${c.lang}" dir="${c.dir}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(title)}</title><meta name="description" content="${escape(description)}"><meta name="author" content="${site.name}"><meta name="robots" content="index,follow,max-image-preview:large"><meta name="google-site-verification" content="${site.verification}"><meta name="theme-color" content="#f3f6f8"><link rel="canonical" href="${url}"><link rel="alternate" hreflang="en" href="${site.url}${route('en', cv, type)}"><link rel="alternate" hreflang="fa" href="${site.url}${route('fa', cv, type)}"><link rel="alternate" hreflang="x-default" href="${site.url}${route('en', cv, type)}"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="stylesheet" href="/fonts/fonts.css"><link rel="stylesheet" href="/src/style.css"><meta property="og:type" content="profile"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${url}"><meta property="og:locale" content="${c.lang === 'en' ? 'en_US' : 'fa_IR'}"><meta property="og:locale:alternate" content="${c.lang === 'en' ? 'fa_IR' : 'en_US'}"><meta name="twitter:card" content="summary"><script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script><script type="module" src="/src/main.js"></script></head><body><a class="skip-link" href="#main">${c.skip}</a>${body}</body></html>\n`;
}

assert.deepEqual(Object.keys(content.en).sort(), Object.keys(content.fa).sort(), 'Locale fields must match');
const persianCopy = JSON.stringify([content.fa, ...papers.map((p) => [p.titleFa, p.status.fa, p.summary.fa, p.abstract.fa])]);
assert(!/[\u064b-\u065f\u0670\u061b;]/u.test(persianCopy), 'Persian copy must not contain diacritics or semicolons');
for (const c of Object.values(content)) {
  assert.equal(c.nav.length, ids.length);
  for (const [cv, type] of [[false, 'academic'], [true, 'academic'], [true, 'work']]) {
    const html = documentPage(c, cv, type);
    const path = `.${route(c.lang, cv, type)}`;
    const anchors = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
    assert.equal(new Set(anchors).size, anchors.length, 'Duplicate anchor');
    for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) assert(anchors.includes(target), `Missing ${target}`);
    assert(html.includes(`href="${site.url}${route(c.lang, cv, type)}"`));
    assert(html.includes(site.verification));
    assert(html.includes(`lang="${c.lang}" dir="${c.dir}"`));
    await mkdir(path, { recursive: true });
    await writeFile(`${path}index.html`, html);
  }
}
await writeFile('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['en', 'fa'].flatMap((lang) => [[false, 'academic'], [true, 'academic'], [true, 'work']].map(([cv, type]) => `<url><loc>${site.url}${route(lang, cv, type)}</loc><lastmod>${site.updated}</lastmod></url>`)).join('')}</urlset>\n`);
console.log('Generated and checked English/Persian profiles and academic/work CVs (6 pages).');
