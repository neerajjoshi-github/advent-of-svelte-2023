import type { PageLoad } from './$types';

type ElfNames = {
	firstNames: string[];
	lastNames: string[];
};

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-eleven.json');
	const elfNames = (await res.json()) as ElfNames;

	return { elfNames };
};
