import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { site, content, papers, routerProject, workProjects } from '../src/content.js';

const section = (heading, entries) => ({ heading, entries });
const paragraph = (text, extra = {}) => ({ text, ...extra });
const experience = (items, details = true) => items.map((e) => ({
  title: e.role, meta: `${e.employer} · ${e.period}`,
  paragraphs: details && e.summary ? [e.summary] : [],
  bullets: details ? e.highlights : [],
}));
const education = (c) => [
  { title: c.msc, meta: c.institution, paragraphs: [c.mscState, c.mscGpa, c.mscThesis] },
  { title: c.bsc, meta: c.institution, paragraphs: [c.bscPeriod, c.bscGpa] },
];
const software = (fa) => ({
  title: 'PyLipExtractor',
  paragraphs: [fa
    ? 'بسته متن‌باز استخراج ناحیه لب از ویدئو با هموارسازی زمانی و تنظیم اختیاری روشنایی.'
    : 'Open-source package for extracting lip regions from video, with temporal smoothing and optional illumination normalization.'],
  links: [['GitHub', 'https://github.com/MehradYaghoubi/pylipextractor'], ['PyPI', 'https://pypi.org/project/pylipextractor/']],
});
const router = (lang) => ({
  title: routerProject.title, paragraphs: [routerProject.description[lang]],
  links: [['GitHub', routerProject.url]],
});
const contribution = (lang) => ({
  title: 'XERJ Corpus Hub',
  paragraphs: [lang === 'fa' ? 'مشارکت‌کننده متن‌باز.' : 'Open-source contributor.'],
  links: [[lang === 'fa' ? 'پروفایل مشارکت' : 'Contributor profile', routerProject.contributorUrl]],
});
const en = content.en;
const documents = [{
  filename: 'Mehrad-Yaghoubi-Academic-CV', lang: 'en', name: site.name,
  title: 'Computer vision and uncertainty-aware learning',
  sections: [
    section('Research profile', [paragraph(en.cvIntro)]),
    section('Selected research', papers.map((p) => ({
      title: p.title, meta: `${p.authors} · ${p.year}`,
      status: p.status.en, paragraphs: [p.summary.en],
      links: [[p.doi ? 'Preprint DOI 10.2139/ssrn.6831426' : 'arXiv 2607.26946', p.doi || p.url], ...(p.code ? [['GitHub', p.code]] : [])],
    }))),
    section('Education', education(en)),
    section('Research software and open source', [software(false), router('en'), contribution('en')]),
    section('Technical skills', [
      paragraph(en.researchSkillList.slice(0, 5).join(' · '), { latin: true }),
      paragraph(en.researchSkillList.slice(5, 11).join(' · '), { latin: true }),
      paragraph(en.researchSkillList.slice(11).join(' · '), { latin: true }),
    ]),
    section('Research and teaching', experience(en.experienceItems.slice(2), false)),
    section('Professional experience', [
      ...experience(en.experienceItems.slice(0, 1), false),
      ...experience(en.experienceItems.slice(1, 2)),
    ]),
    section('Languages', [paragraph('Persian (native) · English (B1)')]),
  ],
}];
for (const c of [content.en, content.fa]) {
  const fa = c.lang === 'fa';
  documents.push({
    filename: `Mehrad-Yaghoubi-AI-Engineering-Resume${fa ? '-FA' : ''}`,
    lang: c.lang, name: c.name, title: fa ? 'متخصص هوش مصنوعی' : 'AI Specialist',
    sections: [
      section(fa ? 'معرفی' : 'Profile', [paragraph(c.workCvIntro)]),
      section(c.skills, [
        paragraph(c.skillList.slice(0, 6).join(' · '), { latin: true }),
        paragraph(c.skillList.slice(6, 13).join(' · '), { latin: true }),
        paragraph(c.skillList.slice(13).join(' · '), { latin: true }),
      ]),
      section(fa ? 'سوابق حرفه‌ای' : 'Professional experience', experience(c.experienceItems)),
      section(fa ? 'پژوهش منتخب' : 'Selected research', workProjects.filter((p) => !p.url).map((p) => ({
        title: fa ? 'مدل باور و عدم قطعیت در بازی Go' : 'Belief models and uncertainty in Go',
        paragraphs: [p[c.lang]], links: [[fa ? 'پیش‌چاپ arXiv' : 'arXiv preprint', p.paper]],
      }))),
      { ...section(fa ? 'پروژه‌های منتخب' : 'Selected projects', workProjects.filter((p) => p.url).map((p) => ({
        title: p.title, paragraphs: [p[c.lang]], status: p.status?.[c.lang],
        links: [...(p.url ? [['GitHub', p.url]] : []), ...(p.paper ? [[fa ? 'پیش‌چاپ' : 'Preprint', p.paper]] : [])],
      }))), pageBreakBefore: true, entrySpacing: 3 },
      section(c.education, education(c)),
      section(fa ? 'زبان‌ها' : 'Languages', fa
        ? [paragraph('فارسی، زبان مادری · English (B1)')]
        : [paragraph('Persian (native) · English (B1)')]),
    ],
  });
}
for (const d of documents) {
  d.phone = d.lang === 'fa' ? site.phoneFa : site.phone;
  d.email = site.email;
  d.location = content[d.lang].location;
  d.links = [
    [d.lang === 'fa' ? 'وب‌سایت شخصی' : 'Portfolio', site.url + '/'],
    ...site.profiles.filter(([label]) => ['GitHub', 'LinkedIn', ...(d.filename.includes('Academic') ? ['Google Scholar', 'ORCID'] : [])].includes(label)),
  ];
  assert(d.sections.every((s) => s.entries.length), 'Empty resume section');
  if (d.filename.includes('Engineering')) {
    const roles = d.sections.find((s) => s.heading === (d.lang === 'fa' ? 'سوابق حرفه‌ای' : 'Professional experience')).entries;
    assert.deepEqual(roles.map((e) => e.title), content[d.lang].experienceItems.map((e) => e.role), 'Incomplete professional experience');
  }
  if (d.lang === 'fa') assert(!/[\u064b-\u065f\u0670\u061b;]/u.test(JSON.stringify(d)), 'Invalid Persian punctuation');
}
await mkdir('tmp/resumes', { recursive: true });
await writeFile('tmp/resumes/resume-data.json', JSON.stringify(documents, null, 2));
console.log('Prepared structured content for three resumes.');
