import { rpc } from '$lib/atcute.svelte';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {

	const { data } = await rpc.get('app.bsky.feed.getPostThread', {params: {uri: `at://${params.repo}/app.bsky.feed.post/${params.id}`}})

	if (data.thread.$type !== 'app.bsky.feed.defs#threadViewPost') {
		throw error(404);
	}

	return {
		post: data.thread,
	};
};
