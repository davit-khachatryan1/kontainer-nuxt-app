<template>
	<section class="container">
		<div class="grid grid--2">
			<div v-for="shadow in shadows" :key="shadow.name" :class="shadow.name" class="grid__column">
				<span>
					${{shadow.name}}
				</span>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'Shadows',
	data: function() {
		return {
			shadows: [
				{ name: 'shadow-block' },
				{ name: 'shadow-media' },
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

@each $name, $shadow in $shadow-vars {
	.#{$name} {
		box-shadow: $shadow;

		span {
			&::after {
				content: '#{$shadow}';
				display: block;
				color: #888;
				font-style: normal;
				font-size: 11px;
			}
		}
	}
}
</style>
