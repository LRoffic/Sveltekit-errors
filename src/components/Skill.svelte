<script>
	import Lazy from "svelte-lazy";

	export let img, changeSkill;
	export let skillName = "";
	export let link = null;
</script>

{#if link}
	<a 
		href={link}
		class="w-40 p-4 m-2 border rounded-lg cursor-pointer bg-slate-400 border-slate-100 hover:text-green-400 hover:border-green-400"
		target="_blank"
	>
		<Lazy keep="true">
			<img src={img} class="w-20 h-20 m-auto" alt={skillName} />
		</Lazy>
		<slot></slot>
	</a>
{:else}
	<div
		class="w-40 p-4 m-2 border rounded-lg cursor-pointer bg-slate-400 border-slate-100 hover:text-green-400 hover:border-green-400"
		on:click={() => changeSkill(skillName)}
		role="navigation"
	>
		<Lazy keep="true">
			<img src={img} class="w-20 h-20 m-auto" alt={skillName} />
		</Lazy>
		<slot></slot>
	</div>
{/if}