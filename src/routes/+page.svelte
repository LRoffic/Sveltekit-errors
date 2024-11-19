<script>
	import axios from "axios";

	import TemplateAside from "$templates/TemplateAside.svelte";
	import Articles from "$templatesPages/Articles.svelte";

	import Twitch from "$components/Twitch.svelte";

	import { log } from "$utils/debug";

	/** @type {import('./$types').PageData} */
	export let data;

	let articles = data.articles;
</script>

<svelte:head>
	<title>Blog | LRipsum</title>
	<meta name="description" content="LRipsum" />
</svelte:head>

<TemplateAside>
	<Articles {articles} />
</TemplateAside>
