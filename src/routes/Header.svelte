<script lang="ts">
	import { onMount } from "svelte";
	import { page } from '$app/stores';
	
	$: session = $page.data.session

	let pathname = $page.url.pathname;

	let active = "text-white hover:text-gray-500 transition duration-300 ease-in";
	let notactive = "text-neutral-500 hover:text-white focus:text-gray-700 p-0 transition duration-300 ease-in";

	onMount(async () => {
		const { Collapse, initTWE } = await import("tw-elements");

		initTWE({ Collapse });
	});
	
	function checkActive(path: string) {

		if(pathname === path) 
			return active;
		
		return notactive;
	}
</script>

<nav class="fixed top-0 z-50 flex flex-no-wrap items-center justify-between w-full py-4 mb-10 text-gray-200 shadow-lg bg-slate-800 shadow-black/10 lg:flex-wrap lg:justify-start" data-twe-navbar-ref>
	<div class="flex flex-wrap items-center justify-between w-full px-6">
		<button
			class="block border-0 bg-transparent py-2 px-2.5 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
			type="button"
			data-twe-collapse-init
			data-twe-target="#navbarSupportedContent1"
			aria-controls="navbarSupportedContent1"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="[&>svg]:w-7">
				<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="h-7 w-7"
				>
					<path
						fill-rule="evenodd"
						d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
						clip-rule="evenodd"
					/>
				</svg>
			</span>
		</button>	
		<div id="navbarSupportedContent1" class="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto xs:text-4xl lg:text-base" data-twe-collapse-item>
			<a class="pr-2 font-semibold text-white xs:text-4xl lg:text-xl hover:underline" href="/">LRipsum</a>
			<ul class="flex flex-col list-style-none me-auto ps-0 lg:mt-1 lg:flex-row" data-twe-navbar-nav-ref>
				<li class="mx-2 ps-2 lg:my-0 lg:pe-1 lg:ps-2" data-twe-nav-item-ref>
					<a href="/" class="{checkActive("/")}">
						Home
					</a>
				</li>
				<li class="hidden mx-2 ps-2 lg:my-0 lg:pe-1 lg:ps-2" data-twe-nav-item-ref>
					<a href="/" class="{checkActive("/categories")}">Catégories</a>
				</li>
				<li class="mx-2 ps-2 lg:my-0 lg:pe-1 lg:ps-2" data-twe-nav-item-ref>
					<a href="https://www.justwatch.com/shared?id=tl-us-9e1e72b1-a2ec-400d-be24-f0b658d66fe8" target="_blank" class="{notactive}">
						Films coup de cœur
					</a>
				</li>
				<li class="mx-2 ps-2 lg:my-0 lg:pe-1 lg:ps-2" data-twe-nav-item-ref>
					<a href="/snapchat" class="{checkActive("/snapchat")}">Story Snapchat</a>
				</li>
				<li class="mx-2 ps-2 lg:my-0 lg:pe-1 lg:ps-2" data-twe-nav-item-ref>
					<a href="/about" class="{checkActive("/about")}">À propos</a>
				</li>
				<li class="hidden mx-2 ps-2 lg:my-0 lg:pe-1 lg:ps-2" data-twe-nav-item-ref>
					<a href="/" class="{checkActive("/contact")}">Contact</a>
				</li>
			</ul>
		</div>
		<!-- Collapsible wrapper -->
		
		<!-- Right elements -->
		{#key session}
			{#if !session.userid}
				<div class="relative flex items-center">
					<ul class="flex flex-col pl-0 mr-auto list-style-none lg:flex-row xs:text-2xl lg:text-base" data-twe-navbar-nav-ref>
						<li class="mx-2 ps-2 lg:my-0 lg:pe-1 lg:ps-2" data-twe-nav-item-ref>
							<a href="/login" class="{checkActive("/login")}">
								Connexion
							</a>
						</li>
						<li class="mx-2 ps-2 lg:my-0 lg:pe-1 lg:ps-2" data-twe-nav-item-ref>
							<a href="/signup" class="{checkActive("/signup")}">
								Inscription
							</a>
						</li>
					</ul>
				</div>
			{:else}
				<div class="relative flex items-center">
					<ul class="flex flex-col pl-0 mr-auto list-style-none lg:flex-row" data-twe-navbar-nav-ref>
						<a href="/params" class="mx-2 text-white opacity-60 hover:opacity-80 focus:opacity-80">
							<svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
								<path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
							</svg>
						</a>
						<a href="/logout/{session.token}" class="flex items-center mx-2 text-white opacity-60 hover:opacity-80 focus:opacity-80 hidden-arrow">
							<svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" class="bi bi-door-open-fill" viewBox="0 0 16 16">
								<path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
							</svg>
						</a>
					</ul>
				</div>
			{/if}
		{/key}
		<!-- Right elements -->
	</div>
</nav>