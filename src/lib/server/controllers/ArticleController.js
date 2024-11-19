

import db from "$controllers/initDB.js";

import {log} from "$utils/debug"

let Articles = db.articles;
let Categories = db.categories;

async function get(published = true){
	let where = {};

	if(published == true){
		where.published = "Y";
	} else if (published == false){
		where.published = "N";
    }

	return await Articles.findAll({
		where: where,
		order: [
			['id', 'DESC']
		],
		raw: true
	});
}

async function getById(id, published = true, published_category = true){
	let where = {
		id: id,
	};

	if(published === true){
		where.published = "Y";
	} else if (published === false){
		where.published = "N";
    }

	if(published_category == true){
		published_category = "Y";
    } else if (published_category == false){
		published_category = "N";
	}

	return await Articles.findOne({
		where: where,
		include: [{
			association: 'category',
            required: false,
			attributes: ['id', 'name'], 
			where : {
				published: published_category
			},
			raw: true
		},{
			association: 'categories_articles',
            required: false,
			raw: true
		}],
		raw: true
	});
}

async function count(){
	return await Articles.count();
}

export default { 
	get,
	getById,
	count
};