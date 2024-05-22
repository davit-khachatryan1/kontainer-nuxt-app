<template>
	<section class="faq" itemscope itemtype="https://schema.org/FAQPage">
		<div class="content-grid-container">
			<div class="span-container">
				<div class="span6 span6--tablet span4--mobile">
					<p
						class="teaser__heading"
						v-if="data.title && data.title.length"
						ref="title"
						:class="data.alternate_headline ? 'alternative' : ''"
					>
						{{ data.title }}
					</p>
				</div>
				<div class="span6 span6--tablet span4--mobile">
					<div class="accordion" ref="accordion">
						<div
							class="accordion__item"
							v-for="(item, index) in data.accordion"
							:key="index"
							itemscope
							itemprop="mainEntity"
							itemtype="https://schema.org/Question"
						>
							<div class="accordion__item__header">
								<div class="accordion__item__header__title teaser__text">
									<span itemprop="name">{{ item.question }}</span>
									<NuxtImg loading="lazy" src="svg/caret.svg"/>
								</div>
							</div>
							<div
								class="accordion__item__content"
								itemscope
								itemprop="acceptedAnswer"
								itemtype="https://schema.org/Answer"
							>
								<div v-html="item.answer" itemprop="text" class="wysiwyg"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { useLangString } from '~/components/composables/useLangString';

export default {
	name: 'Faq',
	setup() {
		const { langString } = useLangString()
		return { langString };
  	},
	props: {
		data: { type: Object },
		positionOnPage: { type: Number },
	},

	methods: {},

	computed: {},

	mounted() {
		// accordion
		const { accordion } = this.$refs;
		const accordionItems = accordion.querySelectorAll('.accordion__item');
		accordionItems.forEach((item) => {
			const header = item.querySelector('.accordion__item__header');

			header.addEventListener('click', () => {
				// Remove active class from all other items
				accordionItems.forEach((accordionItem) => {
					if (accordionItem !== item) {
						accordionItem.classList.remove('active');
					}
				});

				item.classList.toggle('active');
			});
		});
	},

	// Reomove eventlister on destroy
	beforeDestroy() {
		const { accordion } = this.$refs;
		const accordionItems = accordion.querySelectorAll('.accordion__item');
		accordionItems.forEach((item) => {
			const header = item.querySelector('.accordion__item__header');
			header.removeEventListener('click');
		});
	},
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
.faq {
	.teaser__heading.alternative {
		@extend %text-alternative-h1;
	}
}

.accordion {
	&__item {
		border-bottom: 1px solid black;
		&__header {
			cursor: pointer;
			padding: 1rem 0;
			transition: all 0.25s;
			span {
				@extend %text-h3;
			}
		}

		&__header__title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;

			img {
				transition: 0.25s ease-in-out;
				transform: rotate(90deg);
				width: 9px;
				height: auto;
			}
		}

		&__content {
			max-height: 0;
			overflow: hidden;
			transition: all 0.5s;
			> div {
				font-weight: 300;
				font-size: 16px;
				line-height: 2;
				padding-top: 0px;
				padding-bottom: 20px;
			}
		}

		&.active {
			.accordion__item__header {
				img {
					transform: rotate(-90deg);
				}
			}
			.accordion__item__content {
				max-height: 600px;
				transition: all 0.5s;
				transition-delay: 0.1s;
			}
		}
	}

	.wysiwyg {
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

			&.aligncenter {
				margin: auto;
			}

			&.alignright {
				margin-left: auto;
			}
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
}
</style>

<!-- <docs>
```jsx
<Faq/ >
```
</docs> -->
