<script>
    import { onMount } from 'svelte';
	
	import { page } from '$app/stores';

	import {fade} from 'svelte/transition';

	import axios from 'axios';

	import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime";
	import "dayjs/locale/fr";

    import Lazy from 'svelte-lazy';

	import TemplateAside from "$templates/TemplateAside.svelte";
	
    import ArticleComment from "$components/article/ArticleComments.svelte";
    import ArticleContent from "$components/article/ArticleContent.svelte";
	import ArticleFilmInfo from "$components/article/ArticleFilmInfo.svelte";
	import ArticleOnglet from "$components/article/ArticleOnglet.svelte";
	import ArticleSource from "$components/article/ArticleSource.svelte";
    import Note from "$components/article/ArticleNote.svelte";
	
	import { log, l } from "$utils/debug";

	/** @type {import('./$types').PageData} */
	export let data;

    export let id, slug;

	let movie;

	let article = data.article;

	$: session = $page.data.session;

	let onglet = "article";

    onMount(async () => {
		const { Tooltip, initTWE } = await import("tw-elements");

        initTWE({ Tooltip });
    });

    dayjs.locale("fr");
	dayjs.extend(relativeTime);

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
	
	if(article.imdbid != undefined)
		movie = data.movie.json.result;

	if(isJson(article.content))
		article.content = JSON.parse(article.content);

	if(isJson(article.source))
		article.source = JSON.parse(article.source);
</script>

<div class="relative">
	{#if article.imdbid}
		<div class="absolute block opacity-25">
			<Lazy keep="true">
				<img 
					src="{movie.backdropURLs.original}" 
					alt="" 
					loading="lazy" 
					width="100%" 
					height="100%"
					class="z-0 block w-auto h-full shadow-inner opacity-25"
				/>
			</Lazy>
		</div>
	{/if}
	<div class="absolute top-0 left-0 right-0"  id="top">
		<TemplateAside>
			{#if article}
				<div class="grid grid-cols-4 gap-2 mb-4">
					{#if article.img}
						<div class="col-span-1">
							<Lazy keep="true">
								<img src="{article.img}"  alt="" loading="lazy" />
							</Lazy>
						</div>
					{/if}
					<div class="{article.img ? "col-span-3" : "col-span-4"} text-white">
						<div class="grid h-full gris-rows-3">
							<div class="row-span-1 "></div>
							<div class="flex grid items-center grid-cols-2 row-span-1">
								<div class="grid grid-rows-3 xs:col-span-2 lg:col-span-1">
									<div class="row-span-2">
										<h2>{article.title}</h2>
									</div>
									<div class="inline-block mt-2 text-sm">
										Mise en ligne 
										<span 
											class="underline hover:cursor-default"
											data-twe-toggle="tooltip"
											data-twe-placement="top"
											data-twe-ripple-init
											data-twe-ripple-color="light"
											title="Publié le {dayjs(article.published_date).format("DD/MM/YYYY à HH[h]mm")}"
										>
											{dayjs(parseInt(article.published_date)).fromNow()}
										</span>
										{#if article.update_date}
											<br  />Dernière mise à jour <span  class="underline hover:cursor-default" data-twe-toggle="tooltip" title="Mise à jour le {dayjs(article.update_date).format("DD/MM/YYYY à HH[h]mm")}">{dayjs(parseInt(article.update_date)).fromNow()}</span>
										{/if}
									</div>
								</div>
								{#if article.note}
									<div class="xs:col-span-2 lg:col-span-1 lg:text-center">
											<div class="flex lg:justify-center">
												<Note note={article.note} w="55%"></Note>
											</div>
											Ma note : {article.note}/5
											{#if article.imdbid}
												<br />Note imdb : {movie.imdbRating}/100
											{/if}
									</div>
								{/if}
							</div>
							{#if article.imdbid}
								<div class="flex items-end xs:hidden lg:block row-col-1">
									<ArticleOnglet bind:onglet={onglet}></ArticleOnglet>
								</div>
							{/if}
						</div>
					</div>
				</div>
				{#if article.imdbid}
					<div class="flex items-end lg:hidden xs:block row-col-1">
						<ArticleOnglet bind:onglet={onglet} navigateur="mobile"></ArticleOnglet>
					</div>
				{/if}
				<div class="block p-4 text-white rounded-lg shadow-lg bg-slate-800">
					{#if article.imdbid}
						{#if onglet == "article"}
							<div transition:fade={{duration: 500}}>
								<ArticleContent content={article.content} />
								{#if article.source}
									<ArticleSource sources={article.source} />
								{/if}
							</div>
						{:else}
							<div transition:fade={{duration: 500}}>
								<ArticleFilmInfo {movie} />
							</div>
						{/if}
					{:else}
						<ArticleContent content={article.content} />
						{#if article.source}
							<ArticleSource sources={article.source} />
						{/if}
					{/if}
				</div>  
				{#if article.imdbid}
					<div class="flex items-end xs:hidden lg:block row-col-1">
						<ArticleOnglet bind:onglet={onglet}></ArticleOnglet>
					</div>
				{/if}
				{#if article.imdbid}
					<div class="flex items-end lg:hidden xs:block row-col-1">
						<ArticleOnglet bind:onglet={onglet} navigateur="mobile"></ArticleOnglet>
					</div>
				{/if}
				<ArticleComment article_id={article.id} />
			{:else}
				<h2>Article introuvable ou innexistant</h2>
			{/if}
		</TemplateAside>
	</div>
</div>