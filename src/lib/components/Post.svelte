<script lang="ts">
	import type {
		AppBskyActorDefs,
		AppBskyEmbedExternal,
		AppBskyEmbedImages,
		AppBskyEmbedVideo,
		AppBskyFeedDefs,
		AppBskyFeedGetPostThread,
		AppBskyFeedPost,
		Brand
	} from '@atcute/client/lexicons';
	import LucideRefreshCw from '~icons/lucide/refresh-cw';
	import LucidePin from '~icons/lucide/pin';
	import LucideHeart from '~icons/lucide/heart';
	import LucideMessageSquare from '~icons/lucide/message-square';
	import { onMount, type Component, type Snippet } from 'svelte';
	import { rpc } from '$lib/atcute.svelte';
	import Post from './Post.svelte';
	import type { XRPCResponse } from '@atcute/client';
	import { formatDistanceToNow } from "date-fns";
	import { segmentize } from "@atcute/bluesky-richtext-segmenter";

	const {
		post,
		profile,
		showAuthor
	}: {
		post: AppBskyFeedDefs.FeedViewPost | AppBskyFeedDefs.ThreadViewPost;
		profile: AppBskyActorDefs.ProfileViewDetailed;
		showAuthor: boolean;
	} = $props();

	//const angle = Math.floor(Math.random() * (1 - -1) + -1);
	const angle = 0;
	const record = post.post.record as AppBskyFeedPost.Record;

	const thread = rpc.get('app.bsky.feed.getPostThread', { params: { uri: post.post.uri } });

	const date = formatDistanceToNow(record.createdAt) + " ago"

	const textsegments = segmentize(record.text, record.facets)
</script>

