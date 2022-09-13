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
	<div class="fps-panel">
		<label for="fps">FPS</label>
		<input type="number" min="1" max="120" step="1" value={frameRate} on:input={changeFrameRate} />
	</div>
</div>

<style lang="scss">
	@import 'variables';

	.animation-controls {
		position: absolute;
		display: flex;
		bottom: 0;
		width: 100%;
		padding: 2px;
		background-color: $dark-background;
	}

	.button {
		display: inline-block;
		text-align: center;
		transition: all 150ms;

		&:hover {
			background-color: lighten($background, 0.3);
			color: $on-primary;
		}

		i {
			font-size: 26px;
			padding: 0;
			margin: auto;
		}
	}

	.seek-bar {
		flex: 1;
		display: flex;
		input {
			width: 100%;
			margin: 0 8px;
		}
	}

	.fps-panel {
		display: flex;
		padding: 0 8px;
		align-items: center;
		// max-width: 120px;

		label {
			margin-right: 1em;
		}
	}
</style>
