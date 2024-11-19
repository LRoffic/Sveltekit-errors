<script>
	import { onMount, tick } from 'svelte';
	import { browser } from '$app/environment';

	import { marked } from 'marked';

	import Bar from "$components/chartBar.svelte"

	let labels = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
	let reg_child,snap_child;

	import {log} from "$utils/debug"

	/** @type {import('./$types').PageData} */
	export let data;

	marked.use({
		breaks: true,
		gfm: true,
		mangle: false,
		headerIds: false,
		sanitize: false,
		smartypants: false,
		xhtml: true
	});

	onMount(async () => {
		const { Modal, Collapse, Ripple, initTWE } = await import("tw-elements");

		initTWE({ Modal, Collapse, Ripple });
	});

	let thisYear = new Date().getFullYear();
	let thisMonth = new Date().getMonth();

	let userStatYear = thisYear;
	let snapStatYear = thisYear;

	let uStatYearsList = [];
	let sStatYearList = [];

	let userStatMonth = [];
	let snapStatMonth = [];
	let snapBlackStatMonth = [];

	let userStatChart, snapsStatChart;

	function updateStatReg(newData){
		tick().then(() => reg_child.updateStatChartBar(newData));
	}
	
	function updateStatSnap(newData){
		tick().then(() => snap_child.updateStatChartBar(newData));
	}

	$: {
		for(let i = 0; i < 12; i++){
			userStatMonth[i] = 0;
			snapStatMonth[i] = 0;
			snapBlackStatMonth[i] = 0;
		}

		data.usersCount.stats.forEach(row => {
			if(row.reg_year == userStatYear)
				userStatMonth[row.reg_month-1] = row.count;

			if(!uStatYearsList.includes(row.reg_year))
				uStatYearsList.push(row.reg_year);
		});

		data.snapsCount.stats.forEach(row => {
			if(row.published_year == snapStatYear)
				snapStatMonth[row.published_month-1] = row.count;

			if(!sStatYearList.includes(row.published_year))
				sStatYearList.push(row.published_year);
		});

		data.snapsCount.statsBlack.forEach(row => {
			if(row.published_year == snapStatYear)
				snapBlackStatMonth[row.published_month-1] = row.count;
		});
	}

	let backgroundColors = [
		'rgba(255, 99, 132, 0.1)',
		'rgba(255, 159, 64, 0.1)',
		'rgba(255, 205, 86, 0.1)',
		'rgba(75, 192, 192, 0.1)',
		'rgba(54, 162, 235, 0.1)',
		'rgba(153, 102, 255, 0.1)',
		'rgba(201, 203, 207, 0.1)',
		'rgba(255, 99, 132, 0.1)',
		'rgba(255, 159, 64, 0.1)',
		'rgba(255, 205, 86, 0.1)',
		'rgba(75, 192, 192, 0.1)',
		'rgba(54, 162, 235, 0.1)'
	];

	let borderColor = [
		'rgb(255, 99, 132)',
		'rgb(255, 159, 64)',
		'rgb(255, 205, 86)',
		'rgb(75, 192, 192)',
		'rgb(54, 162, 235)',
		'rgb(153, 102, 255)',
		'rgba(55, 255, 212)',
		'rgb(255, 99, 132)',
		'rgb(255, 159, 64)',
		'rgb(255, 205, 86)',
		'rgb(75, 192, 192)',
		'rgb(54, 162, 235)',
	];

	backgroundColors[thisMonth] = 'rgb(54, 162, 235)';
	borderColor[thisMonth] = 'rgba(201, 203, 207)';

	let regData = [
		{
			label: 'Acquisitions by month',
			data: userStatMonth,
			backgroundColor: backgroundColors,
			borderColor: borderColor,
			borderWidth: 2,
			borderRadius: 8
		},
	];

	let snapsData = [
		{
			label: 'Publications by month',
			data: snapStatMonth,
			backgroundColor: backgroundColors,
			borderColor: borderColor,
			borderWidth: 2,
			borderRadius: 8
		},
		{
			label: 'Blacklist by month',
			data: snapBlackStatMonth,
			backgroundColor: [
				'gray'
			],
			borderColor: [
				'black',
			],
			borderWidth: 2,
			borderRadius: 8
		}
	]
