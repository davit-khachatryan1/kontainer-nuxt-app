<template>
	<div class="icons">
		<div v-for="svg in items" :key="svg.name" >
			<component :class="['icon', 'icon--' + svg.name]" :is="svg.component" />
		</div>
	</div>
</template>

<script>

export default {
	name: 'Icons',
	data: function() {
		return {
			items: [
				{ name: 'address', component: <NuxtImg loading="lazy" src='svg/address.svg'/> },
				{ name: 'caret', component: <NuxtImg loading="lazy" src='svg/caret.svg'/> },
				{ name: 'caret-input', component: <NuxtImg loading="lazy" src='svg/caret-input.svg'/> },
				{ name: 'caret-select', component: <NuxtImg loading="lazy" src='svg/caret-select.svg'/> },
				{ name: 'company', component: <NuxtImg loading="lazy" src='svg/company.svg'/> },
				{ name: 'email', component: <NuxtImg loading="lazy" src='svg/email.svg'/> },
				{ name: 'home', component: <NuxtImg loading="lazy" src='svg/home.svg'/> },
				{ name: 'password', component: <NuxtImg loading="lazy" src='svg/password.svg'/> },
				{ name: 'phone', component: <NuxtImg loading="lazy" src='svg/phone.svg'/> },
				{ name: 'tick', component: <NuxtImg loading="lazy" src='svg/tick.svg'/> },
				{ name: 'tick-thin', component: <NuxtImg loading="lazy" src='svg/tick-thin.svg'/> },
				{ name: 'user', component: <NuxtImg loading="lazy" src='svg/user.svg'/> },
				{ name: 'arrow', component: <NuxtImg loading="lazy" src='svg/arrow.svg'/> },
				{ name: 'create', component: <NuxtImg loading="lazy" src='svg/create.svg'/> },
				{ name: 'facebook', component: <NuxtImg loading="lazy" src='svg/facebook.svg'/> },
				{ name: 'linkedin', component: <NuxtImg loading="lazy" src='svg/linkedin.svg'/> },
				{ name: 'twitter', component: <NuxtImg loading="lazy" src='svg/twitter.svg'/> },
				{ name: 'logo-text', component: <NuxtImg loading="lazy" src='svg/logo-text.svg'/> },
				{ name: 'logo-robot', component: <NuxtImg loading="lazy" src='svg/logo-robot.svg'/> },
			],
		};
	},
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
.icons {
	align-items: center;
	display: flex;
	flex-wrap: wrap;

	.icon {
		margin: 15px;
		outline: 1px solid turquoise;
	}
}

</style>

<!-- <docs>
```jsx
<Icons />
```
</docs> -->
