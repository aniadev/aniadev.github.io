import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',
  devtools: { enabled: false },

  // SSG for GitHub Pages (user page `aniadev.github.io` → served at root, baseURL '/').
  // SSR true at build so every route prerenders to static HTML for SEO + link cards.
  ssr: true,

  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    'shadcn-nuxt',
  ],

  css: ['~/assets/css/main.css'],

  // Flat component names (SiteHeader, not SiteSiteHeader). shadcn-nuxt owns ui/** with the Ui prefix.
  components: [{ path: '~/components', pathPrefix: false, ignore: ['ui/**'] }],

  // Only interactive primitives (dialog/select/popover) pull reka-ui type-resolution during SFC
  // compile — the blog avoids those, so SSR build stays clear of the `compileScript` fs issue.
  // Keep the `Ui` prefix to match shadcn-vue convention (UiButton/UiCard/UiBadge…).
  shadcn: {
    prefix: 'Ui',
    componentDir: '@/components/ui',
  },

  // Class-based dark mode toggles `.dark` to match the Tailwind `dark` variant in main.css.
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'light',
    storageKey: 'ph-color-mode',
  },

  // Iconify, bundled locally so the static site never calls the runtime Iconify API.
  icon: {
    mode: 'svg',
    serverBundle: { collections: ['lucide', 'simple-icons'] },
  },

  // Bilingual VN/EN. no_prefix: single set of routes, locale swaps UI strings + filters content
  // (robust for static generate; avoids duplicating every dynamic content route).
  i18n: {
    bundle: { optimizeTranslationDirective: false },
    strategy: 'no_prefix',
    defaultLocale: 'vi',
    locales: [
      { code: 'vi', name: 'Tiếng Việt', file: 'vi.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'ph-lang',
      redirectOn: 'root',
    },
  },

  content: {
    build: {
      markdown: {
        toc: { depth: 3, searchDepth: 3 },
        highlight: {
          theme: { default: 'github-light', dark: 'github-dark' },
          langs: ['ts', 'js', 'json', 'bash', 'rust', 'haskell', 'python', 'diff', 'yaml', 'toml'],
        },
      },
    },
  },

  fonts: {
    families: [
      { name: 'Space Grotesk', provider: 'google' },
      { name: 'Inter', provider: 'google' },
      { name: 'JetBrains Mono', provider: 'google' },
    ],
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/writing', '/projects', '/about', '/404.html'],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    baseURL: '/',
    head: {
      htmlAttrs: { lang: 'vi' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
})
