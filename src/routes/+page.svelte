<script lang="ts">
	import type { PageData } from './$types';
	import Post from '$lib/components/Post.svelte';
	import { tokenize } from '@atcute/bluesky-richtext-parser';
	import { atp } from '$lib/atcute';
	const { rpc, manager } = atp();
	import { page } from '$app/state';
	import type { AppBskyFeedDefs } from "@atcute/client/lexicons";
	import { beforeNavigate } from '$app/navigation';
	
		let { data }: { data: PageData } = $props();

	let feed = $derived(data.feed?.data)

	let addons: AppBskyFeedDefs.FeedViewPost[][] = $state([]) 
	$inspect(addons)

	function loadMore() {
		rpc.get('app.bsky.feed.getTimeline', {params: { cursor: feed.cursor }}).then((x) => { 
			console.log(x)
			feed.cursor = x.data.cursor
			addons.push(x.data.feed)
		})
	}

	beforeNavigate(() => {
		addons = [];
	})

	$inspect(data)
</script>

{#if feed}
{#key page.url.pathname}
	<div class="w-full h-full overflow-y-scroll flex flex-col gap-2 border-slate-400 border-opacity-45 inse bg-cyan-950 px-6 py-4 ">
		<div class="flex flex-col gap-4">
				
				{#each feed.feed as post (post.reason?.$type + post.post.cid)}
					<Post {post} showAuthor={true} />
				{/each}

				{#each addons as page}
					{#each page as post (post.reason?.$type + post.post.cid)}
						<Post {post} showAuthor={true} />
					{/each}
				{/each}

				{#if feed.cursor}
					<button onclick={loadMore}>Load more</button>
				{:else}
					you reached the end!!
				{/if}
		</div>
	</div>
	{/key}
{/if}


<style>
	.header {
		background: linear-gradient(
				180deg,
				rgba(28, 28, 28, 0) 0%,
				rgba(28, 28, 28, 0.13) 36.05%,
				#1c1c1c 98.49%
			),
			var(--bg-url);
		background-size: cover;
	}

	.text-shadow {
		filter: drop-shadow(1px 1px rgb(0 0 0 / 0.69));
	}

	.avatar {
		outline: 3px solid rgba(243, 243, 243, 0.304);
		outline-offset: -2.5px;
	}
</style>
