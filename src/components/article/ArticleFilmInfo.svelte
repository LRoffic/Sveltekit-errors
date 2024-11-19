<script>
    import { onMount } from 'svelte';

    import voca from 'voca';

	import { Image } from 'svelte-lazy-loader'

    import MovieInfo from '$components/article/ArticleMovieInfo.svelte';

    onMount(async () => {
		const { Tooltip, initTWE } = await import("tw-elements");

        initTWE({ Tooltip });
    });

    export let movie

    let streaming

    let genresCount       = movie.genres.length-1;
    let castCount         = movie.cast.length-1;

    let streamingList = [];

    let streamingInfo = movie.streamingInfo.us

    if(streamingInfo){
        Object.keys(streamingInfo).forEach((data) => {
            //service.type addon = achat, subscription = abonnement
            switch (data){
                case "netflix":
                    let netflix = streamingInfo.netflix[0]
                    streamingList.push({"id": "netflix", "name": "Netflix", "link": netflix.link, "type": netflix.type});
                break;
                case "hulu":
                    let hulu = streamingInfo.hulu[0]
                    streamingList.push({"id": "hulu", "name": "Hulu", "link": hulu.link, "type": hulu.type});
                break;
                case "apple":
                    let apple = streamingInfo.apple[0]
                    streamingList.push({"id": "apple", "name": "AppleTv", "link": apple.link, "type": apple.type});
                break;
                case "prime":
                    let prime = streamingInfo.prime[0]
                    streamingList.push({"id": "prime", "name": "primeTv", "link": prime.link, "type": prime.type});
                break;
            }
        });
    }    
</script>

<div class="grid xs:grid-cols-1 md:grid-cols-4 md:gap-4">
    <div class="md:col-span-1 xs:hidden md:block">
        <Image src="{movie.posterURLs["342"]}" alt="" loading="lazy" width="200px" height="300px" />
        <MovieInfo {movie} />
    </div>
    <div class="md:col-span-3">
        <div class="xs:flex xs:justify-center md:hidden">
            <Image src="{movie.posterURLs["342"]}" alt="" loading="lazy" width="200px" height="300px" />
        </div>
        <div>
            <h4>{movie.title} ({movie.year})</h4>
            <p class="text-sm">Titre original : {movie.originalTitle}</p>
            <p>Genre : 
                {#each movie.genres as genre, i}
                    {#if i !== genresCount }
                        {genre.name},&nbsp;
                    {:else}
                        {genre.name}
                    {/if}
                {/each}
            </p>
        </div>
        <div class="my-4">
            <p class="underline">Description :</p>
            <p class="ml-2">
                {movie.overview}
            </p>
        </div>
        <div class="my-2 flex justify-center items-center">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/{movie.youtubeTrailerVideoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        {#if streamingList.length > 0}
            <div class="my-4 bg-slate-950 px-6 py-4 rounded-md">
                <p class="text-lg">
                    Disponible en streaming sur : 
                    <span 
                        class="hover:text-gray-700"
                        data-twe-toggle="tooltip"
                        data-twe-placement="top"
                        data-twe-ripple-init
                        data-twe-ripple-color="light"
                        title="Certaines offres peuvent nécessiter un abonnement supplémentaire"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                        </svg>
                    </span>
                </p>
                <div class="flex my-2 bg-slate-900 p-2 rounded-md overflow-x-scroll">
                    {#if streamingList.length > 0}
                        {#each streamingList as streaming}
                            <div class="flex-none py-6 px-3 first:pl-6 last:pr-6">
                                <div class="block col-span-2 flex  flex-col justify-center items-center">
                                    <a href="{streaming.link}" class="underline bg-slate-700 p-6 rounded-lg hover:text-slate-400 hover:cursor-pointer hover:bg-slate-600" target="_blank" rel="noopener">
                                        <div class="grid grid-rows-3 gap-0 text-center">
                                            {#if streaming.id == "netflix"}
                                                <div class="row-span-2">
                                                    <img src="/img/streaming/netflix.webp" height="50" width="50" class="rounded-lg" alt="Netflix" />
                                                </div>
                                                <div>
                                                    {streaming.name}<br />
                                                </div>
                                            {:else if streaming.id == "apple"}
                                                <div class="row-span-2">
                                                    <Image src="/img/streaming/itunes.webp" height="50" width="50" class="rounded-md" />
                                                </div>
                                                <div>
                                                    {streaming.name}<br />
                                                </div>
                                            {:else if streaming.id == "prime"}
                                                <div class="row-span-2 flex item-center justify-between">
                                                    <img src="/img/streaming/amazonprimevideo.webp" height="50" width="50" class="rounded-lg" alt="Amazon Prime" />
                                                </div>
                                                <div>
                                                    {streaming.name}<br />
                                                </div>
                                            {:else}
                                                <div class="row-span-3 flex item-center justify-between">
                                                    {streaming.name}<br />
                                                </div>
                                            {/if}
                                        </div>
                                    </a>
                                </div>
                            </div>
                        {/each}
                    {:else}
                            <p class="text-center">Indisponible pour le moment</p>
                    {/if}
                </div>
            </div>
        {:else}
            <p>
                <span class="underline">Streaming</span><br />
                Il n'y a, à l'heure actuelle, aucune possibilité de visionner ce film en streaming sur des plateformes légales
            </p>
        {/if}
        <div class="my-20">
            <p>Casting : </p>
            <p>
                {#each movie.cast as acteur, i}
                    {#if i !== castCount }
                        <a class="underline hover:text-slate-600 hover:cursor-pointer" href="https://www.google.com/search?q={voca.replaceAll(acteur, ' ', '+')}" target="_blank" rel="noopener">{acteur}</a>,&nbsp;
                    {:else}
                        <a class="underline hover:text-slate-600 hover:cursor-pointer" href="https://www.google.com/search?q={voca.replaceAll(acteur, ' ', '+')}" target="_blank" rel="noopener">{acteur}</a>
                    {/if}
                {/each}
            </p>
            <div class="md:hidden">
                <MovieInfo {movie} />
            </div>
        </div>
    </div>
</div>