import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    i18n: {
        defaultLocale: "de",
        locales: ["de", "en"],
        routing: {
            prefixDefaultLocale: true,
            redirectToDefaultLocale: true
        }
    }
});
