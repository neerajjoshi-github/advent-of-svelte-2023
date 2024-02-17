<script lang="ts">
	import Logo from '$lib/assets/advent-of-svelte.png';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ChevronRight, ChevronLeft } from 'lucide-svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	let day = $derived(Number($page.url.pathname.split('-')[1]));
	import { days } from '$lib/constants/days';

	const handleDay = (direction: 'next' | 'prev') => {
		console.log('Hello');
		if (day < 1 || day > days.length) return;

		if (direction === 'next') {
			goto(`/day-${day + 1}`);
		} else {
			goto(`/day-${day - 1}`);
		}
	};
</script>

<nav
	class="sticky left-0 top-0 z-10 flex h-12 w-full items-center justify-between border-b-2 border-[#ff3e00] px-10 backdrop-blur-sm"
>
	<div>
		<a href="/" class="flex items-center gap-2">
			<img class="w-10" src={Logo} alt="advent of svelte" />
			<span class="text-orange text-lg font-bold text-[#ff3e00]">Advent of Svelte</span>
		</a>
	</div>

	{#if !!day}
		<div class="flex items-center gap-3">
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<Button
						builders={[builder]}
						disabled={day <= 1}
						on:click={() => handleDay('prev')}
						variant="ghost"
						size="icon"
					>
						<ChevronLeft />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<span>Prev Day</span>
				</Tooltip.Content>
			</Tooltip.Root>

			<span class="font-bold">Day {day}</span>

			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<Button
						builders={[builder]}
						disabled={day >= days.length}
						on:click={() => handleDay('next')}
						variant="ghost"
						size="icon"
					>
						<ChevronRight />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<span>Next Day</span>
				</Tooltip.Content>
			</Tooltip.Root>
		</div>
	{/if}
</nav>
