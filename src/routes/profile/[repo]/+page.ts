import { rpc } from '$lib/atcute.svelte';
import type { PageLoad } from './$types';
import type { AppBskyFeedDefs, AppBskyFeedGetAuthorFeed } from '@atcute/client/lexicons';
import { XRPCError, type XRPCResponse } from '@atcute/client';

type RT = XRPCResponse<AppBskyFeedGetAuthorFeed.Output>;


export const load: PageLoad = async ({ params, parent }) => {
	const feed = rpc.get('app.bsky.feed.getAuthorFeed', {params: { actor: params.repo, includePins: true }})
	return {
		feed
	};
};