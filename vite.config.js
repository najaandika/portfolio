import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'early-charset',
      transformIndexHtml: {
        order: 'post',
        handler(html) {
          const withoutCharset = html.replace(/\s*<meta charset="UTF-8"\s*\/?>/i, '');
          return withoutCharset.replace('<head>', '<head>\n    <meta charset="UTF-8" />');
        },
      },
    },
  ],
})
