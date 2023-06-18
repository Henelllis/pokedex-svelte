<script lang="ts">
	import { page } from '$app/stores';
	import { caughtPokemons } from '$lib/stores';
</script>

<div class="navbar">
	<a href="/" class:active={$page.url.pathname === '/'}>Home</a>
	<a href="/my-pokemons" class:active={$page.url.pathname === '/my-pokemons'}
		>My Pokemons ({$caughtPokemons.length})</a
	>
</div>

<div class="container">
	<slot />
</div>

<style>
	.container {
		max-width: 90%;
		margin: 0 auto;
		width: 1200px;
	}
	.navbar {
		display: flex;
		justify-content: space-between;
		background-color: #333;
		color: #fff;
		padding: 10px;
	}
	.navbar a {
		color: #fff;
		text-decoration: none;
	}
	:global(body) {
		margin: 0;
	}
	.navbar a:hover {
		color: #ccc;
	}
	.navbar a:active {
		border: 1px solid red;
		border-radius: 4px;
	}
</style>
