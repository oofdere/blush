import { browser } from '$app/environment';
import { atp } from '$lib/atcute';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const { rpc } = atp();

	if (browser) {
		const feed = await rpc.get('app.bsky.feed.getTimeline', {
			params: {}
		});

		return {
			feed
		};
	}

	return { feed: undefined };
};
