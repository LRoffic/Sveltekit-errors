<script>
	import { fly } from "svelte/transition";

    import axios from "axios";

    import SubCategories from "$components/SubCategorie.svelte";

	import { log } from "$utils/debug";

    export let  id, name, icon, iconColor, subcategories, delCategory;

	function delSubCategory(id){
		//
	}

	/*
    function delSubcategory(id) {
        axios.delete('/api/admin/subcategory/delete/'+id+'/'+ $session.token).then((data) => {
            if(data.data.result === "success") {
                subcategories = subcategories.filter((cat) => cat.id!== id);
            }
        });
    }
	*/
</script>

<div class="block col-span-2 p-6 text-6xl text-center text-white rounded-lg shadow-lg bg-slate-800 h-min" out:fly>
    {#if icon}
        <i class="mx-auto h-10 {icon}" style="color : {iconColor}"></i>
    {/if}
    <h2 class="my-2 text-2xl text-center">{name}</h2>
    <div class="flex justify-center">
        <a href="/admin/categorie/{id}/edit" class="mx-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="fill-neutral hover:fill-blue-500" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
        </a>
        <button id="deleteCategory-{id}" on:click|preventDefault={delCategory(id)} class="mx-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="fill-neutral hover:fill-red-500" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
            </svg>
        </button>
    </div>
    {#if subcategories.length >= 1}
        <hr class="mt-4 bg-gray-900 bg-opacity-100 ">
        <ul>
            {#each subcategories as subcategory}
                <SubCategories {subcategory} />
            {/each}
        </ul>
    {/if}
</div>