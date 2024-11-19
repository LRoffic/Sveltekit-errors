import { json } from '@sveltejs/kit';

import Categorie from "$controllers/CategorieController.js";

import checkAccess from "$utils/checkAccess";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	if(!checkAccess(locals.session.data, ['MANAGE_CATEGORIES']))
		return json({result: "error", message: "Access denied"});

	let NewCategorie = await request.json();

	let cat = await Categorie.create(NewCategorie);

    return json(cat);
};