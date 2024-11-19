<script>
	import { createForm } from "svelte-forms-lib";
	import * as yup from "yup";
	import YupPassword from 'yup-password';

	import axios from "axios";

	import dayjs from "dayjs";
	import relativeTime from "dayjs/plugin/relativeTime";
	import "dayjs/locale/fr";
	
    import Swal from 'sweetalert2';

	import PrimaryButton from "$components/PrimaryButton.svelte";
	
	import { log } from '$utils/debug';

	/** @type {import('./$types').PageData} */
	export let data;

	let FBToken = data.config.FacebookToken;

	dayjs.locale("fr");
	dayjs.extend(relativeTime)
	
	let FBTokenUpdateDate        = dayjs(Number(data.config.FacebookTokenUpdateDate));
	let FBTokenExpireDate        = FBTokenUpdateDate.add(3, 'month').format('YYYY-MM-DD HH:mm:ss') || null;
	let FBTokenExpireCountdown   = FBTokenUpdateDate.to(FBTokenExpireDate);
    
	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.onmouseenter = Swal.stopTimer;
			toast.onmouseleave = Swal.resumeTimer;
		}
	});

	const { form, errors, handleChange, handleSubmit, isValid, isSubmitting } = createForm({
		initialValues: {
			FacebookToken    : FBToken,
		},
		validationSchema: yup.object().shape({
			FacebookToken: yup.string().required("Le token est obligatoire")
		}),
		onSubmit: async values => {
			let update = await axios.post("/api/admin/config", {
				FacebookToken: $form.FacebookToken,
			}).then((response) => {
				let data = response.data;

				let result = {
					icon: data.result,
					title: data.message
				}

				if(data.result == "success"){
					Toast.fire(result);
					
					FBTokenExpireDate = dayjs(Date.now()).add(3, 'month').format('YYYY-MM-DD HH:mm:ss') || null;

					FBTokenExpireCountdown = dayjs(Date.now()).to(FBTokenExpireDate);
				} else {
					Swal.fire(result);
				}

				return response.data
			});

			return update
		}
	})

	let FacebookToken_class;

	$: {
		if($errors.FacebookToken)
			FacebookToken_class = "bg-slate-900 text-white placeholder:text-white focus:border-gray-500 focus:bg-slate-700 focus:ring-0 block w-full mt-4 border-4 border-red-500 rounded-md"
		else
			FacebookToken_class = "bg-slate-900 text-white focus:border-gray-500 focus:bg-slate-700 focus:ring-0 block w-full mt-4 border-transparent rounded-md"
	}
</script>

<svelte:head>
	<title>Config | LRipsum</title>
</svelte:head>

<div class="p-6 rounded-lg bg-slate-800">
	<form action="" method="post" on:submit|preventDefault={handleSubmit}>
		<div class="mt-2">
			Token API Facebook :
			<input 
				type="text"
				name="FacebookToken"
				id="FacebookToken"
				placeholder="Token Facebook"
				bind:value={$form.FacebookToken}
				on:change={handleChange}
				on:blur={handleChange}
				class="{FacebookToken_class}"
				required
			/>
			<span class="text-xs text-gray-500">Mise à jour le {dayjs(Number(data.config.FacebookTokenUpdateDate)).format('DD/MM/YYYY')} il expire {FBTokenExpireCountdown}. Obtenir un nouveau token sur <a href="https://developers.facebook.com/tools/explorer/" target="_blank" rel="noopener noreferrer nofollow" class="underline decoration-[#3b5999] text-[#3b5999] hover:text-white">Facebook</a></span>
		</div>
		{#if $isSubmitting}
			<PrimaryButton class="disabled">
				<div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
					<span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
						Chargement...
					</span>
				</div>
			</PrimaryButton>
		{:else}
			<input type="submit" value="Mettre à jour" class="inline-block w-full px-6 py-4 mt-2 text-center text-white transition duration-150 ease-in-out rounded shadow-md bg-slate-900 hover:bg-green-400 hover:text-black hover:cursor-pointer" />
		{/if}
	</form>
</div>