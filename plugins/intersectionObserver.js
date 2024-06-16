export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('intersect', {
        mounted(el, binding) {
            const options = binding.value.options || {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            };
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        binding.value.handler(true);
                        observer.unobserve(entry.target);
                    }
                });
            }, options);
            observer.observe(el);
        },
    });
});
