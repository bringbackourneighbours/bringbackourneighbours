![Test](https://github.com/bringbackourneighbours/bringbackourneighbours/actions/workflows/lint.yml/badge.svg)
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

TBA

### Code of conduct

TBA
