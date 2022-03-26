<script lang="ts">
	import type { Rect } from '../../model/model';
	export let rect: Rect;
</script>

<div class="rect" style="top:{rect.y}px; left:{rect.x}px; width:{rect.w}px; height:{rect.h}px">
	<div class="name">super_folder/master_name</div>
</div>

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
		margin-top: -27px;
	}
</style>
