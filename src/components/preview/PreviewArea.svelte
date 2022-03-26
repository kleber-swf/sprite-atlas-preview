<script lang="ts">
	import type { FrameModel } from '../../model/model';
	import PreviewRect from './PreviewRect.svelte';

	export let imgSrc: string;
	export let selection: FrameModel;
</script>

<div class="preview">
	<div class="image-container">
		<img src={imgSrc} alt="" />
		{#if selection}
			<PreviewRect rect={selection.frame} />
		{/if}
	</div>
</div>

<style lang="scss" scoped>
	@import 'variables.scss';
	.preview {
		background-color: $dark-background;
		// background-image: url('/assets/patterns/checkers.png');
		background-image: url('/assets/patterns/shadow-checkers.png');
		height: 100%;
		overflow: auto;

		.image-container {
			position: relative;
			img {
				transform-origin: center center;
				// transform: scale(0.5, 0.5);
			}
		}
	}
</style>
