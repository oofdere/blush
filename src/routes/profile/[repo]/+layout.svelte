<script lang="ts">
    const { children } = $props()
    import { page } from "$app/state";
	import type { Meta } from "$lib";

    
</script>

<svelte:head>
    {#if true}
        {@const meta: Meta = page.data.meta}
        <title>{meta.title || "dere.social"}</title>
        <meta property="og:title" content={meta.title || "dere.social"}>
        
        {#if meta.description}
            <meta name="description" content={page.data.meta.description}>
            <meta property="og:description" content={page.data.meta.description}>
        {/if}

        {#if meta.url}
            <meta property="og:url" content="https://www.imdb.com/title/tt0117500/" />
        {/if}

        {#if meta.image}
            {#each meta.image as image}
                <meta property="og:image" content={image.src} />
            {/each}
        {/if}

        {#if meta.type}
            <meta property="og:type" content="{meta.type}">
        {/if}

        {#if meta.article}
            {#if meta.video}
                <meta property="og:type" content="video.other">
                <meta property="twitter:card" content="player"/>
            {:else}
                <meta property="og:type" content="article">
                <meta property="twitter:card" content="summary_large_image" />  
            {/if}
            <meta property="article:published_time" content={meta.article.published_time}>
        {/if}

        {#if meta.profile}
            {#if !meta.article}
            <meta property="og:type" content="profile">
            {/if}
            <meta property="profile:first_name" content={meta.profile.first_name}>
            <meta property="profile:first_name" content={meta.profile.username}>
        {/if}

        {#if meta.video}
            <meta property="twitter:player:height" content="{meta.video.height}"/>
            <meta property="twitter:player:width" content="{meta.video.width}"/>
            <meta property="og:video:height" content="{meta.video.height}"/>
            <meta property="og:video:width" content="{meta.video.width}"/>

            <meta property="twitter:player:stream" content="{meta.video.src}"/>
            <meta property="og:video" content="{meta.video.src}"/>
            <meta property="og:video:secure_url" content="{meta.video.src}"/>

            <meta property="twitter:player:stream:content_type" content="video/mp4"/>
            <meta property="og:video:type" content="video/mp4"/>
        {/if}

        <meta property="og:site_name" content="dere.social">
        <meta property="theme-color" content="#155E75">
    {/if}
</svelte:head>

<div class="text-white bg-cyan-800">
    {@render children()}
</div>
