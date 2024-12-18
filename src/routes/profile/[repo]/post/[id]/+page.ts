import { rpc } from '$lib/atcute.svelte';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Meta } from '$lib';
import type { AppBskyFeedDefs } from '@atcute/client/lexicons';

const metaImages = (post: AppBskyFeedDefs.ThreadViewPost): Meta["image"] => {
	if (post.post.embed?.$type === 'app.bsky.embed.images#view') {
		return post.post.embed.images.map((x) => { return {src: x.fullsize} })
	}
	return []
}

const metaVideo = (post: AppBskyFeedDefs.ThreadViewPost): Meta["video"] => {
	if (post.post.embed?.$type === 'app.bsky.embed.video#view') {
		return {
			src: post.post.embed.playlist
		}
	}
	return undefined
}

export const load: PageLoad = async ({ params, parent }) => {

	const { data } = await rpc.get('app.bsky.feed.getPostThread', {params: {uri: `at://${params.repo}/app.bsky.feed.post/${params.id}`}})

	if (data.thread.$type !== 'app.bsky.feed.defs#threadViewPost') {
		throw error(404);
	}

	const meta: Meta = {
		title: `post by ${data.thread.post.author.displayName} (@${data.thread.post.author.handle})`,
		description: `${(data.thread.post.record as any).text}`,
		profile: {
			first_name: data.thread.post.author.displayName,
			username: data.thread.post.author.handle
		},
		article: {
			published_time: (data.thread.post.record as any).createdAt
		},
		image: metaImages(data.thread),
		video: metaVideo(data.thread)
	}

	return {
		post: data.thread,
		meta
	};
};
 