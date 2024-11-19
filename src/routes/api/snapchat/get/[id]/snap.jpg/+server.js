import { error } from "@sveltejs/kit";

import Snapchat from "$controllers/SnapchatController.js";

import checkAccess from "$utils/checkAccess";

import {log} from "$utils/debug"

/** @type {import('../../../$types').RequestHandler} */
export async function GET({ params, locals, setHeaders }) {
	const session = await locals.session.data;
	const {id} = await params;

	let snap = await Snapchat.getById(id);

	if(!snap)
		throw error(404, "Ce snap n'existe pas");

	if(snap.type !== "img")
		throw error(406, "Ce snap n'est pas une photo");

	if(snap.list === "black" && !session.userid)
		throw error(403, "Vous devez vous connecter pour accéder à ce snap.");

	if(snap.published !== "Y" && !checkAccess(session, ['MANAGE_SNAPCHAT']))
		throw error(404, "Ce snap n'existe pas");
	
	const content = snap.content.replace(/^data:image\/[a-z]+;base64,/, "");

	setHeaders({
		'Content-Type': 'image/jpg'
	});
	
	const pageImage = Buffer.from(content, 'base64');

	return new Response(pageImage)
}