<script lang="ts">
	import { createToysArrays, createToysArrayByElf } from './helpers';
	import LineChart from '$lib/components/day-5/LineChart.svelte';
	import BarChart from '$lib/components/day-5/BarChart.svelte';
	import * as Table from '$lib/components/ui/table';
	import moment from 'moment';

	let { data } = $props();

	const { createdToys, wrappedToys } = createToysArrays(data.tasks);

	const elfTasks = createToysArrayByElf(data.tasks);

	const headerBlocksData = [
		{
			title: 'Total Toys Created',
			value: createdToys.data.length,
			subTitle: `Average time : ${createdToys.averagePerPerson} mins`
		},
		{
			title: 'Total Toys Created',
			value: wrappedToys.data.length,
			subTitle: `Average time : ${wrappedToys.averagePerPerson} mins`
		},
		{
			title: 'Hourly Toys Creation Rate',
			value: createdToys.hourlyAverage,
			subTitle: `Max toys created in a hour : ${createdToys.maxToysInHour}`
		},
		{
			title: 'Hourly Toys Wrapping Rate',
			value: wrappedToys.hourlyAverage,
			subTitle: `Max toys wrapped in a hour : ${wrappedToys.maxToysInHour}`
		}
	];
</script>

<div class="flex w-[100%] max-w-[1080px] flex-col gap-6">
	<div class="mb-3">
		<h1 class="mb-1 text-3xl font-bold">Present Progress</h1>
		<p class="text-sm text-foreground/50">Keep track of work done by elfs!!</p>
	</div>
	<div class="flex w-full flex-col gap-4 lg:flex-row">
		<div class="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-1">
			{#each headerBlocksData as data, i (i)}
				<div class="flex flex-col gap-2 rounded-md bg-secondary/20 p-2 backdrop-blur-md">
					<span class="truncate text-xs md:text-sm">{data.title}</span>
					<span class="text-xl font-bold sm:text-2xl md:text-3xl">{data.value}</span>
					<span class="text-xs text-zinc-200">{data.subTitle}</span>
				</div>
			{/each}
		</div>
		<div class="flex-1">
			<BarChart
				data={[createdToys.data.length, wrappedToys.data.length]}
				labels={['Toys Created', 'Toys Wrapped']}
			/>
		</div>
	</div>

	<LineChart
		datasets={[
			{
				label: 'Toys Created Per Hour',
				data: createdToys.counts
			}
		]}
		labels={createdToys.hours}
	/>
	<LineChart
		datasets={[
			{
				label: 'Toys Wrapped Per Hour',
				data: wrappedToys.counts,
				borderColor: '#EF1F72',
				pointBackgroundColor: '#36a2eb'
			}
		]}
		labels={wrappedToys.hours}
	/>
	<LineChart
		datasets={[
			{
				label: 'Toys Wrapped',
				data: elfTasks.map((item) => item.toysWrapped)
			},
			{
				label: 'Toys Created',
				data: elfTasks.map((item) => item.toysCreated),
				borderColor: '#EF1F72',
				pointBackgroundColor: '#36a2eb'
			}
		]}
		labels={elfTasks.map((item) => item.elf)}
	/>
	<div class="rounded-md border border-border bg-secondary/20 p-2">
		<h3 class="mb-3 text-center text-xl font-semibold">Top 10 most hardwroking Elfs.</h3>
		<Table.Root>
			<Table.Header>
				<Table.Row class="text-center">
					<Table.Head>Efl's Name</Table.Head>
					<Table.Head class="whitespace-nowrap text-center">Toys Created</Table.Head>
					<Table.Head class="whitespace-nowrap text-center">Toys Wrapped</Table.Head>
					<Table.Head class="whitespace-nowrap text-center">Task Done</Table.Head>
					<Table.Head class="whitespace-nowrap text-center">Time Taken Per Task</Table.Head>
					<Table.Head class="whitespace-nowrap text-right">Total Time</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each elfTasks.slice(10) as { elf, totalMinutesTaken, toysCreated, toysWrapped } (elf)}
					{@const totalTasks = toysWrapped + toysCreated}
					<Table.Row>
						<Table.Cell>{elf}</Table.Cell>
						<Table.Cell class="text-center">{toysCreated}</Table.Cell>
						<Table.Cell class="text-center">{toysWrapped}</Table.Cell>
						<Table.Cell class="text-center">{totalTasks}</Table.Cell>
						<Table.Cell class="text-center">
							{(totalMinutesTaken / totalTasks).toFixed(1)} mins
						</Table.Cell>
						<Table.Cell class="text-right">
							{moment.duration(totalMinutesTaken, 'm').hours()}h
							{moment.duration(totalMinutesTaken, 'm').minutes()}min
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
