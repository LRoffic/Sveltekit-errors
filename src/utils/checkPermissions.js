import {log} from "$utils/debug"

let checkPermission = (permissionsNeeded, userPermissions) => {
	if(userPermissions == undefined || userPermissions == null || userPermissions == "")
		return false;
	
	if(Array.isArray(permissionsNeeded)){
		let checkPerms = true

		permissionsNeeded.forEach(perm => {
			if(!userPermissions.includes(perm))
				checkPerms = false;
		});

		return checkPerms
	}

	for (let j=0; j<userPermissions.length; j++) {
		if (userPermissions[j].match(permissionsNeeded))
			return true;
	}
	return false;
}

export default checkPermission