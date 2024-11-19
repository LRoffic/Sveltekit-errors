import { json } from '@sveltejs/kit';

import { SECRET_RECAPTCHA_SECRET } from '$env/static/private';

import axios from "axios";

import { getClientTrueIp } from "$api/ip.js";
import login from "$controllers/SessionController.js";

import {log} from "$utils/debug"

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {	
	const { identifiant, password, g_recaptcha_response } = await request.json();

	const ip = getClientTrueIp(request);

	log.info(ip)

	const { session } = await locals.session.data;

	if(session !== undefined && session !== null && session !== "")
		return json({result : "error", errorMessage : "Vous êtes déjà connecté."});

	let checkRecaptcha = await axios.post("https://www.google.com/recaptcha/api/siteverify?secret="+SECRET_RECAPTCHA_SECRET+"&response="+g_recaptcha_response+"&remoteip="+ip)
	.then((value) => {
		return value.data;
	}).catch((e) => {
		return e.response.data;
	});

    if (
		g_recaptcha_response &&
		g_recaptcha_response !== "" &&
		g_recaptcha_response !== null && 
		g_recaptcha_response !== undefined && 
		checkRecaptcha !== "" && 
		checkRecaptcha !== undefined && 
		checkRecaptcha !== null && 
		checkRecaptcha.success &&
		checkRecaptcha.success === true
	) {
        return await login.login(identifiant, password, ip).then(async (value) => {
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
    } else {
        return json({result: "error", errorMessage: "Recaptcha Error : "+JSON.stringify(checkRecaptcha)});
    }
}