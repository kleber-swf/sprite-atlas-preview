<script lang="ts">
	export let value: boolean;
</script>

<input type="checkbox" disabled selected={value} />

<style lang="scss" scoped>
	input {
		margin-left: 26px;
	}
</style>
