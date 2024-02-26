<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';

	const { data } = $props();

	let userInput = $state('');
	let generatedElfName: string | null = $state(null);

	const onSubmit = (
		e: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) => {
		if (!userInput) return;
		e.preventDefault();
		const s = userInput.toLowerCase().split(' ');
		let generatedName: string[] = [];
		for (let i = 0; i < s.length; i++) {
			if (i % 2 === 0) {
				const pickedName = pickName(data.elfNames.firstNames, s[i]);
				generatedName.push(pickedName);
			} else {
				const pickedName = pickName(data.elfNames.lastNames, s[i]);
				generatedName.push(pickedName);
			}
		}

		generatedElfName = generatedName.join(' ');
		userInput = '';
	};

	const pickName = (namesList: string[], name: string) => {
		const pickedName = namesList.find((item) => {
			return (
				item.length === name.length || item.split('').sort().join('').toLowerCase().includes(name)
			);
		});
		if (pickedName) {
			return pickedName;
		}
		return namesList[Math.round(Math.random() * namesList.length)];
	};
</script>

<div class="flex flex-1 items-center justify-center">
	<Card.Root class="w-full max-w-[480px]">
		<Card.Header>
			<Card.Title class="text-2xl font-bold">Tinsel Transformers</Card.Title>
			<Card.Description>Generate your unique elf-inspired name.</Card.Description>
		</Card.Header>
		<Card.Content>
			<form on:submit={onSubmit} class="flex flex-col gap-4">
				<Label for="name">Enter your name</Label>
				<Input bind:value={userInput} type="text" id="name" placeholder="your name..." />
				<Button type="submit" variant="outline">Generate</Button>
			</form>
		</Card.Content>
		<Card.Footer class="h-10">
			{#if generatedElfName}
				<p class="mx-auto text-center">
					Your elf name is
					<span
						class="bg-gradient-to-br from-[#bc4e9c] to-[#f80759] bg-clip-text font-bold text-transparent"
					>
						{generatedElfName}
					</span>
				</p>
			{/if}
		</Card.Footer>
	</Card.Root>
</div>
