<script lang="ts">
	import type { IndexPokemon } from './+page';
	import { caughtPokemons } from '$lib/stores';
	export let pokemon: IndexPokemon;
	const catchPokemon = () => {
		console.log('placeholder');
		caughtPokemons.set($caughtPokemons);
		caughtPokemons.update((pokemons) => {
			return [...pokemons, pokemon];
		});
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="pokemon">
	<div on:click={catchPokemon}>
		<div class="pokemon-content">
			<img src={pokemon.image} alt={pokemon.name} />
			{pokemon.name}
		</div>
		<div class="pokemon-id">
			{pokemon.id}
		</div>
	</div>
</div>

<style>
	.pokemon-id {
		position: absolute;
		top: 8px;
		left: 8px;
		font-size: 0.8em;
		color: #aaa;
	}
	.pokemon {
		width: 100px;
		margin: 10px;
		padding: 10px;
		position: relative;
		background-color: #eee;
	}
	.pokemon:hover {
		background-color: #ddd;
	}
	.pokemon-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
