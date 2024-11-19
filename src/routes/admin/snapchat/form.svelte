<script>
	import { page } from "$app/stores";
	import { browser, dev } from "$app/environment";

	import axios from "axios";

	import Swal from "sweetalert2";

	import Lazy from "svelte-lazy";

	import Snap from "$components/Snap.svelte";

	import CheckBox from "$components/form/elements/CheckBox.svelte";
	import Input from "$components/form/elements/Input.svelte";

	import SecondaryButton from "$components/SecondaryButton.svelte";
	import PrimaryButton from "$components/PrimaryButton.svelte";

	import { onMount } from "svelte";

	import checkPermission from "$utils/checkPermissions";

	import { log } from "$utils/debug";

	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.onmouseenter = Swal.stopTimer;
			toast.onmouseleave = Swal.resumeTimer;
		},
	});

	$: session = $page.data.session;
	$: permissions = session.permissions;

	let onglet = "img";
	let content, fcburl, embed, thumbnailPath, file, input;
	let title, list;
	let socialNetwork = dev ? false : true;
	let image;
	let published = true;
	let show;

	onMount(async () => {
		image = document.getElementById("image");
	});

	let snaps = [];

	const peertube = "https://videos.lripsum.net";
	const peertube_api = "/api/v1/videos/";

	let loading = false;

	async function sendSnap() {
		let sendList, sendSocialNetwork, sendPublished;

		loading = true;

		if (list === true) sendList = "black";
		else sendList = "public";

		if (socialNetwork == true) sendSocialNetwork = "Y";
		else sendSocialNetwork = "N";

		if (published === true) sendPublished = "Y";
		else sendPublished = "N";

		return await axios
			.post("/api/admin/snapchat/create", {
				title: title,
				type: onglet,
				content: content,
				fcburl: fcburl,
				thumbnailPath: thumbnailPath,
				list: sendList,
				published: sendPublished,
				socialNetwork: sendSocialNetwork,
				token: session.token,
			})
			.then((data) => {
				data = data.data;

				snaps = [
					...snaps,
					{
						snapId: data.snapId,
						title: title,
						content: content,
						type: onglet,
						published: sendPublished,
						published_date: Date.now(),
						thumbnailPath: thumbnailPath,
						list: sendList,
					},
				];

				fcburl = "";
				embed = "";
				content = "";
				title = "";
				image.style.display = "none";
				list = false;
				socialNetwork = true;
				published = true;
				loading = false;
				thumbnailPath = "";
				file = "";

				let result = {
					icon: data.result,
					title: data.message,
				};

				if (data.result == "success") {
					Toast.fire(result);
				} else {
					Swal.fire(result);
				}
			})
			.then(() => [(loading = false)])
			.catch((error) => {
				loading = false;
				return { result: "error", message: "Échec de l'envois : " + error };
			});
	}

	function onChange() {
		const file = input.files[0];

		const reader = new FileReader();
		reader.addEventListener("load", function () {
			image.setAttribute("src", reader.result);
			image.style.display = "block";
			content = reader.result;
		});
		reader.readAsDataURL(file);

		return;
	}

	async function onChangeVideo(url = null) {
		loading = false;
		if (url != null) content = url;

		if (content == null || content == "" || content == undefined) return;

		let regex = "^https://videos.lripsum.net/w/([a-zA-Z0-9]+)$";

		let id = content.match(regex)[1];
		await axios.get(peertube + peertube_api + id).then((data) => {
			data = data.data;
			fcburl = content;
			embed = peertube + data.embedPath + "?autoplay=1&title=0";
			content = embed;
			thumbnailPath = peertube + data.previewPath;
			show = "thumbnail";
		});
	}

	function onChangeList() {
		if (list === true) socialNetwork = false;
	}

	function onChangePublished() {
		if (published === false) {
			list = false;
			socialNetwork = false;
		}
	}
</script>

