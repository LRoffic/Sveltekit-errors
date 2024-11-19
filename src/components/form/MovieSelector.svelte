<script>
	import { fade } from 'svelte/transition';

    import axios from "axios";
	
	import Input from "$components/form/elements/Input.svelte";
	import Select from "$components/form/elements/Select.svelte";

	import {log} from "$utils/debug"

	export let film, type, poster, titre, year;
	export let imdbId;
	export let filmTab = false;

	let titreInput, movies;
	let country = "us";
	let showType = "";
	
	function showFilm(){
		filmTab = true;
	}

	async function searchMovie(){
		let params = {
			title: titreInput,
			country: country,
			output_language: 'fr'
		}

		if(showType)
			params.show_type = showType
		
		const options = {
  			method: 'GET',
  			url: 'https://streaming-availability.p.rapidapi.com/shows/search/title',
  			params: params,
			headers: {
				'X-RapidAPI-Key': '9286c23f67msh86f6a03b49ef60ap18890ejsn6429e337ff9a',
				'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
			}
		};
		
		return await axios.request(options).then((data) => {
			return data.data;
		});
	}
</script>

{#if !filmTab}
	<div class="text-center text-white hover:cursor-pointer hover:text-green-400 group" out:fade on:click={showFilm}>
		<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-10 mx-auto text-white rounded-lg group-hover:p-1 group-hover:text-green-400 bi bi-film" viewBox="0 0 16 16">
			<path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/>
		</svg>
		Ajouter un film
	</div>
{:else}
	{#key film}
		{#if film}
			<div class="flex justify-center">
				{#if poster}
					<img loading="lazy" src="{poster}" class="h-96" alt="">
				{/if}
			</div>
			<div class="flex justify-center text-center text-white">
				ID du film choisis : {film}{#if type} Type : {type}{/if}<br />
				{titre}
			</div>
		{/if}
	{/key}
	<form method="post" action="" on:submit|preventDefault={() => { movies = searchMovie()}}>
		<div class="block my-4">
			<label for="country">Pays de production (facultatif) :</label>
			<Select name="country" bind:value={country} options={[
				{
					name: "United State of America",
					value: "us"
				}, {
					name: "France",
					value: "fr"
				}, {
					name: "Espagne",
					value: "es"
				}, {
					name: "Corée du Sud",
					value: "kr"
				}
			]} />
		</div>
		<div class="block my-4">
			<Select name="type" bind:value={showType} placeholder={true} placeholderText="-- Choisir le type (film ou série) (facultatif) --" options={[
				{
					name: "Film",
					value: "movie"
				}, {
					name: "Série",
					value: "series"
				}
			]} />
		</div>
		<div class="relative flex flex-wrap items-stretch my-4">
			<Input
				type="text"
				name="titre"
				bind:value="{titreInput}"
				autocomplete="false"
				customClass="relative m-0 -mr-0.5 block flex-auto rounded-l-md border-transparent bg-slate-900 focus:bg-slate-700 focus:border-primary placeholder:text-gray-600"
				placeholder="Titre de film"
			/>
			<input
				class="z-[2] inline-block rounded-r-md bg-slate-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal border-transparent text-white transition duration-150 ease-in-out hover:bg-green-400 focus:z-[3] focus:bg-green-400 focus:outline-none focus:ring-0 active:bg-green-400"
				data-te-ripple-init
				type="submit"
				id="button-addon2"
			/>
		</div>
	</form>
	{#key movies}
		{#if movies}
			{#await movies}
				<div class="flex items-center justify-center space-x-2">
					<div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-green-400 motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
						<span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]" >Loading...</span>
					</div>
					<span class="ml-2">Chargement....</span>
				</div>
			{:then movies}
				<div class="flex w-full overflow-x-scroll">
					{#each movies as movie}
						<input type="radio" id={movie.imdbId} name="film" bind:group={film} value={movie.imdbId} on:click={() => { type = movie.showType; poster = movie.imageSet.verticalPoster.w720; titre = movie.title; imdbId = movie.imdbId; year = movie.firstAirYear||movie.releaseYear; }} class="hidden peer/film">
						<label for={movie.imdbId} class="flex-none px-2 cursor-pointer hover:text-gray-600 peer-checked/film:text-green-400" title="{movie.title}">
							<div class="flex flex-col items-center justify-center gap-3 hyphens-auto">
								<img loading="lazy" src="{movie.imageSet.verticalPoster.w240}" alt="{movie.backdropPath}" class="w-20 h-auto peer-checked/film:border-4 peer-checked/film:border-green-400" />
								<p class="w-20 text-white truncate">{movie.title}</p>
							</div>
						</label>
					{/each}
				</div>
			{/await}
		{/if}
	{/key}
{/if}