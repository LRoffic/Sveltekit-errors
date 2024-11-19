import { json } from '@sveltejs/kit';

import { getClientTrueIp } from "$api/ip.js";

import logout from "$controllers/SessionController.js";

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, locals, request }) {
	let session = locals.session.data;

	const ip = getClientTrueIp(request);

	if(!session || session == null || session == undefined || session == "" || Object.keys(session).length === 0)
		return json({result: "error", message: "Vous devez être connecté pour accéder à cette page."})

	if(params.token == null || params.token == undefined || params.token == "")
		return json({result: "error", message: "Token invalide ou innexistant"});

	if(session.token !== params.token)
		return json({result: "error", message: "Token invalide ou innexistant"});

	let username = session.username;

	await logout.logout(session.userid, session.token, ip)

	locals.session.destroy();

	return json({result: "success", message: "Au revoir et à bientôt " + username})
}