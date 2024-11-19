import { json } from '@sveltejs/kit';

import Categories from "$controllers/CategorieController.js";

import { log, l } from "$utils/debug";

/** @type {import('./Blog/$types').PageServerLoad} */
export async function load({ params, locals }) {
	let categories = await Categories.get("all");

	if (!categories) return {};

	return {categories};
}
