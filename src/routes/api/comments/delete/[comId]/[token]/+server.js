import { json } from '@sveltejs/kit';

import Comments from "$controllers/CommentController.js";


/** @type {import('./$types').RequestHandler} */
export async function DELETE({params, request, locals}) {
	let com_id = params.comId;
	let token = params.token;
	let session = await locals.session.data;
	
    let removeComment = await Comments.hide(com_id, token, session);

	return json(removeComment);
};