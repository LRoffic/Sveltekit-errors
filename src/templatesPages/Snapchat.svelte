<script lang="ts">
	import { onMount } from "svelte";
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";

	import axios from "axios";

	import Swal from "sweetalert2";

	import Snap from "$components/Snap.svelte";
	import SnapLoading from "$components/SnapLoading.svelte";

	import PrimaryButton from "$components/PrimaryButton.svelte";
	import SecondaryButton from "$components/SecondaryButton.svelte";

	import { log } from "$utils/debug";

    export let list = "public";

	export let listPicking = true;

	export let session, permissions;

	let snapchats = [];

    let page = 0;

	function changeStory(){
		if(list === "public")
			list = "black";
		else
			list = "public";

		getSnaps(list, true);
	}

	let loading = false;

    async function getSnaps(liste, resetList){
		if(resetList)
			page = 1;
		else
        	page = page + 1;
		
		if(!loading){
			loading = true;

			if(browser){
				return await axios.post("/api/snapchat/get/"+liste, {page: page}).then((data) => {
					if(data.data.result === "error"){
						Swal.mixin({
							customClass: {
								confirmButton: "block w-full px-6 py-4 my-2 text-white text-center transition duration-150 ease-in-out rounded shadow-md bg-slate-900 hover:bg-green-400 hover:text-black cursor-pointer",
								popup: "bg-slate-700 text-white"
							},
							buttonsStyling: false
						}).fire({
							title: "Erreur",
							text: data.data.message,
							icon: data.data.result,
							confirmButtonText: "Se connecter maintenant",
						}).then((result) => {
							if(result.isConfirmed) {
								goto("/login");
							}
						});

						loading = false;

						return data;
					}

					if(resetList && !data.data.result)
						snapchats = [];

					snapchats = [...snapchats, ...data.data];

					loading = false;

					return data
				});
			}
		}
    }
    
	onMount(async () => {
		if(browser){
			window.addEventListener('scroll', async () => {
				const {
					scrollTop,
					scrollHeight,
					clientHeight
				} = document.documentElement;

				if (scrollTop + clientHeight >= scrollHeight - 5) {
					if(!loading)
						await getSnaps(list);
					return;
				}
			}, {
				passive: true
			});
		}
	});
	
	let SnapsList = getSnaps(list, true);
</script>

<div class="flex">
	<div class="col-span-1"></div>
	<div class="m-auto xs:basis-12/12 sm:basis-10/12 lg:basis-8/12">
		{#key SnapsList}
			{#await SnapsList}
				<SnapLoading />
			{:then}
				{#if listPicking}
					<div class="grid grid-cols-2 gap-4">
						{#if list == "public"}
							<div class="col-span-1">
								<SecondaryButton>Story publique</SecondaryButton>
							</div>
							<div class="col-span-1" on:click="{changeStory}" role="navigation">
								<PrimaryButton>Story "No Limit"</PrimaryButton>
							</div>
						{:else}
							<div class="col-span-1" on:click="{changeStory}" role="navigation">
								<PrimaryButton>Story publique</PrimaryButton>
							</div>
							<div class="col-span-1">
								<SecondaryButton>Story "No Limit"</SecondaryButton>
							</div>
						{/if}
					</div>
				{/if}
				{#if snapchats.length > 0}
					{#each snapchats as snap}
						<Snap snapId={snap.id} title={snap.title} content={snap.content} type={snap.type} published={snap.published} published_date={snap.published_date} thumbnailPath={snap.thumbnailPath} list={snap.list} {session} {permissions} />
					{/each}
					<SnapLoading />
					<div class="flex items-center justify-center my-4 text-white align-middle">
						<div class="text-green-400 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
							<span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Chargement...</span>
						</div>
						<span class="ml-2">Chargement...</span>
					</div>
				{/if}
			{/await}
		{/key}
	</div>
	<div class="col-span-1"></div>
</div>