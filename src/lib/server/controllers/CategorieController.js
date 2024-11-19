import fs from 'node:fs';

import db from "$controllers/initDB.js";

import {log} from "$utils/debug"

let Categorie = db.categories;
let Subcategories = db.subcategories;

async function getOne(id){
	return await Categorie.findOne({where: {id: id} });
}

async function get(published){
	let categories = [];

	if(published === "true")
		categories = await Categorie.findAll({where: {published: "Y"}, raw: true});
    else if(published === "false")
		categories = await Categorie.findAll({where: {published: "N"}, raw: true});
	else if(published === "all")
		categories = await Categorie.findAll({raw: true});
	else
	    return {result: "error", message: "Invalid published parameter"};

	if(!categories)
		return {result: "error", message: "No categories found"};

	let i = 0;
	for(let category of categories) {
		let subs = await Subcategories.findAll({where: {categorie_id: category.id}, raw: true});
		categories[i].subcategories = subs;
		i += 1;
	}

	return categories;
}

async function create(NewCategorie){
	return await Categorie.create({
		name: NewCategorie.name,
        icon: NewCategorie.icon,
        iconColor: NewCategorie.color || '#ffffff',
        published: NewCategorie.published || false
	}).then(() => {
		 return {result: "success", message: "Categorie created successfully" };
	});
}

async function update(NewConfig){
	let config = await Config.findOne({where: {id: 1}});

	if(config.FacebookToken != NewConfig.FacebookToken && fs.existsSync("data/autopost-data.json"))
		fs.unlinkSync("data/autopost-data.json" );

	config.FacebookToken = NewConfig.FacebookToken;
	config.FacebookTokenUpdateDate = Date.now();

	await config.save();

	return {result: "success", message: "Config updated successfully" };
}

export default {
	getOne,
	get,
	create,
	update
};