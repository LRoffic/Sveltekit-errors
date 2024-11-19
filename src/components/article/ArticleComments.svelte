<script>
	import { page } from '$app/stores';

	import axios from "axios";

    import Swal from 'sweetalert2';
    
    import { createForm } from "svelte-forms-lib";
    import * as yup from "yup";
    import YupPassword from 'yup-password';
    YupPassword(yup);
	
	import PrimaryButton from "$components/PrimaryButton.svelte";

    import ArticleCommentList from "$components/article/ArticleComment.svelte";

	import {log} from "$utils/debug"

    export let article_id;

	$: session = $page.data.session;

    let comments;

    async function getComments(id) {
        comments =  await axios.get("/api/articles/get/"+id+"/comments").then((data) => {
            data = data.data;
            
            return data;
        });

		return comments;
    }

    comments = getComments(article_id);

    async function send(){
        return await axios.post("/api/comments/create/"+article_id+"", {comment: $form.comment}).then((data => {
            data = data.data;

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
            
            Toast.fire({
                icon: data.result,
                title: data.message
            });

            $form.comment = "";

            setTimeout(async () => {
                comments = await getComments(article_id);
            }, 1500);

            return data;
        }));
    }

    const { form, errors, handleChange, handleSubmit, isValid, isSubmitting } = createForm({
        initialValues: {
            comment         : "",
        },
        validationSchema: yup.object().shape({
            comment: yup
                .string("Le commentaire doit être remplis de texte")
                .min(5, "Le commentaire doit avoir au moins 5 lettres")
                .required("Le commentaire est obligatoire"),
        }),
        onSubmit: async () => {
            await send();
        }
    });
</script>

<div class="bg-slate-800 block rounded-lg shadow-lg text-white p-4 mt-2 mb-4"  id="#top">
    {#key session}
        {#if !session.userid}
            <p>Vous devez être connecté pour commenter</p>
		{:else}
            <form action="" on:submit={handleSubmit}>
                <div class="flex flex-row">
                    <div class="flex-1">
                        <h4 class="mb-2 underline">Commenter :</h4>
                    </div>
                    <div class="flex flex-1 justify-end ">
                        {#key $isSubmitting}
                            {#if $isSubmitting}
                                Envois en cours...
                            {/if}
                        {/key}
                    </div>
                </div>
                <div class="my-2">
                    <textarea 
                        name="comment" 
                        bind:value="{$form.comment}"
                        on:change={handleChange}
                        on:blur={handleChange}
                        class="w-full h-44 bg-slate-900 border-none rounded-lg"
                    ></textarea>
                    {#key $errors.comment}
                        {#if $errors.comment}
                            <p class="text-red-500 mt-2">{$errors.comment}</p>
                        {/if}
                    {/key}
                </div>
                {#key $isSubmitting}
                    {#if $isSubmitting}
                        <PrimaryButton class="disabled">
                            Envois en cours...
                        </PrimaryButton>
                    {:else}
                        <button type="submit" class="w-full px-6 py-4 mr-2 text-white transition duration-150 ease-in-out rounded shadow-md bg-slate-900 hover:bg-green-400 hover:text-black hover:cursor-pointer">Envoyer le commentaire</button>
                    {/if}
                {/key}
            </form>
        {/if}
    {/key}
</div>


{#await comments}
	<div class="flex justify-center items-center align-middle text-white">
		<div class="text-green-400 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
			<span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Chargement...</span>
		</div>
		<span class="ml-2">Chargement...</span>
	</div>
{:then coms}
    {#if coms}
        {#each coms as com}
            <ArticleCommentList {com} />
        {/each}
    {:else}
        Aucun commentaire pour le moment, soyez le premier ? 😊
    {/if}
{/await}