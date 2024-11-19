<script>
	import Template from "$templates/TemplateAside.svelte";
	
	import Twitch from "$components/Twitch.svelte";
	import Snapchat from "$templatesPages/Snapchat.svelte";

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Snapchats | LRipsum</title>
</svelte:head>

<Template>
	<div class="flex">
		<div class="m-auto xs:basis-12/12 sm: basis-10/12 md:basis-8/12 lg:basis-12/12 basis-8/12">
			<Twitch />
			<Snapchat session={data.session} permissions={data.permissions} />
		</div>
	</div>
</Template>
