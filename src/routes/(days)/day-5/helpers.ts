import type { Task } from './types';
import moment from 'moment';

const dateFormat = 'Do MMMM YYYY, h:a';

export const createToysArrays = (tasks: Task[]) => {
	const createdToysData: Task[] = tasks.filter((task) => task.task === 'CREATED_TOY');
	const wrappedToysData: Task[] = tasks.filter((task) => task.task === 'WRAPPED_PRESENT');

	const createdToysReport = getReport(createdToysData);
	const wrappedToysReport = getReport(wrappedToysData);

	return {
		createdToys: {
			data: createdToysData,
			...createdToysReport
		},
		wrappedToys: {
			data: wrappedToysData,
			...wrappedToysReport
		}
	};
};

export const getReport = (tasks: Task[]) => {
	const tasksByHours = new Map<string, number>();
	const hours: string[] = [];
	const counts: number[] = [];
	let maxToysInHour = -Infinity;
	let totalTimeTaken = 0;

	tasks.forEach((task) => {
		const date = moment(task.date).format(dateFormat);
		if (tasksByHours.has(date)) {
			const count = (tasksByHours.get(date) as number) + 1;
			tasksByHours.set(date, count);
		} else {
			tasksByHours.set(date, 1);
		}

		totalTimeTaken += task.minutesTaken;
	});

	for (const [key, count] of tasksByHours) {
		hours.push(key);
		counts.push(count);
		maxToysInHour = Math.max(maxToysInHour, count);
	}

	const hourlyAverage = tasks.length / hours.length;

	const averagePerPerson = (
		tasks.reduce((total, task) => (total += task.minutesTaken), 0) / tasks.length
	).toFixed(1);

	return { hours, counts, hourlyAverage, averagePerPerson, maxToysInHour, totalTimeTaken };
};

type TasksByElf = {
	elf: string;
	toysCreated: number;
	toysWrapped: number;
	totalMinutesTaken: number;
};

export const createToysArrayByElf = (data: Task[]) => {
	const map = new Map<string, TasksByElf>();

	data.forEach((item) => {
		if (map.has(item.elf)) {
			const elfTask = map.get(item.elf) as TasksByElf;

			if (item.task === 'CREATED_TOY') {
				elfTask.toysCreated += 1;
			}

			if (item.task === 'WRAPPED_PRESENT') {
				elfTask.toysWrapped += 1;
			}

			elfTask.totalMinutesTaken += item.minutesTaken;

			map.set(item.elf, elfTask);
		} else {
			const elfTask: TasksByElf = {
				elf: item.elf,
				toysCreated: item.task === 'CREATED_TOY' ? 1 : 0,
				toysWrapped: item.task === 'WRAPPED_PRESENT' ? 1 : 0,
				totalMinutesTaken: item.minutesTaken
			};

			map.set(item.elf, elfTask);
		}
	});

	const sortedArray = Array.from(map.values()).sort(
		(a, b) => b.toysCreated + b.toysWrapped - (a.toysCreated + a.toysWrapped)
	);

	return sortedArray;
};
