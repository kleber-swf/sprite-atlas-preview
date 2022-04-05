<script lang="ts">
	//
</script>

<div class="nine-slice-edit">
	<div class="handle left">&nbsp;</div>
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
			&.left {
				left: 0px;
				margin-left: -4px;
				width: 6px;
				background-color: red;
				top: 0;
				bottom: 0;
				&::after {
					content: '';
					position: absolute;
					margin-left: -2px;
					border-left: 2px solid green;
					top: -10000px;
					height: 20000px;
				}
			}
		}
	}
</style>
