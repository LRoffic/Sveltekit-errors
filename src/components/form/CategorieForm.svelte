<script>
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { browser } from "$app/environment";

	import axios from "axios";

	import Alert from "$components/Alert.svelte";

	import Input from "$components/form/elements/Input.svelte";
	import Checkbox from "$components/form/elements/CheckBox.svelte";

	export let name, id, result, formName, icon, type;
	export let published = true;
	export let color = "#ffffff";

	$: session = $page.data.session;

	onMount(() => {
		if (browser) {
			let uip = new UniversalIconPicker("#selector", {
				iconLibraries: [
					"/uip/assets/icons-libraries/bootstrap-icons.min.json",
					"/uip/assets/icons-libraries/elegant-icons.min.json",
					"/uip/assets/icons-libraries/feather-icons.min.json",
					"/uip/assets/icons-libraries/fomantic-ui.min.json",
					"/uip/assets/icons-libraries/font-awesome.min.json",
					"/uip/assets/icons-libraries/foundation-icons.min.json",
					"/uip/assets/icons-libraries/happy-icons.min.json",
					"/uip/assets/icons-libraries/icomoon.min.json",
					"/uip/assets/icons-libraries/open-iconic.min.json",
					"/uip/assets/icons-libraries/tabler-icons.min.json",
					"/uip/assets/icons-libraries/weather-icons.min.json",
					"/uip/assets/icons-libraries/zondicons.min.json",
				],
				iconLibrariesCss: [
					"https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.5/font/bootstrap-icons.min.css",
					"elegant-icons.min.css",
					"feather-icons.min.css",
					"fomantic-ui-icons.min.css",
					"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
					"foundation-icons.min.css",
					"happy-icons.min.css",
					"icomoon.min.css",
					"open-iconic.min.css",
					"tabler-icons.min.css",
					"weather-icons.min.css",
					"zondicons.min.css",
				],
				onSelect: function (jsonIconData) {
					icon = jsonIconData.iconClass;
				},
			});
		}
	});

	async function categorie() {
		let posturl;

		if (type === "create") {
			let send = await axios
				.post("/api/admin/categorie/create/", {
					name: name,
					icon: icon,
					color: color,
					published: published,
				})
				.then((data) => {
					result = data.data;

					if (result.result === "success") {
						name = "";
						icon = "";
						color = "#ffffff";
						published = true;
					}
				});
		} else if (type === "edit") {
			let send = await axios
				.patch("/api/admin/categorie/edit/" + id + "/", {
					id: id,
					name: name,
					icon: icon,
					color: color,
					published: published,
				})
				.then((data) => {
					result = data.data;
				});
		}

		return send;
	}
</script>

<svelte:head>
	<script src="/uip/assets/js/universal-icon-picker.min.js" async></script>
	<link
		rel="stylesheet"
		href="/uip/assets/stylesheets/universal-icon-picker.min.css"
		async
	/>
</svelte:head>

{#key result}
	{#if result}
		{#if result.result == "success"}
			<Alert>
				<span class="font-bold">{result.message}</span>
			</Alert>
		{:else}
			<Alert type="danger">
				<span class="font-bold">{result.message}</span>
			</Alert>
		{/if}
	{/if}
{/key}

{#if name != ""}
	<div class="grid grid-cols-6 gap-2 mb-4 text-white">
		<div class="col-span-2"></div>
		<div class="block col-span-2">
			Aperçus :
			<div
				class="p-6 text-6xl text-center rounded-lg shadow-lg bg-slate-800 h-min"
			>
				{#if icon}
					<i class={icon} style="color: {color}"></i>
				{/if}
				<h2 class="my-2 text-2xl text-center">{name}</h2>
			</div>
		</div>
		<div class="col-span-2"></div>
	</div>
{/if}

<div class="block p-6 text-white rounded-lg shadow-lg bg-slate-800">
	<form action="" method="post" on:submit|preventDefault={categorie}>
		<h2 class="pb-2 text-lg text-center text-white">{formName}</h2>
		<Input
			type="text"
			id="name"
			bind:value={name}
			required
			placeholder="Nom de la catégorie"
		/>
		<div class="z-0 flex flex-wrap items-stretch w-full my-4">
			<button
				type="button"
				id="selector"
				class="mt-4 rounded-l-md border-2 border-slate-900 px-6 py-2 text-xs font-medium uppercase leading-tight transition duration-150 ease-in-out bg-slate-900 hover:bg-green-400 hover:text-black hover:cursor-pointer focus:z-[3] focus:outline-none focus:ring-0"
				>Click to open</button
			>
			<Input
				type="text"
				customClass="m-0 mt-4 block w-[1px] min-w-0 flex-auto rounded-r-md border border-l-0 border-solid border-slate-900 bg-slate-900  bg-clip-padding px-3 py-2 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition ease-in-out hover:cursor-pointer"
				placeholder=""
				id="uip"
				bind:value={icon}
				disabled
			/>
		</div>

		<label for="color" class="block mt-4">Couleur du badge :</label>
		<div class="flex flex-wrap items-stretch mb-4">
			<Input
				type="color"
				customClass="flex block h-auto py-2 pl-2 mt-1 transition duration-200 ease-in-out border border-transparent outline-none rounded-l-md bg-slate-900"
				bind:value={color}
			/>
			<Input customClass="m-0 mt-1 block w-[1px] min-w-0 flex-auto rounded-r-md border border-l-0 border-solid border-slate-900 bg-slate-900  bg-clip-padding px-3 py-2 text-base font-normal leading-[1.6] outline-none transition ease-in-out hover:cursor-pointer" disabled value={color} style="color: {color}" />
		</div>
		<div class="flex mb-4">
			<div class="m-auto">
				<Checkbox
					type="slide"
					id="published"
					bind:checked={published}
					label={published
						? "La catégorie apparaîtra en ligne"
						: "La catégorie n'apparaîtra pas en ligne"}
					labelColor={true}
				/>
			</div>
		</div>
		<Input type="submit" value="Enregistrer la catégorie" customClass="w-full px-6 py-4 mr-2 text-white transition duration-150 ease-in-out rounded shadow-md bg-slate-900 hover:bg-green-400 hover:text-black hover:cursor-pointer" />
	</form>
</div>
