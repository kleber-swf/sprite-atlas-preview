<script lang="ts">
	import type { SelectionModel } from '../../model/app.model';
	import PreviewRect from './PreviewRect.svelte';

	export let imgSrc: string;
	export let selection: SelectionModel;
</script>

<div class="preview">
	<div class="image-container">
		<img src={imgSrc} alt="" />
		{#if selection}
			<PreviewRect {selection} />
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
