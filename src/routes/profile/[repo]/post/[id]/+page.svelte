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
	{#await data.thread}
		loading post
	{:then thread}
		{JSON.stringify(thread)}
	{/await}
</div>
