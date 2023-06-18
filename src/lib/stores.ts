import { writable, type Writable } from 'svelte/store';
import type { IndexPokemon } from '../routes/+page';

export const caughtPokemons: Writable<IndexPokemon[]> = writable([]);
