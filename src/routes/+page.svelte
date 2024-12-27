<script lang="ts">
	import type { PageData } from './$types';
	import Post from '$lib/components/Post.svelte';
	import { atp } from '$lib/atcute';
	const { rpc } = atp();
	import { page } from '$app/state';
	import type { AppBskyFeedDefs } from '@atcute/client/lexicons';
	import { beforeNavigate } from '$app/navigation';

	let { data }: { data: PageData } = $props();

	let feed = $derived(data.feed?.data);

	let addons: AppBskyFeedDefs.FeedViewPost[][] = $state([]);
	$inspect(addons);

	function loadMore() {
		if (feed) {
			rpc.get('app.bsky.feed.getTimeline', { params: { cursor: feed.cursor } }).then((x) => {
				console.log(x);
				feed.cursor = x.data.cursor;
				addons.push(x.data.feed);
			});
		}
	}

	beforeNavigate(() => {
		addons = [];
	});

	$inspect(data);
</script>

{#if feed}
	{#key page.url.pathname}
		<div
			class="inse border-opacity-45 flex h-full w-full flex-col gap-2 overflow-y-scroll border-slate-400 bg-cyan-950 px-6 py-4"
		>
			<div class="flex flex-col gap-4">
				{#each feed.feed as post (JSON.stringify(post.reason) + post.post.cid)}
					<Post {post} showAuthor={true} />
				{/each}

				{#each addons as page}
					{#each page as post (JSON.stringify(post.reason) + post.post.cid)}
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
