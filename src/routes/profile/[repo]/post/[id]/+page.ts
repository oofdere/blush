import { rpc } from '$lib/atcute';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {

	const post = rpc.get('app.bsky.feed.getPostThread', {params: {uri: `at://${(await parent()).profile.did}/app.bsky.feed.post/${params.id}`}})

	const profile = (async () => (await parent()).profile)();

	return {
		post,
		profile
	};
};
