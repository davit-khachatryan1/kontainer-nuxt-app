// plugins/load-google-fonts.js
import raf from 'raf';

export default defineNuxtPlugin(() => {
  if (process.env.NUXT_PUBLIC_GOOGLE_FONTS_URL) { // Use a public runtime config variable
    const loadDeferredStyles = function() {
      const head = document.getElementsByTagName('head')[0];
      const fonts = document.createElement('link');
      fonts.rel = 'stylesheet';
      fonts.href = process.env.NUXT_PUBLIC_GOOGLE_FONTS_URL; // Adjusted for Nuxt 3 environment variable
      head.appendChild(fonts);
    };

    if (raf) {
      raf(() => {
        window.setTimeout(loadDeferredStyles, 0);
      });
    } else {
      window.addEventListener('load', loadDeferredStyles);
    }
  }
});
