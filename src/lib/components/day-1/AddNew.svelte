<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { z } from 'zod';

	type AddNewProps = {
		addNewChild: ({ tally, name }: { tally: number; name: string }) => void;
	};

	let { addNewChild } = $props<AddNewProps>();

	let tally = $state('');
	let name = $state('');

	const formSchema = z.object({
		tally: z.coerce.number(),
		name: z.string().min(1)
	});

	const onFormSubmit = () => {
		try {
			const newChild = formSchema.parse({
				tally,
				name
			});
			addNewChild(newChild);
			tally = '';
			name = '';
		} catch (error) {
			console.log(error);
		}
	};
</script>

<Card.Root class="static top-14 h-fit w-full md:sticky md:w-[350px]">
	<Card.Header>
		<Card.Title class="text-2xl">Add new!!</Card.Title>
	</Card.Header>
	<Card.Content>
		<form on:submit|preventDefault={onFormSubmit} class="flex flex-col gap-6">
			<div class="flex flex-col gap-3">
				<Label for="name">Name</Label>
				<Input bind:value={name} id="name" type="text" />
			</div>
			<div class="flex flex-col gap-3">
				<Label for="tally">Tally</Label>
				<Input bind:value={tally} id="tally" type="text" />
			</div>
			<Button disabled={name === ''} type="submit">Add</Button>
		</form>
	</Card.Content>
</Card.Root>
