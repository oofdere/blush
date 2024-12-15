import { XRPC, CredentialManager, type AtpSessionData } from '@atcute/client';
import type { AppBskyFeedPost, AppBskyRichtextFacet, Brand } from '@atcute/client/lexicons';    
import { SvelteMap } from 'svelte/reactivity';
import * as devalue from 'devalue';

let accounts: SvelteMap<string, AtpSessionData> = new SvelteMap(JSON.parse(localStorage.getItem('accounts') || '[]'))
$effect(() => {
    console.log('persisting accounts!')
    localStorage.setItem('accounts', devalue.stringify(Array.from(accounts.entries())))
})
export function getAccounts() { return accounts }

let currentAccount = $state(accounts.get(localStorage.getItem('currentAccount')!))
$effect(() => {
    console.log('persisting current account!')
    localStorage.setItem('currentAccount', devalue.stringify(currentAccount?.did))
})
export function getCurrentAccount() { return currentAccount }


export function setAccount(did: string | undefined) {
    if (did) {
        const session = accounts.get(did)
        if (session) { currentAccount = session }
    }

    currentAccount = undefined;
}

export const manager  = new CredentialManager({ service: 'https://api.bsky.app' });

export const authedManager = new CredentialManager({service: 'https://bsky.social'})
$effect(() => {
    if (currentAccount) {
        authedManager.resume(currentAccount).then(() => console.log("session resumed!"))
    }
})

async function login(identifier: string, password: string) {
    try {
        const session = await manager.login({ identifier, password })
        accounts.set(session.did, session)
    } catch (e) {
        
    }
    
    
}

export const rpc = new XRPC({ handler: manager });
