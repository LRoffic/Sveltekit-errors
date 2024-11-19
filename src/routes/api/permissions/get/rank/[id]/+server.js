import { json } from '@sveltejs/kit';

import login from "$controllers/UserController.js";

/** @type {import('../../$types').RequestHandler} */
export async function POST({ locals }) {
	const { session } = await locals.session.data;

	if(session !== undefined && session !== null && session !== "")
		return json({permissions: null});




    return json({permissions: permissions});
}