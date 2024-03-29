<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let isPlaying: boolean;
	export let frameRate: number;
	export let frameIndex: number;
	export let totalFrames: number;
	export let loop: boolean;
	export let yoyo: boolean;

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

	function toggleYoyo() {
		dispatch('toggleYoyo');
	}

	function previousFrame() {
		dispatch('jumpFrame', -1);
	}

	function nextFrame() {
		dispatch('jumpFrame', 1);
	}

	function changeFrameRate(value: number) {
		dispatch('fpsChanged', value);
	}

	function onFrameRateChanged(e: Event) {
		changeFrameRate((e.target as HTMLInputElement).valueAsNumber);
	}

	function onKeyDown(e: KeyboardEvent) {
		if (e.ctrlKey || e.shiftKey || e.altKey) return;
		switch (e.key) {
			case ' ':
				e.stopImmediatePropagation();
				e.preventDefault();
				togglePlay();
				return;
			case 'x':
				stop();
				return;
			case ',':
				previousFrame();
				return;
			case '.':
				nextFrame();
				return;
			case 'l':
				toggleLoop();
				return;
			case 'y':
				toggleYoyo();
				return;
			case '[':
				changeFrameRate(frameRate - 1);
				return;
			case ']':
				changeFrameRate(frameRate + 1);
				return;
		}
	}
</script>

<svelte:window on:keydown={onKeyDown} />

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
	<div class="prev button">
		<i class="icon-prev" on:click={previousFrame} />
	</div>
	<div class="next button">
		<i class="icon-next" on:click={nextFrame} />
	</div>
	<div class="seek-bar">
		<input type="range" min="0" max={totalFrames - 1} value={frameIndex} on:input={seek} />
	</div>
	<div class="loop button right" class:selected={loop}>
		<i class="icon-loop" on:click={toggleLoop} />
	</div>
	<div class="yoyo button right" class:selected={yoyo}>
		<i class="icon-yoyo" on:click={toggleYoyo} />
	</div>
	<div class="fps-panel right">
		<label for="fps">FPS</label>
		<input type="number" min="1" max="120" step="1" value={frameRate} on:input={onFrameRateChanged} />
	</div>
</div>

<style lang="scss">
	@import 'variables';

	.animation-controls {
		display: flex;
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

	.right {
		margin: 0 1px;
	}
</style>
