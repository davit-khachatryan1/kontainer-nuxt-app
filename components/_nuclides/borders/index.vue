<template>
	<div class="borders">
        <div v-for="section in sections" :key="section.name" :class="section.name" class="section">
			<span>
				${{section.name}}
			</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Borders',
	data: function() {
		return {
			sections: [{ name: 'angle1' }, { name: 'angle2' }, { name: 'angle3' }, { name: 'angle4' }],
		};
	},
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
.section {
	&:nth-child(1) {
		@include border-angle($angle1, $gray-dusty, 'positive');
	}
	&:nth-child(2) {
		@include border-angle($angle2, $yellow, 'positive');
	}
	&:nth-child(3) {
		@include border-angle($angle3, $gray-dusty, 'negative', 'https://images.unsplash.com/photo-1511084901824-1c57f5a16c98?ixlib=rb-0.3.5…EyMDd9&s=d99cf96…&auto=format&fit=crop&w=3300&q=80', $yellow);
	}
	&:nth-child(4) {
		@include border-angle($angle4, $gray-dusty, 'negative');
	}

	&:last-child {
		padding-bottom: 0;
	}
}
</style>

<!-- <docs>
```jsx
<Borders />
```
</docs> -->
