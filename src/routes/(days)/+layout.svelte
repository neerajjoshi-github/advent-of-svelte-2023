<script lang="ts">
	let { children } = $props();
</script>

<div class="flex flex-1 justify-center px-2 py-10 sm:px-8">
	{@render children()}
</div>
