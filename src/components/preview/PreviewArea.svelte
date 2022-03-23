<script lang="ts">
	import type { FrameModel } from '../../model/model';

	export let imgSrc: string;
	export let selection: FrameModel;
</script>

<div class="preview h-100">
	<div class="test">xxx</div>
</div>

<style lang="scss" scoped>
	@import 'variables.scss';
	.preview {
		background-color: $dark-background;
		overflow: auto;
		display: block;
	}
	.test {
		height: 2000px;
		width: 300px;
		background-color: cornflowerblue;
	}
</style>
