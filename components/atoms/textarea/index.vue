<template>
	<div class="form__element">
		<label>
			<textarea :name="name" :value="value" @input="$emit('input', $event.target.value)" @focus="focusCheck(true)" @blur="focusCheck(false)" @keyup="valueCheck" :class="{ 'focus': focused, 'filled': hasValue }"></textarea>
			<span>{{placeholder}}</span>
		</label>
	</div>
</template>

<script>
import inputLabels from '../../mixins/input-labels';

export default {
	name: 'Textarea',
	mixins: [inputLabels],
	props: ['name', 'placeholder', 'value'],
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/import";
.form {
	&__element {
		position: relative;
	}
}

textarea {
	@extend %text-textarea;
	background: $white;
	border: 1px solid $gray-alto;
	box-sizing: border-box;
	font-family: 'Graphik', sans-serif;
	height: 130px;
	outline: none;
	padding: 15px 20px;
	width: 100%;

	+ span {
		@extend %text-input-placeholder;
		background: $white;
		color: $gray-dusty;
		left: 1px;
		padding: 18px 20px 0;
		position: absolute;
		top: 2px;
		transition: font-size 0.2s ease, padding 0.2s ease;
		width: calc(100% - 22px);
		will-change: font-size, padding;
	}

	&.focus,
	&.filled {
		+ span {
			font-size: 10px;
			padding-top: 5px;
		}
	}
}
</style>
<!-- <docs>
```jsx
<Textarea name="name" placeholder="Beskrivelse" value=""></Textarea>
```
</docs> -->
