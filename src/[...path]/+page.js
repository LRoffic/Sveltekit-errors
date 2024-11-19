import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load(event) {
	error(404, 'Not Found');
}