<template>
	<div class="checklist text-checklist js-checklist" v-html="data"></div>
</template>

<script>
import IconTick from '~/assets/svg/tick.svg';

export default {
	name: 'Checklist',
	props: {
		data: { type: String },
	},
	components: {
		IconTick,
	},
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
.checklist {
	flex-grow: 1;
	text-align: left;

	ul {
		li {
			background-image: url("data:image/svg+xml,%3Csvg width='12px' height='10px' viewBox='0 0 12 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' stroke-linecap='square'%3E%3Cg transform='translate(-180.000000, -359.000000)' stroke='%23000000' stroke-width='2'%3E%3Cg transform='translate(140.000000, 70.000000)'%3E%3Cpolyline points='42 294.6 44.2857143 297 50 291'%3E%3C/polyline%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
			background-position: 0 6px;
			background-repeat: no-repeat;
			background-size: 12px 10px;
			hyphens: auto;
			padding-left: 20px;
			position: relative;
		}
	}
}
</style>
<!-- 
<docs>
```jsx
<Checklist :data="'<ul><li>500 brugerkonti</li><li>Api adgang</li></ul>'" />
```
</docs> -->
