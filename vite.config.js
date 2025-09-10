import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const REPO = 'https://github.com/WalterDevIn/lebana-ecommerce';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? `/${REPO}/` : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Solo aplica en desarrollo local (no afecta a GitHub Pages)
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: [
      '5173-emiliomarti-lebanaecomm-8i6wtr84apa.ws-us121.gitpod.io',
    ],
  },
}));
