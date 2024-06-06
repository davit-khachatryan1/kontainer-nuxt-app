<template>
	<a :class="{ 'hamburger': true, 'hamburger--active': isActive, 'block': block }" v-on:click.stop="toggle">
		<div class="hamburger__line hamburger__line--topbun"></div>
		<div class="hamburger__line hamburger__line--filling"></div>
		<div class="hamburger__line hamburger__line--bottombun"></div>
	</a>
</template>

<script>
import useStore from "@/store";

export default {
	name: 'Hamburger',
	data() {
		return {
			block: false,
			timer: 0,
		};
	},
	methods: {
		toggle() {
			const store = useStore()
			store.toggleMenu();
			this.block = true;

						this.timer = setTimeout(() => {
				this.block = false;
			}, 1000);
		},
	},
	computed: {
		isActive() {
			const store = useStore()
			return store.menuOpen;
		},
	},
	destroyed() {
		clearTimeout(this.timer);
	},
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/import";
@function sqrt($r) {
	$x0: 1;
	$x1: $x0;

	@for $i from 1 through 10 {
		$x1: $x0 - calc(($x0 * $x0 - abs($r)) / (2 * $x0));
		$x0: $x1;
	}

	@return $x1;
}

.hamburger {
	$actualSize: 36;
	$iconSize: 14;
	$top: '';
	$filling: '';
	$bottom: '';
	$active: '';
	$diagonalSize: sqrt(($iconSize * $iconSize) + ($iconSize * $iconSize));
	$diagonalScale: (calc(1 / $iconSize) * $diagonalSize);

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-end;
	height: $actualSize * 1px;
	width: $actualSize * 1px;
	overflow: hidden;

	background-color: transparent;
	border: 0;
	padding: (calc(($actualSize - $iconSize) / 2)) * 1px;
	outline: none;
	cursor: pointer;

	color: $black;
	transform: translateZ(0);

	transition: transform 300ms, color 200ms linear 500ms,
		background-color 200ms linear;

	&__line {
		height: 1px;
		border-radius: 1px;
		background-color: currentColor;

		&--topbun,
		&--bottombun {
			width: $iconSize * 1px;
			transform-origin: 0.5px 0.5px;

			transition: transform 300ms ease-in 300ms;
		}

		&--filling {
			$filling: &;
			position: absolute;
			top: 50%;
			width: $iconSize * 1px;
			transform: scaleX(0.5);
			transform-origin: 100% 0;

			transition: transform 200ms ease-in, opacity 150ms linear 400ms;
			right: 11px;
			left: 11px;
		}

		&--topbun {
			$top: &;
			position: absolute;
			top: (calc(($actualSize - $iconSize) / 2)) * 1px;
			right: 11px;
			left: 11px;
		}

		&--bottombun {
			$bottom: &;
			position: absolute;
			bottom: (calc(($actualSize - $iconSize) / 2)) * 1px;
			right: 11px;
			left: 11px;
		}
	}

	&:hover {
		&:not(.block) #{$filling} {
			transform: scaleX(1);
		}
	}

	&--active {
		$active: &;
		color: $label-color;

		transition: transform 300ms, color 200ms linear,
			background-color 200ms linear;

		&:hover:not(.block) {
			transform: rotate(-90deg);
		}

		#{$filling} {
			opacity: 0;
			transition: transform 300ms ease-in, opacity 150ms linear;
		}

		#{$top} {
			transform: rotate(45deg) scaleX($diagonalScale);
			transition: transform 300ms ease-in;
		}

		#{$bottom} {
			transform: rotate(-45deg) scaleX($diagonalScale);
			transition: transform 300ms ease-in;
		}
	}
}
</style>

<!-- <docs>
```jsx
<Hamburger />
```
</docs> -->
