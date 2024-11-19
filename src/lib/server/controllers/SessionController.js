import { dev } from '$app/environment';

import { Op } from "sequelize";

import db from "$controllers/initDB.js";

import bcrypt from "bcrypt";
import * as crypto from 'crypto'
import authenticator from "authenticator"

import users from "$controllers/UserController.js";

import {log} from "$utils/debug"

let actions;
let User = db.users;
let Logins = db.logins

//SECTION Login
async function login(identifiant, password, ip){
	if(ip == undefined && dev)
		ip = "127.0.0.1";

	const token = () => crypto.randomBytes(32).toString('hex');

	const denyProxy = false;

    let error = {result : "error", errorMessage : "Identifiant ou mot de passe incorrect"};

    if(identifiant == null || identifiant == undefined)
        return error;

    if(password == null || password == undefined)
        return error;

    if(denyProxy === true){
        // TODO Call function that check if user use proxy
        // And block if user have proxy
        return {result : "error", errorMessage : "L'utilisation de proxy ou de VPN n'est pas autorisé"};
    }

    let user = await User.findOne({
        attributes: ["id", "username", "email", "password", "rank_id", "otp"],
        where : {
            [Op.or]: [
              { email       : identifiant },
              { username    : identifiant }
            ]
        },
        limit: 1,
		include: [
		  {
			association: 'rank',
            required: true,
			include: [{
			  association: 'permissions',
			  required: false,
			  attributes: ["name"],
			}]
		  }
		],
    });
    
    if(user == null){
		await bcrypt.compare(password, token);

		return error;
	}

    let banned = await users.checkBan(user.id, ip).then((value) => {
		return value;
	}).catch((e) => {
		return {result : "error", errorMessage : "Erreur lors de la vérification d'accès : " + e};
	});

    if(banned && banned.result === "banned")
		return {result: "banned", reason: banned.reason, end_date: banned.end_date};
    
    const match = await bcrypt.compare(password, user.password);

    if(!match)
        return error;

    if(user.otp !== null && user.otp !== "" && user.otp !== undefined){
        return {result: "otp", userid: user.id};
    }
    
    let last_connexion = Date.now();
    
	await user.update({
		last_ip : ip,
		last_connexion : last_connexion
	});

    let permissions = [];
	user.rank.dataValues.permissions.forEach(element => {
		permissions = [...permissions, element.name]
		
	});

    let ThisSessionToken = token;

    let login = await Logins.create({
        user_id   : user.id,
        token     : ThisSessionToken,
        ip        : ip,
        Date_log  : last_connexion
    }).then(() => {
		actions = {
			default: async ({ locals }) => {
				await locals.session.set({ userid: user.id, username: user.username, token: ThisSessionToken, permissions: permissions });
		
				return {};
			}
		};

        return {
            result        : "success",
            message       : "Bienvenue "+user.username+" !",
            userid        : user.id,
            username      : user.username,
            token         : ThisSessionToken,
            permissions   : permissions
        };
    }).catch(() => {
        return {result : "error", errorMessage : "Erreur lors de l'enregistrement du Token"};
    });

    return login;

}

// SECTION Logout
async function logout(userid, token, ip){
	let last_connexion = Date.now();

	if(ip == undefined && dev)
		ip = "127.0.0.1";

	let loginData = await Logins.findOne({
		where: {
            user_id: userid,
            token: token
        }
    })

	if(loginData !== null){
		await User.update({
			last_ip : ip,
			last_connexion : last_connexion
		}, {
			where: {
				id: userid
			}
		});

		loginData.destroy();
	}
}

async function checkLogin(){
	//
}

async function checkOTP(userid, otp_token, ip){
	if(ip == undefined && dev)
		ip = "127.0.0.1";

	let user = await User.findOne({
        attributes: ["id", "username", "rank_id", "otp"],
        where : {
            id: userid,
        },
        limit: 1,
		include: [
		  {
			association: 'rank',
            required: true,
			include: [{
			  association: 'permissions',
			  required: false,			  
			  attributes: ["name"],
			}]
		  }
		],
    });

    if(user == null)
        return {result : "errorOtp", errorMessage : "Utilisateur introuvable"};

    if(user.otp === null || user.otp === undefined)
        return {result : "errorOtp", errorMessage : "Impossible d'utiliser l'authentification à double facteur avec ce compte"};

    let authenticate = authenticator.verifyToken(user.otp, otp_token);

    if(authenticate === false || authenticate === null || authenticate === undefined)
        return {result : "errorOtp", errorMessage : "Code d'authentification invalide"};

        let last_connexion = Date.now();
    
        await user.update({
            last_ip : ip,
            last_connexion : last_connexion
        });
        
		let permissions = [];
		user.rank.dataValues.permissions.forEach(element => {
			permissions = [...permissions, element.name]
			
		});
        
        const token = () => crypto.randomBytes(32).toString('hex');
    
        let ThisSessionToken = token();
    
        let login = await Logins.create({
            user_id   : userid,
            token     : ThisSessionToken,
            ip        : ip,
            Date_log  : last_connexion
        }).then(() => {
            return {
                result        : "success",
                message       : "Bienvenue "+user.username+" !",
                userid        : userid,
                username      : user.username,
                token         : ThisSessionToken,
                permissions   : permissions
            };
        }).catch((data) => {
            return {result : "errorOtp", errorMessage : "Erreur lors de l'enregistrement du Token : " + data};
        });
    
        return login;
}

async function sessionValidator(){
	//
}

async function tokenValidator(){
	//
}

/** @type {import('@sveltejs/kit').Actions} */
export default {
	login,
	logout,
	checkLogin,
    checkOTP,
    sessionValidator,
    tokenValidator,
	actions
}