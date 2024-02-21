<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { christmasSongs } from './helpers';
	import { cn } from '$lib/utils';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let tap = $state(0);
	let seconds = $state(0);
	let isStarted = $state(false);
	let lastTapSecond = $state(0);
	let choosenSongId: string | null = $state(null);
	let bpm = $derived(Math.round(tap / ((seconds + 1) / 60)) || 0);

	$effect(() => {
		if (!isStarted) return;
		const interval = setInterval(() => {
			seconds += 1;
		}, 1000);

		return () => clearInterval(interval);
	});

	const onTapHandler = () => {
		tap++;
		if (!isStarted) {
			isStarted = true;
		}
		lastTapSecond = seconds;
	};

	const onResetHandler = () => {
		tap = 0;
		seconds = 0;
		isStarted = false;
		lastTapSecond = 0;
	};

	const onSongClick = (songId: string) => {
		if (choosenSongId === songId) {
			return (choosenSongId = null);
		}
		choosenSongId = songId;
	};
</script>

<div class="flex flex-1 flex-col items-center justify-center gap-4">
	<div class="flex max-w-[1080px] flex-col-reverse items-center gap-4 lg:flex-row">
		{#if choosenSongId}
			<iframe
				transition:slide={{ duration: 300, easing: quintOut, axis: 'x' }}
				src={`https://www.youtube.com/embed/${choosenSongId}`}
				class="aspect-video w-full rounded-md lg:h-full"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
			></iframe>
		{/if}
		<Card.Root class="w-full max-w-[480px]">
			<Card.Header>
				<Card.Title class="text-2xl">Misteltoe Metronome</Card.Title>
				<Card.Description>Tap along your favorite Christmas tunes.</Card.Description>
			</Card.Header>
			<Card.Content class="flex flex-col items-center justify-center gap-1">
				<span class="text-7xl font-bold">{bpm}</span>
				<span class="text-6xl font-bold">BPM</span>
				<span class="text-lg text-muted-foreground">Last tap at : {lastTapSecond} sec</span>
			</Card.Content>
			<Card.Footer class="flex items-center justify-center gap-3">
				<Button variant="outline" onclick={onTapHandler}>Tap</Button>
				<Button variant="outline" onclick={onResetHandler}>Reset</Button>
			</Card.Footer>
		</Card.Root>
	</div>
	<div class="w-full max-w-[720px]">
		<h1 class="my-3 text-center text-xl font-bold sm:text-3xl">Choose a classic christmas songs</h1>
		<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
			{#each christmasSongs as song (song.title)}
				<Button
					on:click={() => onSongClick(song.id)}
					variant="outline"
					class={cn(
						'flex h-auto flex-col gap-1 p-2',
						choosenSongId === song.id && 'bg-primary hover:bg-primary/90'
					)}
				>
					<span class="text-base font-semibold sm:text-lg">{song.title}</span>
					<span class="text-sm">By - {song.artist}</span>
				</Button>
			{/each}
		</div>
	</div>
</div>
