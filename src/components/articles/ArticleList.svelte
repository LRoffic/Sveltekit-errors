<script>
	import { goto } from "$app/navigation";

	import voca from "voca";

	import dayjs from "dayjs";
	import relativeTime from "dayjs/plugin/relativeTime";
	import "dayjs/locale/fr";

	import { Image } from "svelte-lazy-loader";
	import { log } from "$utils/debug";

	dayjs.locale("fr");
	dayjs.extend(relativeTime);

	export let article;

	let col;

	let articleLink =
		"/article/" + article.id + "/" + voca.slugify(article.title);

	if (article.img !== undefined) {
		col = "md:col-span-2";
	} else {
		col = "md:col-span-3";
	}
</script>

<div
	class="h-full lg:col-span-2 xs:col-span-4 group hover:cursor-pointer"
	on:click={() => goto(articleLink)}
>
	<div class="block h-full rounded-lg shadow-lg bg-slate-800">
		{#if article.img}
			<span class="object-contain w-full xs:block md:hidden">
				<Image
					src={article.img}
					alt=""
					loading="lazy"
					classes="w-full h-full rounded-t-lg"
					style="height: 100%; width: auto"
				/>
			</span>
		{/if}
		<div class="md:grid md:grid-cols-3 md:gap-2 md:h-full">
			{#if article.img}
				<div class="md:col-span-1">
					<span class="md:block xs:hidden md:w-auto !h-full object-contain">
						<Image
							src={article.img}
							alt=""
							loading="lazy"
							classes="w-auto h-full rounded-l-lg"
							style="height: 100%; width: auto"
						/>
					</span>
				</div>
			{/if}
			<div class="md:relative {col} p-2">
				<div class="grid h-full grid-flow-col grid-rows-5 gap-4">
					<div class="row-span-3">
						<div class="justify-start pt-2">
							<h5 class="mb-2 ml-2 text-xl font-medium text-gray-400">
								<span class="group-hover:text-white group-hover:underline">
									{voca.titleCase(article.title)}
								</span>
							</h5>
							<p
								class="block pr-4 mb-4 ml-2 text-base text-gray-500 line-clamp-3"
							>
								{#if article.description != null}
									{voca.prune(article.description, 150, "(Lire la suite...")}
								{/if}
							</p>
						</div>
					</div>
					<div class="row-span-2">
						<div class="grid h-full grid-cols-6 place-content-end">
							<div class="col-span-2"></div>
							<div
								class="bottom-0 block col-span-4 pb-2 mt-2 mr-2 align-bottom align-right text-end right-2"
							>
								<a
									href="/article/{article.id}/{voca.slugify(article.title)}"
									class="px-4 py-2 text-center text-white transition ease-in-out rounded w-50 durati1on-150 hover:shadow-md hover:bg-green-500 hover:text-black hover:cursor-pointer"
								>
									Lire l'article >>
								</a>
								<div class="mt-2 text-xs text-gray-500">
									Mise en ligne le {dayjs(article.published_date).format(
										"DD/MM/YYYY à HH[h]mm",
									)}
								</div>
								<div class="text-xs text-gray-500">
									Dernière mise à jour {dayjs(
										parseInt(article.update_date),
									).fromNow()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
