<script>
	import { linear } from 'svelte/easing';
	import { fly, fade } from "svelte/transition";

	import axios from "axios";
	
	import Categorie from "$components/Categorie.svelte";

	import { log } from "$utils/debug"
	
	/** @type {import('./$types').PageData} */
	export let data;

	let categories = data.categories;

	let delCategory = (id) => {
		//
	}

	/*
    function delCategory(id) {
        axios.delete('/api/admin/category/delete/'+id+'/'+ $session.token).then((data) => {
            resultCategories = [...resultCategories, data.data];

            if(data.data.result === "success") {
                categories = categories.filter(cat => cat.id != id);
            }
        });
    };
	*/
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.5/font/bootstrap-icons.min.css">
	<link rel="stylesheet" href="/uip/assets/stylesheets/elegant-icons.min.css">
	<link rel="stylesheet" href="/uip/assets/stylesheets/feather-icons.min.css">
	<link rel="stylesheet" href="/uip/assets/stylesheets/fomantic-ui-icons.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
	<link rel="stylesheet" href="/uip/assets/stylesheets/foundation-icons.min.css">
	<link rel="stylesheet" href="/uip/assets/stylesheets/happy-icons.min.css">
	<link rel="stylesheet" href="/uip/assets/stylesheets/icomoon.min.css">
	<link rel="stylesheet" href="/uip/assets/stylesheets/open-iconic.min.css">
	<link rel="stylesheet" href="/uip/assets/stylesheets/weather-icons.min.css">
	<link rel="stylesheet" href="/uip/assets/stylesheets/zondicons.min.css">
</svelte:head>

<div class="grid grid-cols-6 gap-2">
	{#each categories as cat}
		<Categorie id={cat.id} name={cat.name} icon={cat.icon} iconColor={cat.iconColor} subcategories={cat.subcategories} {delCategory} />
	{/each}
</div>