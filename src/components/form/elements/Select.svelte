<script>
	export let id, name, value, options, placeholderText;
	export let placeholder = false;
	export let required = false;

	let selectClass;

	$: {
		if(value === "")
			selectClass = "text-gray-600"
		else
			selectClass = "text-white"
	}
</script>

<select name={name||id} id={id||name} bind:value={value} class="{selectClass} w-full border-transparent rounded-md bg-slate-900 focus:bg-slate-700" {required}>
	{#if placeholder}
		<option value="" disabled selected class="text-gray-600">
			{#if placeholderText}
				{placeholderText}
			{:else}
				-- Choisir une option {#if !required}(facultatif){/if} --
			{/if}
		</option>
	{/if}
	{#each options as option}
		<option value="{option.value}" class="{option.class || "text-white"}" selected={option.selected}>{option.name}</option>
	{/each}
</select>