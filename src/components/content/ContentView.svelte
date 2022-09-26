<script lang="ts">
	import type { AppStateItemModel, AppStateModel } from 'model/app-state.model';
	import { AppState } from 'store/app-state';
	import { createEventDispatcher, onMount } from 'svelte';

	export let key: keyof AppStateModel;
	export let scale = 1;
	export let minScale = 0.2;
	export let maxScale = 5;
	export let stageSize = 4096;

	let scrollLeft = -1;
	let scrollTop = -1;

	let root: HTMLElement;

	const dispatch = createEventDispatcher();

	AppState.subscribe((state) => {
		if (!state) return;
		const pref = state[key] as AppStateItemModel;
		scale = pref.scale;
		scrollLeft = pref.scrollLeft;
		scrollTop = pref.scrollTop;
	})();

	onMount(() => {
		scrollLeft = scrollLeft ?? (root.scrollWidth - root.offsetWidth) * 0.5;
		scrollTop = scrollTop ?? (root.scrollHeight - root.offsetHeight) * 0.5;
		root.scrollTo({ behavior: 'auto', left: scrollLeft, top: scrollTop });

		dispatch('scaleChanged', scale);
		return () => AppState.setItem(key, { scale, scrollLeft, scrollTop });
	});

	// #region Zoom

	function zoom(value: number) {
		scale = Math.max(minScale, Math.min(maxScale, value));
		dispatch('scaleChanged', scale);
	}

	function onWheel(e: WheelEvent) {
		const t = e.currentTarget as HTMLElement;
		scrollLeft = t.scrollLeft;
		scrollTop = t.scrollTop;
		if (!e.ctrlKey) return;
		e.preventDefault();
		e.stopImmediatePropagation();
		zoom(scale - e.deltaY * 0.002);
	}

	// #endregion

	// #region Pan

	function onMouseDown(e: MouseEvent) {
		if (e.button === 1 && !e.ctrlKey) {
			document.addEventListener('mouseup', stopPanning);
			document.addEventListener('mousemove', pan);
		}
	}

	function stopPanning(e: MouseEvent) {
		document.removeEventListener('mouseup', stopPanning);
		document.removeEventListener('mousemove', pan);
		e.stopImmediatePropagation();
	}

	function pan(e: MouseEvent) {
		root.scrollTop -= e.movementY;
		root.scrollLeft -= e.movementX;
		e.preventDefault();
	}

	// #endregion

	function resetScaleAndPan() {
		scrollLeft = (root.scrollWidth - root.offsetWidth) * 0.5;
		scrollTop = (root.scrollHeight - root.offsetHeight) * 0.5;
		root.scrollTo({ behavior: 'auto', left: scrollLeft, top: scrollTop });
		zoom(1);
	}

	function onKeyDown(e: KeyboardEvent) {
		if (e.key === 'Tab') {
			resetScaleAndPan();
			e.preventDefault();
			e.stopImmediatePropagation();
		}
		
		if (!e.ctrlKey) return;

		switch (e.key) {
			case '=':
				zoom(scale + 0.1);
				e.preventDefault();
				e.stopImmediatePropagation();
				return;
			case '-':
				zoom(scale - 0.1);
				e.preventDefault();
				e.stopImmediatePropagation();
				return;
			case '0':
				zoom(1);
				e.preventDefault();
				e.stopImmediatePropagation();
				return;
		}
	}
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="content-view" bind:this={root} on:wheel={onWheel} on:mousedown={onMouseDown} on:click>
	<div class="stage" style:width="{stageSize}px" style:height="{stageSize}px">
		<div class="inner" style:transform="scale({scale})">
			<slot />
		</div>
	</div>
</div>

<style lang="scss">
	@import 'variables';

	div.content-view {
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
		overflow: auto;
		user-select: none;

		.stage {
			display: grid;
			background-color: $dark-background;
			background-image: url('/assets/patterns/shadow-checkers.png');

			.inner {
				transform-origin: 50%;
				margin: auto;
			}
		}
	}
</style>
