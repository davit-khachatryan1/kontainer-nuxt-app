<template>
	<div class="toggle">
		<div class="toggle__title">{{dataTitle}}</div>
		<div class="toggle__element">
			<label>
				<input v-model="isChecked" type="checkbox" :name="name" v-on:click="toggle" />
				<div class="toggle__element__visuals"></div>
			</label>
		</div>
		<div class="toggle__value" :data-text="dataText" :data-alt="dataTextAlt" v-bind:class="[isChecked ? 'alt' : 'text']"></div>
	</div>
</template>

<script>
export default {
	name: 'Toggle',
	props: {
		dataTitle: String,
		dataText: String,
		dataTextAlt: String,
		name: String,
	},
	data() {
		return {
			isChecked: false,
		};
	},

	methods: {
		toggle: function(event) {
			this.isChecked = event.target.checked;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/import";
.toggle {
	align-items: center;
	color: $gray-dusty;
	display: flex;
	font-size: 14px;
	font-weight: $type-medium;
	justify-content: center;
	letter-spacing: 3px;
	text-transform: uppercase;

	$visuals: '';

	&__title {
		opacity: .5;
	}

	&__element {
		border-radius: 15px;
		box-sizing: border-box;
		height: 30px;
		margin: 0 15px;
		overflow: hidden;
		padding: 3px;
		position: relative;
		width: 54px;

		&__visuals {
			$visuals: &;
		}

		input {
			cursor: pointer;
			height: 100%;
			left: 0;
			opacity: 0;
			position: absolute;
			top: 0;
			width: 100%;
			z-index: 3;

			+ #{$visuals} {
				&::before {
					background: $blue-dark;
					content: '';
					height: 100%;
					left: 0;
					position: absolute;
					top: 0;
					transition: background .3s ease;
					width: 100%;
					will-change: background;
					z-index: 1;
				}

				&::after {
					background: $white;
					border-radius: 50%;
					content: '';
					display: block;
					height: 24px;
					position: relative;
					transform: translate(100%, 0);
					transition: transform .3s ease;
					width: 24px;
					will-change: transform;
					z-index: 2;
				}
			}

			&:checked {
				+ #{$visuals} {
					&::before {
						background: $yellow-dark;
					}

					&::after {
						transform: translate(0, 0);
					}
				}
			}
		}
	}

	&__value {
		align-self: stretch;
		position: relative;
		width: 180px;

		&::before,
		&::after {
			left: 0;
			position: absolute;
			top: 0;
			transition: opacity .5s ease, transform .5s ease;
			will-change: opacity, transform;
		}

		&::before {
			content: attr(data-text);
			opacity: 1;
			transform: translate(0, 0);
		}

		&::after {
			content: attr(data-alt);
			opacity: 0;
			transform: translate(0, 50%);
		}

		&.text {
			&::before {
				opacity: 1;
				transform: translate(0, 0);
			}

			&::after {
				opacity: 0;
				transform: translate(0, 50%);
			}
		}

		&.alt {
			&::before {
				opacity: 0;
				transform: translate(0, 50%);
			}

			&::after {
				opacity: 1;
				transform: translate(0, 0);
			}
		}
	}
}
</style>
<!-- 
<docs>
```jsx
<Toggle name="name" dataTitle="Type:" dataText="Standard pakker" dataTextAlt="Pro pakker"></Toggle>
```
</docs> -->
