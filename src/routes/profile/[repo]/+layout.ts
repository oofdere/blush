import { rpc } from '$lib/atcute.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params }) => {

    const profile = await rpc.get('app.bsky.actor.getProfile', { params: { actor: params.repo } })
    
    return {
		profile: profile.data,
	};
};