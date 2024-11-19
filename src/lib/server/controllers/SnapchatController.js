import fs from "node:fs";
import { writeFile } from "node:fs/promises";

import AutoPost from 'fb-auto-post';

import db from "$controllers/initDB.js";

import Config from "$controllers/ConfigController.js";

import {log} from "$utils/debug"

let Snapchat = db.snapchat;

//SECTION get
async function get(params){
	let permission = false;
	let snaps;

    let offset = 0;
    if(params.page > 1)
        offset = 10*(params.page-1)

	switch(params.list){
		case "both":
			snaps = await Snapchat.findAll({
				limit: 10,
				offset: offset,
				order: [
					['id', 'DESC']
				],
				raw: true
			});
		break;
		
		case "black":
			snaps = await Snapchat.findAll({
				limit: 10,
				offset: offset,
				where: {
					published: "Y",
					list: "black"
				},
				order: [
					['id', 'DESC']
				],
				raw: true
			});
		break;
		
		default:
			snaps = await Snapchat.findAll({
				limit: 10,
				offset: offset,
				where: {
					published: "Y",
					list: "public"
				},
				order: [
					['id', 'DESC']
				],
				raw: true
			});
	}

	return snaps
}
//!SECTION GET

//SECTION getById
async function getById(id, raw = false){
	return await Snapchat.findOne({where: { id: id }, raw: raw});
}
//!SRCTION getById

//SECTION count
async function count(){
	const total            = await Snapchat.count();
	const published        = await Snapchat.count({ where: { published: "Y" } });
	const unpublished      = total - published;

	const publicSnap       = await Snapchat.count({ where: { list: "public", published: "Y" } });
	const black            = published - publicSnap;

	const percentPublic    = Math.round((publicSnap / published) * 100)
	const percentBlack    = 100 - percentPublic;
	
	const stats = await db.sequelize.query("SELECT COUNT(*) AS count, YEAR(FROM_UNIXTIME(ROUND(published_date/1000))) AS published_year, MONTH(FROM_UNIXTIME(ROUND(published_date/1000))) AS published_month FROM snapchat WHERE published = 'Y' GROUP BY published_year, published_month;");
	const statsBlack = await db.sequelize.query("SELECT COUNT(*) AS count, YEAR(FROM_UNIXTIME(ROUND(published_date/1000))) AS published_year, MONTH(FROM_UNIXTIME(ROUND(published_date/1000))) AS published_month FROM snapchat WHERE published = 'Y' AND list = 'black' GROUP BY published_year, published_month;");

	return { 
		"total"           : total,
		"published"       : published,
		"unpublished"     : unpublished,
		"publicSnap"      : publicSnap,
		"black"           : black,
		"percentPublic"   : percentPublic,
		"percentBlack"    : percentBlack,
		"stats"           : stats[0],
		"statsBlack"      : statsBlack[0]
	}
}
//!SECTION count

//SECTION create
async function create(snap, session) {
	let {title, type, content, fcburl, thumbnailPath, list, published, socialNetwork} = snap;
	
	return await Snapchat.create({
		title : title, 
		type : type, 
		content : content, 
		list : list, 
		published : published,
		published_date : Date.now(),
		author: session.userid,
		social_network : socialNetwork,
		facebook_url : fcburl,
		thumbnailPath: thumbnailPath
	}).then(async (data) => {
		let result_status, result_message;

		function setMessages(res_status, res_message){
			result_message = res_message
			result_status = res_status;
		}
		
		if(socialNetwork === "Y"){
			const FBToken = await Config.get();	
			
			return await AutoPost.initialize({
				app_id: "secret", // (Required) Generate from From Your Facebook Developer App
				app_secret: "secret", // (Required) Generate from From Your Facebook Developer App
				user_access_token: FBToken.FacebookToken, // (Required) Generate from Facebook Developer Platform Tool (check file data/autopost-data.json), Permissions Needed: public_profile, pages_manage_posts, pages_show_list, pages_read_engagement
				fb_api_url: 'graph.facebook.com', // (Optional) Default: graph.facebook.com
			}).then(async (obj) => {
				if(title != undefined && title != "" && title != null)
					title = title+"\n\nhttps://url.lripsum.net/sc";
				else
					title = "N'hésite pas à partager et à liker si la publication te plaît !\n\nSi tu as aimé cette publication, tu en trouveras plein d'autres sur mon site, clic sur le lien ! \nhttps://url.lripsum.net/sc";
				

				if(type == "img"){
					let now = Date.now();

					return new Promise(async (resolve, reject) => {
						obj.publishPost(title, 'photo', null,  "https://lripsum.net/api/snapchat/get/"+data.id+"/snap.jpg", (err, r) => {
							if(err == null || err == "" || err == undefined){
								setMessages("success", "Le snap a été posté sur le site et sur facebook");
								result_status = "success";
								result_message = "Le snap a été posté sur le site et sur facebook";
							} else {
								result_status = "error";
								result_message = "Le snap a été posté sur le site, mais n'a pas été publié sur facebook. Erreur : " + err.error.error_user_msg;
							}
							resolve({result : result_status, message : result_message, snapId : data.id});
						});						
					})					
				} else {
					return new Promise((resolve, reject) => {
						obj.publishPost(title, 'link', fcburl, null, async (err, r) => {
							if(err == null || err == "" || err == undefined){
								result_status = "success";
								result_message = "Le snap a été posté sur le site et sur facebook";
							} else {
								result_status = "error";
								result_message = "Le snap a été posté sur le site et sur facebook. Erreur : " + err.error.error_user_msg;
							}
							resolve({result : result_status, message : result_message, snapId : data.id});
						});
					}).then(async (r) => { return r});
				}
			});
		} else {
			result_status = "success";
			result_message = "Le snap a été posté sur le site";
		}

		return {result: result_status, message: result_message, snapId : data.id};
	})
}
//!SECTION create

//SECTION delete
async function deleteSnap(id){
	let snap = await getById(id);

	if(!snap)
		return {result: "error", message: "Impossible de supprimer un snap innexistant"};

	snap.destroy();

	return {result: "success", message: "Le snap a été supprimé"}
}
//!SECTION delete

export default { 
	get,
	getById,
	count,
	create,
	deleteSnap
};