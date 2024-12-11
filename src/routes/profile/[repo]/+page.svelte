<script lang="ts">
	import type { AppBskyEmbedImages, AppBskyFeedPost, Brand } from '@atcute/client/lexicons';
	import type { PageData } from './$types';
	import LucideRefreshCw from '~icons/lucide/refresh-cw';
	import LucidePin from '~icons/lucide/pin';
	import LucideHeart from '~icons/lucide/heart';
	import LucideMessageSquare from '~icons/lucide/message-square';
	import { onMount, type Component, type Snippet } from 'svelte';
	import { rpc } from '$lib/atcute.svelte';
	import Post from '$lib/components/Post.svelte';
	 const a: AppBskyEmbedImages.View = {}

	type record = AppBskyFeedPost.Record;

	let { data }: { data: PageData } = $props();
</script>

<div class="min-h-screen w-screen flex-col overflow-clip bg-cyan-800 text-white">
	<div class="bg-slate-800">
		<div class="header h-48 bg-cover text-white" style:--bg-url={`url('${data.profile.banner}')`}>
			<div class="flex items-center gap-3 p-6 pb-10 pt-16">
				<img src={data.profile.avatar} class="avatar w-20 rounded-xl" alt="avatar" />
				<div class="-gap-2 text-shadow flex flex-col">
					<span class="text-2xl font-semibold">{data.profile.displayName}</span>
					<span class="text-gray-400">@{data.profile.handle}</span>
					<span>{(new Date(data.profile.createdAt!)).toDateString()}</span>
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
			{data.profile.description}
		</p>

		{#await data.pinned then pinned}
		{#if pinned.data.feed[0].reason?.$type === 'app.bsky.feed.defs#reasonPin'}
			<Post post={pinned.data.feed[0]} profile={data.profile} showAuthor={false} />
			<div class="pb-6 flex"></div>
		{/if}
		{/await}
	</div>

	<div class="flex flex-col gap-2 border-slate-400 border-opacity-45 inse bg-cyan-950 px-6 py-4 ">
		<div class="flex flex-col gap-4">
			{#await data.feed then res}
				{@const feed = res.data.feed}
				{#each feed as post}
					<Post {post} profile={data.profile} showAuthor={data.profile.did !== post.post.author.did} />
				{/each}
			{/await}
		</div>
	</div>
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
