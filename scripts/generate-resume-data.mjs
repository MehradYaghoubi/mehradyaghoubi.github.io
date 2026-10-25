import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { site, content, papers } from '../src/content.js';

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
const workProjects = (c) => {
  const fa = c.lang === 'fa';
  return [
    { title: 'EGOSD', paragraphs: [fa
      ? 'خودتقطیری مبتنی بر عدم قطعیت برای بازشناسی گفتار دیداری. آموزش و اجرای مدل روی پردازنده گرافیکی.'
      : 'Uncertainty-guided self-distillation for visual speech recognition. GPU model training and inference.'],
      status: fa ? 'در حال داوری در مجله' : 'Under review at The Visual Computer',
      statusLatin: fa ? 'The Visual Computer' : '',
      links: [[fa ? 'پیش‌چاپ مقاله' : 'Preprint', papers[0].url]],
    },
    software(fa),
    { title: fa ? 'شوفاژ یعقوبی' : 'Shofazh Yaghoubi', paragraphs: [c.shop],
      links: [[fa ? 'وب‌سایت' : 'Website', 'http://shofazhyaghoubi.ir/']] },
    { title: fa ? 'ابزار تشخیص متن' : 'OCR tool', paragraphs: [c.ocr] },
    { title: fa ? 'چت‌بات شخصی RAG' : 'Personal RAG chatbot', status: fa ? 'در دست توسعه' : 'In development' },
  ];
};

const en = content.en;
const documents = [{
  filename: 'Mehrad-Yaghoubi-Academic-CV', lang: 'en', name: site.name,
  title: 'Computer vision and uncertainty-aware learning',
  sections: [
    section('Research profile', [paragraph(en.cvIntro)]),
    section('Selected research', papers.map((p) => ({
      title: p.title, meta: `${p.authors} · ${p.year}`,
      status: p.status.en, paragraphs: [p.summary.en],
      links: [[p.doi ? 'DOI 10.2139/ssrn.6831426' : 'arXiv 2607.26946', p.doi || p.url]],
    }))),
    section('Education', education(en)),
    section('Research software', [software(false)]),
    section('Technical skills', [
      paragraph(en.researchSkillList.slice(0, 5).join(' · '), { latin: true }),
      paragraph(en.researchSkillList.slice(5).join(' · '), { latin: true }),
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
        paragraph(c.skillList.slice(0, 4).join(' · '), { latin: true }),
        paragraph(c.skillList.slice(4).join(' · '), { latin: true }),
      ]),
      section(fa ? 'سوابق کاری' : 'Professional experience', experience(c.experienceItems.slice(0, 1))),
      section(fa ? 'پروژه‌های منتخب' : 'Selected projects', workProjects(c)),
      { ...section(fa ? 'پژوهش و تدریس' : 'Research and teaching', experience(c.experienceItems.slice(2), false)), pageBreakBefore: true },
      section(c.education, education(c)),
      section(fa ? 'تجربه کارآفرینی' : 'Entrepreneurial experience', experience(c.experienceItems.slice(1, 2))),
      section(fa ? 'زبان‌ها' : 'Languages', fa
        ? [paragraph('فارسی، زبان مادری'), paragraph('English · B1', { latin: true })]
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
  if (d.lang === 'fa') assert(!/[\u064b-\u065f\u0670\u061b;]/u.test(JSON.stringify(d)), 'Invalid Persian punctuation');
}
await mkdir('tmp/resumes', { recursive: true });
await writeFile('tmp/resumes/resume-data.json', JSON.stringify(documents, null, 2));
console.log('Prepared structured content for three resumes.');
