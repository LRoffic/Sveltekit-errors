<script>
	import Article from "$components/articles/ArticleList.svelte";
	import ArticleLoading from "$components/articles/ArticleListLoading.svelte";

	import Twitch from "$components/Twitch.svelte";

	export let articles;
</script>

<div class="grid gap-6 lg:grid-cols-4">
	<Twitch design="article" />
	{#await articles}
		<ArticleLoading />
		<ArticleLoading />
		<ArticleLoading />
		<ArticleLoading />
	{:then articles}
		{#if articles}
			{#each articles as article}
				<Article {article} />
			{/each}
		{:else}
			<div class="col-span-4 text-4xl text-white">
				Aucun article à vous présenter pour le moment
			</div>
			<ArticleLoading />
			<ArticleLoading />
			<ArticleLoading />
			<ArticleLoading />
		{/if}
	{/await}
</div>