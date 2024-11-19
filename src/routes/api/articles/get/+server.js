import { json } from '@sveltejs/kit';

import Article from "$controllers/ArticleController.js";


/** @type {import('./$types').RequestHandler} */
export async function GET() {
	let articles = await Article.get();

    return json(articles)
};