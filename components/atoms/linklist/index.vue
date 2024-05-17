<template>
	<div class="linklist">
		<div class="linklist__title">
			{{ name }}
		</div>

		<ol>
			<li v-for="(link, index) in links" :key="index">
				<SmartLink v-bind="link" class="linklist__link">{{
					link.title
				}}</SmartLink>
			</li>
		</ol>
	</div>
</template>

<script>
const SmartLink = defineAsyncComponent(() => import('~/components/helper/smartlink/index.vue'));
export default {
	name: 'LinkList',
	components: {
		SmartLink,
	},
	props: {
		name: {
			type: String,
		},
		links: {
			type: [Array, Object],
			default: [],
		},
	},
	computed: {},
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/import";
.linklist {
	flex: 1 1 auto;

	display: flex;
	flex-direction: column;

	margin-bottom: 30px;
	margin-right: 10px;

	&__title {
		@extend %text-footer-title;
	}

	li {
		margin: 5px 0 10px;
	}

	&__link {
		@extend %text-footer-link;
		text-decoration: none;
		color: $black;
		line-height: 20px;
		transition: color 0.2s ease;

		@include media('mobile') {
			font-size: 11px;
			font-weight: 400;
		}
	}
}
</style>
<!-- <docs>
```jsx
<div>
	<LinkList name="Resources" :links="[
		{
			url: 'http://google.com',
			title: 'Google',
		},
		{
			url: 'http://google.com',
			title: 'Google',
		},
		{
			url: 'http://google.com',
			title: 'Google',
		},
	]" />
</div>
```
</docs> -->
