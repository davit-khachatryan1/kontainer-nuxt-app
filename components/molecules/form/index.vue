<template>
	<form :class="['form', 'form--' + type]" :action="action" :method="method"><slot></slot></form>
</template>

<script>
export default {
	name: 'Form',
	props: ['action', 'method', 'type'],
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
.form {
	text-align: center;

	$element: '';

	&__element {
		margin-bottom: 20px;
		position: relative;

		$element: &;

		&:last-child {
			margin-bottom: 0;
		}

		.icon {
			left: 23px;
			position: absolute;
			top: 50%;
			transform: translate(0, -50%);
		}
	}

	&--inline {
		.fieldset {
			display: flex;
			text-align: left;

			@include media('tablet-sm') {
				flex-wrap: wrap;
			}
		}

		#{$element} {
			flex-grow: 1;
			flex-shrink: 1;
			margin: 0 20px 0 0;

			&:last-child {
				margin: 0;
			}
		}

		.btn {
			text-align: center;

			&--cta {
				color: $white;
			}

			@include media('mobile') {
				display: block;
				margin: 0 auto;
			}
		}
	}
}
</style>
<!-- <docs>
```jsx
<Form type="inline" />
<Form type="block" />
<Form type="standalone" />
```
</docs> -->
