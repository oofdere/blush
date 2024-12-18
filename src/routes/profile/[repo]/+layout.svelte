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
            <meta property="og:image" content={meta.image.src} />
        {/if}

        {#if meta.type}
            <meta property="og:type" content={meta.type}>
        {/if}

        {#if meta.article}
            <meta property="og:type" content="article">
            <meta property="article:published_time" content={meta.article.published_time}>
            <meta property="twitter:card" content="summary_large_image" />            
        {/if}

        {#if meta.profile}
            {#if !meta.article}
            <meta property="og:type" content="profile">
            {/if}
            <meta property="profile:first_name" content={meta.profile.first_name}>
            <meta property="profile:first_name" content={meta.profile.username}>
        {/if}

        <meta property="og:site_name" content="dere.social">
    {/if}
</svelte:head>

<div class="text-white bg-cyan-800">
    {@render children()}
</div>