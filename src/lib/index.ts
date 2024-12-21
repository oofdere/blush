import { createRawSnippet } from "svelte"

// place files you want to import through the `$lib` alias in this folder.
export type Meta = {
    title?: string,
    description?: string,
    type?: string,
    url?: string,
    article?: {
        published_time?: string,
    },
    profile?: {
        first_name?: string,
        username?: string
    },
    image?: {
        src?: string
    }[],
    video?: {
        src: string,
        width: number,
        height: number
    }
}