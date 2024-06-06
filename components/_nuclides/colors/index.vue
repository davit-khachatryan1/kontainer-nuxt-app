<template>
	<div class="colors">
		<div v-for="color in colors" :key="color.name" :class="color.name" class="color">
			<span>
				${{color.name}}
			</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Colors',
	data: function() {
		return {
			colors: [
				{ name: 'black' },
				{ name: 'white' },
				{ name: 'gray-concrete' },
				{ name: 'gray-alto' },
				{ name: 'gray-alto2' },
				{ name: 'gray-dusty' },
				{ name: 'brown-light' },
				{ name: 'blue' },
				{ name: 'blue-dark' },
				{ name: 'yellow' },
				{ name: 'yellow-dark' },
			],
		};
	},
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
.colors {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	font-family: monospace;
	font-weight: 500;
	line-height: 16px;
}

.color {
	display: flex;
	align-items: flex-end;
	justify-content: center;

	height: 132px;
	width: 160px;

	&:hover {
		outline: 2px solid turquoise;
		z-index: 1;
	}

	span {
		flex: 1 0 100%;
		background-color: #fff;
		color: #000;

		padding-top: 10px;
		padding-bottom: 10px;
		padding-left: 1px;
	}
}

@each $name, $color in $color-vars {
	.#{$name} {
		background-color: $color;
		color: $color;

		span {
			&::after {
				content: '#{$color}';
				display: block;
				color: #888;
				font-style: normal;
				font-size: 11px;
			}
		}
	}
}
</style>
