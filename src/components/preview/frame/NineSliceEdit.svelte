<script lang="ts">
	import type { NineSliceModel } from 'model/app.model';
	import { createEventDispatcher } from 'svelte';

	export let scale = 1;
	export let model: NineSliceModel;
	const dispatch = createEventDispatcher();
	let _prop: number;

	let handlers: Record<keyof NineSliceModel, (e: MouseEvent) => void> = {
		top: (e) => (model.top = Math.round((_prop += e.movementY / scale))),
		left: (e) => (model.left = Math.round((_prop += e.movementX / scale))),
		bottom: (e) => (model.bottom = Math.round((_prop -= e.movementY / scale))),
		right: (e) => (model.right = Math.round((_prop -= e.movementX / scale))),
	};

	let handler: (e: MouseEvent) => void;

	function startDrag(e: MouseEvent) {
		const key = (e.target as HTMLElement).getAttribute('data');
		handler = handlers[key];
		_prop = model[key];
		document.addEventListener('mousemove', dragHandle);
		document.addEventListener('mouseup', stopDrag);
	}

	function dragHandle(e: MouseEvent) {
		handler(e);
		dispatch('update', model);
	}

	function stopDrag() {
		document.removeEventListener('mousemove', dragHandle);
		document.removeEventListener('mouseup', stopDrag);
		handler = null;
	}
</script>

<div class="nine-slice-edit">
	<div class="handle left" data="left" style="left:{model.left}px" on:mousedown={startDrag}>&nbsp;</div>
	<div class="handle right" data="right" style="right:{model.right}px" on:mousedown={startDrag}>&nbsp;</div>
	<div class="handle top" data="top" style="top:{model.top}px" on:mousedown={startDrag}>&nbsp;</div>
	<div class="handle bottom" data="bottom" style="bottom:{model.bottom}px" on:mousedown={startDrag}>&nbsp;</div>
</div>

<style lang="scss">
	@import 'variables.scss';

	$handle-width: 6px;
	$handle-ext-width: 2px;
	$handle-margin: $handle-width - $handle-ext-width;
	$handle-ext-border: $handle-ext-width dashed #888;

	.nine-slice-edit {
		position: relative;
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
		border: 1px solid rgba(white, 0.4);

		.handle {
			position: absolute;
			background-color: transparent;
			opacity: 0.5;
			transition: opacity 250ms;

			&::after {
				content: '';
				box-shadow: $shadow-level-1;
				user-select: none;
				pointer-events: none;
				position: absolute;
			}

			&:hover {
				opacity: 1;
			}

			&.left,
			&.right {
				width: $handle-width;
				top: 0;
				bottom: 0;
				cursor: ew-resize;
				top: -10000px;
				height: 20000px;
				&::after {
					height: 100%;
					border-left: $handle-ext-border;
					margin-left: -$handle-ext-width;
				}
			}

			&.left {
				margin-left: -$handle-margin;
			}

			&.right {
				margin-right: -$handle-margin;
			}

			&.top,
			&.bottom {
				height: $handle-width;
				left: 0;
				right: 0;
				cursor: ns-resize;
				left: -10000px;
				width: 20000px;
				&::after {
					width: 100%;
					border-bottom: $handle-ext-border;
					margin-top: $handle-ext-width;
				}
			}

			&.top {
				margin-top: -$handle-margin;
			}

			&.bottom {
				margin-bottom: -$handle-margin;
			}
		}
	}
</style>
