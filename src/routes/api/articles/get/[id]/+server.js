import { json } from '@sveltejs/kit';

import Article from "$controllers/ArticleController.js";


/** @type {import('./$types').RequestHandler} */
export async function GET({params}) {
	let article = await Article.getById(params.id);

    return json(article)
};
