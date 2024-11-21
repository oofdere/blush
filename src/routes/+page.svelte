<script lang="ts">
    import { agent } from "$lib/atproto";

    const feeds = agent.app.bsky.unspecced.getPopularFeedGenerators({
        limit: 10
    })
</script>

{#await feeds}
    loading...
{:then f}
    <ul>
        {#each f.data.feeds as feed}
            <li>
                <b>{feed.displayName}</b>
                {feed.likeCount} likes
            </li>
        {/each}
    </ul>
{/await}

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
