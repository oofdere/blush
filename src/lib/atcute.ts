import { XRPC, CredentialManager, type AtpSessionData } from '@atcute/client';   
import { Enum } from "crabrave/dist/index";
import { nanoquery } from '@nanostores/query';
import { persistentAtom, persistentMap } from '@nanostores/persistent';
import * as devalue from 'devalue';
import { browser } from '$app/environment';

export const manager = new CredentialManager({ service: 'https://api.bsky.app' });
export const authedManager = new CredentialManager({ service: 'https://bsky.social' });

export const rpc = new XRPC({ handler: manager });

export const $session = persistentAtom<string | undefined>('session', undefined);

// disgusting iife to restore session
(()=>{
    const s = $session.get()
    if (s) {
        try {
            authedManager.resume(devalue.parse(s)).then((x) => {
                console.log("session restored!")
                $session.set(devalue.stringify(x))
            })
        } catch {
            console.log("failed to restore session")
            $session.set(undefined)
        }
    };
})();

export const authedRpc = new XRPC({handler: authedManager})

export function atp() {
    if (browser && $session.get()) {
        return {
            manager: authedManager,
            rpc: authedRpc
        }
    }

    return {
        manager, rpc
    }
}