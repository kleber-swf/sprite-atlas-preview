<script lang="ts">
	import type { SelectionItem } from 'model/selection.model';

	export let selection: SelectionItem;
	$: frame = selection.frame?.frame;
</script>

{#if frame}
	<div class="rect neon-box" style="top:{frame.y}px; left:{frame.x}px; width:{frame.w}px; height:{frame.h}px">
		<div class="name neon-text">
			{selection.path}
		</div>
	</div>
{/if}

<style lang="scss">
	.rect {
		position: absolute;
		top: 100px;
		left: 200px;
		user-select: none;
		pointer-events: none;

		.name {
			overflow: visible;
			white-space: nowrap;
			margin-top: -27px;
		}
	}
</style>
