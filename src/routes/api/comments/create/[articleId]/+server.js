import { json } from '@sveltejs/kit';

import Comments from "$controllers/CommentController.js";


/** @type {import('./$types').RequestHandler} */
export async function POST({params, request, locals}) {
	let { comment } = await request.json();
	let article_id = params.articleId;
	let author_id = await locals.session.data.userid;

	if(comment == null || comment == undefined || comment == "")
		return json({result: "error", message: "Commentaire vide"});
	
    let newComment = await Comments.create(article_id, comment, author_id);

	return json(newComment);
};