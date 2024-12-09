import { XRPC, CredentialManager } from '@atcute/client';
import type { AppBskyFeedPost, AppBskyRichtextFacet, Brand } from '@atcute/client/lexicons';    

export const manager = $state(new CredentialManager({ service: 'https://api.bsky.app' }));

console.log(manager)

// try {
//     manager.login({ identifier: 'oof.dere.systems', password: 'vpt4-eivt-vdwu-dg6n' }).then((x) => console.log(x))
// } catch (error) {
//     console.log(error)
// }

// you can just change the login on the manager without new rpc!?

console.log(manager)

export const rpc = new XRPC({ handler: manager });
