import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    vitePreprocess(),
    {
      postcss: {
        plugins: [tailwindcss, autoprefixer]
      }
    }
  ],
  kit: {
    adapter: adapter()
  }
};

export default config;