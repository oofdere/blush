<script lang="ts">
	import { resolveHandle } from "$lib/plc-directory";
	import { CredentialManager, XRPC } from "@atcute/client";
    import type { AppBskyEmbedVideo, AppBskyFeedGetPostThread } from "@atcute/client/lexicons";
    import { onMount } from "svelte";

    const { thread }: { thread: AppBskyFeedGetPostThread.Output } = $props();
    const embed: AppBskyEmbedVideo.View = $derived((thread.thread as any).post.embed)
    let video: HTMLVideoElement | undefined = $state();
    let error: string | undefined = $state();
    const hls = video?.canPlayType('application/vnd.apple.mpegurl');

    onMount(() => {
        if (!video) return;

        if (hls) {
            video.src = embed.playlist;
        } else {
            const did = (thread.thread.post.author.did as `did:${string}`)
            resolveHandle(did).then((pds) => {
                video!.src = `${pds}/xrpc/com.atproto.sync.getBlob?did=${did}&cid=${embed.cid}`
            })
        }
    });
</script>

<div class="flex w-full" style="aspect-ratio: {embed.aspectRatio?.width}/{embed.aspectRatio?.height}">
    {#if error}
        <div class="w-full h-full flex items-center justify-center bg-black text-white">
            <p>Error: {error}</p>
        </div>
    {:else}
        <video 
	    type={hls ? 'application/vnd.apple.mpegurl' : 'video/mp4'}
            bind:this={video} 
            controls 
            poster={embed.thumbnail}
            class="w-full h-full"
        >
            <track kind="captions">
        </video>
    {/if}
</div>
