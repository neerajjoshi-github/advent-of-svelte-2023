<script>
	import { days } from '$lib/constants/days';
	import * as Card from '$lib/components/ui/card';
</script>

<main class="flex flex-1 items-center justify-center p-4">
	<div class="grid grid-cols-2 items-center justify-center md:grid-cols-3 lg:grid-cols-4">
		{#each days as { day, title }}
			<a href="/day-{day}" class="group">
				<Card.Root class="text-center transition-colors ease-linear group-hover:bg-muted/40">
					<Card.Header>
						<Card.Title>Day {day}</Card.Title>
						<Card.Description>{title}</Card.Description>
					</Card.Header>
				</Card.Root>
			</a>
		{/each}
	</div>
</main>
