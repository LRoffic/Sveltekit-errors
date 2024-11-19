<script lang="ts">
    import { onMount } from 'svelte';

	import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime";
	import "dayjs/locale/fr";

    import { fade } from 'svelte/transition';

	import axios from 'axios';
    import Swal from 'sweetalert2';

	import checkPermissions from "$utils/checkPermissions";

	import {log} from "$utils/debug"

	export let session, permissions;

    export let snapId, title, list, content, type, published, published_date, thumbnailPath;
    
    let show = "thumbnail";
	let img = thumbnailPath;

    let hidden = false;

	onMount(async () => {
		const { Tooltip, Modal, Ripple, initTWE } = await import("tw-elements");
		
		initTWE({ Tooltip, Modal, Ripple });
	});

    dayjs.locale("fr");
	dayjs.extend(relativeTime);

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    async function deleteSnap(id, token){
		Swal.fire({
			icon: "warning",
			title: "Do you really want to delete this Snap?",
			showDenyButton: true,
			confirmButtonText: "Delete",
			denyButtonText: `Don't delete`,		
			confirmButtonColor: "#d33",
			denyButtonColor: "#3085d6",
			customClass: {
				confirmButton: "block w-full px-6 py-4 my-2 text-white text-center transition duration-150 ease-in-out rounded shadow-md cursor-pointer",
				denyButton: "block w-full px-6 py-4 my-2 text-white text-center transition duration-150 ease-in-out rounded shadow-md cursor-pointer",
				popup: "bg-slate-700 text-white"
			},
			showCloseButton:true,
		}).then(async (result) => {
			if (result.isConfirmed) {
				await axios.delete("/api/admin/snapchat/delete/"+id+"/"+token).then((data) => {
					data = data.data
					if(data.result === "success"){
						hidden = true;
					}

					Toast.fire({
						icon: data.result,
						title: data.message
					});
				})
			} else if (result.isDenied) {
				Swal.fire({
					title: "Snap are preserved", 
					icon: "info",
					customClass: {
						popup: "bg-slate-700 text-white",
						timerProgressBar: "bg-green-400 h-4"
					},
					showCloseButton:true,
					timer: 3000,
        			timerProgressBar: true,
				});
			}
		});
    }
</script>

