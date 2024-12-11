<script lang="ts">
	import { page } from '$app/stores';
	import Post from '$lib/components/Post.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type Blob = {
		$type: 'blob';
		ref: {
			$link: string;
		};
		mimeType: string;
		size: number;
	};

	type Image = {
		alt?: string;
		aspectRatio: {
			height: number;
			width: number;
		};
		image: Blob;
	};
</script>

<div class="min-h-screen w-screen flex-col bg-cyan-950 text-white">
	{#await data.profile then profile}
	<a href="/profile/{profile.did}" class="bg-slate-800">
		<div class="header h-48 bg-cover text-white" style:--bg-url={`url('${profile.banner}')`}>
			<div class="flex items-center gap-3 p-6 pb-10 pt-16">
				<img src={profile.avatar} class="avatar w-20 rounded-xl" alt="avatar" />
				<div class="-gap-2 text-shadow flex flex-col">
					<span class="text-2xl font-semibold">{profile.displayName}</span>
					<span class="text-gray-400">@{profile.handle}</span>
					<div
		class=""
	>
		<span class="">
			📤 {profile.followersCount}
		</span>
		<span class="">
			📥 {profile.followsCount}
		</span>
		<span class="">
			📝 {profile.postsCount}
		</span>
	</div>
				</div>
				
			</div>
		</div>
	</a>

	
	{/await}

	<div class="flex flex-col gap-2 border-slate-400 border-opacity-45 inse bg-cyan-950 px-6 ">
		<div class="flex flex-col gap-4">
			{#await data.post}
		loading post
	{:then thread}
		<div class="-translate-y-4">
			<Post post={thread.data.thread} profile={data.profile} showAuthor={false} />

		</div>
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