import { rpc } from '$lib/atcute.svelte';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {

	const { data } = await rpc.get('app.bsky.feed.getPostThread', {params: {uri: `at://${params.repo}/app.bsky.feed.post/${params.id}`}})

	if (data.thread.$type !== 'app.bsky.feed.defs#threadViewPost') {
		throw error(404);
	}

	const meta = {
		title: `post by ${data.thread.post.author.displayName} (@${data.thread.post.author.handle})`,
		description: `${(data.thread.post.record as any).text}`
	}

	return {
		post: data.thread,
		meta
	};
};
