import { redirect, error } from "@sveltejs/kit";

import voca from 'voca';

import Article from "$controllers/ArticleController.js";

import {log} from "$utils/debug";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	let article = await Article.getById(params.id);

	//article = article.dataValues;

	if(!article)
		error(404, { message: "Cet article n'existe pas ou plus." });

	article = article.dataValues;

	redirect(303, "/article/"+article.id+"/"+voca.slugify(article.title));
}