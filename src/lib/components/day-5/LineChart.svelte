<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	type Dataset = {
		data: number[];
		label: string;
		pointBackgroundColor?: string;
		borderColor?: string;
	};

	type Props = {
		labels: string[];
		datasets: Dataset[];
	};

	let { datasets, labels } = $props<Props>();

	let ctx: HTMLCanvasElement | null = $state(null);

	const defaults = {
		cubicInterpolationMode: 'monotone',
		pointBorderWidth: 0,
		pointRadius: 4,
		pointBackgroundColor: '#EF1F72',
		borderColor: '#36a2eb'
	} as const;

	const _datasets = datasets.map((data) => {
		return { ...defaults, ...data };
	});

	onMount(() => {
		if (!ctx) return;
		const lineChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels,
				datasets: _datasets
			},
			options: {
				scales: {
					x: {
						ticks: {
							maxRotation: 90,
							minRotation: 90
						}
					}
				}
			}
		});

		return () => lineChart.destroy();
	});
</script>

<canvas bind:this={ctx} class="w-full rounded-md bg-secondary/20" width="100" height="60"></canvas>
