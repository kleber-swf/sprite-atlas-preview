<script lang="ts">
	import type { FrameModel } from '../../model/model';

	export let imgSrc: string;
	export let selection: FrameModel;
</script>

<div class="preview">
	<div class="test">xxx</div>
</div>

<style lang="scss" scoped>
	@import 'variables.scss';
	.preview {
		background-color: $dark-background;
		// background-image: url('/assets/patterns/checkers.png');
		background-image: url('/assets/patterns/shadow-checkers.png');
		height: 100%;
		overflow: auto;
	}
	.test {
		width: 2000px;
		height: 300px;
		background-color: cornflowerblue;
	}
</style>
