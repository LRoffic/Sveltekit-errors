<script>
	export let checked, id, name, onChange, label, disabled, title, formType, error;
	export let type = "box";
	export let labelColor = false;

	let checkBoxClass = "hover:checked:bg-green-500 focus:checked:bg-green-400 checked:border-green-300 checked:bg-green-400";
	let labelClass = "hover:cursor-pointer text-white";

	if(disabled){
		checkBoxClass = "hover:checked:bg-gray-500 focus:checked:bg-gray-500 checked:border-gray-500 checked:bg-gray-500 bg-gray-500 hover:cursor-not-allowed";
		labelClass = "cursor-not-allowed text-gray-500";
	}
</script>

{#if type === "box"}
	<input type="checkbox"
		id={id||name}
		name={name||id}
		bind:checked={checked}
		on:change={onChange}
		{disabled}
		{title}
		data-form-type={formType}
		class="
			relative
			h-[1.125rem]
			w-[1.125rem]
			appearance-none
			rounded-[0.25rem]
			border-[0.125rem]
			border-solid
			border-neutral-600
			outline-none
			before:pointer-events-none
			before:absolute
			before:h-[0.875rem]
			before:w-[0.875rem]
			before:scale-0
			before:rounded-full
			before:bg-transparent
			before:opacity-0
			checked:before:opacity-[0.16]
			checked:after:absolute
			checked:after:-mt-px
			checked:after:ml-[0.25rem]
			checked:after:block
			checked:after:h-[0.8125rem]
			checked:after:w-[0.375rem]
			checked:after:rotate-45
			checked:after:border-[0.125rem]
			checked:after:border-l-0
			checked:after:border-t-0
			checked:after:border-solid
			checked:after:border-white
			checked:after:bg-transparent
			checked:after:content-['']
			hover:cursor-pointer
			hover:before:opacity-[0.04]
			hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)]
			focus:shadow-none
			focus:transition-[border-color_0.2s]
			focus:before:scale-100
			focus:before:opacity-[0.12]
			focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)]
			focus:before:transition-[box-shadow_0.2s,transform_0.2s]
			focus:after:absolute
			focus:after:z-[1]
			focus:after:block
			focus:after:h-[0.875rem]
			focus:after:w-[0.875rem]
			focus:after:rounded-[0.125rem]
			focus:after:content-['']
			checked:focus:before:scale-100
			checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]
			checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]
			checked:focus:after:-mt-px
			checked:focus:after:ml-[0.25rem]
			checked:focus:after:h-[0.8125rem]
			checked:focus:after:w-[0.375rem]
			checked:focus:after:rotate-45
			checked:focus:after:rounded-none
			checked:focus:after:border-[0.125rem]
			checked:focus:after:border-l-0
			checked:focus:after:border-t-0
			checked:focus:after:border-solid
			checked:focus:after:border-white
			checked:focus:after:bg-transparent
			{checkBoxClass}
		"
	>
{:else if type === "slide"}
	<input
		type="checkbox"
		role="switch"
		id="published"
		bind:checked="{checked}"
		class="
			mr-2
			h-3.5
			w-8
			appearance-none rounded-[0.4375rem]
			bg-red-500
			before:pointer-events-none
			before:absolute
			before:h-3.5
			before:w-3.5
			before:rounded-full
			before:bg-transparent
			before:content-['']
			after:absolute
			after:z-[2]
			after:-mt-[0.1875rem]
			after:h-5
			after:w-5
			after:rounded-full
			after:border-none
			hover:bg-red-500
			after:bg-red-500
			after:transition-[background-color_0.2s,transform_0.2s]
			after:content-['']
			checked:bg-green-400
			checked:hover:bg-green-400
			checked:after:absolute
			checked:after:z-[2]
			checked:after:-mt-[3px]
			checked:after:ml-[1.0625rem]
			checked:after:h-5 checked:after:w-5
			checked:after:rounded-full
			checked:after:border-none
			checked:after:bg-green-400
			checked:after:transition-[background-color_0.2s,transform_0.2s]
			checked:after:content-['']
			hover:cursor-pointer
			focus:before:scale-100
			focus:before:opacity-[0.12]
			focus:before:shadow-lg
			focus:before:transition-[box-shadow_0.2s,transform_0.2s]
			focus:after:absolute
			focus:after:z-[1]
			focus:after:block
			focus:after:h-5
			focus:after:w-5
			focus:after:rounded-full
			focus:after:content-['']
			checked:focus:border-green-400
			checked:focus:bg-green-400
			checked:focus:before:ml-[1.0625rem]
			checked:focus:before:scale-100
			checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]
		"
	/>
{/if}

<label for={id||name} class="inline-block pl-[0.15rem] {labelClass}" {title}>
	{#if labelColor}
		{#if checked}
			<span class="text-green-400">
				{label}
			</span>
		{:else}
			<span class="text-red-500">
				{label}
			</span>
		{/if}
	{:else}
		{label}
	{/if}
</label>

{#if error}
    <span class="text-red-500">{error}</span>
{/if}