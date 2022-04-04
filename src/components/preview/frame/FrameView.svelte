<script lang="ts">
	import type { SelectionModel } from 'model/app.model';

	export let selection: SelectionModel;
	export let imgSrc: string;

	let style: string;

	$: {
		const frame = selection?.items[0].frame?.frame;
		if (frame) {
			const s = [`background-image: url(${imgSrc})`, `width: ${frame.w}px`, `height: ${frame.h}px`, `background-position: -${frame.x}px -${frame.y}px`];
			style = s.join(';');
		}
	}
</script>

<div class="atlas-view">
	<div class="image-container">
		<div class="internal">
			{#if style}
				<div class="frame" {style}>&nbsp;</div>
			{/if}
		</div>
	</div>
</div>

<style lang="scss" scoped>
	@import 'variables.scss';
	.atlas-view {
		background-color: $dark-background;
		user-select: none;
		background-image: url('/assets/patterns/shadow-checkers.png');
		width: 100%;
		height: 100%;
		min-width: 100%;
		min-height: 100%;
		max-width: 100%;
		max-height: 100%;
		overflow: auto;

		.image-container {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			.internal {
				.frame {
					transform-origin: center;
					box-sizing: content-box;
					-webkit-user-drag: none;
					user-select: none;
					-moz-user-select: none;
					-webkit-user-select: none;
					-ms-user-select: none;
					display: block;
					border: 1px solid red;
				}
			}
		}
	}
</style>
