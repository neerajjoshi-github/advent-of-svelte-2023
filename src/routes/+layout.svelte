<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	let { children } = $props();
</script>

<Navbar />

<main class="flex min-h-[calc(100vh-48px)] w-full flex-col">
	{@render children()}
</main>
