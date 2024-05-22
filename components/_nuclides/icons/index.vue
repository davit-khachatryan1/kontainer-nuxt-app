<template>
	<div class="icons">
		<div v-for="svg in items" :key="svg.name" >
			<component :class="['icon', 'icon--' + svg.name]" :is="svg.component" />
		</div>
	</div>
</template>

<script>
const IconAddress = defineAsyncComponent(() => import('~/assets/svg/address.svg'));
const IconCaret = defineAsyncComponent(() => import('~/assets/svg/caret.svg'));
const IconCaretInput = defineAsyncComponent(() => import('~/assets/svg/caret-input.svg'));
const IconCaretSelect = defineAsyncComponent(() => import('~/assets/svg/caret-select.svg'));
const IconCompany = defineAsyncComponent(() => import('~/assets/svg/company.svg'));
const IconEmail = defineAsyncComponent(() => import('~/assets/svg/email.svg'));
const IconHome = defineAsyncComponent(() => import('~/assets/svg/home.svg'));
const IconPassword = defineAsyncComponent(() => import('~/assets/svg/password.svg'));
const IconPhone = defineAsyncComponent(() => import('~/assets/svg/phone.svg'));
const IconTick = defineAsyncComponent(() => import('~/assets/svg/tick.svg'));
const IconTickThin = defineAsyncComponent(() => import('~/assets/svg/tick-thin.svg'));
const IconUser = defineAsyncComponent(() => import('~/assets/svg/user.svg'));
const IconArrow = defineAsyncComponent(() => import('~/assets/svg/arrow.svg'));
const IconCreate = defineAsyncComponent(() => import('~/assets/svg/create.svg'));
const IconFacebook = defineAsyncComponent(() => import('~/assets/svg/facebook.svg'));
const IconLinkedin = defineAsyncComponent(() => import('~/assets/svg/linkedin.svg'));
const IconTwitter = defineAsyncComponent(() => import('~/assets/svg/twitter.svg'));
const IconLogoText = defineAsyncComponent(() => import('~/assets/svg/logo-text.svg'));
const IconLogoRobot = defineAsyncComponent(() => import('~/assets/svg/logo-robot.svg'));

export default {
	name: 'Icons',
	data: function() {
		return {
			items: [
				{ name: 'address', component: 'IconAddress' },
				{ name: 'caret', component: 'IconCaret' },
				{ name: 'caret-input', component: 'IconCaretInput' },
				{ name: 'caret-select', component: 'IconCaretSelect' },
				{ name: 'company', component: 'IconCompany' },
				{ name: 'email', component: 'IconEmail' },
				{ name: 'home', component: 'IconHome' },
				{ name: 'password', component: 'IconPassword' },
				{ name: 'phone', component: 'IconPhone' },
				{ name: 'tick', component: 'IconTick' },
				{ name: 'tick-thin', component: 'IconTickThin' },
				{ name: 'user', component: 'IconUser' },
				{ name: 'arrow', component: 'IconArrow' },
				{ name: 'create', component: 'IconCreate' },
				{ name: 'facebook', component: 'IconFacebook' },
				{ name: 'linkedin', component: 'IconLinkedin' },
				{ name: 'twitter', component: 'IconTwitter' },
				{ name: 'logo-text', component: 'IconLogoText' },
				{ name: 'logo-robot', component: 'IconLogoRobot' },
			],
		};
	},
	components: {
		IconAddress,
		IconCaret,
		IconCaretInput,
		IconCaretSelect,
		IconCompany,
		IconEmail,
		IconHome,
		IconPassword,
		IconPhone,
		IconTick,
		IconTickThin,
		IconUser,
		IconArrow,
		IconCreate,
		IconFacebook,
		IconLinkedin,
		IconTwitter,
		IconLogoText,
		IconLogoRobot,
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
