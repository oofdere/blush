import { agent } from '$lib/atproto';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const profile = (async () => (await parent()).profile)();

	const pinned = (async () => {
		const uri = (await parent()).profile.pinnedPost?.uri;

		if (uri) {
            await new Promise(resolve => setTimeout(resolve, 1000));
			return (await agent.getPostThread({uri})).data;
		}

		return undefined;
	})();

	return {
		pinned
	};
};
