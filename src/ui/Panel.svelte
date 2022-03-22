<script lang="ts">
	export let title: string;
</script>

<div class="panel">
	<div class="title">{title}</div>
</div>

<style lang="scss">
	@import 'variables.scss';

	.panel {
		box-shadow: 0px 0px 12px $shadow-color;
		z-index: 1000;
		width: 100%;
		.title {
			background-color: $dark-background;
			font-size: 10px;
			font-weight: bold;
			text-transform: uppercase;
			padding: 4px 8px;
		}
	}
</style>
