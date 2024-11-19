<script>
	import { createEventDispatcher } from "svelte";

	import InputDiv from "$components/form/elements/InputDiv.svelte";

	import { log } from "$utils/debug";

	export let type = "text";
	export let value = "";
	export let placeholder = "";
	export let id = "";
	export let name = "";
	export let autocomplete = "off";
	export let formType;
	export let required;
	export let disabled;
	export let style;

	export let label;
	export let labelAddCustomClass, labelCustomClass;

	export let addCustomClass, customClass = "";

	export let error;
	export let errorAddCustomClass, errorCustomClass;
	export let errorSpanAddCustomClass, errorSpanCustomClass;

	let dispatch = createEventDispatcher();

	let defaultInputClass = "block w-full mt-4 text-white border-slate-900 rounded-md peer bg-slate-900 focus:border-gray-500 focus:bg-slate-700 focus:ring-0 placeholder:text-gray-600";
	let inputClass;
	
	let errorClass = "block w-full mt-4 text-white border-4 border-red-500 rounded-md peer bg-slate-900 placeholder:text-white focus:border-gray-500 focus:bg-slate-700 focus:ring-0";
	let errorSpanClass = "text-red-500";

	let defaultLabelClass = "pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-600 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-white peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none";
	let labelClass;

	export let onChange = (e) => {
		dispatch("change", e);
	};

	export let onBlur = (e) => {
		dispatch("blur", e);
	};

	if (name == undefined) name = id;

	required = required ? required : false;

	$: {
		if (error) {
			inputClass = errorClass;

			if (errorCustomClass) inputClass = errorCustomClass;

			inputClass += " " + errorAddCustomClass;

			if (errorSpanCustomClass) errorSpanClass = errorSpanCustomClass;

			errorSpanClass += " " + errorSpanAddCustomClass;
		} else {
			inputClass = defaultInputClass;

			if (customClass) inputClass = customClass;
			if (addCustomClass) inputClass += " " + addCustomClass;
		}

		labelClass = defaultLabelClass;

		if (labelCustomClass) labelClass = labelCustomClass;
		if (labelAddCustomClass) labelClass += " " + labelAddCustomClass;
		
		if(error && !labelCustomClass && value.length >= 1) labelClass += " text-white font-black bg-slate-800 -translate-y-[0.9rem] scale-[0.8] bg-gradient-to-t peer-focus:from-slate-700 peer-focus:to-slate-800 peer-focus:bg-gradient-to-t peer-focus:from-slate-700 peer-focus:to-slate-800";
		if(error && !labelCustomClass && value.length <= 0) labelClass += " text-red-500 font-black"
		
		if(value.length >= 1 && !labelCustomClass) labelClass += " text-slate-500 -translate-y-[0.9rem] scale-[0.8]";
	}
</script>

<InputDiv {label} {id} {name} bind:labelClass={labelClass}>
	<input
		{...{ type }}
		id={id || name}
		name={name || id}
		class={inputClass}
		bind:value
		placeholder={placeholder}
		{autocomplete}
		data-form-type={formType}
		{required}
		on:change={onChange}
		on:blur={(e) => onBlur(e)}
		{disabled}
		{style}
	/>
</InputDiv>
{#if error}
	<span class="text-red-500">
		{error}
	</span>
{/if}
