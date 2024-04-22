<template>

	<div class="c-exec">

		<!-- <script v-if="data.javascript && data.javascript.length" ref="jscontainer"></script> -->
		<div v-if="data.html && data.html.length" ref="htmlcontainer"></div>
		<!-- <style v-if="data.css && data.css.length" ref="csscontainer"></style> -->

	</div>

</template>

<script>

import { useLangString } from '~/components/composables/useLangString';

export default {
	name: 'CodeInserter',

	props: {
		data: { type: Object },
		positionOnPage: { type: Number },
	},
	setup() {
		const { langString } = useLangString()
		return { langString };
  	},
	methods: {

		executeHTML() {
			if (process.browser && this.cleanHtml) {
				const target = this.$refs.htmlcontainer;
				if (target) {
					// Add html to DOM - Store scripts and remove from DOM
					const storescripts = [];
					target.insertAdjacentHTML('beforeend', this.cleanHtml);
					const scripts = target.getElementsByTagName('script');
					while (scripts.length) {
						const script = scripts[0];
						script.parentNode.removeChild(script);
						const newScript = script;
						storescripts.push(newScript);
					}

					// Add scripts again to DOM so they execute.
					let i = 0;
					while (i < storescripts.length) {
						const newScript = document.createElement('script');
						const DOMscript = storescripts[i]; // new DOMParser().parseFromString(storescripts[i], 'text/xml');

						if (DOMscript.id) {
							newScript.id = DOMscript.id;
						}

						if (DOMscript.onload) {
							newScript.onload = DOMscript.onload;
						}

						if (DOMscript.src) {
							newScript.src = DOMscript.src;
						} else if (DOMscript.textContent) {
							const cleanJS = DOMscript.textContent.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, ' '); // Removes <br>
							newScript.textContent = cleanJS;
						} else if (DOMscript.innerText) {
							const cleanJS = DOMscript.innerText.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, ' '); // Removes <br>
							newScript.innerText = cleanJS;
						}
						target.appendChild(newScript);
						i += 1;
					}
				}
			}
		},

		executeJS() {
			if (process.browser && this.cleanJS) {
				const b = this.$refs.jscontainer;
				b.insertAdjacentHTML('afterbegin', this.cleanJS);
			}
		},

		executeCSS() {
			if (process.browser && this.cleanCSS) {
				const b = this.$refs.csscontainer;
				b.insertAdjacentHTML('afterbegin', this.cleanCSS);
			}
		},

	},

	computed: {

		cleanHtml() {
			return this.data.html;
		},

		cleanJS() {
			if (this.data.js) {
				const js = this.data.javascript.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, ' '); // Removes <br>
				return js;
			}
			return false;
		},

		cleanCSS() {
			if (this.data.css) {
				const css = this.data.css.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, ' '); // Removes <br>
				return css;
			}
			return false;
		}
	},

	mounted() {
		this.executeHTML();

		this.executeJS();
		this.executeCSS();
	},

};
</script>

<style scoped lang="scss">
@import "../../../assets/scss/import";

</style>

<!-- <docs>
```jsx
<CodeInserter/ >
```
</docs> -->
