import { error } from '@sveltejs/kit';

import checkAccess from "$utils/checkAccess"

import {log} from "$utils/debug";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const session = await locals.session.data;
	const permissions = session.permissions

	const access = await checkAccess(session, ["ACCESS_ADMIN", "MANAGE_SNAPCHAT"]);

	if(!access)
		error(404, 'Not Found');

	return {
		session: session,
		permissions: permissions
	};
}