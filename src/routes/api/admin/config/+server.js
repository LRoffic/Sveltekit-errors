import { json } from '@sveltejs/kit';

import Config from "$controllers/ConfigController.js";

import checkAccess from "$utils/checkAccess";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	if(!checkAccess(locals.session.data, ['MANAGE_CONFIG']))
		return json({result: "error", message: "Access denied"});

	let NewConfig = await request.json();

	let config = await Config.update(NewConfig);

    return json(config);
};