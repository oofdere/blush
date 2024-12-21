<script lang="ts">
	import type { AppBskyEmbedImages, AppBskyFeedDefs, AppBskyFeedGetPostThread } from "@atcute/client/lexicons";
	import { type XRPCResponse } from "@atcute/client";
	import { browser } from "$app/environment";
	import { onMount } from "svelte";

    const { skeleton, thread }: { skeleton: AppBskyEmbedImages.Main , thread: Promise<XRPCResponse<AppBskyFeedGetPostThread.Output>> } = $props();

	let resolved: AppBskyEmbedImages.View | undefined = $state(undefined);
	onMount(() => {
		thread.then(({data}) => {
			resolved = (data.thread as any).post.embed as AppBskyEmbedImages.View & {$type: 'app.bsky.embed.images#view'}
		})
	})

</script>
{#key skeleton}
	<svelte:boundary>
		{#snippet failed()}
			images failed to load
		{/snippet}
			<div
				class="images horizontal flex w-full snap-x snap-mandatory overflow-y-clip overflow-x-scroll"
				style="aspect-ratio: {skeleton.images[0].aspectRatio?.width}/{skeleton.images[0]
					.aspectRatio?.height}"
			>
				{#each skeleton.images as image: AppBskyEmbedImages.ViewImage, key}
					<div
						class="relative flex h-full w-full touch-manipulation snap-start items-center bg-black pointer-events-none"
						style="aspect-ratio: {image.aspectRatio?.width}/{image.aspectRatio?.height}"
					>
					{#if resolved}
						<img
							class="w-full h-full"
							width={image.aspectRatio?.width}
							height={image.aspectRatio?.height}
							src={resolved.images[key].thumb}
							alt={image.alt}
						/>
					{/if}
						
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