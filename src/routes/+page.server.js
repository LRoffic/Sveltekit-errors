import Article from "$controllers/ArticleController.js";

import { log, l } from "$utils/debug";

/** @type {import('./Blog/$types').PageServerLoad} */
export async function load({ params, locals }) {
	let articles = await Article.get(params.id);

	if (!articles) return {};

	return {
		articles: articles,
	};
}
