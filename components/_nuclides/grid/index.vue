<template>
	<section class="container">
		<div class="text-h2">1 kolonne</div>
		<div class="grid grid--1">
			<div class="grid__column">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia natus enim, alias atque quo nisi ut sint quis itaque quae obcaecati qui repudiandae a dolores porro assumenda! Eum, voluptatem, ipsam!
			</div>
			<div class="grid__column">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia natus enim, alias atque quo nisi ut sint quis itaque quae obcaecati qui repudiandae a dolores porro assumenda! Eum, voluptatem, ipsam!
			</div>
		</div>

		<div class="text-h2">2 kolonner</div>
		<div class="grid grid--2">
			<div class="grid__column">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia natus enim, alias atque quo nisi ut sint quis itaque quae obcaecati qui repudiandae a dolores porro assumenda! Eum, voluptatem, ipsam!
			</div>
			<div class="grid__column">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia natus enim, alias atque quo nisi ut sint quis itaque quae obcaecati qui repudiandae a dolores porro assumenda! Eum, voluptatem, ipsam!
			</div>
			<div class="grid__column">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia natus enim, alias atque quo nisi ut sint quis itaque quae obcaecati qui repudiandae a dolores porro assumenda! Eum, voluptatem, ipsam!
			</div>
			<div class="grid__column">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia natus enim, alias atque quo nisi ut sint quis itaque quae obcaecati qui repudiandae a dolores porro assumenda! Eum, voluptatem, ipsam!
			</div>
		</div>

		<div class="text-h2">3 kolonner</div>
		<div class="grid grid--3">
			<div class="grid__column">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia natus enim, alias atque quo nisi ut sint quis itaque quae obcaecati qui repudiandae a dolores porro assumenda! Eum, voluptatem, ipsam!
			</div>
			<div class="grid__column">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia natus enim, alias atque quo nisi ut sint quis itaque quae obcaecati qui repudiandae a dolores porro assumenda! Eum, voluptatem, ipsam!
			</div>
			<div class="grid__column">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia natus enim, alias atque quo nisi ut sint quis itaque quae obcaecati qui repudiandae a dolores porro assumenda! Eum, voluptatem, ipsam!
			</div>
			<div class="grid__column">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia natus enim, alias atque quo nisi ut sint quis itaque quae obcaecati qui repudiandae a dolores porro assumenda! Eum, voluptatem, ipsam!
			</div>
			<div class="grid__column">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia natus enim, alias atque quo nisi ut sint quis itaque quae obcaecati qui repudiandae a dolores porro assumenda! Eum, voluptatem, ipsam!
			</div>
			<div class="grid__column">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia natus enim, alias atque quo nisi ut sint quis itaque quae obcaecati qui repudiandae a dolores porro assumenda! Eum, voluptatem, ipsam!
			</div>
		</div>

		<div class="text-h2">4 kolonner</div>
		<div class="grid grid--4">
			<div class="grid__column">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia natus enim, alias atque quo nisi ut sint quis itaque quae obcaecati qui repudiandae a dolores porro assumenda! Eum, voluptatem, ipsam!
			</div>
			<div class="grid__column">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia natus enim, alias atque quo nisi ut sint quis itaque quae obcaecati qui repudiandae a dolores porro assumenda! Eum, voluptatem, ipsam!
			</div>
			<div class="grid__column">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia natus enim, alias atque quo nisi ut sint quis itaque quae obcaecati qui repudiandae a dolores porro assumenda! Eum, voluptatem, ipsam!
			</div>
			<div class="grid__column">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia natus enim, alias atque quo nisi ut sint quis itaque quae obcaecati qui repudiandae a dolores porro assumenda! Eum, voluptatem, ipsam!
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'Grid',
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
.grid {
	&__column {
		border: 1px solid #cfcfcf;
		padding: 30px;
	}
}
</style>

<!-- <docs>
```jsx
<Grid />
```
</docs> -->
