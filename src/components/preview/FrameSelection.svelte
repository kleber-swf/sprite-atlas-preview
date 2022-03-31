<script lang="ts">
	import type { SelectionModel } from '../../model/app.model';

	export let selection: SelectionModel;
	export let scale: number;

	$: frame = selection.frame?.frame;
</script>

{#if frame}
	<div class="rect" style="top:{frame.y}px; left:{frame.x}px; width:{frame.w}px; height:{frame.h}px">
		<div class="name" style="zoom:{1 / scale}">
			{selection.path}
		</div>
	</div>
{/if}

<style lang="scss">
	$shadow-1: 0 0 4px #0df;
	$shadow-2: 0 0 10px #0ff;

	.rect {
		position: absolute;
		border: 2px solid #fff;
		box-shadow: 0 0 2px #fff, $shadow-1, $shadow-2, $shadow-1 inset, $shadow-2 inset;
		top: 100px;
		left: 200px;
	}

	.name {
		color: #fff;
		text-shadow: 0 0 2px rgba(255, 255, 255, 0.8), 0 0 4px #0df, 0 0 8px #0df, 0 0 12px #0ff;
		overflow: visible;
		white-space: nowrap;
		margin-top: -27px;
	}
</style>
