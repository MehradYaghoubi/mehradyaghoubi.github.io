---
name: Mehrad Yaghoubi academic profile
description: A bilingual research profile with a calm reading surface and direct scholarly evidence.
colors:
  paper: '#ffffff'
  ground: '#f3f6f8'
  ink: '#1b2c3b'
  muted: '#526575'
  link: '#175a82'
  link-hover: '#102f45'
  deep: '#153d59'
  primary-hover: '#24546f'
  line: '#d9e3e9'
  tint: '#edf4f8'
  button-line: '#bdcfdb'
  accent-line: '#c8dae5'
  focus: '#247bab'
typography:
  display:
    fontFamily: 'IBM Plex Sans, sans-serif'
    fontSize: 'clamp(2.2rem, 4.1vw, 3rem)'
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: '-0.035em'
  headline:
    fontFamily: 'IBM Plex Sans, sans-serif'
    fontSize: '1.65rem'
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: '-0.02em'
  paper-title:
    fontFamily: 'IBM Plex Sans, sans-serif'
    fontSize: '18px'
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: '-0.015em'
  body:
    fontFamily: 'IBM Plex Sans, sans-serif'
    fontSize: '17px'
    fontWeight: 400
    lineHeight: 1.65
  body-fa:
    fontFamily: 'Vazirmatn, IBM Plex Sans, sans-serif'
    fontSize: '17px'
    fontWeight: 400
    lineHeight: 1.95
  action:
    fontFamily: 'IBM Plex Sans, sans-serif'
    fontSize: '15px'
    fontWeight: 500
rounded:
  action: '5px'
  inset: '6px'
  panel: '12px'
  panel-mobile: '9px'
spacing:
  paragraph: '16px'
  panel: '42px'
  panel-tablet: '32px 30px 0'
  panel-mobile: '27px 23px 0'
  column-gap: '55px'
components:
  button-primary:
    backgroundColor: '{colors.deep}'
    textColor: '{colors.paper}'
    typography: '{typography.action}'
    rounded: '{rounded.action}'
    padding: '8px 17px'
  button-primary-hover:
    backgroundColor: '{colors.primary-hover}'
    textColor: '{colors.paper}'
  button-secondary:
    textColor: '{colors.link}'
    typography: '{typography.action}'
    rounded: '{rounded.action}'
    padding: '8px 17px'
  button-secondary-hover:
    backgroundColor: '{colors.tint}'
  reading-panel:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
    rounded: '{rounded.panel}'
    padding: '42px 42px 0'
  opportunity:
    backgroundColor: '{colors.tint}'
    rounded: '{rounded.action}'
    padding: '19px 21px'
---

# Design System: Mehrad Yaghoubi

## Overview

**Creative North Star: "The Research Reading Room"**

A composed academic profile built around readable research evidence. Paper and mist surfaces, deep blue actions and a compact identity rail give readers a clear route from identity to manuscripts, software and contact. The direction draws on the reading clarity of the researcher sites recorded in the redesign brief.

English and Persian share the same hierarchy and visual quality. Persian receives its own type metrics and right-to-left flow. The previous decorative 3D presentation is the confirmed anti-reference.

**Key Characteristics:**

- Quiet color, flat surfaces and restrained rounded corners.
- Bibliographic titles and direct scholarly links.
- Compact research diagrams attached to the relevant paper.
- Native links, keyboard focus and printable public CVs.

## Colors

### Primary

Deep blue identifies the wordmark and filled actions. Link blue identifies text links; darker hover colors retain their role without animation. Focus blue belongs to the keyboard outline.

### Neutral

Paper is the reading surface; ground is the surrounding mist. Ink is primary text, muted supports descriptions and metadata, and line separates sections. Tint highlights the opportunity notice and secondary action hover. Button line and accent line provide local boundaries.

**The Evidence Rule.** Reserve emphasis for identity, research titles and actionable links; status must remain readable as text.

## Typography

IBM Plex Sans serves English; Vazirmatn serves Persian. Both are self-hosted WOFF2 families with `font-display: swap` and available weights from 400 through 700. The general prose baseline uses the body tokens; compact paper and project descriptions use 15–16px text. Strong text and headings use weight 600.

