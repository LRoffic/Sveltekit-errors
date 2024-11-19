import fs from 'node:fs';

import db from "$controllers/initDB.js";

import {log} from "$utils/debug"

let Config = db.config;

async function get(){
	return await Config.findOne({where: {id: 1} });
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
	get,
	update
};