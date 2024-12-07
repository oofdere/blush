
<script lang="ts" generics="E">
	import type { ComponentProps, Snippet } from 'svelte';
	import Match from './Match.svelte';
	import { Ok, type Result } from 'crabrave/dist/index';
    const yay: Result<"yay", "nay"> = Ok("yay")

	type Props = { pattern: E } & {
		[K in keyof E]-?: (v: E[K]) => Snippet;
	};
	const { pattern, ...arms }: Props = $props();
</script>

{@render arms[(pattern)[0]](pattern[1])}

<Match pattern={yay}>
	
	{#snippet Err(x)}
		{x}
	{/snippet}
{#snippet Ok(x)}
		{x}
	{/snippet}
</Match>