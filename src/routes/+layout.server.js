import {log} from "$utils/debug"

/** @type {import('@sveltejs/kit').LayoutServerLoad} */
export function load({ locals, request }) {
	return {
		session: locals.session.data
	};
}