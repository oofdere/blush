<script lang="ts">
	import Post from '$lib/components/Post.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="min-h-screen w-screen flex-col bg-cyan-950 text-white">
	{#await data.profile then profile}
		<a href="/profile/{profile.did}" class="bg-slate-800">
			<div
				class="header h-48 bg-cover text-white"
				style:--bg-url={data.profile.banner ? `url('${data.profile.banner}')` : ''}
			>
				<div class="flex items-center gap-3 p-6 pt-16 pb-10">
					<img src={profile.avatar} class="avatar w-20 rounded-xl" alt="avatar" />
					<div class="-gap-2 text-shadow flex flex-col">
						<span class="text-2xl font-semibold">{profile.displayName}</span>
						<span class="text-gray-400">@{profile.handle}</span>
						<div class="">
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

	<div class="inse border-opacity-45 flex flex-col gap-2 border-slate-400 bg-cyan-950 px-6">
		<div class="flex flex-col gap-4">
			<div class="-translate-y-4">
				<Post post={data.post} profile={data.profile} showAuthor={false} />
			</div>
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
</style>
