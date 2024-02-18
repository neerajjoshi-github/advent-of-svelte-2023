<script lang="ts">
	import { Plus, Minus, Cookie, RotateCcw } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { scale } from 'svelte/transition';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	import * as Card from '$lib/components/ui/card';

	import Emoji_1 from '$lib/assets/day-2/1.svg';
	import Emoji_2 from '$lib/assets/day-2/2.svg';
	import Emoji_3 from '$lib/assets/day-2/3.svg';
	import Emoji_4 from '$lib/assets/day-2/4.svg';
	import Emoji_5 from '$lib/assets/day-2/5.svg';
	import Emoji_6 from '$lib/assets/day-2/6.svg';

	const emojies = [Emoji_1, Emoji_2, Emoji_3, Emoji_4, Emoji_5, Emoji_6];

	let cookieCount = $state(0);

	const incrementCookieCount = () => {
		cookieCount++;
	};

	const decrementCookieCount = () => {
		if (cookieCount === 0) return;
		cookieCount--;
	};

	const resetCookieCount = () => {
		cookieCount = 0;
	};

	let progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	$effect(() => {
		progress.set(cookieCount);
	});
</script>

<div class="relative flex flex-1 flex-col items-center justify-center gap-10 p-2">
	<div
		class="md:grid-cols-20 absolute left-0 top-0 grid max-h-full w-full grid-cols-10 flex-wrap gap-2 overflow-hidden md:gap-3"
	>
		{#each new Array(cookieCount) as _}
			<div in:scale out:scale class="w-full">
				<Cookie class="h-auto w-full" />
			</div>
		{/each}
	</div>
	<Card.Root class="w-full max-w-[500px] bg-background/50 backdrop-blur-md">
		<Card.Header>
			<Card.Title class="text-2xl">Merry Munch-o-Meter</Card.Title>
			<Card.Description>Keep track of cookies munched by Santa!!</Card.Description>
		</Card.Header>
		<Card.Content class="flex flex-col items-center justify-center gap-6">
			<div class="flex items-center justify-center rounded-md border-2 border-border px-4 py-2">
				{#key cookieCount}
					<span in:scale class="text-6xl font-bold">{cookieCount}</span>
				{/key}
			</div>

			<div class="w-full">
				<h4
					class="test-lg font-semibold underline decoration-primary decoration-wavy underline-offset-2"
				>
					Santa's mood!!
				</h4>
				<div class="grid w-full grid-cols-6">
					{#each emojies.slice(0, (cookieCount + 2) / 2) as emoji}
						<div in:scale out:scale class="h-full w-full p-4">
							<img class="h-full w-full" src={emoji} alt="" />
						</div>
					{/each}
				</div>
				<div class="h-3 w-full overflow-hidden rounded-full border border-secondary">
					<div style:width={`${$progress * 10}%`} class="bg-progress h-full rounded-full"></div>
				</div>
			</div>

			<div class="flex items-center gap-2">
				<Button size="icon" variant="outline" on:click={incrementCookieCount}>
					<Plus size={30} />
				</Button>
				<Button size="icon" variant="outline" on:click={resetCookieCount}>
					<RotateCcw size={26} />
				</Button>
				<Button size="icon" variant="outline" on:click={decrementCookieCount}>
					<Minus size={30} />
				</Button>
			</div>
		</Card.Content>
	</Card.Root>
</div>
