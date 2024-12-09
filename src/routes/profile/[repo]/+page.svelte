<script lang="ts">
	import type { AppBskyFeedPost, Brand } from '@atcute/client/lexicons';
	import type { PageData } from './$types';
	import LucideRefreshCw from '~icons/lucide/refresh-cw';
	import LucidePin from '~icons/lucide/pin';
	import LucideHeart from '~icons/lucide/heart';
	import LucideMessageSquare from '~icons/lucide/message-square';
	import { onMount, type Component, type Snippet } from 'svelte';
	import { rpc } from '$lib/atcute.svelte';

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

	<div class="-mt-5 whitespace-pre-line px-6 pb-4">
		{data.profile.description}
	</div>

	<div class="flex flex-col gap-2 border-slate-400 border-opacity-45 inse bg-cyan-950 px-6 py-4">
		<div class="flex flex-col gap-4">
			{#await data.feed then res}
				{@const feed = res.data.feed}
				{#each feed as post}
					{@const angle = Math.floor(Math.random() * (1 - -1) + -1)}
					{@const record = post.post.record as record}
					{@const thread = rpc.get('app.bsky.feed.getPostThread', {params: {uri: post.post.uri}}) }

					<div style="transform:rotate({angle}deg)">
						{#if post.reason}
							{@const reason = post.reason.$type}
							<div class="flex items-center justify-center gap-2 p-2 pt-0 opacity-60">
								{#if reason === 'app.bsky.feed.defs#reasonPin'}
									<LucidePin />
									<span>pinned post!</span>
								{:else if reason === 'app.bsky.feed.defs#reasonRepost'}
									<LucideRefreshCw class="animate-spina" />
									<span>reposted by</span> <img class="h-6" src={data.profile.avatar} alt="avatar" />
									<span>{data.profile.displayName}</span>
								{/if}
							</div>
						{/if}
						<a href="/profile/{post.post.author.did}/post/{post.post.uri.slice(-13)}">
							<div
								class="overflow-clip rounded-lg border-2 border-slate-400 border-opacity-50 bg-cyan-950 shadow-md shadow-black"
							>
								{#if post.post.author.did !== data.profile.did}
									<a
										href="/profile/{post.post.author.did}"
										class='border-b-2 border-slate-400 border-opacity-50 flex items-center gap-2'
									>
										<img class="w-12" src={post.post.author.avatar} alt="avatar" />
										<div class="flex flex-col">
											<span>
												{post.post.author.displayName}
											</span>
											<span>
												{record.createdAt}
											</span>
										</div>
									</a>
								{/if}

								{#if record.text}
									<div class="border-slate-400 border-opacity-50 px-2 pt-2 whitespace-pre-line">
										{record.text}
									</div>
								{/if}

								{#if record.embed}
									{#if record.text}
										<div class="border-b-2 border-slate-400 border-opacity-50 pt-2"></div>
									{/if}
									{@const embed = record.embed}
									<div class=" border-b-2 border-slate-400 border-opacity-50">
										{#if embed.$type === 'app.bsky.embed.external'}
											{embed.external.uri}
										{/if}

										{#if embed.$type === 'app.bsky.embed.images'}
											{#await thread}
												loading . . .
											{:then t} 
												{console.log(t)}
												<img src={t.data.thread.post.embed.images[0].fullsize} alt={t.data.thread.post.embed.images[0].alt} />
											{/await}	
										
										{#each embed.images as image}
											{image.alt}
												
											{/each}
										{/if}

										{#if embed.$type === 'app.bsky.embed.record'}
											quote: {JSON.stringify(embed)}
										{/if}

										{#if embed.$type === 'app.bsky.embed.recordWithMedia'}
											media AND quote: {JSON.stringify(embed)}
										{/if}
									</div>
                                    {#if post.post.author.did === data.profile.did}
									<div class="px-2 py-1 opacity-60">
										{record.createdAt}
									</div>
									<div class="border-b-2 border-slate-400 border-opacity-50"></div>
                                    {/if}
								{:else}
									{#if post.post.author.did === data.profile.did}
										<div class="px-2 opacity-60">
											{record.createdAt}
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
									{@render reaction(
										LucideRefreshCw,
										post.post.quoteCount! + post.post.repostCount!
									)}
									<div></div>
									<!-- for final divider line -->
								</div>
							</div>
						</a>
					</div>
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
