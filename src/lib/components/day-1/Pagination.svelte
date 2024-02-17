<script>
	import * as Card from '$lib/components/ui/card';
	import { ChevronsLeft, ChevronsRight, ChevronRight, ChevronLeft } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { pagination } from '../../../routes/(days)/day-1/state.svelte';

	const page = pagination();
</script>

<Card.Footer class="mt-auto flex items-center justify-between">
	<span>Page {page.number} of {page.totalPages}</span>
	<div>
		<Button
			title="First"
			disabled={page.number === 1}
			on:click={page.first}
			size="icon"
			variant="outline"
		>
			<ChevronsLeft />
		</Button>
		<Button
			title="Next"
			disabled={page.number === 1}
			on:click={page.prev}
			size="icon"
			variant="outline"
		>
			<ChevronLeft />
		</Button>
		<Button
			title="Previous"
			disabled={page.number === page.totalPages}
			on:click={page.next}
			size="icon"
			variant="outline"
		>
			<ChevronRight />
		</Button>
		<Button
			title="Last"
			disabled={page.number === page.totalPages}
			on:click={page.last}
			size="icon"
			variant="outline"
		>
			<ChevronsRight />
		</Button>
	</div>
</Card.Footer>
