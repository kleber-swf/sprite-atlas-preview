<script lang="ts">
	import BooleanFieldValue from './BooleanFieldValue.svelte';
	import ObjectFieldValue from './ObjectFieldValue.svelte';
	import StringFieldValue from './StringFieldValue.svelte';

	export let title: string;
	export let value: any;
</script>

<div class="property-field">
	<div class="title">{title.replace(/([a-z])([A-Z])/g, '$1 $2')}</div>
	<div class="value">
		{#if typeof value === 'boolean'}
			<BooleanFieldValue {value} />
		{:else if typeof value === 'string'}
			<StringFieldValue {value} />
		{:else if typeof value === 'number'}
			<StringFieldValue value={value.toString()} />
		{:else}
			<ObjectFieldValue {value} />
		{/if}
	</div>
</div>

<style lang="scss">
	@import 'variables.scss';
	.property-field {
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
