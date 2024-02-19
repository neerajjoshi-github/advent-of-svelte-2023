<script lang="ts">
	import PresentsContainer from '$lib/components/day-3/PresentsContainer.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import type { Present, TransferData } from './types';

	let { data } = $props();

	let presentsLeft = $state(data.presents);
	let presentsInSleigh: Present[] = $state([]);
	let totalWeight = $derived(
		presentsInSleigh.reduce((total, present) => (total += present.weight), 0)
	);

	$effect(() => {
		presentsInSleigh.sort((a, b) => a.weight - b.weight);
	});

	$effect(() => {
		presentsLeft.sort((a, b) => a.weight - b.weight);
	});

	const handleArrayChange = (data: TransferData) => {
		if (data.container === 'Presents Left') {
			if (totalWeight + data.present.weight > 100) return;
			presentsLeft.splice(data.index, 1);
			presentsInSleigh.push(data.present);
		} else {
			presentsInSleigh.splice(data.index, 1);
			presentsLeft.push(data.present);
		}
	};

	const resetSleigh = () => {
		presentsInSleigh = [];
	};
</script>

<div class="flex w-full flex-col gap-4">
	<Card.Root class="relative">
		<Card.Header>
			<Card.Title>Jingle Bell Balancer</Card.Title>
			<Card.Description>Sleigh Load Balancer</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="mb-2 flex items-center justify-between text-sm font-semibold">
				<span>0 kg</span>
				<span>100 kg</span>
			</div>
			<div class="h-3 w-full overflow-hidden rounded-full border border-secondary">
				<div
					style:width={`${totalWeight}%`}
					class="h-full rounded-full bg-progress transition-[width] duration-500"
				></div>
			</div>
			<p class="my-2 text-center text-lg font-semibold">{totalWeight.toFixed(1)} kg</p>
		</Card.Content>
		<Button onclick={resetSleigh} variant="outline" class="absolute bottom-2 right-2">
			New Sleigh
		</Button>
	</Card.Root>
	<div class="flex gap-6">
		<!-- Presents Left -->
		<PresentsContainer container="Presents Left" presents={presentsLeft} {handleArrayChange} />

		<!-- Presents in Sleigh-->
		<PresentsContainer
			container="Presents In Sleigh"
			presents={presentsInSleigh}
			{handleArrayChange}
		/>
	</div>
</div>
