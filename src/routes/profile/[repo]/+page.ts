import { atp } from '$lib/atcute';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const { rpc } = atp();

	const pinned = await rpc.get('app.bsky.feed.getAuthorFeed', {
		params: { actor: params.repo, includePins: true, limit: 1 }
	});
	const feed = await rpc.get('app.bsky.feed.getAuthorFeed', {
		params: { actor: params.repo, includePins: false, filter: 'posts_no_replies' }
	});

	return {
		pinned,
		feed
	};
};
