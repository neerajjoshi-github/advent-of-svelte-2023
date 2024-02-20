<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';
	import ChartStreaming from 'chartjs-plugin-streaming';
	import * as Card from '$lib/components/ui/card';
	import 'chartjs-adapter-luxon';

	type Data = {
		time: number;
		heartRate: number;
	};

	let ctx: HTMLCanvasElement | null = $state(null);

	let data: Data[] = $state([]);

	let averageHeartRate = $derived(
		(data.reduce((total, d) => (total += d.heartRate), 0) / data.length || 0).toFixed(1)
	);

	onMount(() => {
		if (!ctx) return;

		Chart.register(ChartStreaming);

		let chart = new Chart(ctx, {
			type: 'line',
			data: {
				datasets: [
					{
						label: 'Heart Rate',
						data: [],
						cubicInterpolationMode: 'monotone',
						pointBackgroundColor: '#EF1F72',
						pointBorderWidth: 0,
						pointRadius: 4
					}
				]
			},

			options: {
				interaction: {
					intersect: false
				},
				responsive: true,
				scales: {
					x: {
						type: 'realtime',
						realtime: {
							duration: 20000,
							refresh: 1000,
							delay: 2500,
							// @ts-ignore
							onRefresh: async (chart) => {
								const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-four.json');
								const { heartRate } = (await res.json()) as { heartRate: number };
								const temp = {
									time: Date.now(),
									heartRate
								};
								chart.data.datasets[0].data.push({
									x: temp.time,
									y: temp.heartRate
								});
								data.push(temp);
							}
						},
						title: {
							display: true,
							text: 'Time'
						}
					},
					y: {
						title: {
							display: true,
							text: 'Heart Rate'
						}
					}
				},
				plugins: {
					tooltip: {
						enabled: false
					}
				}
			}
		});

		return () => {
			chart.destroy();
		};
	});
</script>

<div class="flex w-full items-center justify-center">
	<Card.Root class="w-[100%] max-w-[850px]">
		<Card.Header>
			<Card.Title>Heart of Christmas</Card.Title>
			<Card.Description>Monitor Santa's heart rate</Card.Description>
		</Card.Header>
		<Card.Content class="px-1 md:px-4">
			<canvas bind:this={ctx} width="100" height="60" class="w-full rounded-md bg-slate-800" />
		</Card.Content>
		<Card.Footer class="flex items-center justify-center">
			<div class="flex rounded-md border-2 border-border px-2 py-1">
				Average Heartrate : {averageHeartRate}
			</div>
		</Card.Footer>
	</Card.Root>
</div>
