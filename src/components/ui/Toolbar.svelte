<script lang="ts">
	import { FileUploader } from 'controller/file.uploader';
	import { VERSION } from 'data';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let atlasName = '';

	function onFileUploaded(ev: Event) {
		FileUploader.upload((ev.target as HTMLInputElement).files)
			.then((result) => {
				atlasName = result.name;
				dispatch('files-uploaded', result);
			})
			.catch(console.error);
	}
</script>

<div class="toolbar">
	<div class="menu">
		<label class="custom-file-upload">
			<input id="file-input" type="file" name="file" accept=".json,.png,.jpg,.webp,.gif" multiple on:change={onFileUploaded} />
			Open Atlas Files
		</label>
	</div>
	<div class="atlas-name">{atlasName}</div>
	<a href="https://github.com/kleber-swf/sprite-atlas-preview" target="_blank" rel="noopener noreferrer">
		<span class="version">version {VERSION}</span>
		<i class="icon-github" /></a
	>
</div>

<style lang="scss">
	@import 'variables.scss';

	div.toolbar {
		background-color: #333;
		color: #ddd;
		margin-bottom: 4px;
		display: flex;
		align-items: center;
		justify-content: stretch;

		.menu {
			width: $left-panel-width;
			& > * {
				padding: 4px 8px;
				font-size: 10px;
				font-weight: bold;
				text-transform: uppercase;
				user-select: none;
				cursor: pointer;

				&:hover {
					background-color: #444;
				}

				& input[type='file'] {
					display: none;
				}
			}
		}

		.atlas-name {
			text-align: center;
			flex: 1;
		}

		a {
			color: white;
			opacity: 0.5;
			text-decoration: none;
			margin: 4px 8px;

			&:hover {
				opacity: 1;
			}

			.version {
				font-size: 80%;
				font-style: italic;
			}
		}
	}
</style>
