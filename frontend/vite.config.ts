import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path"

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {} // Define `process.env` como un objeto vacío
  },
  server: {
    host: true,
    port: 5173, // Permitir accesos desde cualquier IP
    proxy: {
      '/api/v1/': {
        target: 'http://localhost:8000', // Cambia a 'backend' para resolver el nombre del servicio
        changeOrigin: true,
      },
      '/auth/': {
        target: 'http://backend:8000',
        changeOrigin: true,
      },
      '/client/': {
        target: 'http://backend:8000',
        changeOrigin: true,
      },
      '/static/': {
        target: 'http://backend:8000',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
