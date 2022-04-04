<script lang="ts">
	import type { SelectionModel } from 'model/app.model';
	import AtlasView from './atlas/AtlasView.svelte';
	import FrameView from './frame/FrameView.svelte';

	export let imgSrc: string;
	export let selection: SelectionModel;

	let selectedTab = 0;
</script>

<div class="preview-area">
	<div class="tabs">
		<div class="tab title {selectedTab === 0 ? 'selected' : 'unselected'}" on:click={() => (selectedTab = 0)}>Atlas</div>
		<div class="tab title {selectedTab === 1 ? 'selected' : 'unselected'}" on:click={() => (selectedTab = 1)}>Frame</div>
	</div>
	<div class="content">
		<div class={selectedTab === 0 ? 'selected' : 'unselected'}>
			<AtlasView {imgSrc} {selection} on:select />
		</div>
		<div class={selectedTab === 1 ? 'selected' : 'unselected'}>
			<FrameView {imgSrc} {selection} />
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

			& > div.tab {
				flex: 0.5;
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;
				user-select: none;
				border-bottom: 2px solid;

				&.selected {
					background-color: #1b1b1b;
					color: white;
					border-color: transparent;
				}

				&.unselected {
					color: rgba(white, 0.3);
					border-color: #1b1b1b;
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

				&.selected {
					display: block;
				}

				&.unselected {
					display: none;
				}
			}
		}
	}
</style>
