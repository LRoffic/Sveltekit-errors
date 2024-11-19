<script>	
	import Snapchat from "$templatesPages/Snapchat.svelte";
	import Form from "./form.svelte"

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Snapchats Admin | LRipsum</title>
</svelte:head>

<div class="grid grid-cols-12">
	<div class="lg:col-span-3"></div>
	<div class="lg:col-span-6 xs:col-span-12">
		<Form  />
		
		<Snapchat list="both" listPicking="{false}" session={data.session} permissions={data.permissions} />
	</div>
</div>