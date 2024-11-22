import { agent } from '$lib/atproto';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const post = agent.getPost({
		repo: params.repo,
		rkey: params.id
	});

	const thread = agent.getPostThread({
		uri: `at://${(await parent()).profile.did}/app.bsky.feed.post/${params.id}`
	});

	const profile = (async () => (await parent()).profile)();

	return {
		post,
		profile,
		thread
	};
};
