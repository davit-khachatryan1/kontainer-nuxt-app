export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('lazy-load-video', {
    mounted(el, binding) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      };

      const callback = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const video = entry.target;
            if (binding.value) {
              video.src = binding.value;
            } else {
              const sources = video.querySelectorAll('source');
              sources.forEach(source => {
                source.src = source.dataset.src;
              });
            }
            video.load();
            observer.unobserve(video);
          }
        });
      };

      const observer = new IntersectionObserver(callback, options);
      observer.observe(el);
    },
  });
});