<script>
    import Swal from 'sweetalert2';

	import PrimaryButton from "$components/PrimaryButton.svelte";
    import MovieInfo from "$components/form/MovieSelector.svelte";

    let titre, year, imdbId

    $:{
        if(titre) {
            titre = titre.replaceAll("\\", '')
            titre = titre.replaceAll("/", ' ')
            titre = titre.replaceAll(":", ' -')
            titre = titre.replaceAll("*", '')
            titre = titre.replaceAll("?", '')
            titre = titre.replaceAll("\"", '')
            titre = titre.replaceAll("<", '')
            titre = titre.replaceAll(">", '')
            titre = titre.replaceAll("|", '')

            titre = titre + " (" + year + ") " + "[imdbid=" + imdbId + "]"
        }
    }

    function copyTitre(){
        navigator.clipboard.writeText(titre);
            
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

        Toast.fire({
            icon: "success",
            title: "Le titre a été copié dans le presse-papiers"
        });
    }
</script>

<div class="flex items-center content-center justify-center h-screen align-middle">
	<div class="w-9/12 p-4 m-auto bg-slate-800">
		{#key titre}
			{#if titre}
				<h3 class="text-center text-white">{titre}</h3><br />
				<div class="m-auto">
					<button class="flex items-center justify-center px-6 py-4 m-auto text-center text-white align-middle transition duration-150 ease-in-out rounded shadow-md bg-slate-900 hover:bg-green-400 hover:text-black hover:cursor-pointer" on:click={copyTitre}>
							<span class="mr-2 [&amp;>svg]:h-4 [&amp;>svg]:w-4">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-white bi bi-copy" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
							</svg>
						</span>
						Copier le titre
					</button>
				</div>
			{/if}
		{/key}
		<div class="my-4">
			<MovieInfo bind:titre bind:year bind:imdbId />
		</div>
		{#key titre}
			{#if titre}
				<div class="m-auto">
					<button class="flex items-center justify-center px-6 py-4 m-auto text-center text-white align-middle transition duration-150 ease-in-out rounded shadow-md bg-slate-900 hover:bg-green-400 hover:text-black hover:cursor-pointer" on:click={copyTitre}>
							<span class="mr-2 [&amp;>svg]:h-4 [&amp;>svg]:w-4">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-white bi bi-copy" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
							</svg>
						</span>
						Copier le titre
					</button>
				</div>
				<h3 class="text-center text-white">{titre}</h3><br />
			{/if}
		{/key}
	</div>
</div>