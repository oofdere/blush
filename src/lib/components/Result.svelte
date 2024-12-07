<script lang="ts" generics="T, E">
	import type { Result as ResultType } from "crabrave/dist/index";
	import type { Snippet } from "svelte";

    type Props = {res: ResultType<T, E>, Ok: (v: T) => ReturnType<import("svelte").Snippet>, Err: (v: E) => ReturnType<import("svelte").Snippet>}

	const {res, Ok, Err}: Props = $props();
</script>

{#if res[0] === 'Ok'}
	{@render Ok(res[1])}
{:else}
	{@render Err(res[1])}
{/if}