import db from "$controllers/initDB.js";

let Permissions = db.permissions;

async function get(rank_id) {
	let permissions = await Permissions.findAll({
        attributes: ["name"],
        where: {
            rank_id: rank_id
        }
    });
    
    let perms = [];

    permissions.forEach(element => {
        perms = [...perms, element.name];
    });

	return perms;
}

export default {
	get
}