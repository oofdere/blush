import { XRPC, CredentialManager, type AtpSessionData } from '@atcute/client';   
import { Enum } from "crabrave/dist/index";
import { nanoquery } from '@nanostores/query';
import { persistentAtom, persistentMap } from '@nanostores/persistent';
import * as devalue from 'devalue';

export const manager = new CredentialManager({ service: 'https://api.bsky.app' });
export const authedManager = new CredentialManager({ service: 'https://bsky.social' });

export const rpc = new XRPC({ handler: manager });

export const $session = persistentAtom<string | undefined>('session', undefined);

// disgusting iife to restore session
(()=>{
    const s = $session.get()
    if (s) {
        authedManager.resume(devalue.parse(s)).then(() => console.log("session restored!"))
    };
})();

export const authedRpc = new XRPC({handler: authedManager})