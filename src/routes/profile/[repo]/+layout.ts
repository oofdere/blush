import type { Meta } from '$lib';
import { atp } from '$lib/atcute';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params }) => {
	const { rpc } = atp();

	const profile = await rpc.get('app.bsky.actor.getProfile', { params: { actor: params.repo } });

	const meta: Meta = {
		title: `${profile.data.displayName} (@${profile.data.handle})`,
		description: `${profile.data.description}`,
		profile: {
			first_name: profile.data.displayName,
			username: profile.data.handle
		},
		image: [
			{
				src: profile.data.avatar
			}
		],
		stats: `${profile.data.followersCount} followers | ${profile.data.followsCount} following | ${profile.data.postsCount} posts`
	};

	return {
		profile: profile.data,
		meta
	};
};
