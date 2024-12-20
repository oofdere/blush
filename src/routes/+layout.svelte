<script lang="ts">
	import { authedManager, manager } from '$lib/atcute';
	import { $session as session } from "$lib/atcute";
	//import { i18n } from '$lib/i18n';
	//import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	//import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	//import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';

	import '../app.css';

	import LucidePlus from '~icons/lucide/plus'
	import type { Snapshot } from './$types';

	let { children } = $props();

	//const queryClient = new QueryClient();
</script>

<!--<QueryClientProvider client={queryClient}><ParaglideJS {i18n}>-->

<div class="main flex flex-col">

				{@render children()}

</div>

<div class="sticky w-screen bottom-0 text-white bg-cyan-800 flex flex-col md:hidden">
	<div class="flex justify-around h-12">
		<a class="w-full text-center flex items-center justify-center">
			<div class="size-16 rounded-lg bg-red-500 outline-8 outline outline-cyan-950 -translate-y-4">
				feeds!
			</div>
		</a>

		<a class="w-full text-center flex items-center justify-center">
			<div class="h-16 w-28 rounded-t-lg bg-cyan-600 flex items-center justify-around">
				<LucidePlus class="size-10" />
			</div>
		</a>
		{#if $session}
			<a href="/profile/{authedManager.session?.did}" class="w-full text-center flex items-center justify-center">
				<div class="size-16 rounded-lg bg-red-500 outline-8 outline outline-cyan-950 -translate-y-4">
					me!
				</div>
			</a>
		{:else}
			<a href="/login" class="w-full text-center flex items-center justify-center">
				<div class="size-16 rounded-lg bg-red-500 outline-8 outline outline-cyan-950 -translate-y-4">
					log in
				</div>
			</a>
		{/if}
	</div>
	

	<div class=" p-2 w-full">
		<input class="h-8 w-full bg-cyan-950 text-gray-300 border-0 rounded-full" placeholder="🔎 type to search, / to command" />
	</div>
</div>

<!--</ParaglideJS></QueryClientProvider>-->
