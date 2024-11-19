import {google} from 'googleapis';

import db from "$controllers/initDB.js";

import { PERSPECTIVE_API_KEY } from '$env/static/private';

import Article from "./ArticleController.js";

import checkAccess from "$utils/checkAccess";

import {log} from "$utils/debug"

let Comments = db.comments;

//SECTION getByID
async function getById(id){
	return await Comments.findOne({where: {id: id}})
}
//!SECTION getByID

//SECTION getByArticle
async function getByArticle(id, published = "Y"){
	let article = await Article.getById(id);
	let where = {
		article_id: id,
		published: published
	};

	if(!article)
		return {result: "error", message: "Article not found"};

	if(published === "both"){
		where = {
			article_id: id,
		};
	}

	return await Comments.findAll({
		where: where,
		include: [{
			association: 'author',
            required: true,
			attributes: ["username"],
		}],
		order: [
			['id', 'DESC']
		],
	});
}
//!SECTION getByArticle

//SECTION count
async function count(){
	return await Comments.count();
}
//!SECTION count

//SECTION create
async function create(article_id, comment, author_id){
	log.info("author", author_id);
	log.info("comment", comment);
    if(author_id && comment){
        let perspective = "";

        const DISCOVERY_URL = 'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';
        
        try {
            await google.discoverAPI(DISCOVERY_URL).then(async (client) => {
                const analyzeRequest = {
                    comment: {
                        text: comment,
                    },
                    requestedAttributes: {
                    TOXICITY: {},
                    },
                };
                client.comments.analyze({
                    key: PERSPECTIVE_API_KEY,
                    resource: analyzeRequest,
                }, async (err, response) => {
                    if (err) throw err;
                    perspective = response.data.attributeScores.TOXICITY.summaryScore.value;
                    
                    let ret = await Comments.create({
                        author_id: author_id,
                        article_id: article_id,
                        content: comment,
                        online: "Y",
                        date_published: Date.now(),
                        published: "Y",
                        perspective_socre: perspective,
                    });
                });
            });
            return {result: "success", message : "Commentaire posté avec succès"};
        } catch (error) {
            return {result: "error", message: error};
        }
    } else {
        return {resullt: "error", message: "Utilisateur introuvable ou commentaire vide"};
    }
}
//!SECTION create

//SECTION hide
async function hide(com_id, token, session){
	if(!session)
		return {result: "error", message: "Session invalide ou inexistant"};

	if(!token)
		return {result: "error", message: "Token invalide ou inexistant"};

	if(session.token != token)
		return {result: "error", message: "Token invalide ou inexistant"};

    let comment = await getById(com_id);

    if(!comment)
        return {result: "error", message: "Commentaire introuvable"};

	let com = comment.dataValues;

	if(com.author_id != session.userid || !checkAccess(session, ["MANAGE_SNAPCHAT"]))
		return {result: "error", message: value.message};

	comment.published = "N";

	await comment.save();
	
	return{result: "success", message: "Vous avez supprimer le commentaire"};
}
//!SECION hide

export default {
	getById,
	getByArticle,
	count,
	create,
	hide,
};