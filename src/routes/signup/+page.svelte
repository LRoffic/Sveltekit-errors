<!-- SECTION - JS -->
<script>
	//SECTION - Imports
	//ANCHOR Svelte
	import { onMount, onDestroy } from "svelte";

	import { page } from "$app/stores";
	import { invalidateAll } from "$app/navigation";
	import { browser, dev } from "$app/environment";

	//ANCHOR Env Var
	import { PUBLIC_RECAPTCHA_SITE_KEY } from "$env/static/public";

	//ANCHOR Libs
	import { createForm } from "svelte-forms-lib";
	import * as yup from "yup";
	import YupPassword from "yup-password";
	import { fr } from "yup-locales";
	import { setLocale } from "yup";

	import axios from "axios";

	//ANCHOR Templates
	import Template from "$templates/TemplateCenter.svelte";

	//ANCHOR Components
	import Alert from "$components/Alert.svelte";
	import Input from "$components/form/elements/Input.svelte";
	import Checkbox from "$components/form/elements/CheckBox.svelte";
	import PrimaryButton from "$components/PrimaryButton.svelte";
	import SecondaryButton from "$components/SecondaryButton.svelte";
	import GoogleCgu from "$components/GoogleCgu.svelte";

	//ANCHOR utils
	import checkPermission from "$utils/checkPermissions";
	//!SECTION - imports

	//SECTION - Set Variables
	export let url = "";
	
	$: session = $page.data.session;

	let error, success;
	let banned, banned_time;

	let devAutofill = true;
	//!SECTION - Set Variables

	//SECTION - Functions
	//ANCHOR onMount
	onMount(async () => {
		if (browser) {
			tarteaucitron.user.recaptchaapi = PUBLIC_RECAPTCHA_SITE_KEY;

			(tarteaucitron.job = tarteaucitron.job || []).push("recaptcha");

			window.HandleCaptchaCallback = HandleCaptchaCallback;
			window.ResetCaptcha = ResetCaptcha;
			window.HandleCaptchaError = HandleCaptchaError;
		}
	});

	//ANCHOR onDestroy
	onDestroy(() => {
		if (browser) {
			window.HandleCaptchaCallback = null;
			window.ResetCaptcha = null;
			window.HandleCaptchaError = null;
		}
	});

	//ANCHOR Yup
	YupPassword(yup);
	setLocale(fr);

	//ANCHOR HandleCaptchaError
	const HandleCaptchaError = () => {
		tarteaucitron.user.recaptchaapi = PUBLIC_RECAPTCHA_SITE_KEY(
			(tarteaucitron.job = tarteaucitron.job || []),
		).push("recaptcha");
		window.grecaptcha.reset();
	};

	//ANCHOR ResetCaptcha
	const ResetCaptcha = () => {
		tarteaucitron.user.recaptchaapi = PUBLIC_RECAPTCHA_SITE_KEY(
			(tarteaucitron.job = tarteaucitron.job || []),
		).push("recaptcha");
		window.grecaptcha.reset();
	};

	//ANCHOR HandleCaptchaCallback
	const HandleCaptchaCallback = async (token) => {
		let register = await axios
			.post("/api/user/signup/", {
				identifiant: $form.identifiant,
				email: $form.email,
				password: $form.password,
				confirm_password: $form.confirm_password,
				newsletter: $form.newsletter,
				cgu: $form.cgu,
				g_recaptcha_response: token,
			})
			.then((data) => {
				let result = data.data.result;

				data = data.data;

				if (result == "success") {
					success = data.message;
					invalidateAll();
				} else if (result == "banned") {
					banned = data.reason;

					if (data.end_date !== "Infinite") {
						banned_time = new Date(parseInt(data.end_date)).toLocaleDateString(
							"fr-fr",
						);
						banned_time = "jusqu'au " + banned_time;
					} else {
						banned_time = "jusqu'à l'infini et au delà";
					}
				} else {
					error = data.message;
				}
			});

		ResetCaptcha();

		return register;
	};

	//ANCHOR - getCaptcha
	async function getCaptcha() {
		await new Promise((resolve, reject) => {
			// grecaptcha.ready needs a callback so we create a promise to await
			grecaptcha.ready(resolve);
		});
		// grecaptcha.execute returns a promise so we can await it
		const token = await grecaptcha.execute(
			"6LfjHxYqAAAAAJke2J9Me4GDegIijgVpD-SKyKau",
			{ action: "contactForm" },
		);
		return token;
	}

	const { form, errors, handleChange, isValid, isSubmitting, handleSubmit } =
		createForm({
			initialValues: {
				identifiant: dev ? "Bidulee" : "",
				email: dev ? "bidule@example.com" : "",
				password: dev ? "aaaaaA?1" : "",
				confirm_password: dev ? "aaaaaA?1" : "",
				cgu: dev,
				newsletter: true,
			},
			validationSchema: yup.object().shape({
				identifiant: yup
					.string("Le pseudo doit être remplis de texte")
					.min(3, "Le pseudo doit avoir au moins 3 lettres")
					.max(20, "Le pseudo ne peut pas contenir plus de 20 lettres")
					.required("Le pseudo est obligatoire"),
				email: yup
					.string("L'email doit être remplis de texte")
					.email(
						"L'email doit être remplis avec une adresse électronique valide",
					)
					.required("Une adresse électronique est obligatoire"),
				password: yup
					.string("Ce champ doit être remplis de texte")
					.password()
					.required("Ce champ est obligatoire"),
				confirm_password: yup
					.string()
					.password()
					.required("Ce champ est obligatoire")
					.oneOf(
						[yup.ref("password")],
						"Les deux mot de passe doivent être identiques",
					),
				cgu: yup
					.boolean()
					.oneOf([true], "Vous devez accepter les conditions.")
					.required("Vous devez accepter les conditions."),
				newsletter: yup
					.boolean()
					.oneOf([true, false], "La case doit être valider ou non"),
			}),
			onSubmit: async () => {
				//ANCHOR - onSubmit
				let captchaToken = await getCaptcha();

				return await HandleCaptchaCallback(captchaToken);
			},
		});

	let identifiant_class,
		email_class,
		password_class,
		confirm_password_class,
		_class;

	let input_text_class =
		"block w-full mt-4 border-transparent rounded-md bg-slate-900 text-white focus:border-gray-500 focus:bg-slate-700 focus:ring-0";
	let error_class = "border-red-500 border-4" + input_text_class;
	let valid_class = "border-green-400 border-4" + input_text_class;

	$: {
		if ($errors.identifiant) identifiant_class = error_class;
		else identifiant_class = input_text_class;

		if ($errors.email) email_class = error_class;
		else email_class = input_text_class;

		if ($errors.password) password_class = error_class;
		else password_class = input_text_class;

		if ($errors.confirm_password) confirm_password_class = error_class;
		else confirm_password_class = input_text_class;
	}

	// ANCHOR eventHandleChange
	function eventHandleChange(e) {
		handleChange(e.detail);
	}
	//!SECTION Functions
