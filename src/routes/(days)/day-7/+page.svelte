<script lang="ts">
	import { morseMap, sleep } from './helpers';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Card from '$lib/components/ui/card';
	import Button from '$lib/components/ui/button/button.svelte';
	import { onMount } from 'svelte';

	let text = $state('Hello World');
	let morseCode = $state('');
	let stopAudio = $state(false);

	let audioContext: AudioContext;
	let oscilator: OscillatorNode;
	let gain: GainNode;

	onMount(() => {
		audioContext = new AudioContext();
		oscilator = audioContext.createOscillator();
		gain = audioContext.createGain();
		oscilator.frequency.value = 440.0;
		gain.gain.value = 0;
		oscilator.connect(gain);
		gain.connect(audioContext.destination);
		oscilator.start();
	});

	$effect(() => {
		const chars = text.split('');
		let tempMorseCode = '';

		chars.forEach((char) => {
			tempMorseCode += morseMap.get(char.toUpperCase()) + ' ';
		});

		morseCode = tempMorseCode;
	});

	const beepBop = async (delay: number) => {
		gain.gain.setTargetAtTime(0.1, 0, 0.001);
		await sleep(delay);
		gain.gain.setTargetAtTime(0, 0, 0.001);
		await sleep(60);
	};

	const onPlay = async () => {
		stopAudio = false;
		audioContext.resume();
		for (let i = 0; i < morseCode.length; i++) {
			if (stopAudio) return;
			if (morseCode[i] === '.') {
				await beepBop(100);
			}

			if (morseCode[i] === '-') {
				await beepBop(400);
			}

			if (morseCode[i] === '/') {
				await sleep(800);
			}
		}
	};
</script>

<div class="flex flex-1 items-center justify-center">
	<Card.Root class="w-full max-w-[550px]">
		<Card.Header>
			<Card.Title>Morse Mischief</Card.Title>
			<Card.Description>Create morse code from texts.</Card.Description>
		</Card.Header>
		<Card.Content class="flex flex-col gap-3">
			<Textarea bind:value={text} />
			<div class="min-h-12 w-full rounded-md bg-secondary/30 p-2 text-xl">
				{morseCode}
			</div>
		</Card.Content>
		<Card.Footer class="flex items-center gap-4">
			<Button variant="outline" on:click={onPlay}>Play</Button>
			<Button variant="outline" on:click={() => (stopAudio = true)}>Stop</Button>
		</Card.Footer>
	</Card.Root>
</div>
