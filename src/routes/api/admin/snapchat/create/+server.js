import { json } from '@sveltejs/kit';

import Snapchat from "$controllers/SnapchatController.js";

import checkAccess from "$utils/checkAccess";

import {log} from "$utils/debug";

/** @type {import('../$types').RequestHandler} */
export async function POST({ request, locals }) {
	let session = locals.session.data;

	if(!checkAccess(session, ['MANAGE_SNAPCHAT']))
		return json({result: "error", message: "Access denied"});

	let snap = await request.json();

	if(!snap.token || snap.token == null || snap.token == undefined || session.token != snap.token)
		return json({result: "error", message: "Access denied"});

	let sc = await Snapchat.create(snap, session);

    return json(sc);
};