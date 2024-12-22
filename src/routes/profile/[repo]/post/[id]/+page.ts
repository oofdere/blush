import { atp } from '$lib/atcute';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Meta } from '$lib';
import type { AppBskyFeedDefs } from '@atcute/client/lexicons';
import { resolveHandle } from '$lib/plc-directory';
import { browser } from '$app/environment';

const metaImages = (post: AppBskyFeedDefs.ThreadViewPost): Meta['image'] => {
	if (post.post.embed?.$type === 'app.bsky.embed.video#view') {
		return [{ src: post.post.embed.thumbnail }]
	}
	else if (post.post.embed?.$type === 'app.bsky.embed.images#view') {
		return post.post.embed.images.map((x) => {
			return { src: x.fullsize };
		});
	}
	return [];
};

const metaVideo = async (post: AppBskyFeedDefs.ThreadViewPost): Promise<Meta['video']> => {
	if (post.post.embed?.$type === 'app.bsky.embed.video#view') {



            const did = (post.post.author.did as `did:${string}`)
            const pds = await resolveHandle(did)
            return { src: `${pds}/xrpc/com.atproto.sync.getBlob?did=${did}&cid=${post.post.embed.cid}`, height: post.post.embed.aspectRatio?.height || 0, width: post.post.embed.aspectRatio?.width || 0 }
        }

	return undefined;
};

export const load: PageLoad = async ({ params, parent }) => {
	const { rpc, manager } = atp();

	const { data } = await rpc.get('app.bsky.feed.getPostThread', {
		params: { uri: `at://${params.repo}/app.bsky.feed.post/${params.id.replace('||', '')}` }
	});

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
		type: 'video.other',
		image: metaImages(data.thread),
		video: browser ? undefined : await metaVideo(data.thread)
	};

	return {
		post: data.thread,
		meta
	};
};
