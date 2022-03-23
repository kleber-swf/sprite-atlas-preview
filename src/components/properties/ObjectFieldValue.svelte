<script lang="ts">
	export let value: any;
</script>

<div class="field-value">
	{#each Object.keys(value) as key}
		<div class="field">
			<div class="key"><span>{key}</span></div>
			<div class="value">{value[key]}</div>
		</div>
	{/each}
</div>

<style lang="scss" scoped>
	@import 'variables.scss';

	.field-value {
		display: flex;
		flex-direction: column;
		.field {
			display: flex;
			margin-bottom: 6px;
			.key {
				margin-right: 10px;
				width: 16px;
				span {
					vertical-align: middle;
				}
			}
			.value {
				flex: 1;
				border: 1px solid rgba($text-color, 0.3);
				background-color: rgba($text-color, 0.1);
				padding: 4px;
			}
		}
	}
</style>
