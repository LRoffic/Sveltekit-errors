import { redirect, error, json } from "@sveltejs/kit";

import voca from 'voca';

import Article from "$controllers/ArticleController.js";
import Movie from "$controllers/MoviesController.js";

import {log,l} from "$utils/debug";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
	let session = await locals.session.data;

	let article = await Article.getById(params.id);

	let movie;

	if(!article)
		error(404, { message: "Cet article est introuvable." });

	let articleSlug = voca.slugify(article.title);

	if(articleSlug !== params.slug)
		redirect(303, "/article/"+article.id+"/"+voca.slugify(article.title));

	if(article.imdbid !== null){
		movie = await Movie.get(article.imdbid);

		if(movie)
			movie = movie.dataValues;
	}
	
	
	return {
		article: article,
		movie: movie
	}
}