<script lang="ts">
	import Cropper from 'svelte-easy-crop';
	import getCroppedImg, { addFrame, createImage, FRAMES } from '../utils/crop';
	import Button from '../components/Button.svelte';
	import InputFile from '../components/InputFile.svelte';
	import LoadingSrc from '$lib/assets/loading.svg';
	import { Branch } from '$lib/constants/branch';
	import PreviewSrc from '$lib/assets/preview.png';
	import { onMount } from 'svelte';
	import { removeBackground } from '@imgly/background-removal';
	import reuploadSrc from '$lib/assets/reupload.svg';

	let image = '';
	let croppedImage: string | null = null;
	let croppedImageWithFrame: string | null = null;
	let crop = { x: 0, y: 0 };
	let zoom = 1;
	let files: FileList;
	let pixelCrop = { x: 0, y: 0, width: 0, height: 0 };
	let branch: Branch = Branch.PROGRAMMING;
	let showFrameOverlay = true;
	let removeBg = false;
	let removeBGStatus = false;
	let enableRemoveBg = false;
	let uploaded = false;
	let processedImage: string;
	let processedImageWithBg = '';
	let processedImageNoBg = '';
	let fileInputRef: HTMLInputElement;

	function onFileSelected() {
		if (files && files[0]) {
			image = '';
			const reader = new FileReader();
			reader.readAsDataURL(files[0]);
			reader.onload = () => {
				image = reader.result as string;
			};
			croppedImage = null;
			croppedImageWithFrame = null;
			removeBGStatus = false;
			uploaded = true;
			processedImageWithBg = '';
			processedImageNoBg = '';
		}
	}

	async function previewCrop(e: CustomEvent) {
		pixelCrop = e.detail.pixels;
	}

	async function handleRemoveBackground() {
		if (!uploaded || !enableRemoveBg) return;
		if (removeBg) {
			if (processedImageNoBg) {
				processedImage = processedImageNoBg;
			} else {
				removeBGStatus = true;
				const blob = await fetch(image).then((res) => res.blob());
				const result = await removeBackground(blob);
				if (result instanceof Blob) {
					processedImageNoBg = URL.createObjectURL(result);
					processedImage = processedImageNoBg;
					removeBGStatus = false;
				}
			}
		} else {
			processedImageWithBg = processedImageWithBg || image;
			processedImage = processedImageWithBg;
		}

		const newImage = await getCroppedImg(processedImage, pixelCrop);
		if (newImage) {
			croppedImage = newImage;
			croppedImageWithFrame = await frameImage(croppedImage, branch);
		}
	}

	async function cropImage(
		image: string,
		pixelCrop: { x: number; y: number; width: number; height: number }
	) {
		let processedImage = image;
		const newImage = await getCroppedImg(processedImage, pixelCrop);
		if (newImage) {
			croppedImage = newImage;
			croppedImageWithFrame = await frameImage(croppedImage, branch);
		}
		handleRemoveBackground();
	}

	async function frameImage(image: string, branch: Branch) {
		if (typeof window !== 'undefined' && image && branch) {
			const newImage = await addFrame(image, branch);
			return newImage;
		}
		return null;
	}

	async function changeBranch() {
		if (croppedImage) {
			croppedImageWithFrame = await frameImage(croppedImage, branch);
		}
	}

	function recropImage() {
		croppedImage = null;
		croppedImageWithFrame = null;
	}

	function triggerFileInput() {
		fileInputRef?.click();
	}

	onMount(async () => {
		const previewImage = await createImage(PreviewSrc);
		const size = 1458;
		await cropImage(PreviewSrc, {
			x: (previewImage.width - size) / 2,
			y: (previewImage.height - size) / 2,
			width: size,
			height: size
		});
		image = PreviewSrc;
	});
</script>

