<script lang="ts">
	import type { PageData } from './$types';
	import Post from '$lib/components/Post.svelte';
	import { tokenize } from '@atcute/bluesky-richtext-parser';
	import { atp } from '$lib/atcute';
	const { rpc } = atp();
	import { page } from '$app/state';
	import type { AppBskyFeedDefs } from '@atcute/client/lexicons';
	import { beforeNavigate } from '$app/navigation';

	let { data }: { data: PageData } = $props();

	let feed = $derived(data.feed.data);

	let addons: AppBskyFeedDefs.FeedViewPost[][] = $state([]);
	$inspect(addons);

	let textsegments = $derived(tokenize(data.profile.description!) || []);

	function loadMore() {
		rpc
			.get('app.bsky.feed.getAuthorFeed', {
				params: {
					actor: page.params.repo,
					includePins: false,
					filter: 'posts_no_replies',
					cursor: feed.cursor
				}
			})
			.then((x) => {
				console.log(x);
				feed.cursor = x.data.cursor;
				addons.push(x.data.feed);
			});
	}

	beforeNavigate(() => {
		addons = [];
	});

	$inspect(data);
</script>

<div class="min-h-screen w-screen bg-cyan-800 text-white md:flex md:h-screen">
	<div class="h-full overflow-y-scroll">
		<div class="top-0 z-10 bg-slate-800">
			<div
				class="header h-48 bg-cover text-white"
				style:aspect-ratio="818/272"
				style:--bg-url={data.profile.banner ? `url('${data.profile.banner}')` : ''}
			>
				<div class="flex items-center gap-3 p-6 pt-16 pb-10">
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

		<div class="-mt-5 px-6 pb-2 whitespace-pre-line">
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
				<div class="flex pb-6"></div>
			{/if}
		</div>
	</div>
	{#key page.url.pathname}
		<div
			class="inse border-opacity-45 flex h-full w-full flex-col gap-2 overflow-y-scroll border-slate-400 bg-cyan-950 px-6 py-4"
		>
			<div class="flex flex-col gap-4">
				{#each feed.feed as post (JSON.stringify(post.reason) + post.post.cid)}
					<Post
						{post}
						profile={data.profile}
						showAuthor={data.profile.did !== post.post.author.did}
					/>
				{/each}

				{#each addons as page}
					{#each page as post (JSON.stringify(post.reason) + post.post.cid)}
						<Post
							{post}
							profile={data.profile}
							showAuthor={data.profile.did !== post.post.author.did}
						/>
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
</style>
