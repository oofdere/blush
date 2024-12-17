import { rpc } from '$lib/atcute.svelte';
import type { PageLoad } from './$types';
import type { AppBskyFeedGetAuthorFeed } from '@atcute/client/lexicons';
import { type XRPCResponse } from '@atcute/client';
import { browser } from '$app/environment';

type RT = XRPCResponse<AppBskyFeedGetAuthorFeed.Output>;


export const load: PageLoad = async ({ params, parent }) => {
	const pinned = await rpc.get('app.bsky.feed.getAuthorFeed', {params: { actor: params.repo, includePins: true, limit: 1 }})
	const feed = await rpc.get('app.bsky.feed.getAuthorFeed', {params: { actor: params.repo, includePins: false, filter: 'posts_no_replies' }})

	if (browser) {
		console.log("running in browser!")
	} else {
		console.log("running on server!")
	}

	return {
		pinned,
		feed
	};
};