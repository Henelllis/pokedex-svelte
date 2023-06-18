<script lang="ts">
	import { caughtPokemons } from '$lib/stores';
	import Pokemon from '../Pokemon.svelte';
</script>

<h2>MY POKEMONS!</h2>

<div class="pokemons">
	{#each $caughtPokemons as pokemon}
		<Pokemon {pokemon} />
	{/each}
</div>

<style>
	.pokemons {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
</style>
