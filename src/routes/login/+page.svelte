<!-- SECTION - JS -->
<script>
	//SECTION - Imports
	//ANCHOR Svelte
	import { onMount, onDestroy } from "svelte";

	import { page } from "$app/stores";
	import { invalidateAll } from "$app/navigation";
	import { browser } from "$app/environment";

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
	import Input from "$components/form/elements/Input.svelte";
	import GoogleCgu from "$components/GoogleCgu.svelte";
	import Alert from "$components/Alert.svelte";
	import PrimaryButton from "$components/PrimaryButton.svelte";
	import SecondaryButton from "$components/SecondaryButton.svelte";

	//ANCHOR utils
	import checkPermission from "$utils/checkPermissions";

	import { log } from "$utils/debug";
	//!SECTION - imports

	//SECTION - Set Variables
	//ANCHOR - Session
	$: session = $page.data.session;

	//ANCHOR - Form
	let success, error, otp, otp_token, errorOtp, result, banned, banned_time;
	let keepLogin = true;

	let digit_1,
		digit_2,
		digit_3,
		digit_4,
		digit_5,
		digit_6 = "";

	//ANCHOR - Form Class
	let digit_class;

	$: {
		digit_class =
			"w-10 bg-slate-900 leading-[50px] text-center text-[24px] text-white rounded-md mt-4 mx-2 border-transparent focus:ring-0 focus:bg-slate-700 focus:border-gray-500";
	}
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

	//SECTION otpValidate
	const otpValidate = async () => {
		otp_token = digit_1 + digit_2 + digit_3 + digit_4 + digit_5 + digit_6;

		//ANCHOR Fetch
		await axios
			.post("/api/session/login/otp/", {
				userid: otp.userid,
				otp_token: otp_token,
			})
			.then((data) => {
				data = data.data;
				result = data.result;

				if (result == "success") {
					//ANCHOR Result success
					success = data.message;
					error = "";

					session.userid = data.userid;
					session.username = data.username;
					session.token = data.token;
					session.permissions = data.permissions;

					invalidateAll();
				} else {
					//ANCHOR Result fail
					errorOtp = data.errorMessage;
					digit_1 = "";
					digit_2 = "";
					digit_3 = "";
					digit_4 = "";
					digit_5 = "";
					digit_6 = "";

					document.getElementById("digit_1").focus();
				}
			});
	};
	//!SECTION otpValidate

	//SECTION - HandleCaptchaCallback
	let HandleCaptchaCallback = async (token) => {
		//ANCHOR - Fetch
		let Login = await axios
			.post("/api/session/login", {
				identifiant: $form.identifiant,
				password: $form.password,
				g_recaptcha_response: token,
			})
			.then((data) => {
				result = data.data.result;

				data = data.data;
				success, error, otp, banned, (banned_time = "");

				let timeout = {};

				if (result == "success") {
					//ANCHOR - Result success
					success = data.message;
					error = "";

					session.userid = data.userid;
					session.username = data.username;
					session.token = data.token;
					session.permissions = data.permissions;

					//Refresh Template on success
					invalidateAll();
				} else if (result == "otp") {
					//ANCHOR - Result otp
					error = "";
					otp = data;
				} else if (result == "banned") {
					//ANCHOR - Result banned
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
					error = data.errorMessage;
					$form.password = "";
				}
			});

		//ANCHOR - ResetCaptcha
		//ResetCaptcha after submit
		ResetCaptcha();

		return Login;
	};
	//!SECTION - HandleCaptchaCallback

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

	//SECTION - CreateForm
	const { form, errors, handleChange, handleSubmit, isValid, isSubmitting } =
		createForm({
			initialValues: {
				identifiant: "",
				password: "",
			},
			validationSchema: yup.object().shape({
				identifiant: yup.string().min(3).required().label("L'identifiant"),
				password: yup
					.string("Le mot de passe doit être remplis de texte")
					.password()
					.required("Le mot de passe est obligatoire")
					.label("Le mot de passe"),
			}),
			onSubmit: async (values) => {
				//ANCHOR - onSubmit
				let captchaToken = await getCaptcha();

				return await HandleCaptchaCallback(captchaToken);
			},
		});
	//!SECTION CreateForm

	//ANCHOR - pasteOTP
	function pastedOTP(e) {
		let code = e.clipboardData.getData("text/plain");

		if (code.length == 6) {
			let i = 0;

			for (i = 0; i < code.length; i++) {
				if (!parseInt(code[i])) {
					return;
				}
			}

			digit_1 = code[0];
			digit_2 = code[1];
			digit_3 = code[2];
			digit_4 = code[3];
			digit_5 = code[4];
			digit_6 = code[5];

			document.getElementById("digit-6").focus();

			otpValidate();
		}
	}
	//!SECTION Functions

	// ANCHOR eventHandleChange
	function eventHandleChange(e) {
		handleChange(e.detail);
	}
