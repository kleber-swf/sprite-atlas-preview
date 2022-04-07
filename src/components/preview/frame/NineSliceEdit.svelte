<script lang="ts">
	import type { NineSliceModel, Rect } from 'model/atlas.model';
	import { createEventDispatcher } from 'svelte';

	export let scale = 1;
	export let model: NineSliceModel;
	export let frame: Rect;
	export let selected = false;
	const dispatch = createEventDispatcher();

	let _propId: string;
	let _propValue: number;

	function handle(value: number, max: number) {
		_propValue = Math.max(0, Math.min(max, _propValue + value));
		return Math.round(_propValue);
	}

	let handlers: Record<keyof NineSliceModel, (e: MouseEvent) => void> = {
		top: (e) => (model.top = handle(e.movementY / scale, frame.h)),
		left: (e) => (model.left = handle(e.movementX / scale, frame.w)),
		bottom: (e) => (model.bottom = handle(-e.movementY / scale, frame.h)),
		right: (e) => (model.right = handle(-e.movementX / scale, frame.w)),
	};

	let handlerFn: (e: MouseEvent) => void;

	function startHandleDrag(e: MouseEvent) {
		_propId = (e.target as HTMLElement).getAttribute('data');
		handlerFn = handlers[_propId];
		_propValue = model[_propId];
		document.addEventListener('mousemove', dragHandle);
		document.addEventListener('mouseup', stopHandleDrag);
	}

	function dragHandle(e: MouseEvent) {
		handlerFn(e);
		dispatch('update', model);
	}

	function stopHandleDrag() {
		document.removeEventListener('mousemove', dragHandle);
		document.removeEventListener('mouseup', stopHandleDrag);
		handlerFn = null;
	}

	// document.addEventListener('keydown', onKeyDown);

	$: {
		if (selected) {
			document.addEventListener('keydown', onKeyDown);
		} else {
			document.removeEventListener('keydown', onKeyDown);
		}
	}

	function onKeyDown(e: KeyboardEvent) {
		console.log(e.key, _propId);
		if (!(_propId && e.key.startsWith('Arrow'))) return;

		let direction = 0;
		let max = 0;
		switch (_propId) {
			case 'top':
				max = frame.h;
				if (e.key === 'ArrowUp') direction = -1;
				else if (e.key === 'ArrowDown') direction = 1;
				break;
			case 'bottom':
				max = frame.h;
				if (e.key === 'ArrowUp') direction = 1;
				else if (e.key === 'ArrowDown') direction = -1;
				break;
			case 'left':
				max = frame.w;
				if (e.key === 'ArrowLeft') direction = -1;
				else if (e.key === 'ArrowRight') direction = 1;
				break;
			case 'right':
				max = frame.w;
				if (e.key === 'ArrowLeft') direction = 1;
				else if (e.key === 'ArrowRight') direction = -1;
				break;
		}

		if (direction !== 0) {
			model[_propId] = handle(direction * (e.shiftKey ? 10 : 1), max);
			dispatch('update', model);
			e.preventDefault();
		}
	}
</script>

<div class="nine-slice-edit">
	<div class="handle left" data="left" style="left:{model.left}px" on:mousedown={startHandleDrag}>&nbsp;</div>
	<div class="handle right" data="right" style="right:{model.right}px" on:mousedown={startHandleDrag}>&nbsp;</div>
	<div class="handle top" data="top" style="top:{model.top}px" on:mousedown={startHandleDrag}>&nbsp;</div>
	<div class="handle bottom" data="bottom" style="bottom:{model.bottom}px" on:mousedown={startHandleDrag}>&nbsp;</div>
</div>

<style lang="scss">
	@import 'variables.scss';

	$handle-width: 6px;
	$handle-ext-width: 2px;
	$handle-margin: $handle-width - $handle-ext-width;
	$handle-ext-border: $handle-ext-width dashed #777;

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
				user-select: none;
				// pointer-events: none;
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
