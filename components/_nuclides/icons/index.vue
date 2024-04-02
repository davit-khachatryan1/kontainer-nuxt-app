<template>
	<div class="icons">
		<div v-for="svg in items" :key="svg.name" >
			<component :class="['icon', 'icon--' + svg.name]" :is="svg.component" />
		</div>
	</div>
</template>

<script>
import IconAddress from '~/assets/svg/address.svg';
import IconCaret from '~/assets/svg/caret.svg';
import IconCaretInput from '~/assets/svg/caret-input.svg';
import IconCaretSelect from '~/assets/svg/caret-select.svg';
import IconCompany from '~/assets/svg/company.svg';
import IconEmail from '~/assets/svg/email.svg';
import IconHome from '~/assets/svg/home.svg';
import IconPassword from '~/assets/svg/password.svg';
import IconPhone from '~/assets/svg/phone.svg';
import IconTick from '~/assets/svg/tick.svg';
import IconTickThin from '~/assets/svg/tick-thin.svg';
import IconUser from '~/assets/svg/user.svg';
import IconArrow from '~/assets/svg/arrow.svg';
import IconCreate from '~/assets/svg/create.svg';
import IconFacebook from '~/assets/svg/facebook.svg';
import IconLinkedin from '~/assets/svg/linkedin.svg';
import IconTwitter from '~/assets/svg/twitter.svg';
import IconLogoText from '~/assets/svg/logo-text.svg';
import IconLogoRobot from '~/assets/svg/logo-robot.svg';

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
