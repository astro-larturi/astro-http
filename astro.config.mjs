// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

export const prerender = false

import node from '@astrojs/node'

import db from '@astrojs/db';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), db(), vue()],

  // https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#removed-hybrid-rendering-mode
  output: 'static',

  adapter: node({
    mode: 'standalone'
  })
})