import { redirect, error, json } from "@sveltejs/kit";

import Snapchat from "$controllers/SnapchatController.js"

import {log,l} from "$utils/debug";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
	let session = await locals.session.data;

	let snap = await Snapchat.getById(params.id, true);

	if(!snap)
		error(404, { message: "Ce snap est introuvable" });

	if(snap.list === "black" && !session.userid)
		error(403, { message: "Vous devez être connecté pour voir ce snap" });

	if(snap.published === "N")
		error(404, { message: "Ce snap est introuvable" });
	
	return {
		snap: snap
	}
}