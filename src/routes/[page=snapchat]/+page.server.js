import {log} from "$utils/debug";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {	
	const session = await locals.session.data;

	const permissions = session.permissions

	return {
		session: session,
		permissions: permissions
	};
}