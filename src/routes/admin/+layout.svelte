<script lang="ts">
	import { onMount } from "svelte";
	import { slide, fly } from "svelte/transition";
	import { quintOut } from "svelte/easing";
	import { page } from "$app/stores";

	//Icons
	import {
		AlignJustify,
		ChartSpline,
		Video,
		Link,
		Mail,
		LogOut,
		ChevronUp,
		Timer,
		List,
		Tags,
		Tag,
		UsersRound,
		Medal,
		Settings
	} from "lucide-svelte";

	import { log } from "$utils/debug";
	import { checkActive } from "$utils/checkActive"

	import Template from "$templates/Template.svelte";

	let sideHidden = true;

	let sideCollapseBtnBgColor = "bg-gray-100";
	let sideCollapseBtnTxtColor = "text-gray-600";

	let pathname = $page.url.pathname;

	const active = "group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-slate-800";
	const notactive = "group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"

	const activeCollapse = "flex fw-32 block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700";
	const notactiveCollapse = "block rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-700";
	
	$: session = $page.data.session

	onMount(async () => {
		const { Collapse, Ripple, initTWE } = await import("tw-elements");

		initTWE({ Collapse, Ripple });
	});

	let hideSide = () => {
		sideHidden = !sideHidden

		if(sideHidden){
			sideCollapseBtnBgColor = "bg-zinc-800";
			sideCollapseBtnTxtColor = "text-gray-100";
		} else {
			sideCollapseBtnBgColor = "bg-gray-100";
			sideCollapseBtnTxtColor = "text-gray-600";
		}
	}
</script>

<svelte:head>
	<title>Administration</title>
</svelte:head>

