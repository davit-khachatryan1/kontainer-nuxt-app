<template>
	<div class="parallax" v-in-view="(e) => { inView = e }" continuous>
		<slot></slot>
	</div>
</template>

<script>
/* eslint-disable no-mixed-operators */
import fastdom from 'fastdom';
import getClosest from '~/components/mixins/getclosest';

export default {
	name: 'Parallax',
	mixins: [getClosest],
	props: {
		speed: { type: Number, default: 0.5 },
	},
	data() {
		return {
			inView: false,
		};
	},
	methods: {
		handleScroll() {
			if (!this.inView) {
				return;
			}

			fastdom.measure(() => {
				const me = this.$el;
				const scrolled =
					me.getBoundingClientRect().top -
					window.innerHeight +
					this.parentPadding;

				fastdom.mutate(() => {
					me.style.setProperty(
						'transform',
						`translateY(${scrolled * this.speedInPixels}px`,
					);
				});
			});
		},

		cacheValues() {
			const me = this.$el;
			const parentSection = this.getClosest(me, '.section--angle');

			this.parentPadding =
				parseInt(
					window
						.getComputedStyle(parentSection, null)
						.getPropertyValue('padding-top'),
					10,
				) +
				parseInt(
					window
						.getComputedStyle(parentSection, null)
						.getPropertyValue('padding-bottom'),
					10,
				);

			this.parallaxStartPosition = parseInt(
				window
					.getComputedStyle(parentSection, null)
					.getPropertyValue('padding-top'),
				10,
			);

			this.speedInPixels = this.parentPadding * this.speed / window.innerHeight;

			fastdom.mutate(() => {
				me.style.top = `${this.parallaxStartPosition}px`;
			});
		},

		handleResize() {
			fastdom.mutate(() => {
				const me = this.$el;

				me.style.top = '0';
				me.style.transform = 'translateY(0)';

				this.cacheValues();
			});
		},
	},

	mounted() {
		if (process.browser) {
			this.cacheValues();
			window.addEventListener('scroll', this.handleScroll);
			window.addEventListener('resize', this.handleResize);
		}
	},

	destroyed() {
		if (process.browser) {
			window.removeEventListener('scroll', this.handleScroll);
			window.removeEventListener('resize', this.handleResize);
		}
	},
};
</script>

<style scoped lang="scss">
@import "../../../assets/scss/import";
.parallax {
	position: relative;

	@include media('tablet') {
		position: static;
		transform: translateY(0) !important;
	}
}
</style>