<div class="grid grid-cols-6">
	<div class="col-span-1"></div>
	<div class="xs:col-span-6 lg:col-span-4">
		<div class="block mt-4 mb-3 text-white rounded-lg shadow-lg bg-slate-800">
			{#if onglet != "video"}
				<div class="relative">
					<img
						id="image"
						title="Snap image LRipsum"
						bind:this={image}
						src=""
						frameborder="0"
						allowfullscreen="true"
						sandbox="allow-same-origin allow-scripts allow-popups"
						class="relative inset-0 hidden w-full h-full rounded-t-lg"
						alt=""
					/>
				</div>
			{:else if embed}
				{#if show === "thumbnail"}
					<div class="relative">
						{#key session}
							{#if session.userid != null}
								{#if checkPermission("MANAGE_SNAPCHAT", permissions) == true}
									<div class="relative m-0">
										<div class="absolute top-0 right-0">
											<button
												class="p-4 text-lg text-white rounded-tr-lg hover:bg-red-500 hover:cursor-pointer"
												title="supprimer"
											>
												X
											</button>
										</div>
									</div>
								{/if}
							{/if}
						{/key}
						<Lazy keep="true">
							<img src={thumbnailPath} class="w-full h-auto" alt="" />
						</Lazy>

						<button
							class="absolute p-4 text-center text-white transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-slate-800 hover:bg-green-400"
							on:click={() => {
								show = "video";
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-play-fill"
								viewBox="0 0 16 16"
							>
								<path
									d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
								/>
							</svg>
						</button>
					</div>
				{:else if show === "video"}
					<div
						class="relative"
						style="position: relative; padding-top: 56.25%;"
					>
						<iframe
							title="Snap Vidéo LRipsum"
							src="{embed}?title=0"
							frameborder="0"
							allowfullscreen="true"
							sandbox="allow-same-origin allow-scripts allow-popups"
							class="absolute inset-0 w-full h-full rounded-t-lg"
						>
						</iframe>
					</div>
				{/if}
			{/if}
			<div class="p-6">
				<form
					action=""
					on:submit|preventDefault={sendSnap}
					enctype="multipart/form-data"
				>
					{#if onglet != "video"}
						Fichier :
						<input
							bind:this={input}
							on:change={onChange}
							type="file"
							class="block w-full text-white border-transparent rounded-md bg-slate-900 focus:border-gray-500 focus:bg-slate-700 focus:ring-0 p2"
						/>
					{:else}
						<div class="mt-2">
							Video PeeTube url :
							<input
								type="text"
								on:change={onChangeVideo(null)}
								on:input={(e) => {
									onChangeVideo(e.target.value);
								}}
								bind:value={content}
								class="block w-full text-white border-transparent rounded-md bg-slate-900 focus:border-gray-500 focus:bg-slate-700 focus:ring-0 p2"
							/>
						</div>
					{/if}
					<div class="mt-2">
						Titre :
						<Input type="text" bind:value={title} />
					</div>
					<div class="mt-2">
						<CheckBox
							id="list"
							bind:checked={list}
							onChange={onChangeList}
							label="Ajouter à la liste noir ? => ({list ? 'oui' : 'non'})"
						/>
					</div>
					<div class="mt-2">
						<CheckBox
							id="published"
							bind:checked={published}
							onChange={onChangePublished}
							label="Publié ce snap sur le site ? => ({published
								? 'oui'
								: 'non'})"
						/>
					</div>
					<div class="mt-2">
						<CheckBox
							id="socialNetwork"
							bind:checked={socialNetwork}
							label="Publié automatiquement sur Facebook ? => ({socialNetwork
								? 'oui'
								: 'non'})"
							disabled={dev}
							title={dev
								? "Option désactivé en localhost"
								: "Publié automatiquement sur Facebook uniquement si cette option est activée"}
						/>
					</div>
					<div class="mt-2">
						{#if !loading}
							<input
								type="submit"
								value="Publier"
								class="inline-block w-full px-6 py-4 mt-2 text-center text-white transition duration-150 ease-in-out rounded shadow-md bg-slate-900 hover:bg-green-400 hover:text-black hover:cursor-pointer"
							/>
						{:else}
							<button
								class="inline-block w-full px-6 py-4 mt-2 text-center text-black transition duration-150 ease-in-out bg-green-400 rounded shadow-md hover:cursor-wait disabled"
							>
								<div
									class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
									role="status"
								>
									<span
										class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
									>
										Loading...
									</span>
								</div>
							</button>
						{/if}
					</div>
				</form>
			</div>
		</div>
		<div class="grid grid-cols-2">
			<div class="col-span-1 mr-1">
				{#if onglet != "video"}
					<PrimaryButton>Image / photo</PrimaryButton>
				{:else}
					<a
						on:click|preventDefault={() => {
							onglet = "img";
						}}
					>
						<SecondaryButton>Image / photo</SecondaryButton>
					</a>
				{/if}
			</div>
			<div class="col-span-1 ml-1">
				{#if onglet != "video"}
					<a
						href=""
						on:click|preventDefault={() => {
							onglet = "video";
						}}
					>
						<SecondaryButton>Vidéo</SecondaryButton>
					</a>
				{:else}
					<PrimaryButton>Vidéo</PrimaryButton>
				{/if}
			</div>
		</div>
		{#key snaps}
			{#if snaps}
				{#each [...snaps].reverse() as snap}
					<Snap
						snapId={snap.snapId}
						title={snap.title}
						content={snap.content}
						type={snap.type}
						published={snap.published}
						published_date={snap.published_date}
						thumbnailPath={snap.thumbnailPath}
						list={snap.list}
						{session}
						{permissions}
					/>
				{/each}
			{/if}
		{/key}
	</div>
</div>