</script>

<!-- !SECTION JS -->

<!-- ANCHOR Svelte Head-->
<svelte:head>
	<title>Connexion | LRipsum</title>
	<script>
		(tarteaucitron.job = tarteaucitron.job || []).push("recaptcha");
	</script>
</svelte:head>

<!-- SECTION HTML -->
<div class="xs:h-4 lg:h-auto"></div>
<Template>
	<div class="m-auto xs:basis-auto sm:basis-4/12">
		<div class="p-6 rounded-lg shadow-lg bg-slate-800">
			<!-- SECTION Alertes error -->
			<!-- ANCHOR error -->
			{#key error}
				{#if error}
					<Alert type="danger">
						<span class="font-bold">{error}</span>
					</Alert>
				{/if}
			{/key}
			<!-- ANCHOR Banned -->
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
			<!-- !SECTION Alertes error -->

			{#key result}
				{#if result == "success"}
					<!-- ANCHOR Result Success--->
					<Alert>
						<span class="font-bold">{success}</span>
					</Alert>
					{#if checkPermission("ACCESS_ADMIN", session.permissions) == true}
						<a href="/admin/">
							<PrimaryButton>Accéder à l'administration</PrimaryButton>
						</a>
					{/if}
					<a href="javascript:history.back(1)">
						<PrimaryButton>Revenir là où vous en étiez</PrimaryButton>
					</a>
				{:else if result == "otp" || result == "errorOtp"}
					<!-- SECTION OTP -->
					<!-- ANCHOR Result OTP -->
					{#if result == "errorOtp"}
						<Alert type="danger">
							<span class="font-bold">{errorOtp}</span>
						</Alert>
					{/if}
					<!-- ANCHOR Form OTP-->
					<form
						action=""
						method="post"
						id="form-otp"
						on:submit|preventDefault={otpValidate}
						data-form-type="login,step,otp"
						data-group-name="digits"
						data-autosubmit="false"
						autocomplete="off"
					>
						<h2 class="pb-2 text-lg text-center text-white">
							Authentification à double facteurs :
						</h2>
						<div class="input-field">
							<label class="text-white" for="otp"
								>Entrez le code généré par votre application d'authentification
								à double facteurs</label
							>
							<div class="flex items-center justify-center m-auto">
								<input
									type="text"
									id="digit-1"
									name="digit-1"
									maxLength="1"
									data-form-type="otp"
									data-next="digit-2"
									bind:value={digit_1}
									class={digit_class}
									autofocus
									on:input={() => {
										if (digit_1 != "")
											document.getElementById("digit-2").focus();
									}}
									on:paste={(e) => {
										pastedOTP(e);
									}}
								/>
								<input
									type="text"
									id="digit-2"
									name="digit-2"
									maxLength="1"
									data-form-type="otp"
									data-next="digit-3"
									data-previous="digit-1"
									bind:value={digit_2}
									class={digit_class}
									on:input={() => {
										if (digit_2 != "") {
											document.getElementById("digit-3").focus();
										} else {
											document.getElementById("digit-1").focus();
										}
									}}
								/>
								<input
									type="text"
									id="digit-3"
									name="digit-3"
									maxLength="1"
									data-form-type="otp"
									data-next="digit-4"
									data-previous="digit-2"
									bind:value={digit_3}
									class={digit_class}
									on:input={() => {
										if (digit_3 != "") {
											document.getElementById("digit-4").focus();
										} else {
											document.getElementById("digit-2").focus();
										}
									}}
								/>
								<span class="text-white text-[20px]">&ndash;</span>
								<input
									type="text"
									id="digit-4"
									name="digit-4"
									maxLength="1"
									data-form-type="otp"
									data-next="digit-5"
									data-previous="digit-3"
									bind:value={digit_4}
									class={digit_class}
									on:input={() => {
										if (digit_4 != "") {
											document.getElementById("digit-5").focus();
										} else {
											document.getElementById("digit-3").focus();
										}
									}}
								/>
								<input
									type="text"
									id="digit-5"
									name="digit-5"
									maxLength="1"
									data-form-type="otp"
									data-next="digit-6"
									data-previous="digit-4"
									bind:value={digit_5}
									class={digit_class}
									on:input={(e) => {
										if (digit_5 != "") {
											document.getElementById("digit-6").focus();
										} else {
											document.getElementById("digit-4").focus();
										}
									}}
								/>
								<input
									type="text"
									id="digit-6"
									name="digit-6"
									maxLength="1"
									data-form-type="otp"
									data-previous="digit-5"
									bind:value={digit_6}
									class={digit_class}
									on:input={() => {
										if (digit_6 == "") {
											document.getElementById("digit-5").focus();
										} else {
											otpValidate();
										}
									}}
								/>
							</div>
						</div>
						<input
							type="submit"
							value="Connexion"
							class="inline-block w-full px-6 py-4 mt-2 text-center text-white transition duration-150 ease-in-out rounded shadow-md bg-slate-900 hover:bg-green-400 hover:text-black hover:cursor-pointer"
						/>
					</form>
					<!-- !SECTION OTP -->
				{:else}
					{#key session}
						{#if !session.userid}
							<!-- SECTION Login Form -->
							<!-- ANCHOR Submiting message-->
							{#if $isSubmitting}
								<div
									class="flex items-center justify-center text-white align-middle"
								>
									<div
										class="text-green-400 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
										role="status"
									>
										<span
											class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
											>Chargement...</span
										>
									</div>
									<span class="ml-2">Chargement...</span>
								</div>
							{/if}
							<!-- ANCHOR Form -->
							<form
								action=""
								method="post"
								on:submit|preventDefault={handleSubmit}
								data-form-type="login"
								data-autosubmit="true"
							>
								<h2 class="pb-2 text-lg text-center text-white">Connexion :</h2>
								<!-- SECTION Input-->
								<!-- ANCHOR Identifiant -->
								<Input
									type="text"
									id="identifiant"
									name="identifiant"
									label="Pseudo ou Email"
									bind:value={$form.identifiant}
									on:change={eventHandleChange}
									on:blur={eventHandleChange}
									bind:error={$errors.identifiant}
									autocomplete="username"
									formType="username"
									required={true}
								/>
								<!-- ANCHOR Password -->
								<Input
									type="password"
									name="password"
									id="password"
									label="Mot de passe"
									bind:value={$form.password}
									on:change={eventHandleChange}
									on:blur={eventHandleChange}
									bind:error={$errors.password}
									autocomplete="current-password"
									formType="password"
									required={true}
								/>
								<div class="grid grid-cols-6 gap-4 pb-4 mt-4">
									<!-- ANCHOR KeepLogin-->
									<div class="col-span-3">
										<input
											type="checkbox"
											name="keepLogin"
											id="keepLogin"
											bind:checked={keepLogin}
											data-form-type="other"
											class="relative h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-600 outline-none hover:bg-green-500 hover:checked:bg-green-500 focus:bg-green-400 focus:checked:bg-green-400 focus:hover:checked:bg-green-400 before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 checked:border-green-300 checked:bg-green-400 checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
										/>
										<label
											class="inline-block pl-[0.15rem] hover:cursor-pointer text-white"
											for="keepLogin">Resté connecté ?</label
										>
									</div>
									<!-- ANCHOR Forgot Password-->
									<div class="col-span-3 text-end">
										<a
											href="#forgot"
											class="text-white hover:text-green-400 hover:underline"
											>Mot de passe oublié ?</a
										>
									</div>
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
								<!-- SECTION Buttons -->
								<div class="mt-2">
									{#if $isSubmitting}
										<!-- ANCHOR Submit Button Loading-->
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
										<!-- ANCHOR Submit Button -->
										<input
											type="submit"
											value="Connexion"
											data-form-type="action,login"
											class="inline-block w-full px-6 py-4 mt-2 text-center text-white transition duration-150 ease-in-out rounded shadow-md bg-slate-900 hover:bg-green-400 hover:text-black hover:cursor-pointer"
										/>
									{/if}
									<!-- ANCHOR Register Button Link-->
									<a href="/signup">
										<SecondaryButton>S'inscrire</SecondaryButton>
									</a>
								</div>
								<!-- !SECTION Button -->
							</form>
							<!-- !SECTION Login Form-->
						{:else}
							<!-- ANCHOR Already Logged-->
							<span class="text-white"
								>Bonjour {session.username} ! Vous êtes déjà connecté !</span
							>
							{#if checkPermission("ACCESS_ADMIN", session.permissions) == true}
								<a href="/admin/">
									<PrimaryButton>Accéder à l'administration</PrimaryButton>
								</a>
							{/if}
							<a href="javascript:history.back(1)">
								<PrimaryButton>Revenir là où vous en étiez</PrimaryButton>
							</a>
						{/if}
					{/key}
				{/if}
			{/key}
		</div>
		<GoogleCgu />
	</div>
</Template>
<!-- !SECTION HTML-->
