<script>
	import { onMount } from "svelte";
	
	onMount(async () => {
		const { Collapse, Tooltip, Ripple, initTWE } = await import("tw-elements");

		initTWE({ Collapse, Tooltip, Ripple });
	});
	
    export let sources
</script>
{#if sources}
    <hr class="my-4" />
    <div class="text-left">
        Sources :
        {#each sources as source, i (i)}
            <a href="{source.url}" target="_blank" rel="noopener" class="inline-block p-2 m-2 mx-1 transition duration-150 ease-in-out rounded-md bg-slate-900 hover:bg-slate-600 hover:cursor-pointer" data-twe-toggle="tooltip" title="{source.name}" data-twe-placement="top" data-twe-ripple-init data-twe-ripple-color="light">
                {#if source.favicon}
                    <img src="{source.favicon}" class="left-0 inline-block w-6 h-6 mr-2" alt={source.name} />
                {/if}
                {source.name}
            </a>
        {/each}
    </div>
{/if}