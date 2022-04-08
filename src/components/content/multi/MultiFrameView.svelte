<script lang="ts">
	import type { SelectionModel } from 'model/app.model';
	import ContentView from '../ContentView.svelte';

	export let imgSrc: string;
	export let selection: SelectionModel;
	export let selected: boolean;

	let width = 100;
	let height = 100;
	let scale = 1;
</script>

<div class="multi-frame-view">
	<ContentView {width} {height} {scale} />
</div>

<style lang="scss">
	.multi-frame-view {
		width: 100%;
		height: 100%;
	}
</style>
