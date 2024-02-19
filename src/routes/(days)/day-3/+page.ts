import type { PageLoad } from './$types';
import type { Present } from './types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-three.json');
	const jsonRes = (await res.json()) as Omit<Present, 'id'>[];
	const presents = jsonRes.map((present) => {
		return { ...present, id: crypto.randomUUID() };
	}) as Present[];
	return { presents };
};