<main class="flex flex-col items-center justify-center w-full h-full gap-4 p-4 mt-2">
	<div class="h-[6vh]" />

	<div class="flex flex-col gap-3 items-center">
		{#if croppedImageWithFrame}
			<div
				class="relative img-container w-auto aspect-square max-h-[360px]"
				on:click={triggerFileInput}
			>
				<img
					src={croppedImageWithFrame}
					alt="Cropped profile"
					width="400"
					height="400"
					class="rounded-full aspect-square w-auto max-h-[360px] shadow-glow-gold"
				/>

				<div
					class="hover-overlay text-center text-ink text-lg font-semibold flex flex-col"
				>
					<img src={reuploadSrc} alt="reupload" class="h-12 w-auto text-white [filter:invert(1)]" />
					Upload Image
				</div>
			</div>
			{#if enableRemoveBg}
				<label class="flex w-full items-center gap-3 cursor-pointer select-none">
					<div class="flex flex-col gap-2">
						<span class="label uppercase text-gold-solid">Remove Background</span>
						<div class="flex items-center justify-between gap-2 w-full">
							<div class="relative">
								<input
									type="checkbox"
									bind:checked={removeBg}
									on:change={handleRemoveBackground}
									class="sr-only peer"
								/>
								<div
									class="w-14 h-8 rounded-sm bg-surface-raised border border-ink-muted peer-checked:bg-accent peer-checked:border-accent peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus transition-colors duration-300"
								/>
								<div
									class="absolute left-1 top-1 w-6 h-6 rounded-xs bg-ink peer-checked:bg-on-accent transition-transform duration-300 peer-checked:translate-x-5"
								/>
							</div>
							{#if removeBGStatus}
								<img src={LoadingSrc} alt="Loading" class="h-12 [filter:invert(1)] animate-spin" />
							{/if}
						</div>
					</div>
				</label>
			{/if}
			<div class="flex w-full flex-col gap-2">
				<div class="flex gap-2 flex-col w-full">
					<label for="template" class="label uppercase text-gold-solid">Template</label>
					<select
						id="template"
						bind:value={branch}
						on:change={changeBranch}
						class="w-full min-h-[44px] px-4 rounded-sm bg-surface-raised text-ink-body border border-ink-muted"
					>
						<option value="PG">Web Programming</option>
						<option value="CT">Web Content</option>
						<option value="MK">Web Marketing</option>
						<option value="DS">Web Design</option>
					</select>
				</div>

				<div class="flex gap-2 flex-col w-full">
					<!-- Hidden input used for reupload -->
					<input
						id="file"
						type="file"
						accept="image/*"
						bind:files
						bind:this={fileInputRef}
						on:change={onFileSelected}
						class="hidden"
					/>
				</div>

				<div class="flex w-full justify-between gap-3">
					<a
						href={croppedImageWithFrame}
						download="profile.png"
						class="inline-flex items-center justify-center flex-1 min-h-[44px] px-6 rounded-sm bg-accent text-on-accent font-semibold transition-colors hover:bg-gold-highlight hover:shadow-glow-gold"
						>Download</a
					>

					<Button variant="outlined" class="flex-1" on:click={recropImage}>Recrop-Image</Button>
				</div>
			</div>
		{:else}
			<img src={LoadingSrc} alt="Loading" class="h-12 animate-spin [filter:invert(1)]" />
		{/if}
	</div>

	{#if image && !croppedImage}
		<div class="flex flex-col items-center gap-4 w-full max-w-[400px]">
			<div class="relative w-full aspect-square overflow-hidden rounded-xs bg-surface-deep">
				<Cropper {image} bind:crop bind:zoom on:cropcomplete={previewCrop} aspect={1} />
				{#if showFrameOverlay}
					<img
						src={FRAMES[branch]}
						alt=""
						class="absolute inset-0 w-full h-full pointer-events-none select-none"
					/>
				{/if}
			</div>
			<label class="flex w-full items-center gap-3 cursor-pointer select-none">
				<input type="checkbox" bind:checked={showFrameOverlay} class="w-5 h-5 [accent-color:var(--accent)]" />
				<span class="text-ink-body">Show frame overlay</span>
			</label>
			<label class="flex w-full items-center gap-3">
				<span class="label uppercase text-gold-solid">Zoom</span>
				<input
					type="range"
					min="1"
					max="3"
					step="0.01"
					bind:value={zoom}
					aria-label="Zoom"
					class="flex-1 [accent-color:var(--accent)]"
				/>
			</label>
			<Button on:click={() => cropImage(image, pixelCrop)}>Crop image</Button>
		</div>
	{/if}
</main>

<style>
	.hover-overlay {
		position: absolute;
		inset: 0;
		background-color: rgba(15, 25, 34, 0.55);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s ease;
		border-radius: 9999px;
	}

	.img-container:hover .hover-overlay {
		opacity: 1;
		cursor: pointer;
	}
</style>
