<script lang="ts">
	import { page } from '$app/stores';
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

<div class="flex flex-col">
	<div class="flex">
		{#await data.profile}
			loading profile
		{:then profile}
			<img class="h-16 w-16" src={profile.avatar} alt="avatar" />
			<div class="flex-col">
				<p>{profile.displayName}</p>
				<p>@{profile.handle}</p>
				<p>{profile.followersCount} followers | {profile.followsCount} following</p>
                <p>{JSON.stringify(profile)}</p>
			</div>
		{/await}
	</div>
	{#await data.post}
		loading post
	{:then post}
		<div>
		</div>
		{#if post.value.embed?.images}
			{@const images = post.value.embed.images as Image[]}
			{#each images as i}
				{JSON.stringify(i)}
                {#await data.thread}
                    loading...
                {:then thread}
                thread
                    {JSON.stringify(thread.data.thread.post)}
				    <img src={i.image.ref.$link} alt={i.alt} />
                /thread
                {/await}
                {i.alt || 'no alt text :('}
			{/each}
		{/if}
		<hr />
		<div>
			{JSON.stringify(post.value)}
		</div>
	{/await}
</div>