</script>

<div class="lg:grid-cols-6 xs:grid-cols-1 right-0 grid gap-6">
	<div class="lg:col-span-2 xs:col-span-1">
		<div class="bg-slate-800 block p-6 rounded-lg shadow-lg">
			Nombre d'articles sur le site :<br />
			<h1 class="text-center text-5xl">{data.articlesCount}</h1>
		</div>
	</div>
	<div class="lg:col-span-2 xs:col-span-1">
		<div class="bg-slate-800 block p-6 rounded-lg shadow-lg">
			Nombre de commentaire sur le site :<br />
			<h1 class="text-center text-5xl">{data.commentsCount}</h1>
		</div>
	</div>
	<div class="lg:col-span-2 xs:col-span-1">
		<div class="bg-slate-800 block p-6 rounded-lg shadow-lg">
			Nombre total d'utilisateur inscrits sur le site :<br />
			<h1 class="text-center text-5xl">{data.usersCount.total}</h1>
		</div>
	</div>
	<div class="lg:col-span-6 xs:col-span-1">
		<div class="bg-slate-800 block p-6 rounded-lg shadow-lg overflow-x-auto">
			<div class="flow-root">
				<div class="float-left align-middle">
					Graphique des inscriptions sur le site :
				</div>
				<div class="float-right">
					<select name="usersYears" id="usersYears" class="text-black rounded-lg" bind:value={userStatYear} on:change="{updateStatReg(userStatMonth)}">
						{#if uStatYearsList}
							{#each [...uStatYearsList].reverse() as StatYearsList}
								<option value="{StatYearsList}">{StatYearsList}</option>
							{/each}
						{/if}
					</select>
				</div>
			</div>
			<div class="xs:w-full lg:w-8/12 m-auto">
				<Bar name="register" {labels} dataChart={regData} bind:this={reg_child}></Bar>
			</div>
		</div>
	</div>
	<div class="lg:col-span-2 xs:col-span-1">
		<div class="bg-slate-800 block p-6 rounded-lg shadow-lg">
			Nombre total de snaps publiés sur le site :<br />
			<h1 class="text-center text-5xl">{data.snapsCount.published}</h1><br />
			<p class="text-center">
				( Il y a {data.snapsCount.total - data.snapsCount.published } snaps qui ne sont pas publié sur le site. Total : {data.snapsCount.total} snaps)
			</p>
		</div>
	</div>
	<div class="lg:col-span-2 xs:col-span-1">
		<div class="bg-slate-800 block p-6 rounded-lg shadow-lg">
			Nombre total de snaps publiés sur la liste publique :<br />
			<h1 class="text-center text-5xl">{data.snapsCount.publicSnap}</h1><br />
			<p class="text-center">
				({data.snapsCount.percentPublic}% de snap publié dans cette liste)
			</p>
		</div>
	</div>
	<div class="lg:col-span-2 xs:col-span-1">
		<div class="bg-slate-800 block p-6 rounded-lg shadow-lg">
			Nombre total de snaps publiés sur la black list :<br />
			<h1 class="text-center text-5xl">{data.snapsCount.black}</h1>
			<p class="text-center">
				({data.snapsCount.percentBlack}% de snap publié dans cette liste)
			</p>
		</div>
	</div>
	<div class="lg:col-span-6 xs:col-span-1">
		<div class="bg-slate-800 block p-6 rounded-lg shadow-lg overflow-x-auto">
			<div class="flow-root">
				<div class="float-left align-middle">
					Graphique des snaps publiés sur le site :
				</div>
				<div class="float-right">
					<select name="snapsYears" id="snapsYears" class="text-black rounded-lg" bind:value={snapStatYear} on:change="{updateStatSnap(snapStatMonth)}">
						{#if sStatYearList}
							{#each [...sStatYearList].reverse() as snapStatYearsList}
								<option value="{snapStatYearsList}">{snapStatYearsList}</option>
							{/each}
						{/if}
					</select>
				</div>
			</div>
			<div class="xs:w-full lg:w-8/12 m-auto mt-4">
				<Bar name="snaps" {labels} dataChart={snapsData} bind:this={snap_child}></Bar>
			</div>
		</div>
	</div>
	<div class="lg:col-span-2 xs:col-span-1">
		<div class="bg-slate-800 block p-6 rounded-lg shadow-lg">
			Nombre de visiteurs actuellement :
			<div><iframe title="analytic" class="h-80 w-full" src="https://analytics.oxalt.fr/index.php?module=Widgetize&action=iframe&disableLink=1&widget=1&moduleToWidgetize=Live&actionToWidgetize=getSimpleLastVisitCount&idSite=2&period=day&date=yesterday&token_auth=secret" scrolling="yes" frameborder="0" marginheight="0" marginwidth="0"></iframe></div>
		</div>
	</div>
	<div class="lg:col-span-2 xs:col-span-1">
		<div class="bg-slate-800 block p-6 rounded-lg shadow-lg">
			Récapitulatif des visites :
			<div><iframe title="analytic" class="h-96 w-full" src="https://analytics.oxalt.fr/index.php?module=Widgetize&action=iframe&containerId=VisitOverviewWithGraph&disableLink=1&widget=1&moduleToWidgetize=CoreHome&actionToWidgetize=renderWidgetContainer&idSite=2&period=day&date=yesterday&token_auth=secret" scrolling="yes" frameborder="0" marginheight="0" marginwidth="0"></iframe></div>
		</div>
	</div>
	<div class="lg:col-span-6 xs:col-span-1">
		<div class="bg-slate-800 block p-6 rounded-lg shadow-lg">
			Cartes des visites :
			<div id="widgetIframe"><iframe title="analytic" width="100%" height="350" src="https://analytics.oxalt.fr/index.php?module=Widgetize&action=iframe&disableLink=1&widget=1&moduleToWidgetize=UserCountryMap&actionToWidgetize=visitorMap&idSite=2&period=day&date=yesterday&token_auth=secret" scrolling="yes" frameborder="0" marginheight="0" marginwidth="0"></iframe></div>
		</div>
	</div>
	<div class="lg:col-span-2 xs:col-span-1">
		<div class="bg-slate-800 block p-6 rounded-lg shadow-lg">
			Visites par jour de la semaine :
			<div id="widgetIframe"><iframe title="analytic" width="100%" height="350" src="https://analytics.oxalt.fr/index.php?module=Widgetize&action=iframe&disableLink=1&widget=1&moduleToWidgetize=VisitTime&actionToWidgetize=getByDayOfWeek&idSite=2&period=day&date=yesterday&token_auth=secret" scrolling="yes" frameborder="0" marginheight="0" marginwidth="0"></iframe></div>
		</div>
	</div>
	<div class="lg:col-span-2 xs:col-span-1">
		<div class="bg-slate-800 block p-6 rounded-lg shadow-lg">
			Pages les plus visionnées :
			<div id="widgetIframe"><iframe title="analytic" width="100%" height="350" src="https://analytics.oxalt.fr/index.php?module=Widgetize&action=iframe&disableLink=1&widget=1&moduleToWidgetize=Actions&actionToWidgetize=getPageUrls&idSite=2&period=day&date=yesterday&token_auth=secret" scrolling="yes" frameborder="0" marginheight="0" marginwidth="0"></iframe></div>
		</div>
	</div>
	<div class="lg:col-span-2 xs:col-span-1">
		<div class="bg-slate-800 block p-6 rounded-lg shadow-lg">
			Notation SEO :
			<div id="widgetIframe"><iframe title="analytic" width="100%" height="350" src="https://analytics.oxalt.fr/index.php?module=Widgetize&action=iframe&disableLink=1&widget=1&moduleToWidgetize=SEO&actionToWidgetize=getRank&idSite=2&period=day&date=yesterday&token_auth=secret" scrolling="yes" frameborder="0" marginheight="0" marginwidth="0"></iframe></div>
		</div>
	</div>
	<div class="lg:col-span-6 xs:col-span-1">
		<div class="bg-slate-800 block p-6 rounded-lg shadow-lg">
			<h1 class="mt-0 mb-2 text-3xl text-white font-medium leading-tight">Dernières mises à jour du site :</h1>
			<div id="accordionFlushGit">
				{#each data.commits as commit}
					<div class="border-neutral-600 bg-neutral-600 border border-t-0 border-l-0 border-r-0 rounded-none">
						<h2 class="mb-0" id="flush-heading-{commit.abbrevHash}">
							<button 
								class="group relative flex w-full items-center rounded-none	border-0 py-4 px-5 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none bg-neutral-800 text-white [&:not([data-twe-collapse-collapsed])]:bg-neutral-800 [&:not([data-twe-collapse-collapsed])]:text-primary-400 [&:not([data-twe-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
								type="button"
								data-twe-collapse-init
								data-twe-target="#flush-collapse-{commit.abbrevHash}"
								aria-expanded="false"
								aria-controls="flush-collapse-{commit.abbrevHash}"
								data-twe-collapse-collapsed
							>
								#{commit.abbrevHash} - {commit.authorName} - {commit.authorDateRel}
								<span class="ml-auto mr-1 h-5 w-5 shrink-0 rotate-[-180deg] transition-transform duration-200 ease-in-out group-[[data-twe-collapse-collapsed]]:mr-0 group-[[data-twe-collapse-collapsed]]:rotate-0 motion-reduce:transition-none fill-blue-300 group-[[data-twe-collapse-collapsed]]:fill-white">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
										<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
									</svg>
								</span>
							</button>
						</h2>
						<div id="flush-collapse-{commit.abbrevHash}" class="!visible hidden border-0" data-twe-collapse-item aria-labelledby="flush-heading-{commit.abbrevHash}" data-twe-parent="#accordionFlushGit">
							<div class="px-5 py-4 text-white">
								<div class="subject">
									{commit.subject}
								</div>
								<button
									type="button"
									class="durati1on-150 bg-slate-900 hover:bg-green-500 hover:text-black hover:cursor-pointer block p-4 my-2 text-xs font-medium leading-tight text-center text-white uppercase transition ease-in-out rounded shadow-md w-full"
									data-twe-toggle="modal"
									data-twe-target="#Modal{commit.abbrevHash}"
									data-twe-ripple-init
									data-twe-ripple-color="dark"
									>
									{#if commit.files.length > 1}
										Voir la liste des {commit.files.length} fichiers qui ont été modifiés
									{:else}
										Voir le fichier qui  à été modifié
									{/if}
								</button>
								<div data-twe-modal-init class="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none" id="Modal{commit.abbrevHash}" tabindex="-1" aria-labelledby="exampleModalLgLabel" aria-hidden="true">
									<div data-twe-modal-dialog-ref class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px]">
										<div class="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
											<div class="bg-slate-800 flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
												<h5 class="text-xl font-medium leading-normal text-neutral-200" id="exampleModalLgLabel">
													{commit.files.length} Fichiers modifiées - #{commit.abbrevHash}
												</h5>
												<button type="button" class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none" data-twe-modal-dismiss aria-label="Close">
													<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
														<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
													</svg>
												</button>
											</div>
											<div class="bg-slate-800 relative p-4 overflow-y-scroll" data-twe-modal-body-ref>
												<ul class="list-disc list-inside">
													{#each commit.files as file}
														<li>{file}</li>
													{/each}
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>