<script lang="ts">
    import type { AppBskyActorDefs, AppBskyEmbedImages, AppBskyFeedDefs, AppBskyFeedPost, Brand } from '@atcute/client/lexicons';
	import LucideRefreshCw from '~icons/lucide/refresh-cw';
    import LucidePin from '~icons/lucide/pin';
	import LucideHeart from '~icons/lucide/heart';
	import LucideMessageSquare from '~icons/lucide/message-square';
	import { onMount, type Component, type Snippet } from 'svelte';
	import { rpc } from '$lib/atcute.svelte';

    const { post, profile, showAuthor }: { post: AppBskyFeedDefs.FeedViewPost, profile: AppBskyActorDefs.ProfileViewDetailed, showAuthor: boolean } = $props();

    const angle = Math.floor(Math.random() * (1 - -1) + -1)

    const record = post.post.record as AppBskyFeedPost.Record

    const thread = rpc.get('app.bsky.feed.getPostThread', {params: {uri: post.post.uri}})
</script>

					<div style="transform:rotate({angle}deg)" class="text-white">
						{#if post.reason}
							{@const reason = post.reason.$type}
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
								class="overflow-clip rounded-lg border-2 border-slate-400 border-opacity-50 bg-cyan-950 shadow-md shadow-black"
							>
								{#if showAuthor}
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
												{#each embed.images as image}
													<div class="w-full bg-black" style="aspect-ratio: {image.aspectRatio?.width}/{image.aspectRatio?.height}">
														
													</div>
													<div>{image.alt}</div>
												{/each}
												loading . . .
											{:then {data} }
												{@const embed: AppBskyEmbedImages.View = (data.thread as any).post.embed}
												{#each embed.images as image: ViewImage}

													<div class="w-full bg-black" style="aspect-ratio: {image.aspectRatio?.width}/{image.aspectRatio?.height}">
														<img class="w-full" width={image.aspectRatio?.width} height={image.aspectRatio?.height} src={image.fullsize} alt={image.alt} />
													{image.alt}
														
													</div>
												{/each}
												
											{/await}	
										
										
										{/if}

										{#if embed.$type === 'app.bsky.embed.record'}
											quote: {JSON.stringify(embed)}
										{/if}

										{#if embed.$type === 'app.bsky.embed.recordWithMedia'}
											media AND quote: {JSON.stringify(embed)}
										{/if}
									</div>
                                    {#if post.post.author.did === profile.did}
									<div class="px-2 py-1 opacity-60">
										{record.createdAt}
									</div>
									<div class="border-b-2 border-slate-400 border-opacity-50"></div>
                                    {/if}
								{:else}
									{#if post.post.author.did === profile.did}
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