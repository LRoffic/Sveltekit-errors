<script lang="ts">
	import { page } from "$app/stores";
	import { onMount } from "svelte";

	import Lazy from "svelte-lazy";

	import checkPermissions from "$utils/checkPermissions";
	import { randomInt } from "$utils/random";

	import PrimaryButton from "$components/PrimaryButton.svelte";
	import SecondaryButton from "$components/SecondaryButton.svelte";

	onMount(async () => {
		const { Collapse, Tooltip, Ripple, initTWE } = await import("tw-elements");

		initTWE({ Collapse, Tooltip, Ripple });
	});

	let InstantGaming = randomInt(23) + 1;

	$: session = $page.data.session;
	$: permissions = $page.data.session.permissions;
</script>

<div class="order-last p-6 rounded-lg shadow-lg md:top-20 lg:col-span-2 md:col-span-full sm:col-span-full bg-slate-800 h-min">
	<div class="container mx-auto text-white">
		{#key session}
			{#if !session.userid}
				<a href="/login">
					<PrimaryButton>Se connecter</PrimaryButton>
				</a>
				<a href="/signup">
					<SecondaryButton>Créer un compte</SecondaryButton>
				</a>
			{:else}
				<span class="text-xl">
					Bienvenue <b class="underline bold decoration-green-400">{session.username}</b>
				</span>
				<div class="pt-2">
					<div class="flex items-start">
						<div class="flex flex-col flex-wrap w-full pl-0 mr-4 overflow-y-auto">
							<ul class="list-none" role="tablist" data-twe-nav-ref>
								{#key permissions}
									{#if checkPermissions(["ACCESS_ADMIN"], permissions, true) == true}
										<li>
											<button
												class="block w-full px-6 py-4 mt-2 text-center text-white transition ease-in-out rounded shadow-md durati1on-150 bg-slate-900 hover:bg-green-500 hover:text-black hover:cursor-pointer"
												type="button"
												data-twe-collapse-init
												data-twe-ripple-init
												data-twe-ripple-color="light"
												data-twe-target="#collapseAdmin"
												aria-expanded="false"
												aria-controls="collapseAdmin"
											>
												Administration
											</button>
											<div
												class="!visible hidden"
												id="collapseAdmin"
												data-twe-collapse-item
												data-twe-animation-init
												data-twe-animation-reset="true"
												data-twe-animation="[fade-in_1s_ease-in-out]"
											>
												<ul>
													<li>
														<a href="/admin/">
															<PrimaryButton>Accueil</PrimaryButton>
														</a>
													</li>
													<li>
														<a href="/admin/snapchat">
															<PrimaryButton>Gérer les snaps</PrimaryButton>
														</a>
													</li>
													{#if checkPermissions("WRITE_ARTICLE", permissions) == true}
														<li>
															<a href="/admin/article/write/">
																<PrimaryButton>Écrire un article</PrimaryButton>
															</a>
														</li>
													{/if}
													{#if checkPermissions("MANAGE_ARTICLES", permissions) == true}
														<li>
															<a href="/admin/articles/">
																<PrimaryButton>
																	Gérer les articles
																</PrimaryButton>
															</a>
														</li>
													{/if}
													{#if checkPermissions("MANAGE_CATEGORIES", permissions) == true}
														<li>
															<a href="/admin/categories/">
																<PrimaryButton>
																	Gérer les categories
																</PrimaryButton>
															</a>
														</li>
													{/if}
													<li>
														<a href="/admin/bans/">
															<PrimaryButton>Gérer les bans</PrimaryButton>
														</a>
													</li>
												</ul>
											</div>
										</li>
									{/if}
								{/key}
								<li>
									<a href="/params">
										<PrimaryButton>Paramètres</PrimaryButton>
									</a>
								</li>
								<li>
									<a href="/logout/{session.token}/">
										<PrimaryButton>Déconnexion</PrimaryButton>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			{/if}
		{/key}
		<hr class="my-2" />
		<a href="https://url.lripsum.net/snapchat" class="group/snapchat" target="_blank" rel="noopener nofollow">
			<h2 class="text-xl underline decoration-[#FFFC00] group-hover/snapchat:text-[#FFFC00] decoration-4 mb-2">
				Snapchat :
			</h2>
			<Lazy keep="true">
				<img src="/img/Snapcode.png" class="w-full rounded-[35px] h-1/3 border-transparent group-hover/snapchat:border-[#FFFC00] border-4 group-hover/snapchat:shadow-lg my-2 overflow-hidden" alt="Snapcode"/>
			</Lazy>
			<div class="flex flex-row">
				<div class="flex-initial basis-1/4"></div>
				<div class="flex-initial text-center basis-1/2">
					<div class="w-fit mx-50 text-xl inline-block bg-black py-2 px-2 bold rounded selection:bg-[#FFFC00] selection:text-black selection:underline selection:decoration-black decoration-4">
						<div class="inline group-hover/snapchat:decoration-[#F7971E] group-hover/snapchat:decoration-4 group-hover/snapchat:underline" >
							LRip
						</div>
						<div class="inline bg-[#F7971E] text-black p-1 rounded ml-0.25 mr-0 text-center group-hover/snapchat:decoration-4 group-hover/snapchat:decoration-black no-underline group-hover/snapchat:underline">
							sum
						</div>
					</div>
				</div>
				<div class="flex-initial basis-1/4"></div>
			</div>
		</a>
		<hr class="my-2" />
		<div class="flex items-center justify-center">
			<a href="https://url.lripsum.net/fb" class="hover:text-[#3b5999]" target="_blank" rel="noopener nofollow"
				data-twe-toggle="tooltip"
				data-twe-placement="bottom"
				data-twe-ripple-init
				data-twe-ripple-color="light"
				title="Facebook"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-10 fill-white hover:fill-[#3b5999] inline-block mx-2" viewBox="0 0 448 512">
					<!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
					<path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"/>
				</svg>
			</a>			
			<a href="https://url.lripsum.net/twitch" class="hover:text-[#9047FF]" target="_blank" rel="noopener nofollow"
				data-twe-toggle="tooltip"
				data-twe-placement="bottom"
				data-twe-ripple-init
				data-twe-ripple-color="light"
				title="Twitch"
			>
				<i class="mx-2 bi bi-twitch" style="font-size: 2.5rem"></i>
			</a>
			<a href="https://url.lripsum.net/yt" class="hover:text-[#FF0000]" target="_blank" rel="noopener nofollow"
				data-twe-toggle="tooltip"
				data-twe-placement="bottom"
				data-twe-ripple-init
				data-twe-ripple-color="light"
				title="Youtube"
			>
				<i class="mx-2 bi bi-youtube" style="font-size: 2.5rem"></i>
			</a>
		</div>
		<hr class="my-2" />
		<a href="https://url.lripsum.net/ig" class="group/InstantGaming" target="_blank" rel="noopener nofollow">
			<h2 class="text-xl underline decoration-[#FF5400] group-hover/InstantGaming:decoration-[black] group-hover/InstantGaming:text-[#FF5400] decoration-4">
				Instant Gaming :
			</h2>
			<Lazy keep="true">
				<img
					src="/img/Pub/InstantGaming/InstantGaming{InstantGaming}.png"
					class="w-full my-2 rounded rounded-lg group-hover/InstantGaming:shadow-lg group-hover/InstantGaming:border-[#FF5400] border-4 border-transparent"
					alt="Instant Gaming"
				/>
			</Lazy>
		</a>
		<hr class="my-2" />
		<a href="https://url.lripsum.net/dashlane" class="group/dashlane" target="_blank" rel="noopener nofollow">
			<h2 class="text-xl underline decoration-[#215e6e] group-hover/dashlane:text-[#215e6e] decoration-4 mb-2">
				Parrainage Dashlane :
			</h2>
			<Lazy keep="true">
				<img
					src="/img/Dashlane_logo.png"
					class="w-full my-2 rounded-lg hover:shadow-xl border-4 border-[#12343d] hover:border-white"
					alt="Dashlane"
				/>
			</Lazy>
		</a>
	</div>
</div>
