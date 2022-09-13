<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let isPlaying: boolean;
	export let frameRate: number;
	export let frameIndex: number;
	export let totalFrames: number;
	export let loop: boolean;

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

	function toggleLoop() {
		dispatch('toggleLoop');
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
	<div class="loop button" class:selected={loop}>
		<i class="icon-loop" on:click={toggleLoop} />
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
		display: flex;
		text-align: center;
		transition: all 150ms;
		min-width: 36px;

		&:hover {
			background-color: lighten($background, 5);
			color: $on-primary;
		}

		&:active {
			color: darken($on-primary, 30);
		}

		&.selected {
			color: $on-primary;
			background-color: lighten($background, 10);

			&:hover {
				background-color: lighten($background, 20);
			}

			&:active {
				color: darken($on-primary, 40);
			}
		}

		i {
			font-size: 26px;
			padding: 0;
			margin: auto;
			&.icon-loop {
				font-size: 20px;
			}
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
		max-width: 120px;

		label {
			margin-right: 0.5em;
		}

		input {
			text-align: center;
			background: lighten($background, 5);
			border: 0;
			border-radius: 0;
			outline: none !important;
			color: #fff;
		}
	}
</style>