{#if !hidden}
	<div id="snap_{snapId}" class="block mt-4 mb-3 text-white rounded-lg shadow-lg bg-slate-800"  transition:fade={{ duration: 500 }}>
		{#if type === "img"}
			<div class="relative w-full">
				{#key session}
					{#if session.userid != null}
						{#if checkPermissions("MANAGE_SNAPCHAT", permissions) == true}
							<div class="relative m-0">
								<div class="absolute top-0 right-0">
									<button 
										class="p-4 text-lg text-white rounded-tr-lg hover:bg-red-500 hover:cursor-pointer"
										title="supprimer"
										on:click={deleteSnap(snapId, session.token)}
									>
										X
									</button>
								</div>
							</div>
						{/if}
					{/if}
				{/key}
				<img 
					src="/api/snapchat/get/{snapId}/snap.jpg"  
					class="w-full h-auto rounded-t-lg" 
					title="Snap de LRipsum"
					alt="Snap de LRipsum"
					loading="lazy"
				>
			</div>
		{:else}
			{#if content}
				{#if show === "thumbnail"}
					<div class="relative w-full">
						{#key session}
							{#if session != null}
								{#if checkPermissions("MANAGE_SNAPCHAT", permissions) == true}
									<div class="relative m-0">
										<div class="absolute top-0 right-0">
											<button 
												class="p-4 text-lg text-white rounded-tr-lg hover:bg-red-500 hover:cursor-pointer"
												title="supprimer"
												on:click={deleteSnap(snapId, session.token)}
											>
												X
											</button>
										</div>
									</div>
								{/if}
							{/if}
						{/key}
						<img src={thumbnailPath} class="w-full h-auto rounded-t-lg" alt="" loading="lazy">
						
						<button class="absolute p-4 text-center text-white transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-slate-800 hover:bg-green-400" on:click={() => { show = "video" }}>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
								<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
							</svg>
						</button>
					</div>
				{:else}
					<div class="relative" style="position: relative; padding-top: 56.25%;">
						<iframe 
							title="Snap Vidéo LRipsum"
							src="{content}"
							frameborder="0"
							allowfullscreen=""
							sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
							class="absolute inset-0 w-full h-full rounded-t-lg"
						>
						</iframe>
					</div>
				{/if}
			{/if}
		{/if}
		<div class="p-4">
			<h5 class="pb-2">
				{#key session}
					{#if session != null}
						{#if checkPermissions("MANAGE_SNAPCHAT", permissions) == true}
							<div class="pb-1 border-b-2 border-gray-600">
								{#if published === "Y"}
									<div class="flex items-center justify-center px-4 text-xs">
										<div>
											<span class="inline-block mr-1">
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-green-400 bi bi-eye" viewBox="0 0 16 16">
													<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
													<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
												</svg>
											</span>
											<span class="align-top">En ligne</span>
										</div>
										<div class="ml-auto">
											{#if list === "black"}
												<div class="inline-block p-2 ml-2 mr-1 bg-black"></div> <span class="align-top">Liste : Black</span>
											{:else}
												<div class="inline-block p-2 ml-2 mr-1 bg-white"></div> <span class="align-top">Liste : Publique</span>
											{/if}
										</div>
									</div>
								{:else}
									<div class="flex items-center justify-center text-xs">
										<div>
											<span class="inline-block mr-1">
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-red-500 bi bi-eye-slash" viewBox="0 0 16 16">
													<path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486z"/>
													<path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
													<path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708"/>
												</svg>
											</span>
											<span class="align-top">Hors Ligne</span>
										</div>
										<div class="ml-auto">
											{#if list === "black"}
												<div class="inline-block p-2 ml-2 mr-1 bg-black"></div> <span class="align-top">Liste : Black</span>
											{:else}
												<div class="inline-block p-2 ml-2 mr-1 bg-white"></div> <span class="align-top">Liste : Publique</span>
											{/if}
										</div>
									</div>
								{/if}
							</div>
						{/if}
					{/if}
				{/key}
				{#if title}
					{title}
				{/if}
			</h5>
			<p> 
				Publié
				<span 
					class="underline hover:cursor-default"
					data-twe-toggle="tooltip"
					data-twe-placement="top"
					data-twe-ripple-init
					data-twe-ripple-color="light"
					title="Publié le {dayjs(published_date).format("DD/MM/YYYY à HH[h]mm")}"
				>
					{dayjs(parseInt(published_date)).fromNow()}
				</span>
			</p>
			<div class="grid grid-cols-2">
				<div></div>
				<div class="flex justify-center align-middle">
					<button
						type="button"
						class="flex items-center justify-center w-full px-6 py-4 text-center text-white align-middle transition duration-150 ease-in-out rounded hover:bg-green-400 hover:text-black hover:cursor-pointer"
						data-twe-toggle="modal"
						data-twe-target="#ShareModal"
						data-twe-ripple-init
						data-twe-ripple-color="light"
					>
						<span class="mr-2 [&>svg]:h-4 [&>svg]:w-4">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
								<path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/>
							</svg>
						</span>
						Partager
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal -->
	<div
		data-twe-modal-init
		class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
		id="ShareModal"
		tabindex="-1"
		aria-labelledby="ShareModalLabel"
		aria-hidden="true"
	>
		<div
			data-twe-modal-dialog-ref
			class="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
		>
			<div
				class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-slate-800 text-white bg-clip-padding text-current shadow-lg outline-none"
			>
				<div
					class="flex items-center justify-between flex-shrink-0 p-4 border-b-2 border-opacity-50 rounded-t-md border-neutral-100"
				>
					<!--Modal title-->
					<h5 class="text-xl font-medium leading-normal text-white" id="ShareModalLabel">
						Partager le snap
					</h5>
					<!--Close button-->
					<button
						type="button"
						class="box-content border-none rounded-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
						data-twe-modal-dismiss
						aria-label="Close"
					>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round"stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<!--Modal body-->
				<div class="relative flex items-center justify-center p-4 align-middle" data-twe-modal-body-ref>
					<a href="https://www.facebook.com/sharer/sharer.php?u=https://lripsum.net/snap/{snapId}" class="rounded-lg text-white flex items-center m-2 p-4 bg-[#2176FF] hover:opacity-50"
						target="_blank"
						data-twe-toggle="tooltip"
						data-twe-placement="top"
						data-twe-ripple-init
						data-twe-ripple-color="light"
						title="Partager sur Facebook"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
							<path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
						</svg>
					</a>
					<a href="https://twitter.com/intent/tweet?text=https://lripsum.net/snap/{snapId}" class="flex items-center p-4 m-2 text-white bg-black rounded-lg hover:opacity-50"
						target="_blank"
						data-twe-toggle="tooltip"
						data-twe-placement="top"
						data-twe-ripple-init
						data-twe-ripple-color="light"
						title="Partager sur X (Ex Twitter)"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
							<path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
{/if}