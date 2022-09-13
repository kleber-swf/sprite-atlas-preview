<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let isPlaying: boolean;
	export let frameRate: number;
	export let frameIndex: number;
	export let totalFrames: number;
	const dispatch = createEventDispatcher();

	function togglePlay() {
		dispatch('togglePlay');
	}

	function seek(e: Event) {
		dispatch('seek', (e.target as HTMLInputElement).value);
	}

	function stop() {
		dispatch('stop');
	}

	function changeFrameRate(e: Event) {
		console.log((e.target as HTMLInputElement).value);
		dispatch('fpsChanged', (e.target as HTMLInputElement).value);
	}
</script>

<div class="animation-controls">
	<div class="play button" on:click={togglePlay}>
		{#if isPlaying}
			<i class="icon-pause" />
		{:else}
			<i class="icon-play" />
		{/if}
	</div>
	<div class="reset button">
		<i class="icon-stop" on:click={stop} />
	</div>
	<div class="seek-bar">
		<input type="range" min="0" max={totalFrames} value={frameIndex} on:input={seek} />
	</div>
	<div>
		<label for="fps">FPS</label>
		<input type="number" min="1" max="120" step="1" value={frameRate} on:input={changeFrameRate} />
	</div>
</div>

<style lang="scss">
	.animation-controls {
		position: absolute;
		display: flex;
		bottom: 0;
	}

	.button {
		display: inline-block;
		width: 60px;
		height: 60px;
		text-align: center;
		border: 1px solid black;

		i {
			font-size: 32px;
			margin: auto;
		}
	}

	.seek-bar {
		flex: 1;
	}
</style>
