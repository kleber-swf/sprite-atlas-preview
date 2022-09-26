<script lang="ts">
	import { FileUploader } from 'controllers/file.uploader';
	import { Content } from 'store/content';
	import { VERSION } from 'version';

	let atlasName = '';
	const accept = FileUploader.SUPPORTED_EXTENSIONS.join(',');

	function onFileUploaded(ev: Event) {
		FileUploader.upload((ev.target as HTMLInputElement).files)
			.then((result) => {
				atlasName = result.name;
				Content.setData(result.imageUrl, result.atlas);
			})
			.catch(console.error);
	}
</script>

<div class="toolbar">
	<div class="menu">
		<label class="button">
			<input id="file-input" type="file" name="file" {accept} multiple on:change={onFileUploaded} />
			<i class="icon-folder-open" /><span>Open</span>
		</label>
		<a href="https://github.com/kleber-swf/sprite-atlas-preview/blob/master/README.md" target="_blank" class="help-button"
			><i class="icon-help" /></a
		>
	</div>
	<div class="atlas-name">{atlasName}</div>
	<a href="https://github.com/kleber-swf/sprite-atlas-preview" target="_blank" rel="noopener noreferrer">
		<span class="version">version {VERSION}</span>
		<i class="icon-github-circled" /></a
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
			display: inline-flex;
			justify-content: space-between;
			align-items: stretch;
			position: relative;

			&::after {
				content: '';
				display: inline-block;
				position: absolute;
				right: 0;
				width: 1px;
				height: 20px;
				margin: 5px 0;
				background-color: lighten(#333, 6);
			}

			.button {
				padding: 4px 12px 4px 8px;
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

				i {
					padding: 0 4px;
					font-size: 12px;
				}
			}

			.help-button {
				opacity: 0.5;
				color: $on-primary;
				display: flex;

				&:hover {
					opacity: 1;
				}

				&:active {
					opacity: 0.5;
				}

				i {
					margin: auto;
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
