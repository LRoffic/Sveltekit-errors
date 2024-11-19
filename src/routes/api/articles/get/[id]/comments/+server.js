import { json } from '@sveltejs/kit';

import Comments from "$controllers/CommentController.js";


/** @type {import('./$types').RequestHandler} */
export async function GET({params}) {
	let comments = await Comments.getByArticle(params.id);

	if(!comments)
		return json({error: "Article not found"});

    return json(comments)
};