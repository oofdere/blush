<script lang="ts">
	import { goto } from '$app/navigation';
	import { authedManager, $session as session } from '$lib/atcute';
	import * as devalue from 'devalue';

	if ($session) {
		goto('/');
	}

	let identifier = $state('');
	let password = $state('');

	async function login() {
		const s = await authedManager.login({
			identifier,
			password
		});

		$session = devalue.stringify(s);

		goto('/');
	}
</script>

<div>
	<div class="m-16">
		<input placeholder="no @" bind:value={identifier} />
		<input placeholder="password" bind:value={password} />
		<button onclick={login}>Log in</button>
	</div>
</div>
