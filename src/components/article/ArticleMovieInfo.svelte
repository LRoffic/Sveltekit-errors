<script>
    import voca from 'voca';
    
    export let movie
    
    let countryCount      = movie.countries.length-1;
    let directorsCount    = movie.directors.length-1;

    function toHoursAndMinutes(totalMinutes) {
        const minutes = totalMinutes % 60;
        const hours = Math.floor(totalMinutes / 60);

        return {hours, minutes};
    }
</script>

<p class="my-2">
    Type : 
    {#if movie.type == "movie"}
        Film
    {:else}
        Série
    {/if}
</p>
<hr />
<p class="my-2">"{movie.tagline}""</p>
<hr />
<p class="my-2">
    Pays de production :
    {#each movie.countries as country, i}
        {#if i !== countryCount}
            {country},&nbsp;
        {:else}
            {country}
        {/if}
    {/each}
</p>
<hr />
<p class="my-2">
    Âge minimum conseillé : {movie.advisedMinimumAudienceAge} ans
</p>
<hr />
<p class="my-2">
    Durée : {toHoursAndMinutes(movie.runtime).hours} heures 
    {#if toHoursAndMinutes(movie.runtime).minutes > 0}et {toHoursAndMinutes(movie.runtime).minutes} minutes{/if}
</p>
<hr />
<p class="my-2">
    Réalisateur : 
    {#each movie.directors as director, i}
        {#if i !== directorsCount}
            <a class="underline hover:text-slate-600 hover:cursor-pointer" href="https://www.google.com/search?q={voca.replaceAll(director, ' ', '+')}" target="_blank" rel="noopener">{director}</a>,$nbsp;
        {:else}
            <a class="underline hover:text-slate-600 hover:cursor-pointer" href="https://www.google.com/search?q={voca.replaceAll(director, ' ', '+')}" target="_blank" rel="noopener">{director}</a>
        {/if}
    {/each}
</p>