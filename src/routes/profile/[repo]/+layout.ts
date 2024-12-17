import { rpc } from '$lib/atcute.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params }) => {

    const profile = await rpc.get('app.bsky.actor.getProfile', { params: { actor: params.repo } })
    
    const meta = {
		title: `${profile.data.displayName} (@${profile.data.handle})`,
        description: `${profile.data.description}`
	}

    return {
		profile: profile.data,
        meta
	};
};