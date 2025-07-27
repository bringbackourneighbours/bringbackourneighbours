[![Test](https://github.com/bringbackourneighbours/bringbackourneighbours/actions/workflows/lint.yml/badge.svg)](https://github.com/bringbackourneighbours/bringbackourneighbours/actions/workflows/lint.yml)
[![Deploy](https://github.com/bringbackourneighbours/bringbackourneighbours/actions/workflows/staging.yml/badge.svg)](https://bringbackourneighbours.github.io/bringbackourneighbours/)
![License: MIT (Non-Commercial)](https://img.shields.io/badge/license-MIT--NC-blue.svg)

# Bring Back Our Neighbours

<!-- TOC -->

- [Bring Back Our Neighbours](#bring-back-our-neighbours)
  - [About](#about)
  - [Getting Started](#getting-started)
  - [Linters and Formatters](#linters-and-formatters)
  - [Requirements](#requirements)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)
    - [Code of conduct](#code-of-conduct)
    - [Adding Content](#adding-content)
      - [Block](#block)
      - [Standalone Content: Flyers, Kits and Pages](#standalone-content-flyers-kits-and-pages)
      - [Addresses](#addresses)
      - [Links](#links)
      - [Forms/Templates](#formstemplates)
  - [Licencing](#licencing)
  <!-- TOC -->

## About

See https://github.com/bringbackourneighbours

## Getting Started

All commands are run from the root of the project, from a terminal:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm ci`          | Installs dependencies.                       |
| `npm run dev`     | Starts local dev server at `localhost:4321`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |

## Linters and Formatters

We use `husky` to provide some linting with automatically fixing for the files you are commiting.

Additionally, you may run the linters manually:

| Command                                                                     | Action                                                          |
| :-------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| `npm run stylelint `                                                        | Automatically fix CSS and Astro file styling issues             |
| `npx prettier --write "**/*.astro" "**/*.ts" "**/*.css" "**/*.md"`          | Format Astro, TypeScript, CSS, and Markdown files               |
| `npx eslint . --ignore-pattern ".astro/**" --ignore-pattern "src/env.d.ts"` | Run ESLint on all files, ignoring .astro files and src/env.d.ts |

## Testing

We are using 2 testing framework ATM.

| Command        | Action                             |
| :------------- | :--------------------------------- |
| `npm run test` | Run all the unit tests with vitest |
| `npm run e2e`  | Run end-2-end test with playwright |

### Unit testing with vitest

We use `vitest` for testing the code on a unit scope.
To add a test use a `**.test.ts` file.
Those test should focus on the logic of smaller parts of the App. before we should not use the real the `.mdx`-content
in the unit test, as the tests could break when ever we update some parts of the content.

### E2E testing with playwright

To test the overall healthiness of the app, from the perspective of a real user on a physical device we use
`playwright`.
It will boot up the app in `local`/`dev` – not statically rendered and open up the pages and analyse the main content on
then.

To add a test use a `**.spec.ts` file. For now we will mainly use snapshot tests for the pages. Beware: You can put
those test-files everywhere. To prevent `astro` from trying to render then, the filenamme should begin with an
underscore. e.g. `src/pages/_wizard.spec.ts`

## Requirements

For now, we have tested this project mainly on ubuntu 24.04., as this is the worker GitHub will provide us.

This projects needs to have the following software installed:

- [node.js](https://nodejs.org/en/download) LTS with npm
- all [dependencies](https://pptr.dev/guides/system-requirements) of puppeteer with chromium.

## Project Structure

See: https://github.com/bringbackourneighbours/docs/tree/main/architecture

Inside your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file
name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact
components.

Any static assets, like images, can be placed in the `public/` directory.

## Contributing

As part of the ‘Bring Back Our Neighbours’ campaign, we, a group of full-time and volunteer activists in the field of
asylum and political education in Saxony, Germany, have produced several information flyers and this emergency kit
against deportations.

The aim is to provide people who fear deportation, voluntary supporters and professionals with a quick overview and
further information on the subject of deportations.

The information is primarily for Saxony. Much of it is valid and helpful throughout Germany. However, the contacts to
advice centres and authorities are only for Saxony.

We try to ensure that all information is up-to-date and complete. However, we would be happy to receive further
information and criticism from you. What has worked in the past to prevent deportation? Write to:
info@bringbackourneighbours.de

### Code of conduct

TBA

We fundamentally reject deportations as inhumane; they symbolise racism and nationalism.

We criticise the violent practice of deportations in Saxony, which endangers people’s lives and health.

We want to protect as many people as possible from this violence.

### Adding Content

all the content is stored in the directory `src/content` with the following structure:

```text
/
├── public/             # => Files that we provide for direct download
├── src/
│   └── content/
│       ├── addresses/  # => all the Addresses
│       ├── blocks/     # => all the Block
│       ├── flyers/     # => all the Flyers
│       ├── kits/       # => all the Kits
│       ├── pages/      # => all the Pages
│       ├── ui/         # => all the text we use on the website, like "share"
│       └── config.ts   # => all the main file hold the configuration of all the content-structure
└── package.json
```

#### Block

The biggest portion of the content is stored as so called `blocks`. Those blocks will be embedded in the other "
standalone" content types

All block need to be in the [MDX](https://mdxjs.com) format, it has the file ending `.mdx` or `.md` (if only using the
base markdown features).

Place the files in `/src/content/blocks`. Add a folder per block, that contains one mdx file per language. The file and
folder names are not evaluated.

Each block has a "frontmatter"-section and content below. With the content you can embed other elements, even different
blocks. Please note, that you don't need to and should not import other component in the MDX body, as it would impact
the
mapping logic.

Example Block: `/src/content/blocks/example/de.mdx`:

```yaml
---
identifier: example       # identifier to embed the block
lang: de                  # language of tme block
lastChecked: 2025-07-08   # the day this content was last checked. use to spot outdated translations
fallback: en              # (optional) another language, it will be shown as fallback. use if no translation available but content is necessary
machineTranslation: false # (optional) mark that the content was not translated by a human and may contain errors.
---

# h1

Random Text in the markdown format

  # h2

* list item1
* list item2
* list item3

<Block
identifier="another"
lang="tr"
/>

```

#### Standalone Content: Flyers, Kits and Pages

To actually show the content we need to put in one of the standalone content collections. They all behave in the same
way and are super-sets of the normal 'blocks', but additionally you need to provide a `title` and a `seo`-text.

Example Block: `/src/content/flyers/example/de.mdx`:

```yaml
---
identifier: example # identifier to embed the block
lang: de # language of tme block
lastChecked: 2025-07-30 # the day this content was last checked. use to spot outdated translations
title: How to stop a deportation # will also be used as
seo: Around 150 Characters # will be set a meta description for search engines
fallback: en # (optional) another language, it will be shown as fallback. use if no vvtranslation available but content is necessary
machineTranslation: false # (optional) mark that the content was not translated by a human and may contain errors.
---
```

#### Addresses

All the Adresses of a consultation center, a group or just a website.

An Adresses needs to be in the [YAML](https://en.wikipedia.org/wiki/YAML) format, it has the file ending `.yaml` or
`.yml`.

Example:

```yaml
# every Address needs at least
identifier: my-address # the identifier you have to use to reference this address
lastChecked: 2024-07-17 # date this address was last checked for correctness
name: Projekt Namenlos # the main title of the address, the name of the group/organisation

# all other information is optional
additional: c/o Namelos e.V. #  addition information, like subtitel or addtion address information
streetLine: Am Ende 123
zip: '12345'
city: Dresden

# mail ahd phone can be plural or singular, or even both
mail: mail@hallo.de
mails:
  - mail1@web.de
  - mail2@web.de

phone: '+4917333444550'
phones:
  - '+4917333444551'
  - '+49173334445552'
  - '+49173334445553'

url: example.com # the url is the website

# for social media only use the username, not the full url
facebook: facebook
instagram: instagram
telegram: telegram
twitter: twitter

# it's possible to an add a bbon ExternalShortLINK to an address
# in most case the normal url should be prefered, only when the address is too long to type use a link as shortener
bbon: slug

# you can add   a note on the address. providing some context, explaining what this organisation is doing. only the one in the current language will be shown
translatedNotes:
  de: 'Nur ein Beispiel'
  en: 'Just an Example'
```

To use an Address in the Content(MDX-only) you first have to import the component and then place it with the identifier
set.
In most Component the `Address` is imported automatically.

Usage-Example:

```yaml
---
identifier: some-content
lang: de
lastChecked: 2025-12-27
---
// Import the component if needed, in most content it will work wihtout
import Address from '../../../components/Address.astro';

Random Text
---
<Address identifier="my-address"/>
```

This together will result in something like
![address_web_example.png](docs/images/address_web_example.png)

#### Links

Within the content we link to material (pdf, audio, video, webpages) from others, sometimes differently for each
language.

For each link you have to create a file in the [YAML](https://en.wikipedia.org/wiki/YAML) format, it has the file ending
`.yaml` or
`.yml`.

Within the file there can be a section for each language, that the material is available. Additional optionally a
section `all` can be used, all properties with in this section will be overridden by the properties per language.

Example Link: `/src/content/links/example.yml`:

```yaml
all:
  type: PDF
en:
  slug: stuff
  url: www.anothersite.com/thathassomeinteresstingstuffEnglish.pdf
  title: Interessting Stuff
de:
  slug: zeugs
  url: www.anothersite.com/thathassomeinteresstingstuffGerman.pdf
  title: Interessesantes Zeugs
```

#### Forms/Templates

We have compiled templates that can be used in an emergency, i.e. in the event of an ongoing deportation. Those might be
forms as Pdfs or Docs that can be directly downloaded form our site.

To make them available the files can be uploaded in the folder `public/forms`. Then create a (external) Link, that
points to the document. Best use a relative URI.

Example File: `/public/forms/Urgent Application.pdf`

Example Link: `/src/content/links/form_urgent.yml`:

```yaml
en:
  slug: urgent
  url: /forms/Urgent Application.pdf
  type: DOC
  title: Urgent application to the administrative court for the granting of tolerated stay, prevention of the deportation scheduled for today
```

Usage-Example:

```yaml
---
identifier: some-content
lang: de
lastChecked: 2024-01-31
---
Random Text

<ExternalShortLink identifier="form_urgent"/>
```

## Licencing

```
::include{file=LICENCE}
```
