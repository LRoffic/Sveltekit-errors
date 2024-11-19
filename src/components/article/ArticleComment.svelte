<script>
    import { onMount } from 'svelte';

    import { fade } from 'svelte/transition';

	import { page } from '$app/stores';
    
	import axios from "axios";

    import Swal from 'sweetalert2';

	import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime";
	import "dayjs/locale/fr";

	import checkPermission from '$utils/checkPermissions';
	
	import { log } from '$utils/debug';

	export let com;

	$: session = $page.data.session;
	$: permissions = $page.data.session.permissions;

    onMount(async () => {
		const { Tooltip, initTWE } = await import("tw-elements");

        initTWE({ Tooltip });
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

    let hidden = false;

    async function deleteCom(id, token){
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
			showLoaderOnConfirm: true,
		}).then(async (result) => {
			if (result.isConfirmed) {
				await axios.delete("/api/comments/delete/" + id + "/" + token).then((data) => {
					data = data.data;
					
					Toast.fire({
						icon: data.result,
						title: data.message
					});

					hidden = true;
				});
			} else if (result.isDenied) {
				Swal.fire({
					title: "Commentraire préservé !", 
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
	<div class="bg-slate-800 block rounded-lg shadow-lg text-white my-2" transition:fade={{ duration: 500 }}>
		{#key session}
			{#if session.userid != null}
				{#if session.userid == com.author_id || checkPermission("MANAGE_ARTICLES", permissions) == true}
					<div class="relative m-0">
						<div class="absolute top-0 right-0">
							<button 
								class="hover:bg-red-500 hover:cursor-pointer p-4 text-lg text-white rounded-tr-lg"
								title="supprimer"
								on:click={deleteCom(com.id, session.token)}
							>
								X
							</button>
						</div>
					</div>
				{/if}
			{/if}
		{/key}
		<div class="p-4">
			<span class="block text-2xl block">{com.author.username}</span>
			<div class="block text-gray-500 hover:cursor-default text-sm">
				<span
					data-twe-toggle="tooltip"
					data-twe-placement="top"
					data-twe-ripple-init
					data-twe-ripple-color="light"
					title="Publié le {dayjs(com.date_published).format("DD/MM/YYYY à HH[h]mm")}"
				>
					Publié {dayjs(com.date_published).fromNow()}
				</span>
			</div>
			<p class="mt-6 mx-12">
				{com.content}
			</p>
		</div>
	</div>
{/if}