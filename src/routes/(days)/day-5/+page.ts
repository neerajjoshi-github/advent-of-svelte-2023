import type { PageLoad } from './$types';
import type { Task } from './types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-five.json');
	const tasks = (await res.json()) as Task[];
	return { tasks };
};
