import { XRPC, CredentialManager } from '@atcute/client';
import type { AppBskyFeedPost, AppBskyRichtextFacet, Brand } from '@atcute/client/lexicons';
import { Enum, pack } from 'crabrave';

export const manager = new CredentialManager({ service: 'https://api.bsky.app' });
export const rpc = new XRPC({ handler: manager });
// you can just change the login on the manager without new rpc!?
//await manager.login({ identifier: 'example.com', password: 'ofki-yrwl-hmcc-cvau' });

