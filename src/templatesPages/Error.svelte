<script>
	import { page } from '$app/stores';
	import { onMount } from'svelte';

	import Template from "$templates/TemplateCenter.svelte";
	
	import { randomInt } from "$utils/random";

	onMount(async () => {
		const { Ripple, Tooltip, initTWE } = await import("tw-elements");

		initTWE({ Ripple, Tooltip });
	});	

	let i = randomInt(5);

	let phrase = [
		"Cette page n'est pas présente au box-office",
		"<span data-twe-toggle=\"tooltip\" data-twe-placement=\"top\" data-twe-ripple-color=\"light\" title=\"Not Found !\">Cette Page est introuvable...</span><br  /><span class=\"font-bold\">-</span> <span class=\"font-bold underline decoration-emerald-500 hover:text-emerald-500 decoration-4 underline-offset-4 hover:cursor-none\">LRipsum</span> : \"Tu as cherché dans tes poches ?\"",
		"<span class=\"font-bold underline decoration-emerald-500 hover:text-emerald-500 decoration-4 underline-offset-4 hover:cursor-none\">Agent 42</span> : \"La cible est introuvable, je répète, la cible est introuvable\"",
		"Vous semblez perdu... Essayez de vous retrouver --> <a href=\"https://url.lripsum.net/4ussv\" class=\"font-bold underline decoration-emerald-500 decoration-4 underline-offset-4 hover:text-gray-500\" target=\"_blank\" rel=\"nofollow noopener noreferrer\">ici</a>",
        "<a href=\"https://url.lripsum.net/gcvia\" class=\"font-bold underline decoration-emerald-500 decoration-4 underline-offset-4 hover:text-gray-500\" target=\"_blank\" rel=\"nofollow noopener noreferrer\">Peut-être que la page que vous cherchez se trouve ici ?</a>"
	];
</script>

<Template>
	<div class="p-6 m-auto text-center rounded-lg shadow-lg bg-slate-800 basis-3/5">
		<h1 class="font-black text-gray-100 text-9xl">{$page.status}</h1>

		<p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">{$page.error.message}</p>
	
		{#if $page.status == "404"}
			<p class="mt-4 text-gray-300">{@html phrase[i]}</p>
		{/if}
	</div>
</Template>