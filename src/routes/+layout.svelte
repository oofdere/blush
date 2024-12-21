<script lang="ts">
	import { authedManager } from '$lib/atcute';
	import { $session as session } from '$lib/atcute';

	import '../app.css';

	import LucidePlus from '~icons/lucide/plus';
	import { navigating } from '$app/state';

	let { children } = $props();
</script>

<div class="main flex flex-col">
	{#key navigating}
		{@render children()}
	{/key}
</div>

<div class="sticky bottom-0 flex w-screen flex-col bg-cyan-800 text-white md:hidden">
	<div class="flex h-12 justify-around">
		<a href="/" class="flex w-full items-center justify-center text-center">
			<div class="size-16 -translate-y-4 rounded-lg bg-red-500 outline outline-8 outline-cyan-950">
				feeds!
			</div>
		</a>

		<a href="/compose" class="flex w-full items-center justify-center text-center">
			<div class="flex h-16 w-28 items-center justify-around rounded-t-lg bg-cyan-600">
				<LucidePlus class="size-10" />
			</div>
		</a>
		{#if $session}
			<a
				href="/profile/{authedManager.session?.did}"
				class="flex w-full items-center justify-center text-center"
			>
				<div
					class="size-16 -translate-y-4 rounded-lg bg-red-500 outline outline-8 outline-cyan-950"
				>
					me!
				</div>
			</a>
		{:else}
			<a href="/login" class="flex w-full items-center justify-center text-center">
				<div
					class="size-16 -translate-y-4 rounded-lg bg-red-500 outline outline-8 outline-cyan-950"
				>
					log in
				</div>
			</a>
		{/if}
	</div>

	<div class=" w-full p-2">
		<input
			class="h-8 w-full rounded-full border-0 bg-cyan-950 text-gray-300"
			placeholder="🔎 type to search, / to command"
		/>
	</div>
</div>
