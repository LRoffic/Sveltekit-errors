<script>
	import { page } from '$app/stores';

	import Template from '$templates/TemplateCenter.svelte';

	import Snap from "$components/Snap.svelte"

	/** @type {import('./$types').Pagesnap} */
	export let data;

	$: session = $page.data.session
	$: permissions = session.permissions

	const snap = data.snap
</script>

<svelte:head>
	<meta property="og:title" content="{snap.title ? snap.title : "Snap de LRipsum"}" />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://lripsum/snap/{snap.id}" />
	<meta property="og:image" content="{snap.type === "img" ? "https://lripsum.net/api/snapchat/get/"+snap.id+"/snap.jpg" : snap.thumbnailPath}" />
	<meta property="og:site_name" content="LRipsum.net">
	
	<meta name="twitter:title" content="{snap.title ? snap.title : "Snap de LRipsum"}">
	<meta name="twitter:image" content="{snap.type === "img" ? "https://lripsum.net/api/snapchat/get/"+snap.id+"/snap.jpg" : snap.thumbnailPath}">
	<meta name="twitter:card" content="summary_large_image">
</svelte:head>

<Template>
	<div class="m-auto mt-24 xs:basis-auto sm:basis-4/12">
		<Snap snapId={snap.id} title={snap.title} content={snap.content} type={snap.type} published={snap.published} published_date={snap.published_date} thumbnailPath={snap.thumbnailPath} list={snap.list} {session} {permissions} />
	</div>
</Template>