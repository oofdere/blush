<script lang="ts">
	import type {
		AppBskyEmbedImages,
		AppBskyFeedGetPostThread
	} from '@atcute/client/lexicons';
	import { type XRPCResponse } from '@atcute/client';

	const {
		skeleton,
		thread
	}: {
		skeleton: AppBskyEmbedImages.Main;
		thread: Promise<XRPCResponse<AppBskyFeedGetPostThread.Output>>;
	} = $props();
</script>

{#key skeleton}
	<svelte:boundary>
		{#snippet failed()}
			images failed to load
		{/snippet}
		<div
			class="images horizontal flex w-full snap-x snap-mandatory overflow-y-clip overflow-x-scroll"
			style="aspect-ratio: {skeleton.images[0].aspectRatio?.width}/{skeleton.images[0].aspectRatio
				?.height}"
		>
			{#each skeleton.images as image: AppBskyEmbedImages.ViewImage, key}
				<div
					class="pointer-events-none relative flex h-full w-full touch-manipulation snap-start items-center bg-black"
					style="aspect-ratio: {image.aspectRatio?.width}/{image.aspectRatio?.height}"
				>
					{#await thread then { data }} 
							<img
								class="h-full w-full"
								width={image.aspectRatio?.width}
								height={image.aspectRatio?.height}
								src={(data.thread as any).post.embed.images[key].thumb}
								alt={image.alt}
							/>
					{/await}

					{#if skeleton.images.length > 1}
						<progress
							value={key + 1}
							max={skeleton.images.length}
							class="absolute top-0 h-1 w-full text-cyan-500"
						></progress>
					{/if}
				</div>
			{/each}
		</div>
	</svelte:boundary>
{/key}