<template>
	<div class="bg" :class="{ loaded: loadedClass }" :style="{ backgroundImage: preloadImage, height: height }"
		v-in-view="(e) => {
			inView = e;
		}
		">
		<transition name="image-fade" v-on:after-enter="transitionedEnd">
			<div>
				<div v-if="loaded && crop" :style="{ backgroundImage: bg }" class="cropimage" />
				<img v-if="loaded && !crop" :title="image.title" :alt="image.alt" :src="src"
				:class="{ inlineimage: true }"
				:width="image.sizes['mobile-width']" :height="image.sizes['mobile-width'] / image.ratio" />
			</div>
		</transition>
		<div v-html="fallback"></div>
	</div>
</template>

<script>

const IMG_PRELOAD_GRADIENT = 'gradient';
const IMG_PRELOAD_BASE64 = 'base64';

export default {
	props: {
		image: { type: Object },
		srcset: { type: Array },
		sizes: { type: Array },
		nocrop: { type: Boolean },
		wait: { type: Boolean },
		retina: { type: Boolean },
		preloadType: { type: String, default: 'gradient' },
		critical: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			inView: false,
			screenWidth: 1,
			loaded: false,
			loadedClass: false,
			transitionedToImage: false,
		};
	},
	computed: {
		current() {
			const noSizesGiven = !this.sizes || (this.sizes && !this.sizes.length);
			const defaultCurrent = {
				url: this.image.url,
				ratio: false,
			};

			if (noSizesGiven) {
				return defaultCurrent;
			}

			const minSize = this.retina ? 2 * this.screenWidth : this.screenWidth;
			let smallest = Infinity;
			let biggest = 0;
			let smallestSize = null;
			let biggestSize = defaultCurrent;

			for (let i = 0; i < this.sizes.length; i += 1) {
				const width = this.image.sizes[`${this.sizes[i]}-width`];
				const height = this.image.sizes[`${this.sizes[i]}-height`];
				if (width < smallest && width >= minSize) {
					smallestSize = {
						url: this.image.sizes[this.sizes[i]],
						ratio: width / height,
					};
					smallest = width;
				}
				if (width > biggest) {
					biggestSize = {
						url: this.image.sizes[this.sizes[i]],
						ratio: width / height,
					};
					biggest = width;
				}
			}

			return smallestSize || biggestSize;
		},
		src() {
			return this.current ? this.current.url : '';
		},
		bg() {
			return this.loaded ? `url(${this.src})` : 'none';
		},
		colors() {
			try {
				return JSON.parse(this.image.fallback_colors);
			} catch (e) {
				return false;
			}
		},

		gradient() {
			if (!this.colors) return 'none';

			const gradients = [];
			for (let i = 0; i < this.colors.length; i += 1) {
				const posX = i % 2 === 0 ? '0%' : '100%';
				const posY = i <= 2 ? '0%' : '100%';
				const color = this.colors[i];
				const rgb = this.hexToRgb(color);
				gradients.push(
					`radial-gradient(at ${posX} ${posY},` +
					`rgba(${[rgb.r, rgb.g, rgb.b, 0.8].join(',')}) 0%,` +
					`rgba(${[rgb.r, rgb.g, rgb.b, 0].join(',')}) 100%)`,
				);
			}

			return gradients.join(',');
		},
		preloadImage() {
			if (this.transitionedToImage) {
				return '';
			}

			switch (this.preloadType) {
				case IMG_PRELOAD_GRADIENT:
					return this.gradient;
				case IMG_PRELOAD_BASE64:
				default:
					return this.base64;
			}
		},
		base64() {
			return `url(${this.image.fallback_base64})`;
		},
		height() {
			if (this.loaded) {
				return null;
			}

			if (!this.crop) {
				return this.current && this.current.ratio
					? `${Math.floor(this.screenWidth / this.current.ratio)}px`
					: 'auto';
			}

			return null;
		},
		crop() {
			return typeof this.nocrop === 'undefined';
		},
		fallback() {
			return `<noscript><img src="${this.src}" class="inlineimage" alt="${this.image.alt}" /></noscript>`;
		},
	},
	mounted() {
		this.screenWidth = this.$el?.parentNode.offsetWidth || 1;
	},
	watch: {
		wait(newVal, oldVal) {
			if (!newVal && oldVal) {
				this.preload();
			}
		},
		inView(newVal, oldVal) {
			if (newVal) {
				this.preload();
			}
		},
	},
	methods: {
		loadTrigger() {
			if (!this.wait) {
				this.preload();
			}
		},
		preload() {
			if (this.$el.parentNode) {
				this.screenWidth = this.$el?.parentNode.offsetWidth || 1;
			}
			const loader = new Image();
			loader.onload = () => {
				setTimeout(() => {
					this.loaded = true;

					setTimeout(() => {
						this.loadedClass = true;
					}, 20);
				}, 0);
			};
			loader.src = this.src;
		},
		hexToRgb(hex) {
			const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

			if (result) {
				return {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16),
				};
			}

			return null;
		},
		transitionedEnd() {
			this.transitionedToImage = true;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/import";

.bg {
	position: relative;
	background-size: cover;
	overflow: hidden;
    width: 100%;
	img {
		opacity: 0;
		transform: scale(1.4);
		transition: opacity 0.3s 0.2s ease, transform 0.6s 0.2s ease;
		will-change: opacity, transform;
	}

	&.loaded {
		img {
			opacity: 1;
			transform: scale(1);
		}
	}

	&.quoteicon {
		img {
			width: 100%;
		}
	}

	&.bg-aspectratio {
		img {
			position: absolute;
			display: block;
			width: 100%;
			height: auto;
		}
	}
}

.cropimage {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
}

.inlineimage {
	width: 100%;
	height: auto;
	vertical-align: bottom;
}

.force-dynamic-height img {
	max-height: calc(75vh - 1px);
	object-fit: contain;
}
</style>
