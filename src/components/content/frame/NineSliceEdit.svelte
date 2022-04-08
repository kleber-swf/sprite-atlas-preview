<script lang="ts">
	import type { NineSliceModel, Rect } from 'model/atlas.model';
	import { createEventDispatcher } from 'svelte';

	export let scale = 1;
	export let model: NineSliceModel;
	export let frame: Rect;
	export let selected = false;
	const dispatch = createEventDispatcher();

	let propId: string;
	let propValue: number;
	let handleScale: string;

	function handleDrag(value: number, max: number) {
		return Math.round(Math.max(0, Math.min(max, value)));
	}

	let handlers: Record<keyof NineSliceModel, (e: MouseEvent) => void> = {
		top: (e) => (model.top = handleDrag((propValue += e.movementY / scale), frame.h)),
		left: (e) => (model.left = handleDrag((propValue += e.movementX / scale), frame.w)),
		bottom: (e) => (model.bottom = handleDrag((propValue -= e.movementY / scale), frame.h)),
		right: (e) => (model.right = handleDrag((propValue -= e.movementX / scale), frame.w)),
	};

	let handlerFn: (e: MouseEvent) => void;

	function startHandleDrag(e: MouseEvent) {
		propId = (e.target as HTMLElement).getAttribute('data');
		handlerFn = handlers[propId];
		propValue = model[propId];
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

	function onKeyDown(e: KeyboardEvent) {
		if (!(propId && e.key.startsWith('Arrow'))) return;
		let direction = 0;
		let max = 0;
		switch (propId) {
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
			model[propId] = handleDrag(model[propId] + direction * (e.shiftKey ? 10 : 1), max);
			dispatch('update', model);
			e.preventDefault();
		}
	}

	$: {
		if (selected) {
			document.addEventListener('keydown', onKeyDown);
		} else {
			document.removeEventListener('keydown', onKeyDown);
		}
		handleScale = `transform:scale(${1 / scale})`;
	}
</script>

<div class="nine-slice-edit">
	<div class="handle left" data="left" style="left:{model.left}px; {handleScale}" on:mousedown={startHandleDrag} />
	<div class="handle right" data="right" style="right:{model.right}px; {handleScale}" on:mousedown={startHandleDrag} />
	<div class="handle top" data="top" style="top:{model.top}px; {handleScale}" on:mousedown={startHandleDrag} />
	<div class="handle bottom" data="bottom" style="bottom:{model.bottom}px; {handleScale}" on:mousedown={startHandleDrag} />
</div>

<style lang="scss">
	@import 'variables.scss';

	$handle-width: 12px;
	$handle-margin: $handle-width * 0.5;
	$handle-ext-border: 2px dashed #777;

	.nine-slice-edit {
		position: relative;
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
		border: 1px solid rgba(white, 0.2);

		.handle {
			position: absolute;
			background-color: transparent;
			opacity: 0.5;
			transition: opacity 250ms;

			&::after {
				content: '';
				user-select: none;
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
					left: $handle-margin;
					border-left: $handle-ext-border;
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
					border-top: $handle-ext-border;
					top: $handle-margin;
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
