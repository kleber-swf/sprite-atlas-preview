<script lang="ts">
	import BooleanFieldValue from './BooleanFieldValue.svelte';
	import ObjectFieldValue from './ObjectFieldValue.svelte';

	export let title: string;
	export let value: any;
</script>

<div class="properties-field">
	<div class="title">{title}</div>
	<div class="value">
		{#if typeof value === 'boolean'}
			<BooleanFieldValue {value} />
		{:else}
			<ObjectFieldValue {value} />
		{/if}
	</div>
</div>

<style lang="scss" scoped>
	@import 'variables.scss';
	.properties-field {
		display: flex;
		margin-bottom: 20px;

		.title {
			flex: 0.5;
			margin-right: 20px;
			user-select: none;
			color: $text-color;
		}

		.value {
			flex: 0.5;
			margin-top: -4px;
		}
	}
</style>
