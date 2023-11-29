// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '', // Deja esto como una cadena vacía si tu aplicación está en la raíz
  plugins: [react()],
});
