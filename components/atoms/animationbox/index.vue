<template>
	<div ref="parallaxContainer" class="animationbox">
		<div class="animationbox__overflower">
			<div
				v-if="enabled"
				:class="['animationbox__box', boxColorClass, boxAlignmentClass]"
				ref="parallaxBox"
			></div>
		</div>
		<slot />
	</div>
</template>

<script>
import fastdom from 'fastdom';
import {
	SECTION_ANGLE_POSITIVE,
	SECTION_ANGLE_NEGATIVE,
} from '~/constants/section';
export default {
	name: 'AnimationBox',
	components: {},
	props: [
		'enabled',
		'color',
		'alignment',
		'angle',
		'horizontalOffset',
		'verticalOffsetStart',
		'verticalOffsetStop',
		'rotations',
		'nextSectionSlant',
	],
	computed: {
		boxColorClass() {
			switch (this.color) {
				case 'grey':
					return 'animationbox__box--color-brown';
				case 'darkgrey':
					return 'animationbox__box--color-pink';
				default:
					return 'animationbox__box--color-green';
			}
		},
		boxAlignmentClass() {
			switch (this.alignment) {
				case 'right':
					return 'animationbox__box--align-right';
				default:
					return 'animationbox__box--align-left';
			}
		},
	},

	mounted() {
		this.height = 0;
		this.parralaxBegin = 0;
		this.parralaxEnd = 0;
		this.percentTravelled = 0;

		if (this.enabled && window.matchMedia('(max-width: 768px)')) {
			this.init();
			this.subscribeEvents();
		}
	},

	beforeDestroy() {
		if (this.enabled) {
			this.unsubscribeEvents();
		}
	},

	methods: {
		registerSizes() {
			fastdom.measure(() => {
				if (this.$refs.parallaxContainer) {
					const containerRect = this.$refs.parallaxContainer.getBoundingClientRect();
					const boxRect = this.$refs.parallaxBox.getBoundingClientRect();
					this.height = containerRect.height;
					this.boxHeight = boxRect.height;

					const needsSlantAdjustment =
						(this.nextSectionSlant === SECTION_ANGLE_NEGATIVE &&
							this.alignment === 'right') ||
						(this.nextSectionSlant === SECTION_ANGLE_POSITIVE &&
							this.alignment === 'left');
					const slantAdjust = needsSlantAdjustment
						? 0.03492 * window.innerWidth // magic number matches css-value
						: 0;

					this.height = containerRect.height - slantAdjust;
					this.parralaxBegin =
						containerRect.top + -window.innerHeight + this.verticalOffsetStart;
					this.parralaxEnd =
						containerRect.bottom +
						-this.parralaxBegin +
						-slantAdjust +
						this.verticalOffsetStop;
				}
			});
		},

		animateElement(percentTravelled) {
			if (this.$refs.parallaxBox) {
				const travelDistance =
					this.height +
					-this.boxHeight +
					-this.verticalOffsetStart +
					this.verticalOffsetStop;
				const distanceTravelled = travelDistance * percentTravelled;
				const offset = distanceTravelled + this.verticalOffsetStart;

				const travelledRotation = this.rotations * 360 * percentTravelled;
				const currentRotation = this.angle + travelledRotation;
				const translateX = `${this.horizontalOffset}px`;

				fastdom.mutate(() => {
					if (!this.visible) {
						this.$refs.parallaxBox.style.opacity = 1;
						this.visible = true;
					}
					this.$refs.parallaxBox.style.transform = `translate3d(${translateX}, ${offset}px, 0) rotate(${currentRotation}deg)`;
				});
			}
		},

		scrollHandler() {
			fastdom.measure(() => {
				const topScroll = window.pageYOffset - this.parralaxBegin;
				// eslint-disable-next-line no-mixed-operators
				const percentTravelled = 1 / this.parralaxEnd * topScroll;

				if (percentTravelled > 0 && percentTravelled < 1) {
					this.animateElement(percentTravelled);
				}
			});
		},

		resizeHandler() {
			this.init();
		},

		init() {
			this.registerSizes();
			setTimeout(() => {
				this.scrollHandler();
			}, 0);

			setTimeout(() => {
				this.scrollHandler();
			}, 90);
		},

		subscribeEvents() {
			window.addEventListener('scroll', this.scrollHandler);
			window.addEventListener('resize', this.resizeHandler);
		},

		unsubscribeEvents() {
			window.removeEventListener('scroll', this.scrollHandler);
			window.removeEventListener('resize', this.resizeHandler);
		},
	},
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
.animationbox {
	position: relative;

	&__overflower {
		position: absolute;
		top: 0;
		left: 0;

		height: 100%;
		width: 100%;

		&--align-right {
			left: auto;
			right: 0;
		}
	}

	&__box {
		$desktop-push-out: 92px; // 72px for box not to hit the margin when rotated 45deg
		$tablet-push-out: 72px;

		height: 270px;
		width: 270px;

		border: 13px solid $brand-green;

		z-index: z(animationBox);

		opacity: 0;
		transition: opacity 220ms;

		position: absolute;
		top: 0;
		right: calc(#{$desktopWidth + $desktopMargin} + #{$desktop-push-out});
		will-change: transform;

		@include media('tablet') {
			right: calc(#{$tabletWidth + $tabletMargin} + #{$tablet-push-out});
		}

		@include media('mobile') {
			display: none;
		}

		&--color-brown {
			border-color: $label-color;
		}

		&--color-pink {
			border-color: #FBD4C9;
		}

		&--align-right {
			right: 0;
			left: calc(#{$desktopWidth + $desktopMargin} + #{$desktop-push-out});

			@include media('tablet') {
				left: calc(#{$tabletWidth + $tabletMargin} + #{$tablet-push-out});
			}
		}
	}
}
</style>

<!-- <docs>
```jsx
<div>

</div>
```
</docs> -->
