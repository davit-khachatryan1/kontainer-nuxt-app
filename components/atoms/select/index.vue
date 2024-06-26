<template>
	<div class="form__element">
		<div class="input-select" :class="selectTypeClassname">
			{{selected.text}}

			<div class="input-select__caret">
				<IconSelectCaret />
			</div>

			<select
				:name="name"
				v-on:change="onInputChange"
				:aria-label="labelAria"
			>
				<option
					v-for="option in options"
					:key="option.value"
					:value="option.value"
					:disabled="option.disabled"
					:selected="option.selected"
				>
					{{option.text}}
				</option>
			</select>
		</div>
	</div>
</template>

<script>
import find from 'lodash/find';
import IconSelectCaret from '~/assets/svg/caret-select.svg';
import useStore from "@/store"
const SELECT_STYLE_DEFAULT = 0;
const SELECT_STYLE_LANGUAGE = 1;

export { SELECT_STYLE_DEFAULT, SELECT_STYLE_LANGUAGE };

export default {
	components: {
		IconSelectCaret,
	},
	name: 'InputSelect',
	props: {
		name: {
			type: String,
		},
		options: {
			type: Array,
			default: [],
		},
		type: {
			validator(value) {
				return (
					[SELECT_STYLE_DEFAULT, SELECT_STYLE_LANGUAGE].indexOf(value) !== -1
				);
			},
		},
		labelAria: {
			type: String,
		},
	},
	computed: {
		selectTypeClassname() {
			if (this.type === SELECT_STYLE_LANGUAGE) {
				return 'language';
			}

			return 'normal';
		},
		selected() {
			const store = useStore()
			const stateSelected = find(this.options, (opt) => {
				return opt.value === store.inputSelect[this.name];
			});
			const preSelected = find(this.options, (opt) => opt.selected);
			const fallback = this.options[0];

			return stateSelected || preSelected || fallback;
		},
	},
	methods: {
		onInputChange($event) {
			const store = useStore()
			this.$emit('change', $event.target.value);
			store.setInputSelect({
				name: this.name,
				value: $event.target.value,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/import";

.input-select {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	background: $white;
	border: 1px solid $gray-alto;
	border-radius: 0;
	box-sizing: border-box;

	font-size: 17px;
	font-weight: 300;
	line-height: 55px;

	height: 55px;

	padding: 0 55px 0 20px;
	width: 100%;

	position: relative;

	&__caret {
		svg {
			position: absolute;
			top: 50%;
			right: 20px;

			transform: translateY(-50%);
		}
	}

	select {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;

		cursor: pointer;
		appearance: button;
	}

	&.language {
		@extend %text-paragraph2;
		background-color: transparent;
		color: currentColor;
		border: none;
		background-size: 10px 6px;
		padding-left: 0;
		padding-right: 40px;
	}

	option {
		height: 55px;
		padding: 0 20px;
	}
}
</style>
<!-- <docs>
```jsx
<div>
	<InputSelect name="test" :type="0" :options="[
		{ value: '-1', text: 'Angående', selected: true, disabled: true },
		{ value: '0', text: 'Gode forslag' },
		{ value: '1', text: 'Brok' },
		{ value: '2', text: 'Venskabsanmodninger' },
		{ value: '3', text: 'Åndelig vejledning' },
	]" />

	<br /><br />

	<InputSelect name="test" :type="1" :options="[
		{ value: '-1', text: 'Language', selected: true, disabled: true },
		{ value: '0', text: 'English' },
		{ value: '1', text: 'Danish' },
		{ value: '2', text: 'German' },
	]" />
</div>
```
</docs> -->




<!-- 
<template>
	<div class="form__element">
		<div class="input-select" :class="selectTypeClassname">
			{{ selectedOption.text }}
			<div class="input-select__caret">
				<img src="~/assets/svg/caret-select.svg" alt="Caret Icon" />
			</div>
			<select :name="name" @change="onInputChange" :aria-label="labelAria">
				<option v-for="option in options" :key="option.value" :value="option.value" :disabled="option.disabled"
					:selected="option.selected">
					{{ option.text }}
				</option>
			</select>
		</div>
	</div>
</template>

<script>
import { computed } from 'vue';
import find from 'lodash/find';
import { SELECT_STYLE_DEFAULT, SELECT_STYLE_LANGUAGE } from '~/constants/styles'; // Ensure paths are correct

export default {
	name: 'InputSelect',
	props: {
		name: String,
		options: {
			type: Array,
			default: () => ([]),
		},
		type: {
			type: String,
			validator(value) {
				return [SELECT_STYLE_DEFAULT, SELECT_STYLE_LANGUAGE].includes(value);
			},
		},
		labelAria: String,
	},
	setup(props, { emit, store }) {
		// Computed property for selectTypeClassname
		const selectTypeClassname = computed(() => {
			if (props.type === SELECT_STYLE_LANGUAGE) {
				return 'language';
			}
			return 'normal';
		});

		// Computed property for selectedOption
		const selectedOption = computed(() => {
			const stateSelected = find(props.options, (opt) => opt.value === store.state.inputSelect[props.name]);
			const preSelected = find(props.options, (opt) => opt.selected);
			const fallback = props.options[0] || {};

			return stateSelected || preSelected || fallback;
		});

		// Method for handling input change
		const onInputChange = ($event) => {
			emit('change', $event.target.value);
			store.commit('setInputSelect', {
				name: props.name,
				value: $event.target.value,
			});
		};

		return { selectTypeClassname, selectedOption, onInputChange };
	},
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/import";

.input-select {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	background: $white;
	border: 1px solid $gray-alto;
	border-radius: 0;
	box-sizing: border-box;

	font-size: 17px;
	font-weight: 300;
	line-height: 55px;

	height: 55px;

	padding: 0 55px 0 20px;
	width: 100%;

	position: relative;

	&__caret {
		svg {
			position: absolute;
			top: 50%;
			right: 20px;

			transform: translateY(-50%);
		}
	}

	select {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;

		cursor: pointer;
		appearance: button;
	}

	&.language {
		@extend %text-paragraph2;
		background-color: transparent;
		color: currentColor;
		border: none;
		background-size: 10px 6px;
		padding-left: 0;
		padding-right: 40px;
	}

	option {
		height: 55px;
		padding: 0 20px;
	}
}
</style>
<!-- <docs>
```jsx
<div>
	<InputSelect name="test" :type="0" :options="[
		{ value: '-1', text: 'Angående', selected: true, disabled: true },
		{ value: '0', text: 'Gode forslag' },
		{ value: '1', text: 'Brok' },
		{ value: '2', text: 'Venskabsanmodninger' },
		{ value: '3', text: 'Åndelig vejledning' },
	]" />

	<br /><br />

	<InputSelect name="test" :type="1" :options="[
		{ value: '-1', text: 'Language', selected: true, disabled: true },
		{ value: '0', text: 'English' },
		{ value: '1', text: 'Danish' },
		{ value: '2', text: 'German' },
	]" />
</div>
```
</docs> --> 
