import { dev } from '$app/environment';

import db from "$controllers/initDB.js";
import { Op } from "sequelize";

import bcrypt from "bcrypt";
import * as crypto from 'crypto'

import axios from "axios";

import dayjs from 'dayjs';

import permissions from "$controllers/PermissionsController.js";
import Config from "$controllers/ConfigController.js";

import sendJoinNotif from "$utils/joinNotif.js";
import {log} from "$utils/debug"

import junkEmailList from "$config/junk_mail.json";

let Ban = db.bans;
let Users = db.users;
let User = db.users;

//SECTION checkBan
async function checkBan(userid, ip){
	return await Ban.findOne({
        where: {
            [Op.or]: [
                {
                    IP: ip
                }, {
                    user: userid
                }
            ]
        },
        limit: 1
    }).then((value) => {
		if(value == null)
			return {result: "free"}

		return value.dataValues
	});
}
//!SECTION checkBan

//SECTION signup
async function signup(identifiant, email, password, newsletter, ip){
	if(ip == undefined && dev)
		ip = "127.0.0.1";

    function isNull(input){
        return !!(input == null || input == undefined);
    }

    let banned = await Ban.findOne({
        where : {
            IP: ip
        },
        limit: 1
    });

    if(banned !== null)
        return {result: "banned", reason: banned.reason, end_date: banned.end_date};

    if(isNull(identifiant) || isNull(email) || isNull(password) || isNull(ip)){
        return {result: "error", message: "Un ou plusieurs des champs ne sont pas complétés"};
    }

    if(identifiant.length < 3)
        return {result : "error", message : "Votre identifiant est trop court"};

    if(identifiant.length > 20)
        return {result : "error", message : "Votre identifiant est trop long"};

    let correctEmail = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");

    if(!correctEmail.test(email))
        return {result : "error", message : "Vous devez entrez une adresse électronique valide"};

    let ind = email.indexOf("@");
    let email_domain = email.slice((ind+1),email.length);

    if(junkEmailList.includes(email_domain))
        return {result : "error", message : "Les adresse électronique jetables ne sont pas autorisées"};

    let strongPassword = new RegExp("/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/");

    if(strongPassword.test(password))
        return {result : "error", message : "Votre mot de passe n'est pas assez complexe"};

    let user = await User.findOne({
        attributes: ["id", "username", "email"],
        where : {
            [Op.or]: [
              { email       : email },
              { username    : identifiant }
            ]
        },
        limit: 1
    });

    if(user !== null)
        return {result: "error", message: "Vous possédez déjà un compte sur le site."};

	//ANCHOR Newsletter
    if(newsletter){
        axios.post("https://news.lripsum.net/api/public/subscription",{
            name: identifiant,
            email: email,
            status: "enabled",
            list_uuids: ["4e69ce0a-77bb-428b-8fc4-7ee6ac47adf1"]
        });
    }

    const hash = bcrypt.hashSync(password, 10);

    const code = () => crypto.randomBytes(32).toString('hex');
	const token = () => crypto.randomBytes(32).toString('hex');
    
	//ANCHOR User BDD Creation
    let register = await User.create({
        username                : identifiant,
        password                : hash,
        last_password_modify    : Date.now(),
        email                   : email,
        verify_email_code       : code(),
        last_ip                 : ip,
        register_ip             : ip,
        last_connexion          : Date.now(),
        register_date           : Date.now()
    })
    .then(async (value) => {
		let config = await Config.get();

		if(config.JoinAppNotification === "Y")
			await sendJoinNotif("Nouvel inscription sur LRipsum.net", identifiant+" vient de s'inscrire sur LRipsum.net");

		let pems = await permissions.get(1);

        return {
			result: "success",
			message: "Votre compte à été crée avec succès ! Vous pouvez désormais vous connecter.",
			userid: value.id,
			username: value.username,
			token: token(),
			permissions: pems
		};
    })
    .catch((error) => {
        return {result: "error", message: "Problème lors de la création de votre compte "+error};
    });

    return register;
}
//!SECTION signup

//SECTION getByID
async function getByID(userid, attributes){
	if(attributes !== undefined && attributes !== null && attributes !== ""){
		return await User.findOne({
			attributes: attributes,
			where : {
				id: userid
			},
			limit: 1
		});
	}

	return await User.findOne({
		where : {
			id: userid
		},
		limit: 1
	});
}
//!SECION getByID

//SECTION getPerms
async function getPerms(userid){
	let user = await getByID(userid, ["id", "rank_id"]);

	return await permissions.get(user.rank_id);
}
//!SECTION getPerms

//SECTION count
async function count(){
	const total = await User.count();

	const stats = await db.sequelize.query("SELECT COUNT(*) AS count, YEAR(FROM_UNIXTIME(ROUND(register_date/1000))) AS reg_year, MONTH(FROM_UNIXTIME(ROUND(register_date/1000))) AS reg_month FROM users GROUP BY reg_year, reg_month;");

	return {"total": total, "stats": stats[0]};
}
//!SECIONT

export default {
    signup,
	checkBan,
	getByID,
    getPerms,
	count
}