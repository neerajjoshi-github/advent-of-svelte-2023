import type { PageLoad } from './$types';
import type { Child } from './state.svelte';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json');
	const childrens = (await res.json()) as Omit<Child, 'id'>[];

	return { childrens };
};
