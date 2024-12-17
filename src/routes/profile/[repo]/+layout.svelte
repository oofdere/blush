<script lang="ts">
    const { children } = $props()
    import { page } from "$app/state";
</script>

<svelte:head>
    <title>{page.data.meta.title || "dere.social"}</title>
    {#if page.data.meta.description}
        <meta name="description" content={page.data.meta.description}>
    {/if}
</svelte:head>

<div class="text-white bg-cyan-800">
    {@render children()}
</div>