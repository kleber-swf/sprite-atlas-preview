<script lang="ts">
	interface Props {
		top: number;
		left: number;
		bottom: number;
		right: number;
	}

	let handlers: Record<keyof Props, (e: MouseEvent) => void> = {
		top: (e) => (props.top += e.movementY),
		left: (e) => (props.left += e.movementX),
		bottom: (e) => (props.bottom -= e.movementY),
		right: (e) => (props.right -= e.movementX),
	};

	let props: Props = { top: 0, left: 0, bottom: 0, right: 0 };
	let handler: (e: MouseEvent) => void;

	function startDrag(e: MouseEvent) {
		handler = handlers[(e.target as HTMLElement).getAttribute('data')];
		document.addEventListener('mousemove', dragHandle);
		document.addEventListener('mouseup', stopDrag);
	}

	function dragHandle(e: MouseEvent) {
		handler(e);
	}

	function stopDrag() {
		document.removeEventListener('mousemove', dragHandle);
		document.removeEventListener('mouseup', stopDrag);
		handler = null;
	}
</script>

<div class="nine-slice-edit">
	<div class="handle left" data="left" style="left:{props.left}px" on:mousedown={startDrag}>&nbsp;</div>
	<div class="handle right" data="right" style="right:{props.right}px" on:mousedown={startDrag}>&nbsp;</div>
	<div class="handle top" data="top" style="top:{props.top}px" on:mousedown={startDrag}>&nbsp;</div>
	<div class="handle bottom" data="bottom" style="bottom:{props.bottom}px" on:mousedown={startDrag}>&nbsp;</div>
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
