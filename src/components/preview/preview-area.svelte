<script lang="ts">
	import type { SelectionModel } from 'model/app.model';
	import AtlasView from './atlas/AtlasView.svelte';
	import FrameView from './frame/FrameView.svelte';

	export let imgSrc: string;
	export let selection: SelectionModel;

	// DEBUG
	let selectedTab = 1;
</script>

<div class="preview-area">
	<div class="tabs">
		<div class="tab title" class:selected={selectedTab === 0} on:click={() => (selectedTab = 0)}>Atlas</div>
		<div class="tab title" class:selected={selectedTab === 1} on:click={() => (selectedTab = 1)}>Frame</div>
	</div>
	<div class="content">
		<div class:selected={selectedTab === 0}>
			<AtlasView {imgSrc} {selection} on:select />
		</div>
		<div class:selected={selectedTab === 1}>
			<FrameView {imgSrc} {selection} selected={selectedTab === 1} />
		</div>
	</div>
</div>

<style lang="scss">
	@import 'variables.scss';

	.preview-area {
		width: 100%;
		height: 100%;
		min-width: 100%;
		min-height: 100%;
		max-width: 100%;
		max-height: 100%;
		position: relative;

		.tabs {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: $panel-title-height;
			box-shadow: $shadow-level-1;
			display: flex;
			align-items: stretch;
			justify-content: stretch;
			z-index: 100;

			& > div.tab {
				flex: 0.5;
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;
				user-select: none;
				border-bottom: 2px solid;

				color: rgba(white, 0.3);
				border-color: #1b1b1b;
				box-shadow: 0 4px 10px $shadow-color inset;

				&.selected {
					background-color: $primary-color;
					color: $on-primary;
					border-color: transparent;
				}
			}
		}

		.content {
			position: absolute;
			top: $panel-title-height;
			left: 0;
			bottom: 0;
			right: 0;

			& > div {
				width: 100%;
				height: 100%;
				display: none;
				&.selected {
					display: block;
				}
			}
		}
	}
</style>