</script>

<!-- !SECTION - JS -->

<svelte:head>
	<title>Inscription | LRipsum</title>
	<script>
		(tarteaucitron.job = tarteaucitron.job || []).push("recaptcha");
	</script>
</svelte:head>

<div class="xs:h-20 lg:h-12"></div>
<Template>
	<div class="m-auto xs:basis-auto sm:basis-4/12">
		<div class="p-6 rounded-lg shadow-lg bg-slate-800">
			{#key error}
				{#if error}
					<Alert type="danger">
						<span class="font-bold">{error}</span>
					</Alert>
				{/if}
			{/key}

			{#key banned}
				{#if banned}
					<Alert type="danger">
						Vous avez été bannis du site <span class="font-bold"
							>{banned_time}</span
						><br />
						Pour la raison :<br />
						<span class="font-bold">{banned}</span>
					</Alert>
				{/if}
			{/key}

			{#key success}
				{#if success}
					<Alert>
						<span class="font-bold">{success}</span>
					</Alert>
				{/if}
			{/key}

			{#key session}
				{#if !session.userid}
					<form
						action=""
						on:submit|preventDefault={handleSubmit}
						data-form-type="register"
					>
						<h2 class="pb-2 text-lg text-center text-white">Inscription :</h2>
						<Input
							type="text"
							id="identifiant"
							name="identifiant"
							label="Entrez le pseudo que vous souhaitez utiliser"
							bind:value={$form.identifiant}
							on:change={eventHandleChange}
							on:blur={eventHandleChange}
							bind:error={$errors.identifiant}
							autocomplete="username"
							formType="username"
							required={true}
						/>
						<Input
							type="email"
							name="email"
							id="email"
							label="Votre adresse électronique"
							bind:value={$form.email}
							on:change={eventHandleChange}
							on:blur={eventHandleChange}
							bind:error={$errors.email}
							autocomplete="email"
							formType="email"
							required={true}
						/>
						<Input
							type="password"
							name="password"
							id="password"
							label="Mot de passe"
							bind:value={$form.password}
							on:change={eventHandleChange}
							on:blur={eventHandleChange}
							bind:error={$errors.password}
							autocomplete="new-password"
							formType="password,new"
							required={true}
						/>
						<Input
							type="password"
							name="confirm_password"
							id="confirm_password"
							label="Confirmez votre mot de passe"
							bind:value={$form.confirm_password}
							on:change={eventHandleChange}
							on:blur={eventHandleChange}
							bind:error={$errors.confirm_password}
							autocomplete="new-password"
							formType="password,confirmation"
							required={true}
						/>
						<div class="my-2">
							<Checkbox
								name="cgu"
								id="cgu"
								bind:checked={$form.cgu}
								on:change={eventHandleChange}
								on:blur={eventHandleChange}
								bind:error={$errors.cgu}
								formType="other"
								label="J'accepte les condition d'utilisation"
							/>
						</div>
						<div class="my-2">
							<Checkbox
								name="newsletter"
								id="newsletter"
								bind:checked={$form.newsletter}
								on:change={eventHandleChange}
								on:blur={eventHandleChange}
								bind:error={$errors.newsletter}
								formType="consent,newsletter"
								label="S'inscrire à la newsletter"
							/>
						</div>
						<!-- ANCHOR RECAPTCHA -->
						<div
							class="g-recaptcha"
							data-sitekey={PUBLIC_RECAPTCHA_SITE_KEY}
							data-callback={handleSubmit}
							data-expired-callback={ResetCaptcha}
							data-error-callback={HandleCaptchaError}
							data-size="invisible"
						/>
						<div class="mt-2">
							{#if $isSubmitting}
								<PrimaryButton class="disabled">
									<div
										class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
										role="status"
									>
										<span
											class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
										>
											Chargement...
										</span>
									</div>
								</PrimaryButton>
							{:else}
								<input
									type="submit"
									value="S'inscrire"
									data-form-type="action,register"
									class="inline-block w-full px-6 py-4 mt-2 text-center text-white transition duration-150 ease-in-out rounded shadow-md bg-slate-900 hover:bg-green-400 hover:text-black hover:cursor-pointer"
								/>
							{/if}
							<a href="/login">
								<SecondaryButton>Se connecter</SecondaryButton>
							</a>
						</div>
					</form>
				{:else}
					<span class="text-white"
						>Bonjour {session.username} ! Vous êtes déjà connecté !</span
					>
					{#key session.permissions}
						{#if checkPermission("ACCESS_ADMIN", session.permissions) == true}
							<a href="/admin/">
								<PrimaryButton>Accéder à l'administration</PrimaryButton>
							</a>
						{/if}
					{/key}
					<a href="javascript:history.back(1)">
						<PrimaryButton>Revenir là où vous en étiez</PrimaryButton>
					</a>
				{/if}
			{/key}
		</div>
		<GoogleCgu />
	</div>
</Template>
