<script lang="ts">
	//import { i18n } from '$lib/i18n';
	//import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	//import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	//import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';

	import '../app.css';
	let { children } = $props();

	//const queryClient = new QueryClient();
</script>

<!--<QueryClientProvider client={queryClient}><ParaglideJS {i18n}>-->

<div class="flex flex-col">
	<div>
		{@render children()}
	</div>
</div>

<!--</ParaglideJS></QueryClientProvider>-->
