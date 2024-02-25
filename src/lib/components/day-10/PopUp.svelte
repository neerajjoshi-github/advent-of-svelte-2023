<script lang="ts">
	import Santa from '$lib/assets/santa.svg';
	import Decoration from '$lib/assets/decoration.svg';
	import { Button } from '$lib/components/ui/button';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	type Props = {
		isOpen: boolean;
		onClose: () => void;
	};

	let container: HTMLDivElement | null = $state(null);

	const { isOpen, onClose } = $props<Props>();

	const onOutsideClick = (
		e: MouseEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		}
	) => {
		if (!container) return;
		if (container.contains(e.target as Node | null)) return;
		onClose();
	};

	$effect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	});
</script>

{#if isOpen}
	<div
		on:click={onOutsideClick}
		transition:fly={{ duration: 500, y: '100%', opacity: 0.5, easing: quintOut }}
		class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-3 backdrop-blur-sm"
	>
		<div
			bind:this={container}
			class="relative flex flex-col items-center gap-3 rounded-md border-2 border-border p-4 text-center backdrop-blur-md"
		>
			<Button
				on:click={onClose}
				variant="outline"
				size="icon"
				class="absolute right-1 top-1 z-[10]"
			>
				X
			</Button>

			<img class="z-[5] h-auto w-20 sm:w-40 md:w-60" src={Santa} alt="Santa" />
			<img class="absolute left-0 top-0 h-auto w-20 sm:w-40 md:w-60" src={Decoration} alt="Santa" />
			<img
				class="absolute right-0 top-0 h-auto w-20 sm:w-40 md:w-60"
				src={Decoration}
				alt="Santa"
			/>
			<p class="text-2xl font-bold sm:text-3xl md:text-5xl">
				🎄✨ Merry Christmas and Happy Holidays! ✨🎄
			</p>
			<p class="text-base font-medium sm:text-lg md:text-xl">
				Wishing you joy, love, and festive moments with your dear ones. Cheers to a wonderful
				season!
			</p>
		</div>
	</div>
{/if}
