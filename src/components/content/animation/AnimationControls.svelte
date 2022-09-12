<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let isPlaying: boolean;
	const dispatch = createEventDispatcher();

	function togglePlay() {
		dispatch('togglePlay');
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
</style>
