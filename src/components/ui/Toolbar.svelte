<script lang="ts">
	import { VERSION } from 'data';
	import { createEventDispatcher } from 'svelte';

	const SUPPORTED_IMAGES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
	const dispatch = createEventDispatcher();
	let atlasName = '';

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

		if (!SUPPORTED_IMAGES.includes(image.type) || atlas.type !== 'application/json') {
			throw new Error('Expected .png/.jpg and .json files.');
		}

		atlas
			.text()
			.then((content) => {
				atlasName = atlas.name.substring(0, atlas.name.lastIndexOf('.'));
				dispatch('files-uploaded', {
					atlas: JSON.parse(content),
					imageUrl: URL.createObjectURL(image),
				});
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
