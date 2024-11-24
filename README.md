[![Test](https://github.com/bringbackourneighbours/bringbackourneighbours/actions/workflows/lint.yml/badge.svg)](https://github.com/bringbackourneighbours/bringbackourneighbours/actions/workflows/lint.yml)
[![Deploy](https://github.com/bringbackourneighbours/bringbackourneighbours/actions/workflows/staging.yml/badge.svg)](https://bringbackourneighbours.github.io/bringbackourneighbours/)

# Bring Back Our Neighbours

## About

See https://github.com/bringbackourneighbours

## Getting Started

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm ci`                  | Installs dependencies.                           |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Linters and Formatters

| `npx stylelint --fix src/*.css **/*.astro` | Automatically fix CSS and Astro file styling issues |
| `npx prettier --write "**/*.astro" "**/*.ts" "**/*.css" "**/*.md"` | Format Astro, TypeScript, CSS, and Markdown files |
| `npx eslint . --ignore-pattern ".astro/**" --ignore-pattern "src/env.d.ts"` | Run ESLint on all files, ignoring .astro files and src/env.d.ts |

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

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## Contributing

As part of the ‘Bring Back Our Neighbours’ campaign, we, a group of full-time and volunteer activists in the field of asylum and political education in Saxony, Germany, have produced several information flyers and this emergency kit against deportations.

The aim is to provide people who fear deportation, voluntary supporters and professionals with a quick overview and further information on the subject of deportations.

The information is primarily for Saxony. Much of it is valid and helpful throughout Germany. However, the contacts to advice centres and authorities are only for Saxony.

We try to ensure that all information is up-to-date and complete. However, we would be happy to receive further information and criticism from you. What has worked in the past to prevent deportation? Write to: info@bringbackourneighbours.de

### Code of conduct

TBA

We fundamentally reject deportations as inhumane; they symbolise racism and nationalism.

We criticise the violent practice of deportations in Saxony, which endangers people’s lives and health.

We want to protect as many people as possible from this violence.

### Adding Content

all the content is stored in the directory `src/content` with the following structure:

```text
/
├── public/
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

#### Addresses

All the Adresses of a consultation center, a group or just a website.

An Adresses needs to be in the [YAML](https://en.wikipedia.org/wiki/YAML) format, it has the file ending `.yaml` or `.yml`.

Example:

```yaml
# every Address needs at least
identifier: my-address # the identifier you have to use to reference this address
lastChecked: 2024-07-17 # date this address was last checked for correctness
name: Projekt Namenlos # the main title of the address, the name of the group/organisatio

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

# it's possible to a add a bbon ExternalShortLINK to an address
# in most caes the normal url should be prefered, only when the adress is to long to type use a link as shortener
bbon: slug

# you can add   a note on the adress. providing some contecxt, explaining what this organisation is doing. only the one in the current language will be shown
translatedNotes:
  de: 'Nur ein Beispiel'
  en: 'Just an Example'
```

To use an Address in the Content(MDX-only) you first have to import the component and then place it with the identifier set.
In most Component the `Address` is omported automatically.

Usage-Example:

```mdxjs
---
identifier: some-contet
lang: de
lastChecked: 2024-09-07
---

// Import the component if needed, in most content it will work wihtout
import Address from '../../../components/Address.astro';

Random Text...

<Address identifier="my-address" />

```

This together will result in something like
![address_web_example.png](docs/images/address_web_example.png)

#### Block

#### Flyers

#### Kits

#### Pages
