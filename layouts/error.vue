<template>
	<div>
		<ContentSection v-bind="section" :meta="meta">
			<div class="content-grid-container">
				<h1 v-if="error && error.message" class="error__heading">
					{{errorTitle}}
				</h1>
				<h1 v-else>An error occurred</h1>
				<div v-html="errorContent" class="error__content"></div>
			</div>
		</ContentSection>
		<CookieNotification />
	</div>
</template>

<script>
import ContentSection, { SECTION_ANGLE_NONE } from '~/components/atoms/section/index.vue';
import CookieNotification from '~/components/atoms/cookienotification/index.vue';
import useStore from '@/store'

export default {
	props: ['error'],
	components: {
		ContentSection,
		CookieNotification,
	},
	computed: {
		section() {
			return {
				bg: 'grey',
				angleType: SECTION_ANGLE_NONE,
				pin: {
					label: '',
					top: '',
					bottom: '',
				},
			};
		},
		meta() {
			// eslint-disable-next-line no-console
			// console.dir(this.error);

			return {
				pinTopConnectsSameVisualElement: false,
				pinBottomConnectsSameVisualElement: false,
			};
		},
		errorTitle() {
			const store = useStore();
			return store.pageOptions.error_title;
		},
		errorContent() {
			const store = useStore();
			return store.pageOptions.error_content;
		},
	},
};
</script>

<!-- <style lang="scss">
.error {
	&__heading {
		@extend %text-h1;
		margin-bottom: 15px;

		$heading: &;

		@include media('desktop-1400-ab') {
			font-size: 58px;
			line-height: 68px;
		}
	}

	&__content {
		p {
			@extend %text-paragraph1;
			margin-bottom: 34px;

			@include media('desktop-1400-ab') {
				font-size: 22px;
				line-height: 36px;
			}

			&:last-child {
				margin-bottom: 0;
			}
		}

		a {
			text-decoration: none;
		}
	}
}
</style> -->
