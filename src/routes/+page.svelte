<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { generations } from './generations';
	import { goto } from '$app/navigation';
	import Pokemon from './Pokemon.svelte';
	export let data: PageData;

	let searchString = '';
	$: selectedPokemons = data.pokemons.filter((pokemon) => {
		return pokemon.name.toLowerCase().includes(searchString.toLowerCase());
	});

	let form = {
		searchString: ''
	};

	console.log($page.url.searchParams.get('pokemonId'));

	$: selectedGenerationId = $page.url.searchParams.get('generation_id') || '';

	const updateSearchParams = (key: string, value: string) => {
		const searchParams = new URLSearchParams($page.url.searchParams);
		searchParams.set(key, value);
		goto('?' + searchParams.toString());
	};

	const submitSearch = (e: Event) => {
		e.preventDefault();
		searchString = form.searchString;
	};
</script>

<div class="generations">
	<button
		class="generation"
		class:active={selectedGenerationId === 'all'}
		on:click={() => updateSearchParams('generation_id', 'all')}
	>
		All
	</button>
	{#each generations as generation (generation.id)}
		<button
			class="generation"
			class:active={selectedGenerationId === generation.id.toString()}
			on:click={() => updateSearchParams('generation_id', generation.id.toString())}
		>
			{generation.main_region}
		</button>
	{/each}
</div>

<form on:submit={submitSearch} class="searchForm" method="post">
	<input
		class="searchField"
		type="text"
		bind:value={form.searchString}
		placeholder="Pokemon Name!"
	/>
	<input type="submit" value="Search" />
</form>

<div class="pokemons">
	{#each selectedPokemons as pokemon (pokemon.id)}
		<Pokemon {pokemon} />
	{/each}
</div>

<style>
	.generations {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}
	.generation {
		margin: 10px;
		padding: 5px 10px;
		border: black solid 1px;
		background-color: #f9f9f9;
		color: #333;
		cursor: pointer;
	}
	.generation.active {
		background-color: #333;
		color: #fff;
	}
	.generation.active:hover {
		background-color: #444;
	}
	.generation:hover {
		background-color: #eee;
	}
	.pokemons {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.searchForm input[type='text'] {
		width: 200px;
		padding: 5px 10px;
		border-radius: 5px;
		border: 1px solid #ccc;
	}
	.searchForm input[type='submit'] {
		padding: 5px 10px;
		border-radius: 5px;
		border: 1px solid #ccc;
		background-color: #333;
		color: #fff;
	}
	.searchForm {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin: 20px 0;
	}
</style>
