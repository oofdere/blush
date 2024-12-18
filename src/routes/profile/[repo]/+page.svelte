<script lang="ts">
	import type { PageData } from './$types';
	import Post from '$lib/components/Post.svelte';
	import { tokenize } from '@atcute/bluesky-richtext-parser';
	import { rpc } from '$lib/atcute.svelte';
	import { page } from '$app/state';
	import type { AppBskyFeedDefs } from "@atcute/client/lexicons";
	import { beforeNavigate } from '$app/navigation';
	
		let { data }: { data: PageData } = $props();

	let feed = $derived(data.feed.data)

	let addons: AppBskyFeedDefs.FeedViewPost[][] = $state([]) 
	$inspect(addons)

	let textsegments = $derived(tokenize(data.profile.description!) || [])

	function loadMore() {
		rpc.get('app.bsky.feed.getAuthorFeed', {params: { actor: page.params.repo, includePins: false, filter: 'posts_no_replies', cursor: feed.cursor }}).then((x) => { 
			console.log(x)
			feed.cursor = x.data.cursor
			addons.push(x.data.feed)
		})
	}

	beforeNavigate(() => {
		addons = [];
	})

	
</script>

<div class="min-h-screen md:h-screen w-screen bg-cyan-800 text-white md:flex">
	<div class="h-full w-full overflow-y-scroll">
		<div class="bg-slate-800 top-0 z-10">
		<div class="header h-48 bg-cover text-white" style:aspect-ratio="818/272" style:--bg-url={`url('${data.profile.banner}')`}>
			<div class="flex items-center gap-3 p-6 pb-10 pt-16">
				<img src={data.profile.avatar} class="avatar w-20 rounded-xl" alt="avatar" />
				<div class="-gap-2 text-shadow flex flex-col">
					<span class="text-2xl font-semibold">{data.profile.displayName}</span>
					<span class="text-gray-400">@{data.profile.handle}</span>
				</div>
			</div>
		</div>
	</div>

	<div
		class="-py-5 button mx-6 flex h-10 w-fit -translate-y-5 transform-gpu gap-2 rounded-xl bg-cyan-800 p-2 text-white"
	>
		<span class="">
			📤 {data.profile.followersCount}
		</span>
		<span class="">
			📥 {data.profile.followsCount}
		</span>
		<span class="">
			📝 {data.profile.postsCount}
		</span>
	</div>

	<div class="-mt-5 whitespace-pre-line px-6 pb-2">
		<p class="pb-2">
			{#each textsegments as f}
				{#if f.type === 'link' || f.type === 'autolink'}
					<a class="text-green-400" href={f.url}>{f.raw}</a>
				{:else if f.type === 'mention'}
					<a class="text-green-400" href="/profile/{f.handle}">@{f.handle}</a>
				{:else if f.type === 'topic'}
					<a class="text-green-400" href="#hello">#{f.name}</a>
				{:else}
					{f.raw}
				{/if}
			{/each}
		</p>


		{#if data.pinned.data.feed[0].reason?.$type === 'app.bsky.feed.defs#reasonPin'}
			<Post post={data.pinned.data.feed[0]} profile={data.profile} showAuthor={false} />
			<div class="pb-6 flex"></div>
		{/if}
	</div>
</div>
{#key page.url.pathname}
	<div class="w-full h-full overflow-y-scroll flex flex-col gap-2 border-slate-400 border-opacity-45 inse bg-cyan-950 px-6 py-4 ">
		<div class="flex flex-col gap-4">
				
				{#each feed.feed as post (post.reason?.$type + post.post.cid)}
					<Post {post} profile={data.profile} showAuthor={data.profile.did !== post.post.author.did} />
				{/each}

				{#each addons as page}
					{#each page as post (post.reason?.$type + post.post.cid)}
						<Post {post} profile={data.profile} showAuthor={data.profile.did !== post.post.author.did} />
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

</div>

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
