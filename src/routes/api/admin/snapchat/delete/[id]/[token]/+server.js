import { json } from '@sveltejs/kit';

import Snapchat from "$controllers/SnapchatController.js";

import checkAccess from "$utils/checkAccess";

import {log} from "$utils/debug";

/** @type {import('../$types').RequestHandler} */
export async function DELETE({ params, locals }) {
	let session = locals.session.data;

	if(params.id == null || params.id == undefined || params.id == "")
		return json({result: "error", message: "Suppression impossible"});

	if(params.token == null || params.token == undefined || params.token == "")
		return json({result: "error", message: "Token invalide ou innexistant"});

	if(session.token !== params.token)
		return json({result: "error", message: "Token invalide ou innexistant"});

	if(!checkAccess(session, ['MANAGE_SNAPCHAT']))
		return json({result: "error", message: "Access denied"});

	let deleteSnap = await Snapchat.deleteSnap(params.id)

    return json(deleteSnap);
};