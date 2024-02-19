<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { cn } from '$lib/utils';
	import type { Present, Container, TransferData } from '../../../routes/(days)/day-3/types';
	import { flip } from 'svelte/animate';
	type Props = {
		presents: Present[];
		handleArrayChange: (data: TransferData) => void;
		container: Container;
	};
	let { presents, handleArrayChange, container } = $props<Props>();

	let hovering = $state(false);

	const handleDragOver = (
		e: DragEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		}
	) => {
		e.preventDefault();
		if (!e.dataTransfer) return;
		e.dataTransfer.dropEffect = 'move';
	};

	const handleDrop = (
		e: DragEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		},
		container: Container
	) => {
		e.preventDefault();
		if (!e.dataTransfer) return;
		const res = e.dataTransfer.getData('text/plain');
		const data = JSON.parse(res) as TransferData;
		if (container === data.container) return;
		handleArrayChange(data);
		hovering = false;
	};

	const handleDragStart = (
		e: DragEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		},
		{ present, index, container }: TransferData
	) => {
		const data: TransferData = { present, index, container };
		e.dataTransfer?.setData('text/plain', JSON.stringify(data));
	};
</script>

<div
	ondrop={(e) => handleDrop(e, container)}
	ondragover={handleDragOver}
	ondragenter={(e) => (hovering = true)}
	ondragleave={() => (hovering = false)}
	class={cn(
		'w-1/2 rounded-md border border-border p-4',
		hovering && 'outline outline-2 outline-offset-4 outline-primary *:pointer-events-none'
	)}
	role="button"
	tabindex={0}
>
	<h3
		class="mb-6 text-base font-bold underline decoration-primary underline-offset-4 sm:text-xl md:text-2xl lg:text-3xl"
	>
		{container}
	</h3>
	<div class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each presents as present, index (present.id)}
			<div animate:flip={{ duration: 500 }}>
				<Card.Root
					draggable
					ondragstart={(e) => handleDragStart(e, { index, present, container })}
					class={cn('cursor-grab transition duration-300 hover:border-primary')}
				>
					<Card.Header class="px-3 py-2">
						<Card.Title class="text-base md:text-lg">{present.name}</Card.Title>
						<Card.Description class="text-sm md:text-base">{present.weight} kg</Card.Description>
					</Card.Header>
				</Card.Root>
			</div>
		{/each}
	</div>
</div>
