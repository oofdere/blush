import { agent } from '$lib/atproto';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params }) => {
    const profile = await agent.getProfile({
        actor: params.repo
    })

	return {
		profile: profile.data
	};
};