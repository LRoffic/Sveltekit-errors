<script>
	import { onMount } from "svelte";
	import { browser } from "$app/environment";

	export let online = true;
	export let showTitle = true;
	export let title = "Diffusion en direct Twitch :";
	export let design;

	let isOnline = false;

	onMount(async () => {
        if(browser) {
			var options = {
				channel: "LRipsum",
			};
			
			var player = new Twitch.Player("twitch", options);

			player.addEventListener(Twitch.Player.READY, initiate)

			function initiate() {
				player.addEventListener(Twitch.Player.ONLINE, handleOnline);
				player.addEventListener(Twitch.Player.OFFLINE, handleOffline);
				player.removeEventListener(Twitch.Player.READY, initiate);
			}

			function handleOnline() {
				if(online){
					document.getElementById("twitch").classList.remove('hidden');
					isOnline = true;
				} else {
					document.getElementById("twitch").classList.add('hidden');
					isOnline = false;
				}
					
				player.removeEventListener(Twitch.Player.ONLINE, handleOnline);
				player.addEventListener(Twitch.Player.OFFLINE, handleOffline);
				player.setMuted(false);
			}

			function handleOffline() {
				if(online){
					document.getElementById("twitch").classList.add('hidden');
					isOnline = false;
				} else{
					document.getElementById("twitch").classList.remove('hidden');
					isOnline = false;
				}
				
				player.removeEventListener(Twitch.Player.OFFLINE, handleOffline);
				player.addEventListener(Twitch.Player.ONLINE, handleOnline);
				player.setMuted(true);
			}

			let iframe = document.querySelector("#twitch>iframe")
			iframe.classList.add("w-[100%]")
			iframe.classList.add("aspect-video");
		}
    });
</script>

<svelte:head>	
	<script src="https://player.twitch.tv/js/embed/v1.js"></script>
</svelte:head>

{#if design === "article"}
	<div id="twitch" class="hidden h-full mb-6 lg:col-span-2 xs:col-span-4 group hover:cursor-pointer">
		{#if showTitle}
			<div class="text-2xl">{title}</div>
		{/if}
	</div>
{:else}
	<div class="flex">
		<div class="m-auto basis-10/12">
			<div id="twitch" class="hidden mb-6">
				{#if showTitle}
					<div class="text-2xl">{title}</div>
				{/if}
			</div>
		</div>
	</div>
{/if}