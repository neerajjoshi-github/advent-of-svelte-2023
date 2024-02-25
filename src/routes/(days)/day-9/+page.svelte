<script lang="ts">
	import { onMount } from 'svelte';
	import * as Card from '$lib/components/ui/card';
	const date = new Date();
	const isAfterChristmas = date.getDate() > 25 && date.getMonth() === 11;
	const christmasTime = new Date(
		`12-25-${isAfterChristmas ? date.getFullYear() + 1 : date.getFullYear()}`
	).getTime();

	type Countdown = {
		days: string;
		hours: string;
		minutes: string;
		seconds: string;
		[key: string]: string;
	};

	const christmasCountdown: Countdown = $state({
		days: '000',
		hours: '00',
		minutes: '00',
		seconds: '00'
	});

	onMount(() => {
		const interval = setInterval(() => {
			const totalSeconds = Math.floor((christmasTime - Date.now()) / 1000);
			const totalMinutes = Math.floor(totalSeconds / 60);
			const totalHours = Math.floor(totalMinutes / 60);

			const days = Math.floor(totalHours / 24);

			const hours = totalHours - days * 24;
			const minutes = totalMinutes - totalHours * 60;
			const seconds = totalSeconds - totalMinutes * 60;

			christmasCountdown.days = days > 9 ? `${days}` : `00${days}`;
			christmasCountdown.hours = hours > 9 ? `${hours}` : `0${hours}`;
			christmasCountdown.minutes = minutes > 9 ? `${minutes}` : `0${minutes}`;
			christmasCountdown.seconds = seconds > 9 ? `${seconds}` : `0${seconds}`;
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<div class="flex flex-1 items-center justify-center">
	<Card.Root
		class="border-white bg-[url('https://images.unsplash.com/photo-1511268011861-691ed210aae8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-right bg-no-repeat p-0 sm:p-4 md:p-6"
	>
		<Card.Header>
			<Card.Title class="text-2xl font-bold">Santa's Final Countdown</Card.Title>
			<Card.Description class="text-zinc-300">Countdown to christmas.</Card.Description>
		</Card.Header>
		<Card.Content class="mt-3 flex gap-2 max-sm:p-1 sm:gap-4">
			{#each Object.keys(christmasCountdown) as key}
				<div class="flex flex-col items-center gap-2">
					<div
						class="rounded-md border-2 border-white p-4 text-center text-4xl font-bold backdrop-blur-sm sm:text-5xl md:text-6xl"
					>
						{christmasCountdown[key]}
					</div>
					<span class="text-lg font-semibold capitalize">{key}</span>
				</div>
			{/each}
		</Card.Content>
	</Card.Root>
</div>

<style>
	.background {
		background-image: url('');
	}
</style>
