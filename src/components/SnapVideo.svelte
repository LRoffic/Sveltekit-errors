<script>
	import { page } from '$app/stores';
	
    import { checkPermission } from "$utils/checkPermissions";

	$: session = $page.data.session
	$: permissions = $page.data.session.permissions

	import Lazy from "svelte-lazy";

	export let embed, thumbnailPath;

	let show = "thumbnail";
</script>

{#if embed}
	{#if show === "thumbnail"}
		<div class="relative w-full">
			{#key $session}
				{#if $session.userid != null}
					{#if checkPermission("MANAGE_SNAPCHAT", $permissions) == true}
						<div class="relative m-0">
							<div class="absolute top-0 right-0">
								<button
									class="p-4 text-lg text-white rounded-tr-lg hover:bg-red-500 hover:cursor-pointer"
									title="supprimer"
									on:click={deleteSnap(snapId, $session.token)}
								>
									X
								</button>
							</div>
						</div>
					{/if}
				{/if}
			{/key}
			<img src={thumbnailPath} class="w-full h-auto" alt="" loading="lazy" />

			<button
				class="absolute p-4 text-center text-white transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-slate-800 hover:bg-green-400"
				on:click={() => {
					show = "video";
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-play-fill"
					viewBox="0 0 16 16"
				>
					<path
						d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
					/>
				</svg>
			</button>
		</div>
	{:else}
		<div class="relative" style="position: relative; padding-top: 56.25%;">
			<iframe
				title="Snap Vidéo LRipsum"
				src="{embed}?title=0"
				frameborder="0"
				allowfullscreen="true"
				sandbox="allow-same-origin allow-scripts allow-popups"
				class="absolute inset-0 w-full h-full rounded-t-lg"
			>
			</iframe>
		</div>
	{/if}
{/if}
