import User from "$controllers/UserController.js";

import {log} from "$utils/debug";

async function checkAccess (session, access) {
	if(session == undefined || session == null || session == "")
		return false;

	if(session.userid == undefined || session.userid == null || session.userid == "")
		return false;

	const permissions = await User.getPerms(session.userid);

	if(permissions == undefined || permissions == null || permissions == "")
		return false;

	let checkPerms = true
	access.forEach(perm => {
		if(!permissions.includes(perm))
			checkPerms = false;
	});

	return checkPerms
}

export default checkAccess;