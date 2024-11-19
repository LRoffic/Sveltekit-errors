import { error, json } from '@sveltejs/kit';

import config from '$controllers/ConfigController.js';

import checkAccess from "$utils/checkAccess";

import {log} from "$utils/debug";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const session = await locals.session.data;

	const access = await checkAccess(session, ["ACCESS_ADMIN", "MANAGE_CONFIG"]);

	if(!access)
		error(404, 'Not Found');

	let conf = await config.get();

	return { "config": conf.dataValues }
}