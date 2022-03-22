<script lang="ts">
	import PreviewArea from './components/preview/PreviewArea.svelte';

	import Panel from './ui/Panel.svelte';
</script>

<main>
	<div class="container-fluid h-100 m-0 p-0">
		<div class="h-100 d-flex flex-row">
			<div class="left-container">
				<Panel title="Left panel" />
			</div>
			<div class="center-container">
				<PreviewArea />
			</div>
			<div class="right-container">
				<Panel title="Right panel" />
			</div>
		</div>
	</div>
	<div class="content" />
</main>

<style lang="scss">
	@import 'variables.scss';

	main {
		border: 0;
		padding: 0;
		margin: 0;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: stretch;

		.left-container,
		.right-container {
			width: 320px;
			display: flex;
			align-items: stretch;
		}

		.center-container {
			flex: 1;
			align-items: stretch;
		}
	}
</style>
