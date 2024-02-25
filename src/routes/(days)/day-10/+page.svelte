<script>
	import PopUp from '$lib/components/day-10/PopUp.svelte';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';

	let isPopUpOpen = $state(false);

	const togglePopUp = () => {
		isPopUpOpen = !isPopUpOpen;
	};

	onMount(() => {
		const timeout = setTimeout(() => {
			isPopUpOpen = true;
		}, 2500);

		return () => clearTimeout(timeout);
	});
</script>

<div class="flex flex-1 items-center justify-center">
	<div
		class="flex flex-col items-center gap-4 rounded-md border-2 border-border px-4 py-8 text-center"
	>
		<h1 class="text-5xl font-bold">Pop-up! Spreading the holiday cheer</h1>
		<p class="text-xl">Want to see a jolly message by Santa!!</p>
		<Button on:click={togglePopUp} variant="outline" class="mt-4 ">Click Here</Button>
	</div>
	<PopUp onClose={togglePopUp} isOpen={isPopUpOpen} />
</div>
