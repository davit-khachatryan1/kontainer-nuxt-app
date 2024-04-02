import { throttle } from 'lodash';
import fastdom from 'fastdom';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('in-view', {
    beforeMount: (el, binding) => {
      const handler = () => {
        fastdom.measure(() => {
          const bounds = el.getBoundingClientRect();
          const inView = bounds.top + bounds.height > 0 && bounds.top < window.innerHeight;
          binding.value(inView);
          if (inView) {
            if (!el.hasAttribute('continuous')) {
              window.removeEventListener('scroll', el.vueInView);
              el.vueInView = null;
            }
          }
        });
      };
      el.vueInView = throttle(handler, 100);
      window.addEventListener('scroll', el.vueInView);
      setTimeout(handler, 0);
    },
    unmounted: (el) => {
      window.removeEventListener('scroll', el.vueInView);
      el.vueInView = null;
    },
  });

  nuxtApp.vueApp.directive('load-as-critical', {
    beforeMount: (el, binding) => {
      const testCriticalHandler = () => {
        const bounds = el.getBoundingClientRect();
        const inView = bounds.top + bounds.height > 0 && bounds.top < window.innerHeight;

        if (inView) {
          doneHandler();
        } else if (document.readyState === 'complete') {
          el.throttledDoneHandler();
        }
      };
      const doneHandler = () => {
        binding.value(true);
        window.removeEventListener('load', el.throttledDoneHandler);
        document.removeEventListener('DOMContentLoaded', el.throttledDoneHandler);
      };

      el.throttledDoneHandler = throttle(doneHandler, 100);
      setTimeout(testCriticalHandler, 0);

      if (document.readyState !== 'complete') {
        window.addEventListener('load', el.throttledDoneHandler);
      }
    },
    unmounted: (el) => {
      window.removeEventListener('load', el.throttledDoneHandler);
      document.removeEventListener('DOMContentLoaded', el.throttledDoneHandler);
      el.throttledDoneHandler = null;
    },
  });

  nuxtApp.vueApp.directive('click-outside', {
    beforeMount: (el, binding) => {
      const handler = (e) => {
        if (el.contains(e.target)) return;
        binding.value(e);
      };
      document.addEventListener('click', handler);
      el.vueClickOutsideHandler = handler;
    },
    unmounted: (el) => {
      document.removeEventListener('click', el.vueClickOutsideHandler);
      el.vueClickOutsideHandler = null;
    },
  });
});
