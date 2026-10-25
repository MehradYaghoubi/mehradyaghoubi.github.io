"""Check resume content, RTL structure, embedded fonts and page boundaries."""
import json
import re
from pathlib import Path
from zipfile import ZipFile

from docx import Document
from docx.oxml.ns import qn
from pypdf import PdfReader
import pypdfium2 as pdfium

ROOT = Path(__file__).resolve().parent.parent
specs = json.loads((ROOT / 'tmp/resumes/resume-data.json').read_text(encoding='utf-8'))
results = []


def normalized(text):
    return re.sub(r'[\s\u200c-\u200f\u202a-\u202e]', '', text)


for spec in specs:
    base = ROOT / 'public/resumes' / spec['filename']
    doc = Document(base.with_suffix('.docx'))
    text = ''.join(doc.element.xpath('.//w:t/text()'))
    expected = [spec['name'], spec['title'], spec['email'], spec['phone']]
    for section in spec['sections']:
        expected.append(section['heading'])
        for entry in section['entries']:
            expected += [entry.get(k, '') for k in ['text', 'title', 'meta', 'status', 'statusLatin']]
            expected += entry.get('paragraphs', []) + entry.get('bullets', [])
    for value in expected:
        assert normalized(value) in normalized(text), (spec['filename'], value)
    for run in doc.element.xpath('.//w:r[w:t]'):
        assert run[0].tag == qn('w:rPr'), 'Run properties must precede text or Word can ignore them'
    if spec['lang'] == 'fa':
        assert not re.search(r'[\u064b-\u065f\u0670\u061b;]', text), 'Invalid Persian punctuation'
        assert all(p._p.xpath('./w:pPr/w:bidi[not(@w:val) or @w:val="1" or @w:val="true"]') for p in doc.paragraphs if p.text)
        with ZipFile(base.with_suffix('.docx')) as archive:
            assert any(name.startswith('word/fonts/') for name in archive.namelist()), 'Missing embedded DOCX font'

    reader = PdfReader(base.with_suffix('.pdf'))
    pdf = pdfium.PdfDocument(str(base.with_suffix('.pdf')))
    assert len(reader.pages) == 2, 'Review pagination instead of shrinking the font'
    fonts, links, sizes = set(), [], []
    for i, page in enumerate(reader.pages):
        def visitor(value, cm, tm, font, size):
            if value.strip():
                sizes.append(size)
        page.extract_text(visitor_text=visitor)
        assert len(page.extract_text().split()) > 40, 'Nearly empty page'
        for ref in page['/Resources']['/Font'].values():
            font = ref.get_object()
            fonts.add(str(font['/BaseFont']))
            descendant = font.get('/DescendantFonts', [font])[0].get_object()
            descriptor = descendant['/FontDescriptor'].get_object()
            assert any(key in descriptor for key in ['/FontFile', '/FontFile2', '/FontFile3']), 'Unembedded PDF font'
        for annotation in page.get('/Annots', []):
            action = annotation.get_object().get('/A', {})
            if '/URI' in action:
                links.append(str(action['/URI']))
        text_page = pdf[i].get_textpage()
        width, height = pdf[i].get_size()
        for index in range(text_page.count_chars()):
            left, bottom, right, top = text_page.get_charbox(index)
            if right <= left or top <= bottom:
                continue
            assert 10 < left < right < width - 10 and 10 < bottom < top < height - 10, 'Text outside page bounds'
    assert min(sizes) >= 9, 'Unreadably small text'
    assert 'mailto:' + spec['email'] in links and 'tel:+989912093038' in links
    assert all(url in links for _, url in spec['links']), 'Missing profile link'
    if spec['lang'] == 'fa':
        assert any('Vazirmatn-Regular' in font for font in fonts)
        assert any('Vazirmatn-Bold' in font for font in fonts)
    results.append({'file': base.name, 'pages': len(reader.pages), 'embeddedFonts': sorted(fonts),
                    'minTextSize': min(sizes), 'links': len(links), 'contentPreserved': True, 'pageBounds': True})

out = ROOT / 'tmp/pdf-legibility-2026-10-25/checks.json'
out.parent.mkdir(exist_ok=True, parents=True)
out.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(results, ensure_ascii=False))
