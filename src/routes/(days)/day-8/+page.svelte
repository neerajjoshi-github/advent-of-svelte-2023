<script lang="ts">
	import { createCards } from './state.svelte';
	import { flip } from 'svelte/animate';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import ChirstmasBall from '$lib/assets/gift.svg';
	import moment from 'moment';

	const base_url = 'https://advent.sveltesociety.dev/data/2023/day-eight';

	const game = createCards();

	let seconds = $state(0);

	$effect(() => {
		if (game.won || game.movesCount === 0) return;

		const interval = setInterval(() => {
			seconds++;
		}, 1000);

		return () => clearInterval(interval);
	});

	const onSuffleCards = () => {
		game.suffleCards();
		seconds = 0;
	};
</script>

<div class="flex w-full flex-col items-center gap-2 px-2">
	<div class="flex w-full flex-col justify-between md:flex-row">
		<div>
			<h1 class="text-xl font-bold sm:text-2xl">Santa`s Mysterious Deck of Doubles</h1>
			<p class="text-muted-foreground">Play santa's memory card game.</p>
		</div>
		<div class="flex flex-col justify-end">
			<div class="flex items-center gap-3">
				<span>Moves : {game.movesCount}</span>
				<span>Time : {moment.utc(seconds * 1000).format('mm:ss')}</span>
			</div>
			<Button on:click={onSuffleCards} variant="outline" class="mt-2">Suffle</Button>
		</div>
	</div>
	{#if !game.won}
		<div class="grid w-full grid-cols-6 grid-rows-4 gap-2 md:grid-cols-8 md:grid-rows-3">
			{#each game.cards as card, index (card.id)}
				<div animate:flip class={cn(`flex items-center justify-center`)}>
					<button
						on:click={() => game.onCardClick(index)}
						disabled={card.removed}
						class={cn(
							' card  aspect-[0.7] h-fit w-full max-w-[140px] select-none transition duration-500 disabled:cursor-default disabled:border-none	',
							!card.show && 'flipped'
						)}
					>
						{#if !card.removed}
							<div class="card-inner h-full w-full transition duration-500">
								<div
									class="card-front bg-accent-400 absolute flex h-full w-full items-center justify-center"
								>
									<img
										class="h-full w-full object-contain"
										src={`${base_url}/${card.num}.png`}
										alt="Card"
									/>
								</div>
								<div
									class="card-back absolute flex h-full w-full items-center justify-center rounded-lg bg-secondary/50"
								>
									<img
										class="h-auto w-8 sm:w-10 md:w-12"
										src={ChirstmasBall}
										alt="Chirstmas Ball"
									/>
								</div>
							</div>
						{/if}
					</button>
				</div>
			{/each}
		</div>
	{:else}
		<div class="mt-6 flex flex-col gap-3">
			<p>
				You won the game in <span class="text-primary">{game.movesCount}</span> moves and
				<span class="text-primary">{moment.utc(seconds * 1000).format('mm:ss')} time.</span>
			</p>
			<Button on:click={onSuffleCards} variant="outline">New Game</Button>
		</div>
	{/if}
</div>

<style>
	.card {
		perspective: 1000px;
		transform-style: preserve-3d;
	}

	.card.flipped {
		transform: rotateY(180deg);
	}

	.card-inner {
		transform-style: preserve-3d;
	}

	.card-front,
	.card-back {
		backface-visibility: hidden;
	}

	.card-back {
		transform: rotateY(180deg);
	}
</style>
