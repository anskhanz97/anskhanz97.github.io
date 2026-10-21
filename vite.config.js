import { defineConfig } from 'vite';
import { resolve } from 'node:path';
export default defineConfig({ build: { rollupOptions: { input: { main: resolve(import.meta.dirname, 'index.html'), rentops: resolve(import.meta.dirname, 'rentops.html'), mypos: resolve(import.meta.dirname, 'mypos.html') } } } });
