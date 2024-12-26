<script lang="ts">
	import { resolveHandle } from '$lib/plc-directory';
	import type { AppBskyEmbedVideo, AppBskyFeedGetPostThread } from '@atcute/client/lexicons';
	import { onMount } from 'svelte';

	const { thread }: { thread: AppBskyFeedGetPostThread.Output } = $props();
	const embed: AppBskyEmbedVideo.View = $derived((thread.thread as any).post.embed);
	let video: HTMLVideoElement | undefined = $state();
	let error: string | undefined = $state();

	onMount(() => {
		if (!video) return;

		const hls = video?.canPlayType('application/vnd.apple.mpegurl');

		if (hls) {
			video.src = embed.playlist;
			// @ts-ignore idk why ts thinks type isn't an attribute
			video.type = 'application/vnd.apple.mpegurl';
		} else {
			// @ts-ignore but I think it is?
			video.type = 'video/mp4';
			const did = thread.thread.post.author.did as `did:${string}`;
			resolveHandle(did).then((pds) => {
				video!.src = `${pds}/xrpc/com.atproto.sync.getBlob?did=${did}&cid=${embed.cid}`;
			});
		}
	});
</script>

<div
	class="flex w-full"
	style="aspect-ratio: {embed.aspectRatio?.width}/{embed.aspectRatio?.height}"
>
	{#if error}
		<div class="flex h-full w-full items-center justify-center bg-black text-white">
			<p>Error: {error}</p>
		</div>
	{:else}
		<video bind:this={video} controls poster={embed.thumbnail} class="h-full w-full">
			<track kind="captions" />
		</video>
	{/if}
</div>
