import type { Actions } from '@sveltejs/kit';
import type { PageLoad } from './$types';

type ApiPokemon = {
	name: string;
	url: string;
};

export type IndexPokemon = ApiPokemon & {
	id: string;
	image: string;
};

export const load = (async ({ fetch, url }) => {
	const generation_id = url.searchParams.get('generation_id') || '1';
	let pokemonList: IndexPokemon[] = [];

	if (generation_id === 'all') {
		const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1600');
		const json = await response.json();
		pokemonList = json.results;
	} else {
		const generation_response = await fetch(
			`https://pokeapi.co/api/v2/generation/${generation_id}`
		);
		const generationJson = await generation_response.json();

		pokemonList = generationJson.pokemon_species;
	}

	const pokemons: IndexPokemon[] = pokemonList.map((pokemon: IndexPokemon) => {
		const splitUrl = pokemon.url.split('/');
		const id = splitUrl[splitUrl.length - 2];

		return {
			name: pokemon.name,
			url: pokemon.url,
			id,
			image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
		};
	});

	return { pokemons };
}) satisfies PageLoad;
