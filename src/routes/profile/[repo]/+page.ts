import { rpc } from '$lib/atcute';
import { Enum, Err, Ok, type Result } from 'crabrave/dist/index';
import type { PageLoad } from './$types';
import type { AppBskyFeedDefs, AppBskyFeedGetAuthorFeed } from '@atcute/client/lexicons';
import { XRPCError, type XRPCResponse } from '@atcute/client';

type RT = XRPCResponse<AppBskyFeedGetAuthorFeed.Output>;

async function getFeed(repo: string): Promise<Result<AppBskyFeedGetAuthorFeed.Output, XRPCError>> {
	try {
		const { data } = await rpc.get('app.bsky.feed.getAuthorFeed', {params: { actor: repo, includePins: true }})
		return Ok(data)
	} catch (error: any) {
		if (error instanceof XRPCError) {
			return Err(error)
		}
		throw error
	}
}

export const load: PageLoad = async ({ params, parent }) => {

	return {
		feed: getFeed(params.repo)
	};
};