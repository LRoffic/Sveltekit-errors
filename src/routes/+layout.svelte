<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';
	import "bootstrap-icons/font/bootstrap-icons.css";
	import { dev } from '$app/environment';
	import { browser } from '$app/environment';
	import { fade } from "svelte/transition";
	import { navigating } from '$app/stores';

	if (dev) {
		if(browser)
			document.body.classList.add('debug-screens');
	}
</script>

<svelte:head>
	<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml">
</svelte:head>

<div class="text-white app">
	{#key $navigating}
		<Header />
		
		<div in:fade={{duration: 1000 }}>
			<slot></slot>
		</div>
	{/key}
</div>
