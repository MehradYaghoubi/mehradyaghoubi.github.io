import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: { input: ['index.html', 'fa/index.html', 'cv/index.html', 'fa/cv/index.html', 'work-cv/index.html', 'fa/work-cv/index.html'] },
  },
});
