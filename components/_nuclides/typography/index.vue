<template>
	<div class="typographies">
		<div v-for="typography in items" :key="typography.name" :class="['item-' + typography.name]"  class="typography">
			<div class="stats">
				<span class="name">
					$text-{{typography.name}}
				</span>
				/
				<span class="size" title="font-size"></span>
				/
				<span class="lh" title="line-height"></span>
				/
				<span class="fw" title="font-weight"></span>
				/
				<span class="fs" title="font-style"></span>
			</div>
			<span class="sample" :class="['text-' + typography.name]">The quick brown fox jumps over the lazy dog</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Typography',
	data: function() {
		return {
			items: [
				{ name: 'top-header' },
				{ name: 'hero' },
				{ name: 'manchet' },
				{ name: 'detail' },
				{ name: 'h1' },
				{ name: 'h2' },
				{ name: 'h3' },
				{ name: 'h4' },
				{ name: 'paragraph1' },
				{ name: 'paragraph2' },
				{ name: 'paragraph3' },
				{ name: 'footer-legal' },
				{ name: 'footer-title' },
				{ name: 'footer-link' },
				{ name: 'quote' },
				{ name: 'button-large' },
				{ name: 'button' },
				{ name: 'navigation' },
				{ name: 'date' },
				{ name: 'link' },
				{ name: 'input' },
				{ name: 'checklist' },
				{ name: 'navigation-offcanvas' },
			],
		};
	},
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
.typographies {
	display: flex;
	flex-direction: column;
}

.typography {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	border-bottom: 1px solid #000;
	margin-bottom: 10px;
	padding-bottom: 10px;

	&:last-child {
		border-bottom: 0;
		margin-bottom: 0;
		padding-bottom: 0;
	}

	.name {
		flex: 1 0 100%;
		font-weight: 700;
	}

	.stats {
		flex: 0 0 100%;
		font-size: 12px;
		font-family: monospace;
	}

	.sample {
		overflow: hidden;
		white-space: nowrap;

		&:hover {
			background-color: rgba(64, 224, 208, 0.2);
		}
	}
}

@function map-get-default($map, $key) {
	@if map-has-key($map, $key) {
		@return map-get($map, $key);
	}

	@return '-';
}

@each $name, $typography in $typography-vars {
	.item-#{$name} {
		.size::before {
			content: '#{map-get-default($typography, size)}';
		}

		.lh::before {
			content: '#{map-get-default($typography, lh)}';
		}

		.fw::before {
			content: '#{map-get-default($typography, fw)}';
		}

		.fs::before {
			content: '#{map-get-default($typography, fs)}';
		}

		.tt::before {
			content: '#{map-get-default($typography, tt)}';
		}

		.ls::before {
			content: '#{map-get-default($typography, ls)}';
		}
	}
}
</style>
