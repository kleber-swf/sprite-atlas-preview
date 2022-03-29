<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function onFileUploaded(ev: Event) {
		const e = (ev.target as HTMLInputElement).files;
		if (e.length !== 2) throw new Error('You need two files: a .png and a .json');
		const files = [e.item(0), e.item(1)];

		let atlas: File;
		let image: File;
		if (files[0].type === 'application/json') {
			atlas = files[0];
			image = files[1];
		} else {
			atlas = files[1];
			image = files[0];
		}

		if (!(image.type === 'image/png' && atlas.type === 'application/json')) {
			throw new Error('Expected .png .json files.');
		}

		atlas
			.text()
			.then((content) => {
				dispatch('files-uploaded', {
					atlas: JSON.parse(content),
					imageUrl: URL.createObjectURL(image),
				});
			})
			.catch(console.error);
	}
</script>

<div class="toolbar">
	<label class="custom-file-upload">
		<input id="file-input" type="file" name="file" accept=".json,.png" multiple on:change={onFileUploaded} />
		Open Atlas Files
	</label>
</div>

<style lang="scss">
	div.toolbar {
		background-color: #111;
		margin-bottom: 4px;
		display: flex;

		& > * {
			padding: 8px;
			font-size: 10px;
			color: #ddd;
			font-weight: bold;
			text-transform: uppercase;
			user-select: none;
			cursor: pointer;
		}

		& > *:hover {
			background-color: #333;
		}

		& input[type='file'] {
			display: none;
		}
	}
</style>