The display token governs the English identity; section headings use headline, and paper titles use paper-title. The English introduction uses 23px, weight 500, line-height 1.45 and a 620px maximum width. Persian identity uses 2.65rem and introduction uses 22px with line-height 1.85. Persian headings reset letter spacing and use line-height 1.6. English paper titles and authors inside Persian pages retain IBM Plex Sans and a 1.55 line-height.

At the mobile breakpoint the root becomes 16px, English identity becomes 37px, Persian identity becomes 34px, section headings become 25px, and introductions become 21px English / 20px Persian. Paper titles remain 18px.

**The Script Rule.** Preserve each script's natural spacing and direction. Keep bibliographic titles in their source language, accompanied by Persian explanations where applicable.

## Layout

The desktop shell has a maximum outer width of 1232px, 30px horizontal padding, a 218px identity rail, a 55px column gap and a flexible reading panel. The rail is sticky at 40px from the viewport top. The panel uses the panel padding token and a thin boundary. The shell begins 56px from the top, increasing to 68px at viewport widths of at least 1450px.

At widths up to 1050px, the rail becomes 185px, the gap becomes 30px, shell padding becomes 22px and the panel uses panel-tablet padding. Paper rows have a 154px figure column with a 23px gap on desktop, changing to 125px / 18px at this breakpoint.

At widths up to 760px, the rail becomes a static compact header, navigation scrolls horizontally and the reading panel uses panel-mobile padding. Shell padding becomes 18px. Papers and project lists become single columns; paper figures become 164px wide. Use logical borders, padding and alignment so the same layout follows each page's direction.

The public CV uses a separate centered surface with maximum outer width 940px and padding 32px 48px. On mobile it uses 12px outer margins and 23px padding.

Print uses 16mm page margins, white paper, black 11pt body text and 28pt / 17pt / 12pt CV headings. Navigation, print controls, skip link and research figures are hidden; screen borders and outer page spacing are removed. Education entries and CV articles avoid internal page breaks.

## Elevation & Depth

Surfaces are flat with no shadows. Depth comes from the mist ground, white reading surface, thin rules and lightly tinted insets. The sidebar shares the page ground; it is not a filled blue slab.

## Shapes

Use restrained rounding: panel and panel-mobile tokens for the main surface, action for links styled as buttons and notices, inset for project and research figure containers. Section boundaries are thin straight lines. Research summaries use an accent border on the inline start edge.

## Components

### Actions and links

Primary and secondary actions share 44px minimum height, action typography and compact padding. Primary is filled deep blue; secondary is transparent with a button-line boundary. Hover changes fill or text immediately. Text links use a 4px underline offset and a 1px underline thickness; navigation and paper titles reveal their underline on hover.

Links, buttons and disclosure summaries receive a 3px focus-blue outline, 5px offset and 3px corner radius. Preserve native semantic elements and the skip link, which becomes visible when focused.

### Navigation

Desktop navigation is a vertical list of 15px links with a 9px gap. Mobile navigation is one horizontally scrollable row of 13px links with a 21px gap. Language navigation remains a real link. Use the same content hierarchy on both language routes.

### Research rows and disclosures

Each paper pairs a compact conceptual figure with status, title, authors, explanatory copy and direct links. Separate rows with a rule and compact vertical space. Native `details` / `summary` supplies optional reading depth without requiring JavaScript.

### Project and opportunity insets

The featured project has a pale surface, thin boundary and inset rounding; other projects use simple top rules in a two-column desktop list. The opportunity notice uses tint and an accent boundary with compact heading and prose. Status descriptions remain factual text.

### Motion

Anchor scrolling is smooth by default with 32px scroll clearance. Under `prefers-reduced-motion: reduce`, scrolling becomes immediate. There are no animated decorations or hover movement in the current system.

## Do's and Don'ts

- **Do** carry the same structure and visual hierarchy across English and Persian.
- **Do** preserve visible keyboard focus, native disclosures, direct links and print readability.
- **Do** use type, rules and spacing to separate research evidence.
- **Don't** reintroduce the rejected decorative 3D presentation.
- **Don't** substitute manuscript status with a visual badge that obscures its meaning.
- **Don't** publish private CV contact or referee details through new visual components.
