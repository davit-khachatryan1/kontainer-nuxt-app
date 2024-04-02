<template>
	<section :class="['wysiwyg-columns', getPostTypeClass()]">
		<div class="content-grid-container">
			<div class="span-container">
				<template v-for="(column, key) in data">
					<div
						:class="['column', `span${spanClass(data.columns_per_row)}`]"
						v-if="
							key.indexOf('content_column') > -1 &&
							key.slice(-1) <= data.columns_per_row
						"
						:key="key"
						v-html="column"
					/>
				</template>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'Columns',
	components: {},
	props: {
		data: { type: Object },
		type: {},
	},
	methods: {
		spanClass(cols) {
			if (cols === '1') {
				return 8;
			}
			return 12 / cols;
		},
		getPostTypeClass() {
			if (this.type) {
				return `wysiwyg-columns--${this.type}`;
			}
			return '';
		},
	},
	computed: {},
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
.wysiwyg-columns {
	word-break: break-word;
	.column {
		padding: 5px;
		margin-bottom: 30px;
	}
	.span-container {
		display: flex;
		justify-content: space-between;
	}
	.span-container,
	.span-container > * {
		width: inherit;
	}
	&--news {
		h1 {
			@extend %text-h2;
			margin-bottom: 0.5em;
		}
	}

	h1 {
		@extend %text-h1;
		margin-bottom: 0.5em;
	}
	h2 {
		@extend %text-h2;
		margin-bottom: 0.5em;
	}
	p {
		@extend %text-paragraph1;
		margin-bottom: 1em;
	}

	ul {
		@extend %text-paragraph1;
		list-style-type: disc;
		padding: revert;
		margin-bottom: 1em;
	}

	ol {
		@extend %text-paragraph1;
		list-style-type: number;
		padding: revert;
	}

	blockquote {
		margin-left: 20px;
		font-style: italic;
	}

	strong {
		font-weight: $type-medium;
	}

	em {
		font-style: italic;
	}

	img {
		display: block;
		max-width: 500px;
		height: auto;
		width: 100%;

		&.aligncenter {
			margin: auto;
		}

		&.alignright {
			margin-left: auto;
		}
	}

	@for $i from 1 through 6 {
		.span#{$i} {
			width: calc(100% / (calc(12 / ($i))));
		}
	}

	.span8 {
		// single column
		margin: 0 auto;
	}

	.video-container {
		position: relative;
		padding-bottom: 56.25%;
		height: 0;
		overflow: hidden;

		iframe,
		object,
		embed,
		video {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	}

	.btn {
		&--outline {
			border-radius: 0;
			background-color: $white;
			color: $yellow-dark;
		}
	}

	p a {
		color: $brand-green;
		font-weight: 500;
	}
}
</style>

<!-- <docs>
```jsx
<SignupSection/ >
```
</docs> -->
