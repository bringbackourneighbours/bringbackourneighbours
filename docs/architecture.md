# Architecture

This document describes the initial specification for the new web-project. It documents the architectural decisions and how the where made.

<!-- TOC -->

- [Architecture](#architecture)
  - [Introduction and Goals](#introduction-and-goals)
  - [Requirements Overview](#requirements-overview)
    - [Expected Users](#expected-users)
    - [Quality Goals](#quality-goals)
    - [Architecture Constraints](#architecture-constraints)
  - [Solution Strategy](#solution-strategy)
    - [SPA vs MPA and the question of javascript](#spa-vs-mpa-and-the-question-of-javascript)
    - [Content-Management](#content-management)
      - [Variante A) "Markdown, plain und simple"](#variante-a-markdown-plain-und-simple)
      - [Variante B) "Markdown aber mit nesting"](#variante-b-markdown-aber-mit-nesting)
      - [Variante C) "GIT-CMS aber mit nesting"](#variante-c-git-cms-aber-mit-nesting)
      - [Variante D) "CMS aber plain"](#variante-d-cms-aber-plain)
      - [Variante E) "CMS aber mit nesting"](#variante-e-cms-aber-mit-nesting)
    - [PDF-Generation](#pdf-generation)
    - [Shortlinks](#shortlinks)
    - [Search](#search)
    - [Considered Tools/Frameworks](#considered-toolsframeworks)
      - [Headlees CMS](#headlees-cms)
      - [SSG or SSR friendly Frontend-Frameworks](#ssg-or-ssr-friendly-frontend-frameworks)
    - [Testing](#testing)
  - [Technical Solution](#technical-solution)
    - [Features](#features)
      - [Design](#design)
      - [Content](#content)
      - [Search](#search-1)
      - [Translation i18n](#translation-i18n)
        - [URL Translation](#url-translation)
        - [Content Translation](#content-translation)
        - [Interface Translation](#interface-translation)
      - [QR-Codes](#qr-codes)
      - [PDFs](#pdfs)
    - [Technology](#technology)
    - [Project-Structure](#project-structure)
  - [Deployment](#deployment)
  <!-- TOC -->

## Introduction and Goals

The project is called "Bring Back Our Neighbors". We had protested "back then" against the illegal deportation of the 9-member family I. from Pirna (June-August 2021). And finally, after a successful campaign, the family was brought back... and we had won the "Saxon Promotion Prize for Democracy 2021" and also received some donations.

We used the money to develop extensive multilingual information for refugees. The aim is to prevent deportations by providing clear and understandable information.

So far, we have produced 9 flyers (1 more in progress) in 6 languages (German, English, French, Georgian, Arabic, Urdu + further translations planned/in progress) and 3 emergency kits against deportations. Flyers are short texts and an emergency kit is a collection of various longer texts and lists with advice centers and addresses as well as templates for letters to authorities. Within the material there are many cross-references and links - also via QR codes.

Until now, all the materials were first created individually (in Office) and then translated and then created into PDFs with Canva/InDesign/Office and then placed on the website. For the cross-references, there is also a shortlink, e.g. https://bbonlink.de/flyer-de-dublin . With the shortlinks we also refer to material from others, sometimes differently for each language. And as you can see now: (9 flyers + 3 suitcases) \* 6 languages + the links = well over 100 places where information is available that now needs to be updated for the first time.... and that is just too much for us.

I think it would make sense instead to compile the content of the flyers and emergency kits from dynamic blocks with their references and then generate the PDFs fully automatically from ready-made templates so that each piece of information only has to be maintained once and is then immediately available live.

The design should also be simple, clear and above all mobile-friendly and work well with all languages.

## Requirements Overview

### Expected Users

We have to focus mainly on 4 groups of people, who's needs will influence the way we set up this project:

- Affected: People using the content and who are themselves in danger of a deportation and want to inform themselves
- Editors: Volunteers, who create and update and translate the content
- Developers Volunteers who design and implement the software/systems that will provide the content
- Supporters: People who do counselling or political organising and try to inform Affected
  People with the help of the content.

The order of this list also reflects a certain priority in whos needs we should not be compromising. The Editors and Programmers are part of the project team.

### Quality Goals

- Accessibility:
  - Mobile first, we expect especially lower end devices
  - works well without good network/wifi
  - content can be saved/work offline
- Internationalisation
  - the content and the interface needs to be available in all languages
  - simple interface and navigation
  - it's possible to refer to not yet translated content as a fallback
  - detecting the users browsers language should work
  - it's easy to switch the language while staying with the same content
- Availability
  - the content can be found easily via search engines
  - older – outdated links and their qrs can still be followed and will lead to the newest version
  - content can be easily shared with others
  - on the page its possible to search for all content in all languages.
- Timeliness and ease of Content Creation
  - it's clear when some content was created/updated
  - new content can be made available easily, per language within days
  - certain data might change more often – addresses for example need to updated more often
  - No duplicated content needs to be managed
  - editors and especially translators need to be able to work on the content easily
- Maintainability
  - for the programmers it needs to be at least not painful to implement as we do this in our free time
  - Design(styling) needs to be a losly coupled to allow working in parallel
  - the technology needs to be easily maintanable from a security/dependecy-perspective. After initial development,there wont be a big team to share the work
  - the project might be take up by others in the future, so easy of getting started should be low.
  - Does not use, obscure/rare technology that need lots of learning upfront

### Architecture Constraints

We need to comply with laws - mainly in regard to privacy.

The whole thing shouldn't cost anything. We are able to spend a few euros a month on hosting and can also raise funds for small translations. But that's it.

## Solution Strategy

Implementation should happen in a Javascript-ish way, as this it the skill the programmers bring and prefer. All in all we should prefer the simpler and mori maintainable options, as the team is not fixed.

### SPA vs MPA and the question of javascript

We could use an SinglePageAppilcation – one html is loaded and everything is js – or we could use a MultiPage-Application, where on each navigation the browser will fetch an new HTML document.

If we want to accommodate lower end device we have to minimise the footprint of the page. We definitely want to have some sort Server-Side-Rendering.
Booting bigger chunks to javascript is out of the question, but still a little js wont hurt.
Comparing static html with some sort of hydration, in experiments yielded that the difference is of a magnitude. Still the difference in perceived performance is not that big.

=> Both would work but MPA is favored

### Content-Management

M.e gibt es 2 zentrale Fragen:

1. Wo lebt der content? Im Git oder in einem "echten" CMS mit Datenbank?
   Hier wäre die Konsequenz, das es für nicht-devs quasi unmöglich wird inhalte einzustellen, wenn wir git nehmen. Ist die Frage, ob das schlimm ist.

2. Wollen wir die Inhalte modular gestalten, also Flyer und Koffer aus "Bausteinen" zusammensetzen, oder erhöht das nur die Komplexität und bringt am Ende wenig?

Ich habe diese 2 Frage mal in 5 Varianten versucht etwas zu verschriftlichen – nur um das jeweils auch mal richtig zu durchdenken.

#### Variante A) "Markdown, plain und simple"

Wir nutzen eins der SSG Framework so plain wie möglich:
Die Texte liegen einfach Flyer für Flyer, Koffer für koffer als Markdown mit ein kleinwenig Metadaten als content da. Doppelter Text ist auch doppelt eingepflegt,

I18n über folder/filename für die inhalte und genauso aut für das interface. (z.B. src/content/flyers/deportation/en.md)
Die Shortlink müssen ebenso über die Metadaten und ggf einen eigene collection abgebildet werden als API-Routes.
PDF wird postbuild "gedruckt" und dann hochgeladen

Konsequenzen:

- alles wird nur zur buildtime erstellt
- einpflegen von inhalten nur durch dev-team möglich (könnten man aber lernen) ist aber sehr einfach
- preview benötigt dev-env
- inhalte sind open source verfügbar
- ggbf doppelter text.
- metadaten zwischen texten sind nicht automatisdh konsitent: ALLES wir übersetzt über die (sprachen dupliziert
- Gefahr das die sprachen auseinander laufen, weil keinen enge Kohäsion
- quite straight forward

#### Variante B) "Markdown aber mit nesting"

Wir nutzen eins der SSG Framework, und müssen die inhalte aber erst zusammen tüdeln.
Die Texte liegen als markdown + metadaten im git und werden für die Darstellung einmal neu zusammen gesetzt.
I18n über folder/filename für die inhalte und genauso aut für das interface. (z.B. src/content/flyers/deportation/base.yaml + src/content/blocks/deportation-intro/en.md)
Die Shortlink müssen ebenso über die Metadaten und ggf einen eigene collection abgebildet werden als API-Routes.
PDF wird postbuild "gedruckt" und dann hochgeladen

out of the box geht das nur mit Astro (aber auch da nicht easy). ließen sich aber sicher auch per hand implementieren...

Konsequenzen:

- alles wird nur zur buildtime erstellt
- einpflegen von inhalten nur durch dev-team möglich und auch nicht trivial, weil referenzen passen müssen
- preview benötigt dev-env
- inhalte sind open source verfügbar
- kein doppelter text.
- metadaten zwischen texten sind automatisch konsitent: Es wir nur übersetzt was übersetzt werden muss
- nicht ganz so easy, kann nan durcheinander kommen

#### Variante C) "GIT-CMS aber mit nesting"

wie B) aber wir haben fertiges tooling... aber gibt es das überhaupt? Ja!
Hier liegen die texte als markdown im gut können aber per admin ui editiert werden.
Nicht alle tools unterstützten das nesting.

mit tinacms und object, list=true müsste das gehen

Konsequenzen:

- alles wird nur zur buildtime erstellt
- einpflegen von inhalten nur durch dev-team möglich
- preview benötigt dev-env
- inhalte sind open source verfügbar
- kein doppelter text.
- metadaten zwischen texten sind automatisch konsitent: Es wir nur übersetzt was übersetzt werden muss
- dank admin ein bisschen einfacher aber trotzdem nur für devs
- geringe zusätzliche komplexität, weil mehr bewegliche Teile
- geringe erhöhter Wartungsaufwand für das CMS
-

#### Variante D) "CMS aber plain"

Wir nutzen eins der SSG Framework und fetchen den content einfach je page.
Die Texte liegen einfach Flyer für Flyer,Koffer für koffer im CMS mit ein kleinwenig Metadaten als content da. Doppelter Text ist auch doppelt eingepflegt,

I18n über die inhalte in CMS und lokales lookup für das interface.
Die Shortlink müssen ebenso über die Metadaten und ggf einen eigene collection abgebildet werden als API-Routes.
PDF wird postbuild "gedruckt" und dann hochgeladen.

Konsequenzen:

- alles wird nur zur buildtime erstellt. SSR ginge aber auch.
- einpflegen von inhalten durch alle im team möglich. sehr einfach
- preview geh ganz okay im cms oder über extra SSR-route
- inhalte sind nicht open source verfügbar
- doppelter text und viel zu updaten
- metadaten zwischen texten sind automatisdh konsitent: Es wir nur übersetzt was übersetzt werden muss
- quite straight forward aber viele teile
- zusätzliche Komplexität, weil mehr bewegliche Teile
- erhöhter Wartungsaufwand für CMS

#### Variante E) "CMS aber mit nesting"

Wir nutzen eins der SSG Framework und fetchen den content je page ggbf müssen wir aber noch ein paar child resourcen dazu holen.
Die Textblöcke liegen als markdown + metadaten im cms und werden vor dort zur darstellung über referencen neu zusammen gesetzt.
I18n über folder/filename für die inhalte in CMS und lokales lookup für das interface.
Die Shortlink müssen ebenso über die Metadaten und ggf einen eigene collection abgebildet werden als API-Routes.
PDF wird postbuild "gedruckt" und dann hochgeladen.

Konsequenzen:

- alles wird nur zur buildtime erstellt. SSR ginge aber auch
- einpflegen von inhalten durch alle im team möglich. etwas komplexer vielleicht einfach
- preview geh ganz okay im cms oder über extra SSR-route
- inhalte sind nicht open source verfügbar.
- kein doppelter text.
- metadaten zwischen texten sind automatisch konsitent: Es wir nur übersetzt was übersetzt werden muss
- danke admin ein bisschen einfacher aber trotzdem ein komplexe bedienung.
- zusätzliche Komplexität, weil mehr bewegliche Teile
- erhöhter Wartungsaufwand für CMS

=> Übersetzer\*innen wer nicht selbst die Inhalte bearbeiten. Es wird also keine "Extern" im Admin geben, sondern nur das Kern-team würde dort etwas ändern. Deswegen können wir auch nur mit git arbeiten, wenn wir das wirklich wollen...

=> Wir wollen mind 2 Block-Module:
Die Texte der 3 Koffer sind zu 95% identisch innerhalb derselben Sprache. Das muss wieder verwendbar sein. Auf in einige Flyers kommen Blöcke wieder vor.
Die an einigen stellen wird im Koffer auf die Flyer verwiesen: hier wollen wir eigentlich den kompletten Flyer als infokasten einbetten....>> Ruth und Christina integrieren Flyer in Notfallkoffer.
Damit brauchen wir hier sehr simple module.

=> Außerdem brauchen wir noch 2 Typen an "Inline-Modulen"

- Adressen/kontaktdaten (werden nicht übersetzt) (beinhaltet eventuell auch Shortlinks)
- Shortlinks auf externen Inhalt
  Beide müssen in den die oben genannten Blöcken im Inhalt frei (=inline) platziert werden können.

### PDF-Generation

Die Pdfs werden am besten "per print" generiert.
Dar macht man am besten nach dem deployment per z.b. puppeteer. Das Frontend stellt dafür die Inhalte bereit und dann wird per headless chrome gedruckt und als PDF auf der richtige Route hochgeladen. ggf geht das aber auch mit einer HTML-zu-PDF-Lib.
Dabei könnte der "normale" Inhalt mit Print media query gestyled werde oder... Vielleicht ist es praktikabel eine extra "hidden" Seite dafür zu haben, das macht das debugging einfacher. Zumal es auf dem Print auch eigene inhalte gibt (z.b. visdp und Logo und so was)
Im Anschluss an den Print könnte man noch mit ghostscript o.ä. noch ein bisschen post processing machen: Komprimierung und ggbf auch zusammen Mergen von allen flyern je Sprache+Layouts für den Massendruck.

### Shortlinks

Shortlink per API Route
Aktuell sind die shortlinks per Hand mit YOURLS eingestellt, nun wäre es sinnvoll das auch in die Daten der Inhalte mit rein zu ziehen, damit daraus auch immer die qrcodes generiert werden können. Generell könnten man im Druck auch qr codes dafür anbieten.
Es gibt dabei 3 Typen:
Für unser Material auf das verwiesen wird innerhalb unseres Materials (z.b. flyer werden im Koffer verlinkt) — das sind dann die Metadaten den Material auf das gezeigt wird
Für die links die von außen (per qr code) auf unser Material zeigen .— das sind dann die Metadaten den Material auf das gezeigt wird
Externes Material das wir nur verlinken. — das müssen wir dann extra Pflegen als eigenen datentyp.

=> Es muss also ein "server-prozess" für die Redirect laufen. (z.B. Express)

### Search

Wir wollen unser Inhalte durchsuchbar machen. Dafür gibt es 2 Varianten, beide sind ähnlich komplex aber erprobt.

- Suche über die Daten: es wird per query auf den Daten gesucht und damit "errechnet" wo der match dann auftauchen würde
- Suche über externen index ggf crawling der eignen Seite.

Suche wird vermutlich client-side JS erfordern – zumindest um die suchen auszulösen.

Payload erlaubt das erstellen von eigenem index per plugin. astro geht mit fuse.js

### Considered Tools/Frameworks

#### Headlees CMS

Astro Collections
MD + complex Schema
https://docs.astro.build/en/guides/content-collections/

Keystatic: 0.8k
MD + semi complex schema + github mode + local Admin
https://keystatic.com/docs/content-components#example

tinacms 10.9k
GIT + Redis/mongo content in git. has viry fancy schema
https://github.com/tinacms/tinacms

Decap CMS 17.5k
public git based Admin + complex Schema
https://decapcms.org/docs/install-decap-cms/

apostrophecms 4.2k
full cms + on page editting
node+mongo

Keystone 8.8k
full cms
node + SQL
https://keystonejs.com/docs/getting-started

Payload 18.4k
full cms
express + mongo
https://payloadcms.com/docs/getting-started/what-is-payload

strapi 59.4k
full cms
node +sql
läuft nicht gut in monorepo
https://strapi.io/for-developers

=> Both Strapi and payload work. Payload feel more easy.
Only payload supports inline blocks (via lexical) out of the box.

#### SSG or SSR friendly Frontend-Frameworks

Gerne KEIN JSX, sehr gerne Typescript.
Ich würde außer dem gegen Scss voten.

Damit bieten sich an:

- Astro
  - astro is dead simple. not so much fun.
  - Astro ist bei vielen CMS als Integration zumindest mit gedacht: content focused
  - unterstützt MPA und SSR
  - kann componente der andere frameworks einbetten.
    - loading angular from astro will cost 10kb for astro clientsice and 30kb for angular common + the code for the component
- SvelteKit
  - sveltekit ist besonders funky
  - sveltekit has no content handling. but there are popular libs for svx/mdx
  - nur SPA mit SSR/SSG
- Analog
  - analog hat den besten nx support
  - analog ist natürlich für die angular leute sehr trivial
  - Analog has minimal content support.. no relations https://analogjs.org/docs/features/routing/content#using-the-content-files-list
  - nur SPA mit SSR/SSG
- gatsby has some minor concept like this https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/#syntax-collection-routes

=> Astro gewinnt hier durch die MPA Möglichkeit. Ansonsten ist es aber eine Frage der persönlichen präferenz. Die Unterschiede sind dann doch sehr marginal.
Wir brauchen so oder so ein ganz klein wenig client side js (min für die Suche). Für "App-feeling" lohnt sich Analog. Für content focused Astro. Svelte ist dann eher wie analog.

### Testing

Wir brauchen vermutlich keine wirklichen Unittests. Es wäre aber ratsam eine minimalen automatisierte "smoketest" zu haben, damit versehentliche deployments verhindert werden können.

Das wäre vielleicht was für playwright.

## Technical Solution

We use a single Repository with Astro and do everything as MPA. We allow for astro's javascript island only when necessary and try to solve the requirement with css first. client-side should not be loaded on load but after the visible (search in native dialog).

### Features

#### Design

Astro-Pages retrieve the content and forward it to reuseable UI-Components. Components will be written in Astro until it's no fun anymore. then we can introduce an additional framework.

We make use auf component based styling, for easier decoupling of styling and layout. To ensure a nice an coherent look we use an "theme"-wrapper component: This means a component that will set a fixed set of css-variables for us to re-use in all UI-Components.

For a nicer navigational feeling we can use the Astro [ViewTransition](https://docs.astro.build/en/guides/view-transitions/) and [Prefetch](https://docs.astro.build/en/guides/prefetch/).

#### Content

Content is managed as MDX-collections within the project as checked in files with git.
The content will be placed under `src/content`. See also [Project-Structure](#project-structure)

We will create "wrapper"-content-types for the main content (flyers and kits) and "fill" them with the reuseable content, that also needs to be translated.
We therefore only need to translate the "leafs".
See Proof of Concept: https://github.com/bringbackourneighbours/bbon-poc-astro-content/blob/main/src/content/flyers/entscheidung.md?plain=1#L3 as an example.

#### Search

For Searching, we could follow https://blog.otterlord.dev/posts/astro-search/ or https://github.com/johnny-mh/blog2/tree/main/packages/astro-fuse

#### Translation i18n

We reference languages by their [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag)
Which is equal to ISO 639-1 for most languages.

##### URL Translation

We want to make use of Multi-lingual SEO and therofore follow the google
recommendations: https://developers.google.com/search/docs/specialty/international

Following from what google says:

- we need a .de domain as we target an audience in germany
- we should not automatically redirect between languages, as this confuses everyone (including crawler)
- we need make the language of a page clear
  - use the html head for it
  - http header
  - use the sitemap.xml for links to other versions
  - use `<link rel="alternate" hreflang="lang_code" href="url_of_page" />` to link to other all languages
- we need to annotate each link in which language it will lead.
- url can and should contain the target language even if IDN encoding is necessary

We use following structure for the webpages:

bringbackourneighbours.de/`[languageCode]`/`[contentType]`/`[unifiedIdentifier]`/`[SEO friendly slug]` => canonical

bringbackourneighbours.de/`[languageCode]`/`[contentType]`/`[unifiedIdentifier]` => redirects to canonical

- languageCode = IETF BCP 47 language tag:
  - `ar`
  - `de`
  - `en`
  - `fr`
  - `ur`
  - `ka`
  - add more language as the get implemented
- contentType:
  - `page` => a static page like "about us"
  - `flyer`
  - `kit` => the "koffer"
- unifiedIdentifier:
  - english one word : `deportation` | `detention` or `affected` |
    `professional`

##### Content Translation

TBD

##### Interface Translation

We not only have to translate the content but also the interface.
Loosely following https://docs.astro.build/en/recipes/i18n/#translate-ui-strings
We provide a function `uesUiTranslation()` that reads from a json-data-collection.

#### QR-Codes

TBD

#### PDFs

TBD

### Technology

- node + npm (LTS)
- astro + typescript
- CSS (no post/Scss)
- ESLint: with ota-meshi/eslint-plugin-astro
- Stylelint: with ota-meshi/stylelint-config-html
- Prettier with: withastro/prettier-plugin-astro

### Project-Structure

This is just a draft. Pleas keep updated.

```
bringbackourneighbours/
├─ docs/
|  ├─ architecture/
│  ├─ design/
├─ node_modules/
├─ public/
│  ├─ favicon.svg
│  ├─ robots.txt
├─ src/
│  ├─ content/
│  |  ├─ pages/
│  |  |  ├─ de/
│  |  |  |  ├─ about.md
│  |  |  |  ├─ imprint.md
│  |  |  ├─ en/
│  |  |  |  ├─ about.md
│  |  |  |  ├─ imprint.md
│  |  ├─ flyers/
│  |  ├─ kits/
│  |  ├─ blockes/
│  |  ├─ shortlinks/
│  |  ├─ adresses/
│  |  ├─ config.ts
│  ├─ pages/
│  |  ├─ api/bbonlink/
│  |  |  ├─ # this endpoint will do redircts
│  |  |  ├─ [reference].ts
│  |  ├─ # here we set up the pages:
│  |  ├─ flyer/
│  |  ├─ kit/
│  |  ├─ about/
│  |  ├─ imprint/
│  |  ├─ pdf/
│  |  |  ├─ flyer/
│  |  |  ├─ kit/
│  |  ├─ index.astro
│  ├─ layouts/
│  |  ├─ # reuseable layout for the pages
│  ├─ components/
│  |  ├─ # reuseable UI-component in a flat structure
│  |  ├─ SocialLink.astro
│  |  ├─ WizardCard.astro
│  |  ├─ Header.astro
│  |  ├─ ShortLink.astro
│  ├─ theme/
│  |  ├─ # theming components (use with in the layout) +  global styles if needed
│  ├─ util/
│  |  ├─ # all sorts of helper like wi retrieving content or i18n
├─ .gitignore
├─ astro.config.mjs
├─ package-lock.json
├─ package.json
├─ tsconfig.json
├─ README.md
```

## Deployment

[//]: # 'TODO: add more details'

Code in single git-repo in github.

Domains:

- bringbackourneighbours.de
- bbonlink.de

Artifacts:

- static html and js + assets files that need to the served
- some server-side-(node)-app that will do http redirect
- pdf files as static assets that need to the served

CI to test, build, deploy, generate pdfs deploy pdf assets?

Hosting ?? should we stay with uberspace?
