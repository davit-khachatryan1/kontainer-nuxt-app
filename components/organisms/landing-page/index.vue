<!-- Not an actual landing page, but styles the page making it look like one. -->
<template>
	<div
		:class="[
			hideMenuClassname,
			menuBackgroundClassname,
		]"
	/>
</template>

<script>

export default {
	props: {
		data: { type: Object },
	},
	computed: {
		hideMenuClassname() {
			return this.data.hide_menu && 'hide_menu';
		},
		menuBackgroundClassname() {
			return this.data.top_menu_background_color && `menu_background_color--${this.data.top_menu_background_color}`;
		}
	}
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
.hide_menu {
	~ .header .nav__right__language {
		display: none;
	}
	~ .header .nav__right__menu-item {
		display: none;
	}
}

.menu_background_color {
	$keys: (
		bluedark: $blue-dark,
		grey: $gray-concrete,
		brown: $brown-light,
		white: $white,
	);

	@each $key,$val in $keys {
		&--#{'' + $key} {
			~ .header {
				background: $val !important;
			}
		}
	}

	&--grey {
		~ .header #trialclick {
			$grey-inverse: $white;
			background: $grey-inverse;
			border-color: $grey-inverse;
			color: $text-color;

			@include buttonShadowAndHover($grey-inverse, $gray-concrete, true, 2);

			&:hover {
				color: darken($grey-inverse, 55%);
			}
		}
	}
}
</style>