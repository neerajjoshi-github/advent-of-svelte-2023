<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	type Props = {
		labels: string[];
		data: number[];
		colors?: string[];
	};

	let { data, labels } = $props<Props>();

	let ctx: HTMLCanvasElement | null = $state(null);

	onMount(() => {
		if (!ctx) return;

		let lineChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					{
						data,
						backgroundColor: ['#8FB4DF', '#5D4ACB'],
						borderRadius: 4,
						maxBarThickness: 80
					}
				]
			},
			options: {
				plugins: {
					legend: {
						display: false
					}
				},
				responsive: true
			}
		});

		return () => lineChart.destroy();
	});
</script>

<canvas bind:this={ctx} class="w-full rounded-md bg-secondary/20" width="100" height="60"></canvas>
