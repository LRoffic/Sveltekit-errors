import { json } from '@sveltejs/kit';

import Snapchat from "$controllers/SnapchatController.js";

import {log} from "$utils/debug"

/** @type {import('../../../$types').RequestHandler} */
export async function POST({ request, params, locals }) {
	const session = await locals.session.data;

	let {list} = await params;

	let {page} = await request.json()

	let required = {
		list: list,
		page: page
	}

	let snaps = await Snapchat.get(required);

	if(list == "black" && Object.keys(session).length === 0)
		return json({result: "error", message: "Vous devez vous connecter pour accéder à ces snaps."})


    return json(snaps);
};