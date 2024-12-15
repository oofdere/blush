<script lang="ts">
	import type { AppBskyEmbedVideo } from "@atcute/client/lexicons";

    import Hls from "hls.js";
	import { onMount } from "svelte";

    const { embed }: { embed: AppBskyEmbedVideo.View } = $props()

    let video: HTMLVideoElement;

    const hls = new Hls()

    onMount(() => {
        hls.loadSource(embed.playlist)
        hls.attachMedia(video)
    })
</script>

<div class="flex w-full" style="aspect-ratio: {embed.aspectRatio?.width}/{embed.aspectRatio?.height}">
    <video bind:this={video} controls poster={embed.thumbnail}>
        <track kind="captions">
    </video>
</div>