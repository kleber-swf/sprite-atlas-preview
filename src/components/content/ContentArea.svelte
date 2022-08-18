<script lang="ts">
	import type { SelectionModel } from 'model/app.model';
	import AtlasView from './atlas/AtlasView.svelte';
	import FrameView from './frame/FrameView.svelte';

	export let imgSrc: string;
	export let selection: SelectionModel;

	let selectedTab = 0;

	function selectTab(index: number, enabled: boolean) {
		if (enabled) selectedTab = index;
	}

	$: hasSource = !!imgSrc;
</script>

<div class="content-area">
	<div class="tabs">
		<div class="tab title" class:selected={selectedTab === 0} on:click={() => selectTab(0, true)}>Atlas</div>
		<div class="tab title" class:selected={selectedTab === 1} class:disabled={!hasSource} on:click={() => selectTab(1, hasSource)}>Frame</div>
	</div>
	<div class="tab-content">
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

	$tabs-height: $panel-title-height + 6px;

	.content-area {
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
			height: $tabs-height;
			box-shadow: 0 4px 10px $shadow-color inset;
			display: flex;
			align-items: flex-end;
			justify-content: flex-start;
			background-color: $dark-background;
			z-index: 100;
			border-bottom: 2px solid $primary;

			& > div.tab {
				width: 200px;
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;
				user-select: none;
				padding: 2px;
				background-color: lighten($background, 5);
				color: rgba(white, 0.4);
				border-radius: 5px 5px 0 0;
				margin-right: 2px;
				transition: all $transition-duration;

				&.selected {
					box-shadow: none;
					background-color: $primary;
					color: $on-primary;
				}

				&.disabled {
					opacity: 0.5;
				}
			}
		}

		.tab-content {
			position: absolute;
			top: $tabs-height;
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
