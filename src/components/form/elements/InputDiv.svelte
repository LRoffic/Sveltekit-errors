<script>
	export let label, id, name, labelClass;
</script>

{#if label}
	<div class="relative">
		<slot></slot>
		
		<label for="{id||name}" class="{labelClass}">
			{label}
		</label>
	</div>
{:else}
    <slot></slot>
{/if}