<div class="xs:h-20 lg:h-14"></div>
<Template>
	<div class="fixed bottom-0 left-0 xs:top-16 lg:top-14">
	<div class="sticky flex">
		<div class="z-10 flex flex-col justify-between w-16 h-screen text-white bg-zinc-800">
			<div>
				<div class="inline-flex items-center justify-center size-16">
					<span on:click={hideSide} class="cursor-pointer px-4 {sideHidden ? notactive : active}">
						<AlignJustify />
					</span>
				</div>
  
				<div class="border-t border-gray-600">
		  			<div class="px-2">
						<div class="py-4">
			  				<a href="/admin/" class="{checkActive('/admin', pathname, active, notactive)}">
								<ChartSpline />
								<span class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
									Dashboard
								</span>
			  				</a>
						</div>
  
						<ul class="pt-4 space-y-1 border-t border-gray-600">
			  				<li>
								<a href="/admin/snapchat" class="{checkActive('/admin/snapchat', pathname, active, notactive)}">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-snapchat" viewBox="0 0 16 16"><path d="M15.943 11.526c-.111-.303-.323-.465-.564-.599a1.416 1.416 0 0 0-.123-.064l-.219-.111c-.752-.399-1.339-.902-1.746-1.498a3.387 3.387 0 0 1-.3-.531c-.034-.1-.032-.156-.008-.207a.338.338 0 0 1 .097-.1c.129-.086.262-.173.352-.231.162-.104.289-.187.371-.245.309-.216.525-.446.66-.702a1.397 1.397 0 0 0 .069-1.16c-.205-.538-.713-.872-1.329-.872a1.829 1.829 0 0 0-.487.065c.006-.368-.002-.757-.035-1.139-.116-1.344-.587-2.048-1.077-2.61a4.294 4.294 0 0 0-1.095-.881C9.764.216 8.92 0 7.999 0c-.92 0-1.76.216-2.505.641-.412.232-.782.53-1.097.883-.49.562-.96 1.267-1.077 2.61-.033.382-.04.772-.036 1.138a1.83 1.83 0 0 0-.487-.065c-.615 0-1.124.335-1.328.873a1.398 1.398 0 0 0 .067 1.161c.136.256.352.486.66.701.082.058.21.14.371.246l.339.221a.38.38 0 0 1 .109.11c.026.053.027.11-.012.217a3.363 3.363 0 0 1-.295.52c-.398.583-.968 1.077-1.696 1.472-.385.204-.786.34-.955.8-.128.348-.044.743.28 1.075.119.125.257.23.409.31a4.43 4.43 0 0 0 1 .4.66.66 0 0 1 .202.09c.118.104.102.26.259.488.079.118.18.22.296.3.33.229.701.243 1.095.258.355.014.758.03 1.217.18.19.064.389.186.618.328.55.338 1.305.802 2.566.802 1.262 0 2.02-.466 2.576-.806.227-.14.424-.26.609-.321.46-.152.863-.168 1.218-.181.393-.015.764-.03 1.095-.258a1.14 1.14 0 0 0 .336-.368c.114-.192.11-.327.217-.42a.625.625 0 0 1 .19-.087 4.446 4.446 0 0 0 1.014-.404c.16-.087.306-.2.429-.336l.004-.005c.304-.325.38-.709.256-1.047Zm-1.121.602c-.684.378-1.139.337-1.493.565-.3.193-.122.61-.34.76-.269.186-1.061-.012-2.085.326-.845.279-1.384 1.082-2.903 1.082-1.519 0-2.045-.801-2.904-1.084-1.022-.338-1.816-.14-2.084-.325-.218-.15-.041-.568-.341-.761-.354-.228-.809-.187-1.492-.563-.436-.24-.189-.39-.044-.46 2.478-1.199 2.873-3.05 2.89-3.188.022-.166.045-.297-.138-.466-.177-.164-.962-.65-1.18-.802-.36-.252-.52-.503-.402-.812.082-.214.281-.295.49-.295a.93.93 0 0 1 .197.022c.396.086.78.285 1.002.338.027.007.054.01.082.011.118 0 .16-.06.152-.195-.026-.433-.087-1.277-.019-2.066.094-1.084.444-1.622.859-2.097.2-.229 1.137-1.22 2.93-1.22 1.792 0 2.732.987 2.931 1.215.416.475.766 1.013.859 2.098.068.788.009 1.632-.019 2.065-.01.142.034.195.152.195a.35.35 0 0 0 .082-.01c.222-.054.607-.253 1.002-.338a.912.912 0 0 1 .197-.023c.21 0 .409.082.49.295.117.309-.04.56-.401.812-.218.152-1.003.638-1.18.802-.184.169-.16.3-.139.466.018.14.413 1.991 2.89 3.189.147.073.394.222-.041.464Z"></path></svg>
									<span class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
										Snapchat
				  					</span>
								</a>
							</li>
  
							<li>
								<a href="https://videos.lripsum.net" target="_blank" class="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
									<Video  />
									<span class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
										Peertube
				  					</span>
								</a>
			  				</li>

							<li>
								<a href="https://url.lripsum.net/admin/" target="_blank" class="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
									<Link />
									<span class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
										Short URL
									</span>
								</a>
			  				</li>
  
			  				<li>
								<a href="https://news.lripsum.net/admin/" target="_blank" class="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
									<Mail />
									<span class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
										Newsletter
									</span>
								</a>
			  				</li>
						</ul>
					</div>
				</div>
	  		</div>
  
			<div class="sticky inset-x-0 bottom-0 p-2 mb-32">
		 		<a href="/logout/{session.token}" class="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700">
					<LogOut />
					<span class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
						Logout
					</span>
				</a>
	  		</div>
		</div>
	{#if !sideHidden}
		<div class="sticky z-0 flex flex-col justify-between flex-1 h-screen text-gray-100 bg-gray-600" transition:fly={{x: -1000}}>
			<div class="px-4 py-6 overflow-auto">
				<ul class="space-y-1 mt-14">
					<li>
						<a href="/admin" class="{checkActive("/admin", pathname, activeCollapse, notactiveCollapse)}">
							<span class="flex text-sm font-medium align-middle">
								<ChartSpline />
								&nbsp; Dashboard
							</span>
						</a>
					</li>
	
					<li>
						<a 
							class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-100 hover:text-gray-700
							aria-[expanded=true]:text-green-400 group"
							href="#linksArticles"
							data-twe-collapse-init
							data-twe-ripple-init
							data-twe-ripple-color="light"
						>
								<span class="flex text-sm font-medium align-middle">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-newspaper" viewBox="0 0 16 16"><path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z"></path><path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z"></path></svg>
									&nbsp; Gestion des Articles
								</span>
								
								<span class="shrink-0 transition duration-300 group-open:-rotate-180  group-aria-[expanded=true]:-rotate-180">
									<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
								</span>
						</a>

						<ul class="mt-2 space-y-1 px-8 !visible hidden"  data-twe-collapse-item id="linksArticles">
							<li>
								<a href="#" class="flex block px-4 py-2 text-sm font-medium align-middle rounded-lg hover:bg-gray-100 hover:text-gray-700">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path></svg>
									&nbsp; Écrire un article
								</a>
							</li>

							<li>
								<a href="#" class="flex block px-4 py-2 text-sm font-medium align-middle rounded-lg hover:bg-gray-100 hover:text-gray-700">
									<Timer />
									&nbsp; Reprendre un brouillon
								</a>
							</li>

							<li>
								<a href="#" class="flex block px-4 py-2 text-sm font-medium align-middle rounded-lg hover:bg-gray-100 hover:text-gray-700">
									<List />
									&nbsp; Gérer les articles
								</a>
							</li>

							<li>
								<a href="#" class="flex block px-4 py-2 text-sm font-medium align-middle rounded-lg hover:bg-gray-100 hover:text-gray-700">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path></svg>
									&nbsp; Gérer les commentaires
								</a>
							</li>
						</ul>
					</li>
	
					<li>
						<a 
							class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-100 hover:text-gray-700
							aria-[expanded=true]:text-green-400 group"
							href="#linksCategories"
							data-twe-collapse-init
							data-twe-ripple-init
							data-twe-ripple-color="light"
						>
								<span class="flex text-sm font-medium">
									<Tags />
									&nbsp; Gestion des Catégories
								</span>
								
								<span class="shrink-0 transition duration-300 group-open:-rotate-180  group-aria-[expanded=true]:-rotate-180">
									<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
								</span>
						</a>

						<ul class="mt-2 space-y-1 px-8 !visible hidden"  data-twe-collapse-item id="linksCategories">
							<li>
								<a href="/admin/category/add" class="flex block px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 hover:text-gray-700">
									<Tag />
									&nbsp; Ajouter une catégorie
								</a>
							</li>

							<li>
								<a href="#" class="flex block px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 hover:text-gray-700">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-tags-fill" viewBox="0 0 16 16"><path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path><path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z"></path></svg>
									&nbsp; Ajouter une sous-catégorie
								</a>
							</li>

							<li>
								<a href="/admin/categories" class="flex block px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 hover:text-gray-700">
									<List />
									&nbsp; Gérer les catégories
								</a>
							</li>
						</ul>
					</li>
	
					<li>
						<a href="/admin/snapchat" class="flex block px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 hover:text-gray-700">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-snapchat" viewBox="0 0 16 16"><path d="M15.943 11.526c-.111-.303-.323-.465-.564-.599a1.416 1.416 0 0 0-.123-.064l-.219-.111c-.752-.399-1.339-.902-1.746-1.498a3.387 3.387 0 0 1-.3-.531c-.034-.1-.032-.156-.008-.207a.338.338 0 0 1 .097-.1c.129-.086.262-.173.352-.231.162-.104.289-.187.371-.245.309-.216.525-.446.66-.702a1.397 1.397 0 0 0 .069-1.16c-.205-.538-.713-.872-1.329-.872a1.829 1.829 0 0 0-.487.065c.006-.368-.002-.757-.035-1.139-.116-1.344-.587-2.048-1.077-2.61a4.294 4.294 0 0 0-1.095-.881C9.764.216 8.92 0 7.999 0c-.92 0-1.76.216-2.505.641-.412.232-.782.53-1.097.883-.49.562-.96 1.267-1.077 2.61-.033.382-.04.772-.036 1.138a1.83 1.83 0 0 0-.487-.065c-.615 0-1.124.335-1.328.873a1.398 1.398 0 0 0 .067 1.161c.136.256.352.486.66.701.082.058.21.14.371.246l.339.221a.38.38 0 0 1 .109.11c.026.053.027.11-.012.217a3.363 3.363 0 0 1-.295.52c-.398.583-.968 1.077-1.696 1.472-.385.204-.786.34-.955.8-.128.348-.044.743.28 1.075.119.125.257.23.409.31a4.43 4.43 0 0 0 1 .4.66.66 0 0 1 .202.09c.118.104.102.26.259.488.079.118.18.22.296.3.33.229.701.243 1.095.258.355.014.758.03 1.217.18.19.064.389.186.618.328.55.338 1.305.802 2.566.802 1.262 0 2.02-.466 2.576-.806.227-.14.424-.26.609-.321.46-.152.863-.168 1.218-.181.393-.015.764-.03 1.095-.258a1.14 1.14 0 0 0 .336-.368c.114-.192.11-.327.217-.42a.625.625 0 0 1 .19-.087 4.446 4.446 0 0 0 1.014-.404c.16-.087.306-.2.429-.336l.004-.005c.304-.325.38-.709.256-1.047Zm-1.121.602c-.684.378-1.139.337-1.493.565-.3.193-.122.61-.34.76-.269.186-1.061-.012-2.085.326-.845.279-1.384 1.082-2.903 1.082-1.519 0-2.045-.801-2.904-1.084-1.022-.338-1.816-.14-2.084-.325-.218-.15-.041-.568-.341-.761-.354-.228-.809-.187-1.492-.563-.436-.24-.189-.39-.044-.46 2.478-1.199 2.873-3.05 2.89-3.188.022-.166.045-.297-.138-.466-.177-.164-.962-.65-1.18-.802-.36-.252-.52-.503-.402-.812.082-.214.281-.295.49-.295a.93.93 0 0 1 .197.022c.396.086.78.285 1.002.338.027.007.054.01.082.011.118 0 .16-.06.152-.195-.026-.433-.087-1.277-.019-2.066.094-1.084.444-1.622.859-2.097.2-.229 1.137-1.22 2.93-1.22 1.792 0 2.732.987 2.931 1.215.416.475.766 1.013.859 2.098.068.788.009 1.632-.019 2.065-.01.142.034.195.152.195a.35.35 0 0 0 .082-.01c.222-.054.607-.253 1.002-.338a.912.912 0 0 1 .197-.023c.21 0 .409.082.49.295.117.309-.04.56-.401.812-.218.152-1.003.638-1.18.802-.184.169-.16.3-.139.466.018.14.413 1.991 2.89 3.189.147.073.394.222-.041.464Z"></path></svg>
							&nbsp; Gestion de Snapchat
						</a>
					</li>
	
					<li>
						<a 
							class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-100 hover:text-gray-700
							aria-[expanded=true]:text-green-400 group"
							href="#linksUsers"
							data-twe-collapse-init
							data-twe-ripple-init
							data-twe-ripple-color="light"
						>
								<span class="flex text-sm font-medium">
									<UsersRound />
									&nbsp; Gestion des Utilisateurs
								</span>
								
								<span class="shrink-0 transition duration-300 group-open:-rotate-180  group-aria-[expanded=true]:-rotate-180">
									<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
								</span>
						</a>

						<ul class="mt-2 space-y-1 px-8 !visible hidden"  data-twe-collapse-item id="linksUsers">
							<li>
								<a href="#" class="flex block px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 hover:text-gray-700">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"></path></svg>
									&nbsp; Gérer les utilisateurs
								</a>
							</li>

							<li>
								<a href="#" class="flex block px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 hover:text-gray-700">
									<Medal />
									&nbsp; Gérer les rangs et les permissions
								</a>
							</li>

							<li>
								<a href="#" class="flex block px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 hover:text-gray-700">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465l3.465-3.465Zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465Zm-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"></path></svg>
									&nbsp; Gérer les bans
								</a>
							</li>
						</ul>
					</li>
	
					<li>
						<a href="/admin/config/" class="flex block px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 hover:text-gray-700">
							<Settings />
							&nbsp; Configuration du site
						</a>
					</li>

					<li>
						<a href="https://videos.lripsum.net" target="_blank" class="flex block px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 hover:text-gray-700">
							<Video />
							&nbsp; PeerTube
						</a>
					</li>

					<li>
						<a href="https://url.lripsum.net/admin/" target="_blank" class="flex block px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 hover:text-gray-700">
							<Link />
							&nbsp Short URL
						</a>
					</li>

					<li>
						<a href="https://news.lripsum.net/admin/" target="_blank" class="flex block px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 hover:text-gray-700">
							<Mail />
							&nbsp; Newsletter
						</a>
					</li>
				</ul>
			</div>
		</div>
	{/if}
  </div>
</div>
</Template>
<div class="m-6 ml-20 ">
	<slot></slot>
</div>