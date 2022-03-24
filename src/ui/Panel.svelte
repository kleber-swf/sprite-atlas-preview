<script lang="ts">
	export let title: string;
</script>

<div class="panel">
	<div class="title">{title}</div>
	<div class="content">
		<slot />
	</div>
</div>

<style lang="scss" scoped>
	@import 'variables.scss';

	.panel {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		.title {
			background-color: $dark-background;
			padding: 4px 8px;
		}

		.content {
			padding: 4px 8px;
			height: 100%;
			overflow: auto;
			flex: 1;
		}
	}
</style>
