import { json } from '@sveltejs/kit';

import axios from "axios";

import { getClientTrueIp } from "$api/ip.js";
import login from "$controllers/SessionController.js";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	const { userid, otp_token } = await request.json();
	const ip = getClientTrueIp(request);

	const { session } = await locals.session.data;

	if(session !== undefined && session !== null && session !== "")
		return {result : "error", errorMessage : "Vous êtes déjà connecté."};

    return await login.checkOTP(userid, otp_token, ip).then(async (value) => {
		if (value.result === "success") {
			await locals.session.set({
				userid: value.userid,
				username: value.username,
				token: value.token,
				permissions: value.permissions
			});
		}

		return json(value);
	});
}