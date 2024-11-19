<script>
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	import axios from "axios";

	$: session = $page.data.session;

	$: token = $page.data.token;

	let logout = async () => {
		return await axios.get("/api/session/logout/"+token).then((data) => {
			if(data.data.result == "success")
				invalidateAll();

			return data.data;
		});
	}

	import Template from "$templates/TemplateCenter.svelte";
	import Alert from "$components/Alert.svelte";
	import PrimaryButton from "$components/PrimaryButton.svelte";
</script>

<Template>
	<div class="text-center basis-3/5">
		{#await logout()}
			<span class="text-4xl">Chargement...</span>
		{:then logout}
			{#if logout.result == "error"}
				<Alert type="danger">
					<span class="font-bold">{logout.message}</span>
				</Alert>
			{:else if logout.result == "success"}
				<Alert>
					<span class="font-bold">{logout.message}</span>
				</Alert>
			{/if}		
			<a href="javascript:history.back(1)">
				<PrimaryButton>
					Revenir là où vous en étiez
				</PrimaryButton>
			</a>
		{/await}
	</div>
</Template>