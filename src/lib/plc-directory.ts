export async function resolveHandle(handle: string)  {
    if (handle.startsWith("did:web")) {
        throw new Error("did:web resolution not yet implemented")
    }
    
    try {
        const res = await fetch(`https://plc.directory/${handle}`)
        if (!res.ok) { throw res }
        const pds =  (await res.json()).service[0].serviceEndpoint
        return pds as string
    } catch (x) {
        console.log(x)
        throw x
    }
}