<div style="transform:rotate({angle}deg)" class="text-white max-w-96">
	{#if 'reason' in post}
		{@const reason = post.reason!.$type}
		<div class="flex items-center justify-center gap-2 p-2 pt-0 opacity-60">
			{#if reason === 'app.bsky.feed.defs#reasonPin'}
				<LucidePin />
				<span>pinned post!</span>
			{:else if reason === 'app.bsky.feed.defs#reasonRepost'}
				<LucideRefreshCw class="animate-spina" />
				<span>reposted by</span> <img class="h-6" src={profile.avatar} alt="avatar" />
				<span>{profile.displayName}</span>
			{/if}
		</div>
	{/if}
	<a href="/profile/{post.post.author.did}/post/{post.post.uri.slice(-13)}">
		<div
			class=" rounded-lg border-2 border-slate-400 border-opacity-50 bg-cyan-950 shadow-md shadow-black"
		>
			{#if showAuthor}
				<a
					href="/profile/{post.post.author.did}"
					class="flex items-center gap-2 border-b-2 border-slate-400 border-opacity-50"
				>
					<img class="w-12" src={post.post.author.avatar} alt="avatar" />
					<div class="flex flex-col">
						<span>
							{post.post.author.displayName}
						</span>
						<span>
							{date}
						</span>
					</div>
				</a>
			{/if}

			{#if record.text}
				<div class="whitespace-pre-line border-slate-400 border-opacity-50 px-2 pt-2">
					{#each textsegments as s}
						{#if s.features}
							{#each s.features as f}
								<span class="text-green-400">
									{#if f.$type === 'app.bsky.richtext.facet#link'}
									<a href={f.uri}>{s.text}</a>
								{:else if f.$type === 'app.bsky.richtext.facet#mention'}
									<a href="/profile/{f.did}">{s.text}</a>
								{:else if f.$type === 'app.bsky.richtext.facet#tag'}
									#{f.tag}
								{/if}
								</span>
								
							{/each}
						{:else}
							{s.text}
						{/if}
					{/each}
				</div>
			{/if}

			{#if record.embed}
				{#if record.text}
					<div
						class="{record.embed.$type !== 'app.bsky.embed.record'
							? 'border-b-2'
							: ''} border-slate-400 border-opacity-50 pt-2"
					></div>
				{/if}
				{@const embed = record.embed}
				<div class="border-b-2 border-slate-400 border-opacity-50">
					{#if embed.$type === 'app.bsky.embed.external'}
						<a href={embed.external.uri}>
							{#if embed.external.uri.includes('media.tenor.com')}
							<div class="w-full bg-red-500">
								<img src={embed.external.uri} class="w-full" />
							</div>
							{:else}
								{#await thread}
									loading . . .
								{:then { data }}
									{@const embed: AppBskyEmbedExternal.View = (data.thread as any).post.embed}
									<img class="w-full" src={embed.external.thumb} />
								{/await}
								<div class="p-2">
									<span class="font-bold">{embed.external.title}</span>
									<span class="">{embed.external.description}</span>
									<span class="font-mono">{embed.external.uri}</span>
								</div>
							{/if}
						</a>
					{/if}

					{#if embed.$type === 'app.bsky.embed.images'}
						{#await thread}
							{#each embed.images as image}
								<div
									class="w-full bg-black"
									style="aspect-ratio: {image.aspectRatio?.width}/{image.aspectRatio?.height}"
								>
									<div>{image.alt}</div>
								</div>
							{/each}
							loading . . .
						{:then { data }}
							{@const embed: AppBskyEmbedImages.View = (data.thread as any).post.embed}
							<div class="flex w-full overflow-x-scroll snap-x snap-mandatory overflow-y-clip" style="aspect-ratio: {embed.images[0].aspectRatio?.width}/{embed.images[0].aspectRatio?.height}">
								{#each embed.images as image: ViewImage, key}
									<div
										class="w-full h-full flex items-center bg-black snap-start relative touch-manipulation"
										style="aspect-ratio: {image.aspectRatio?.width}/{image.aspectRatio?.height}"
									>
										<img
											class="w-full"
											width={image.aspectRatio?.width}
											height={image.aspectRatio?.height}
											src={image.fullsize}
											alt={image.alt}
										/>
										{#if embed.images.length > 1}
										<progress value={key + 1} max={embed.images.length} class="absolute top-0 w-full h-1 text-cyan-500"></progress>
										{/if}
									</div>
								{/each}
							</div>
							
						{/await}
					{/if}

					{#if embed.$type === 'app.bsky.embed.video'}
						{#await thread}

								<div
									class="w-full bg-black"
									style="aspect-ratio: {embed.aspectRatio?.width}/{embed.aspectRatio?.height}"
								>
								</div>

							loading . . .
						{:then { data }}
							{@const embed: AppBskyEmbedVideo.View = (data.thread as any).post.embed}
							{console.log(embed)}
							<div class="flex w-full" style="aspect-ratio: {embed.aspectRatio?.width}/{embed.aspectRatio?.height}">
								<video controls>
									<source src={embed.playlist}>
									
								</video>
							</div>
							
						{/await}
					{/if}

					{#if embed.$type === 'app.bsky.embed.record' || embed.$type === 'app.bsky.embed.recordWithMedia'}
						{@const e = rpc.get('app.bsky.feed.getPostThread', {
							params: { uri: embed.record.uri || embed.record.record.uri }
						})}
						{#await e}
							add a skeleton here at some point
						{:then { data }}
							<div class="p-4">
								{#if data.thread.$type === 'app.bsky.feed.defs#threadViewPost'}
									<Post post={data.thread} profile={data.thread.post.author} showAuthor={true} />
								{/if}
							</div>
						{/await}
					{/if}
				</div>
				{#if post.post.author.did === profile.did}
					<div class="px-2 py-1 opacity-60">
						{date}
					</div>
					<div class="border-b-2 border-slate-400 border-opacity-50"></div>
				{/if}
			{:else}
				{#if post.post.author.did === profile.did}
					<div class="px-2 opacity-60">
						{date}
					</div>
				{/if}
				<div class="border-b-2 border-slate-400 border-opacity-50 pt-2"></div>
			{/if}

			{#snippet reaction(Icon: Component, count?: number)}
				<div class="flex items-center gap-2 p-2">
					<Icon />
					{count}
				</div>
			{/snippet}

			<div class="flex divide-x-2 divide-slate-400 divide-opacity-50">
				{@render reaction(LucideMessageSquare, post.post.replyCount)}
				{@render reaction(LucideHeart, post.post.likeCount)}
				{@render reaction(LucideRefreshCw, post.post.quoteCount! + post.post.repostCount!)}
				<div></div>
				<!-- for final divider line -->
			</div>
		</div>
	</a>
</div>
