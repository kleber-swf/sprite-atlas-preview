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
	.nine-slice-edit {
		position: relative;
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
		border: 2px solid #fff;

		.handle {
			position: absolute;
			opacity: 0.5;
			background-color: red;
			&::after {
				content: '';
				user-select: none;
				pointer-events: none;
				position: absolute;
			}

			&.left,
			&.right {
				width: 6px;
				top: 0;
				bottom: 0;
				&::after {
					border-left: 2px solid green;
					top: -10000px;
					height: 20000px;
					margin-left: -2px;
				}
			}

			&.left {
				margin-left: -4px;
			}

			&.right {
				margin-right: -4px;
			}

			&.top,
			&.bottom {
				height: 6px;
				left: 0;
				right: 0;
				&::after {
					border-bottom: 2px solid green;
					left: -10000px;
					width: 20000px;
					margin-top: 2px;
				}
			}

			&.top {
				margin-top: -4px;
			}

			&.bottom {
				margin-bottom: -4px;
			}
		}
	}
</style>
