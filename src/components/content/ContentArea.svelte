<script lang="ts">
	import { data } from 'store/data';
	import AnimationView from './animation/AnimationView.svelte';
	import AtlasView from './atlas/AtlasView.svelte';
	import FrameView from './frame/FrameView.svelte';

	let imgSrc: string;
	let selectedTab = 0;

	data.subscribe((model) => {
		if (model) imgSrc = model.imageUrl;
		selectedTab = 0;
	});

	function selectTab(index: number) {
		if (hasSource) selectedTab = index;
	}

	$: hasSource = !!imgSrc;
</script>

<div class="content-area">
	<div class="tabs">
		<div class="tab title" class:selected={selectedTab === 0} on:click={() => selectTab(0)}>Atlas</div>
		<div class="tab title" class:selected={selectedTab === 1} class:disabled={!hasSource} on:click={() => selectTab(1)}>Frame</div>
		<div class="tab title" class:selected={selectedTab === 2} class:disabled={!hasSource} on:click={() => selectTab(2)}>Animation</div>
	</div>
	<div class="tab-content">
		{#if selectedTab === 0}
			<AtlasView />
		{:else if selectedTab === 1}
			<FrameView />
		{:else}
			<AnimationView />
		{/if}
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
		}
	}
</style>
