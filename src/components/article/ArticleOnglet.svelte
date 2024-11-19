<script>
	import 'animate.css';

	import PrimaryButton from "$components/PrimaryButton.svelte";
	import SecondaryButton from "$components/SecondaryButton.svelte";

    export let onglet, navigateur, classButtonIn, classButtonOut, classText

	let changeOnglet = (newOnglet) => {
		onglet = newOnglet;

		classButtonIn  = "animate__animated animate__flipInX";
		classButtonOut = "animate__animated animate__fadeIn";
		classText      = "animate__animated animate__jackInTheBox";
	}
</script>

<div class="w-full grid grid-cols-2 gap-4">
    {#if onglet == "article"}
        <div class="{classButtonIn}">
            <a href="#top">
                <PrimaryButton>
					<div class="{classText}">
						Lire l'article
					</div>
				</PrimaryButton>
            </a>
        </div>
        <div class="{classButtonOut}">
            <a href="#top" on:click="{() => { changeOnglet("info") }}">
   		        <SecondaryButton>
					<div>
						{#if navigateur != "mobile"}
							Plus d'informations sur le film
						{:else}
							Plus d'infos
						{/if}
				</div>
                </SecondaryButton>
            </a>
        </div>
    {:else}
        <div class="block {classButtonOut}">
            <a href="#top"  on:click="{() => { changeOnglet("article") }}" class="">
                <SecondaryButton class="block">
					<div>
						Lire l'article
					</div>
				</SecondaryButton>
            </a>
        </div>
        <div class="{classButtonIn}">
            <a href="#top">
                <PrimaryButton>
					<div class="{classText}">
						{#if navigateur != "mobile"}
							Plus d'informations sur le film
						{:else}
							Plus d'infos
						{/if}
					</div>
                </PrimaryButton>
            </a>
        </div>
    {/if}
</div>