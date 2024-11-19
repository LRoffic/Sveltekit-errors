import { error } from '@sveltejs/kit';

import checkAccess from "$utils/checkAccess";

import {log} from "$utils/debug"

/** @type {import('@sveltejs/kit').LayoutServerLoad} */
export async function load({ locals }) {
	const session = await locals.session.data;

	const access = await checkAccess(session, ["ACCESS_ADMIN"]);

	if(!access)
		error(404, 'Not Found');

	return {}
}