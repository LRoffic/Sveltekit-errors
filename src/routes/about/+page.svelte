<script>
	import { slide } from "svelte/transition";
	
	import Lazy from "svelte-lazy";

	import Skill from "$components/Skill.svelte";

	import PrimaryButton from "$components/PrimaryButton.svelte";
	import logo from "$lib/images/LR.jpg";

	import {log} from "$utils/debug"

	let skill = "";
	let firstChange = true;
	let inDuration = {delay: 0, duration: 300};
	let outDuration = {delay: 0, duration: 500};

	let changeSkill = (newSkill) => {
		if(firstChange){
			firstChange = false;
            inDuration = {delay: 0, duration: 300}
		} else {
			inDuration = {delay: 500, duration: 300}
		}

		skill = newSkill;

		setTimeout(() => {
			location.hash = "#" + newSkill;
		}, 800);
	}

	/*
    function getAge(birthdate) { 
        var diff = Date.now() - birthdate.getTime();
        var age = new Date(diff); 

        return Math.abs(age.getUTCFullYear() - 1970);
    }

    let age = getAge(new Date("March 12 1995"));
	*/
</script>

<svelte:head>
	<title>Informations | LRipsum</title>
</svelte:head>

<div class="container px-4 mx-auto my-24">
	<section class="mb-32 font-medium text-gray-800">
		<div class="container mx-auto text-center xl:px-32 lg:text-left">
			<div class="flex grid items-center lg:grid-cols-2">
				<div class="mb-12 lg:mb-0">
					<div
						class="block px-6 py-12 rounded-lg shadow-lg lg:py-6 xl:py-12 md:px-12 lg:-mr-14"
						style="background: hsla(0, 0%, 100%, 0.55); backdrop-filter: blur(30px)"
					>
						<h3 class="mb-2 text-2xl font-extrabold">À propos</h3>
						<h5
							class="mb-12 text-lg font-extrabold text-slate-500 lg:mb-10 xl:mb-12"
						>
							Laissez moi me présenter et vous présenter ce site
						</h5>

						<p class="mb-6 text-gra-500">
							Je suis passionné de cinéma, de musique, d'informatique (plus
							particulièrement de programmation web) et de culture
							anglo-américaine
						</p>

						<p class="mb-4 font-extrabold">À quoi ser ce blog ?</p>
						<p class="mb-6 text-gra-500">
							Ce blog me permet de partager, un petit peux de mes passions et
							d'autres choses. Vous ne trouverez pas uniquement un blog, mais
							aussi des mêmes d'humour que je republie de mon compte
							<a
								href="https://url.lripsum.net/50prn"
								class="underline decoration-[#FFFC00] hover:text-[#FFFC00] decoration-4"
								target="_blank"
							>
								SnapChat.
							</a>
						</p>

						<p class="mb-4 font-extrabold">
							Pourquoi republié depuis le compte SnapChat ?
						</p>
						<p class="mb-6 text-gra-500">
							J'ai depuis un moment un compte SnapChat ou je poste régulièrement
							des mêmes d'humour plus ou moins noir. J'ai conscience que ce
							genre d'humour ne plaît pas à tous, mais j'estime que ce n'est
							parce-qu'on rit d'une situation, que l'on valide les horribles
							situations qu'il peut y avoir derrière.
							<br />
							<br />
							Je pense même que ce genre d'humour peut parfois faire ouvrir les yeux
							aux gens et nous rappeller que même au 21ème siècle, l'humanité est
							toujours et à toujours était capable des pires choses.
							<br />
							<br />
							Vous pourrez retrouvez, une sauvegarde de mes snaps sur ce site<br
							/>
							Au cas où mon compte vient à se faire bannir, vous y retrouverez également
							mon nouuveau compte si celui-ci venaît à disparaître.
							<br />
							<br />
							Pour les snaps contenant du caractère un peux plus sensible, il vous
							faudra créer un compte pour pouvoir y accéder. (Ça ne prendre pas très
							longtemps promis).<br />
							Puis de vous rendre sur
							<a
								href="/snapchat"
								class="underline decoration-green-400 hover:text-green-400 decoration-4"
							>
								cette page
							</a>
							et cliquer sur le bouton "No Limit"<br />
							<br />
							En attendant, vous pouvez m'ajouter sur SnapChat, avec le bouton ci-dessous
							:<br />
						</p>
						<div class="text-center opacity-100 backdrop-blur-none">
							<a
								href="https://url.lripsum.net/50prn"
								target="_blank"
							>
								<PrimaryButton>
									<div class="grid grid-cols-8 gap-4">
										<div class="place-self-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												viewBox="0 0 16 16"
											>
												<path
													d="M15.943 11.526c-.111-.303-.323-.465-.564-.599a1.416 1.416 0 0 0-.123-.064l-.219-.111c-.752-.399-1.339-.902-1.746-1.498a3.387 3.387 0 0 1-.3-.531c-.034-.1-.032-.156-.008-.207a.338.338 0 0 1 .097-.1c.129-.086.262-.173.352-.231.162-.104.289-.187.371-.245.309-.216.525-.446.66-.702a1.397 1.397 0 0 0 .069-1.16c-.205-.538-.713-.872-1.329-.872a1.829 1.829 0 0 0-.487.065c.006-.368-.002-.757-.035-1.139-.116-1.344-.587-2.048-1.077-2.61a4.294 4.294 0 0 0-1.095-.881C9.764.216 8.92 0 7.999 0c-.92 0-1.76.216-2.505.641-.412.232-.782.53-1.097.883-.49.562-.96 1.267-1.077 2.61-.033.382-.04.772-.036 1.138a1.83 1.83 0 0 0-.487-.065c-.615 0-1.124.335-1.328.873a1.398 1.398 0 0 0 .067 1.161c.136.256.352.486.66.701.082.058.21.14.371.246l.339.221a.38.38 0 0 1 .109.11c.026.053.027.11-.012.217a3.363 3.363 0 0 1-.295.52c-.398.583-.968 1.077-1.696 1.472-.385.204-.786.34-.955.8-.128.348-.044.743.28 1.075.119.125.257.23.409.31a4.43 4.43 0 0 0 1 .4.66.66 0 0 1 .202.09c.118.104.102.26.259.488.079.118.18.22.296.3.33.229.701.243 1.095.258.355.014.758.03 1.217.18.19.064.389.186.618.328.55.338 1.305.802 2.566.802 1.262 0 2.02-.466 2.576-.806.227-.14.424-.26.609-.321.46-.152.863-.168 1.218-.181.393-.015.764-.03 1.095-.258a1.14 1.14 0 0 0 .336-.368c.114-.192.11-.327.217-.42a.625.625 0 0 1 .19-.087 4.446 4.446 0 0 0 1.014-.404c.16-.087.306-.2.429-.336l.004-.005c.304-.325.38-.709.256-1.047Zm-1.121.602c-.684.378-1.139.337-1.493.565-.3.193-.122.61-.34.76-.269.186-1.061-.012-2.085.326-.845.279-1.384 1.082-2.903 1.082-1.519 0-2.045-.801-2.904-1.084-1.022-.338-1.816-.14-2.084-.325-.218-.15-.041-.568-.341-.761-.354-.228-.809-.187-1.492-.563-.436-.24-.189-.39-.044-.46 2.478-1.199 2.873-3.05 2.89-3.188.022-.166.045-.297-.138-.466-.177-.164-.962-.65-1.18-.802-.36-.252-.52-.503-.402-.812.082-.214.281-.295.49-.295a.93.93 0 0 1 .197.022c.396.086.78.285 1.002.338.027.007.054.01.082.011.118 0 .16-.06.152-.195-.026-.433-.087-1.277-.019-2.066.094-1.084.444-1.622.859-2.097.2-.229 1.137-1.22 2.93-1.22 1.792 0 2.732.987 2.931 1.215.416.475.766 1.013.859 2.098.068.788.009 1.632-.019 2.065-.01.142.034.195.152.195a.35.35 0 0 0 .082-.01c.222-.054.607-.253 1.002-.338a.912.912 0 0 1 .197-.023c.21 0 .409.082.49.295.117.309-.04.56-.401.812-.218.152-1.003.638-1.18.802-.184.169-.16.3-.139.466.018.14.413 1.991 2.89 3.189.147.073.394.222-.041.464Z"
												/>
											</svg>
										</div>
										<div class="col-span-6">Ajouter LRipsum sur SnapChat</div>
										<div class="place-self-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												viewBox="0 0 16 16"
											>
												<path
													d="M15.943 11.526c-.111-.303-.323-.465-.564-.599a1.416 1.416 0 0 0-.123-.064l-.219-.111c-.752-.399-1.339-.902-1.746-1.498a3.387 3.387 0 0 1-.3-.531c-.034-.1-.032-.156-.008-.207a.338.338 0 0 1 .097-.1c.129-.086.262-.173.352-.231.162-.104.289-.187.371-.245.309-.216.525-.446.66-.702a1.397 1.397 0 0 0 .069-1.16c-.205-.538-.713-.872-1.329-.872a1.829 1.829 0 0 0-.487.065c.006-.368-.002-.757-.035-1.139-.116-1.344-.587-2.048-1.077-2.61a4.294 4.294 0 0 0-1.095-.881C9.764.216 8.92 0 7.999 0c-.92 0-1.76.216-2.505.641-.412.232-.782.53-1.097.883-.49.562-.96 1.267-1.077 2.61-.033.382-.04.772-.036 1.138a1.83 1.83 0 0 0-.487-.065c-.615 0-1.124.335-1.328.873a1.398 1.398 0 0 0 .067 1.161c.136.256.352.486.66.701.082.058.21.14.371.246l.339.221a.38.38 0 0 1 .109.11c.026.053.027.11-.012.217a3.363 3.363 0 0 1-.295.52c-.398.583-.968 1.077-1.696 1.472-.385.204-.786.34-.955.8-.128.348-.044.743.28 1.075.119.125.257.23.409.31a4.43 4.43 0 0 0 1 .4.66.66 0 0 1 .202.09c.118.104.102.26.259.488.079.118.18.22.296.3.33.229.701.243 1.095.258.355.014.758.03 1.217.18.19.064.389.186.618.328.55.338 1.305.802 2.566.802 1.262 0 2.02-.466 2.576-.806.227-.14.424-.26.609-.321.46-.152.863-.168 1.218-.181.393-.015.764-.03 1.095-.258a1.14 1.14 0 0 0 .336-.368c.114-.192.11-.327.217-.42a.625.625 0 0 1 .19-.087 4.446 4.446 0 0 0 1.014-.404c.16-.087.306-.2.429-.336l.004-.005c.304-.325.38-.709.256-1.047Zm-1.121.602c-.684.378-1.139.337-1.493.565-.3.193-.122.61-.34.76-.269.186-1.061-.012-2.085.326-.845.279-1.384 1.082-2.903 1.082-1.519 0-2.045-.801-2.904-1.084-1.022-.338-1.816-.14-2.084-.325-.218-.15-.041-.568-.341-.761-.354-.228-.809-.187-1.492-.563-.436-.24-.189-.39-.044-.46 2.478-1.199 2.873-3.05 2.89-3.188.022-.166.045-.297-.138-.466-.177-.164-.962-.65-1.18-.802-.36-.252-.52-.503-.402-.812.082-.214.281-.295.49-.295a.93.93 0 0 1 .197.022c.396.086.78.285 1.002.338.027.007.054.01.082.011.118 0 .16-.06.152-.195-.026-.433-.087-1.277-.019-2.066.094-1.084.444-1.622.859-2.097.2-.229 1.137-1.22 2.93-1.22 1.792 0 2.732.987 2.931 1.215.416.475.766 1.013.859 2.098.068.788.009 1.632-.019 2.065-.01.142.034.195.152.195a.35.35 0 0 0 .082-.01c.222-.054.607-.253 1.002-.338a.912.912 0 0 1 .197-.023c.21 0 .409.082.49.295.117.309-.04.56-.401.812-.218.152-1.003.638-1.18.802-.184.169-.16.3-.139.466.018.14.413 1.991 2.89 3.189.147.073.394.222-.041.464Z"
												/>
											</svg>
										</div>
									</div>
								</PrimaryButton>
							</a>
						</div>
					</div>
				</div>
				<div>
					<Lazy keep="true">
						<img src={logo} class="w-full rounded-lg shadow-lg" alt="" />
					</Lazy>
				</div>
			</div>
			<div class="mt-16">
				<h1 class="text-6xl">Passionné d'informatique ?</h1>
				<h2 class="text-3xl">Oui, voici mes compétences :</h2>
				<div class="flex flex-row flex-wrap items-center justify-center mb-2 text-center text-white">
					<Skill img="/img/skills/html5.svg" skillName="HTML5" {changeSkill}>HTML5</Skill>
					<Skill img="/img/skills/javascript.svg" skillName="JS" {changeSkill}>JS</Skill>
					<Skill img="/img/skills/css.svg" link="https://url.lripsum.net/q96xf">CSS</Skill>
					<Skill img="/img/skills/nodejs.svg" skillName="NodeJS" {changeSkill}>NodeJS</Skill>
					<Skill img="/img/skills/sql.svg" link="https://url.lripsum.net/v7xna">SQL</Skill>
					<Skill img="/img/skills/php.svg" skillName="PHP" {changeSkill}>PHP</Skill>
					<Skill img="/img/skills/linux.svg" skillName="Linux" {changeSkill}>Linux</Skill>
				</div>
				{#if skill == "HTML5"}
					<div class="block px-6 py-12 rounded-lg shadow-lg lg:py-6 xl:py-12 md:px-12 scroll-smooth"
						style="background: hsla(0, 0%, 100%, 0.55); backdrop-filter: blur(30px)"
						in:slide={inDuration} out:slide={outDuration}
						id="HTML5"
					>
						<a href="https://url.lripsum.net/08iyw" target="_blank" class="cursor-pointer">
							<img src="/img/skills/html5.svg" class="w-20 h-20 m-auto" />
						</a>
						<h3 class="mb-2 text-4xl font-extrabold text-center">HTML5</h3>
						<div class="flex flex-row flex-wrap items-center justify-center text-center text-white">
							<Skill img="/img/skills/bootstrap.svg" link="https://url.lripsum.net/zarw7">Bootstrap</Skill>
							<Skill img="/img/skills/materialize.svg" link="https://url.lripsum.net/854xz">Materialize</Skill>
							<Skill img="/img/skills/tailwind.svg" link="https://url.lripsum.net/lii50">TailWind</Skill>
						</div>
					</div>
				{:else if skill == "JS"}
					<div class="block px-6 py-12 rounded-lg shadow-lg lg:py-6 xl:py-12 md:px-12 scroll-smooth"
						style="background: hsla(0, 0%, 100%, 0.55); backdrop-filter: blur(30px)"
						in:slide={inDuration} out:slide={outDuration}
						id="JS"
					>
						<a href="https://url.lripsum.net/99jxv" target="_blank" class="cursor-pointer">
							<img src="/img/skills/javascript.svg" class="w-20 h-20 m-auto" />
						</a>
						<h3 class="mb-2 text-4xl font-extrabold text-center">Javascript</h3>
						<div class="flex flex-row flex-wrap items-center justify-center text-center text-white">
							<Skill img="/img/skills/jquery.svg" link="https://url.lripsum.net/ave6i">JQuery</Skill>
							<Skill img="/img/skills/svelte.svg" link="https://url.lripsum.net/hmwe7">Svelte</Skill>
							<Skill img="/img/skills/axios.svg" link="https://url.lripsum.net/xgdo1">Axios</Skill>
						</div>
					</div>
				{:else if skill == "NodeJS"}
					<div class="block px-6 py-12 rounded-lg shadow-lg lg:py-6 xl:py-12 md:px-12 scroll-smooth"
						style="background: hsla(0, 0%, 100%, 0.55); backdrop-filter: blur(30px)"
						in:slide={inDuration} out:slide={outDuration}
						id="NodeJS"
					>
						<a href="https://url.lripsum.net/6ga0o" target="_blank" class="cursor-pointer">
							<img src="/img/skills/nodejs.svg" class="w-20 h-20 m-auto" />
						</a>
						<h3 class="mb-2 text-4xl font-extrabold text-center">NodeJS</h3>
						<div class="flex flex-row flex-wrap items-center justify-center text-center text-white">
							<Skill img="/img/skills/sveltekit.png" link="https://url.lripsum.net/kr4rn">SvelteKit</Skill>
							<Skill img="/img/skills/express.svg" link="https://url.lripsum.net/7xhzi">Express</Skill>
							<Skill img="/img/skills/sequelize.svg" link="https://url.lripsum.net/67gn1">Sequelize</Skill>
						</div>
					</div>
				{:else if skill == "PHP"}
					<div class="block px-6 py-12 rounded-lg shadow-lg lg:py-6 xl:py-12 md:px-12 scroll-smooth"
						style="background: hsla(0, 0%, 100%, 0.55); backdrop-filter: blur(30px)"
						in:slide={inDuration} out:slide={outDuration}
						id="PHP"
					>
						<a href="https://url.lripsum.net/1tk57" target="_blank" class="cursor-pointer">
							<img src="/img/skills/php.svg" class="w-20 h-20 m-auto" />
						</a>
						<h3 class="mb-2 text-4xl font-extrabold text-center">PHP</h3>
						<div class="flex flex-row flex-wrap items-center justify-center text-center text-white">
							<Skill img="/img/skills/smarty.png" link="https://url.lripsum.net/sbab9">Smarty</Skill>
						</div>
					</div>
				{:else if skill == "Linux"}
					<div class="block px-6 py-12 rounded-lg shadow-lg lg:py-6 xl:py-12 md:px-12 scroll-smooth"
						style="background: hsla(0, 0%, 100%, 0.55); backdrop-filter: blur(30px)"
						in:slide={inDuration} out:slide={outDuration}
						id="Linux"
					>
						<a href="https://url.lripsum.net/l120x" target="_blank" class="cursor-pointer">
							<img src="/img/skills/linux.svg" class="w-20 h-20 m-auto" />
						</a>
						<h3 class="mb-2 text-4xl font-extrabold text-center">Linux</h3>
						<div class="flex flex-row flex-wrap items-center justify-center text-center text-white">
							<Skill img="/img/skills/ubuntu.svg" link="https://url.lripsum.net/i59jx">Ubuntu</Skill>
							<Skill img="/img/skills/debian.svg" link="https://url.lripsum.net/s4lvl">Debian</Skill>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</section>
</div>
