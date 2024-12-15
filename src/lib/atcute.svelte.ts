import { XRPC, CredentialManager } from '@atcute/client';
import type { AppBskyFeedPost, AppBskyRichtextFacet, Brand } from '@atcute/client/lexicons';    

export const manager = $state(new CredentialManager({ service: 'https://api.bsky.app' }));

export const rpc = new XRPC({ handler: manager });
