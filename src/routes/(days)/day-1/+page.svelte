<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import { Plus, Minus } from 'lucide-svelte';
	// @ts-ignore Typescript error on import path
	import { createChildrens, pagination } from './state.svelte.ts';
	import AddNew from '$lib/components/day-1/AddNew.svelte';
	import Pagination from '$lib/components/day-1/Pagination.svelte';
	import type { Filter } from './state.svelte.ts';
	let { data } = $props();

	const list = createChildrens(data.childrens);
	const page = pagination();
</script>

<div class="relative flex w-full max-w-[1440px] flex-col-reverse gap-4 md:flex-row">
	<Card.Root class="flex flex-1 flex-col">
		<Card.Header class="flex">
			<div>
				<Card.Title class="text-3xl font-semibold">Deed Tracker: Naughty or Nice</Card.Title>
				<Card.Description>Trak who has been nice or naught.</Card.Description>
			</div>
			<div class="ml-auto flex gap-2">
				<Input
					oninput={(e) => list.searchChilderns(e.currentTarget.value)}
					type="text"
					placeholder="search..."
				/>
				<Select.Root
					onSelectedChange={(e) => list.filterChildrens(e?.value as Filter)}
					selected={{ value: 'all', label: 'All' }}
				>
					<Select.Trigger class="w-[180px]">
						<Select.Value placeholder="All" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="all">All</Select.Item>
						<Select.Item value="nice">Nice</Select.Item>
						<Select.Item value="naughty">Naughty</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>
		</Card.Header>
		<Card.Content>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>S. no.</Table.Head>
						<Table.Head>Name</Table.Head>
						<Table.Head>Status</Table.Head>
						<Table.Head>Tally</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each list.childrens as child, i (child.id)}
						{@const naughty = child.tally < 0}
						<Table.Row>
							<Table.Cell class="text-base">{(page.number - 1) * 10 + (i + 1)}</Table.Cell>
							<Table.Cell>{child.name}</Table.Cell>
							<Table.Cell>
								<Badge variant={naughty ? 'destructive' : 'success'}>
									{naughty ? 'naughty' : 'nice'}
								</Badge>
							</Table.Cell>
							<Table.Cell class={naughty ? 'text-destructive' : 'text-success'}
								>{child.tally}</Table.Cell
							>
							<Table.Cell class="flex justify-end gap-1">
								<Button
									on:click={() => list.decermentTally(child.id)}
									size="icon"
									variant="destructive"
								>
									<Minus size={16} />
								</Button>
								<Button
									on:click={() => list.incrementTally(child.id)}
									size="icon"
									variant="success"
								>
									<Plus size={16} />
								</Button>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Content>
		<Pagination />
	</Card.Root>

	<AddNew addNewChild={list.addNewChild} />
</div>
