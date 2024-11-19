import { error } from '@sveltejs/kit';

import fs from "node:fs";

import articles from '$controllers/ArticleController.js';
import comments from '$controllers/CommentController.js';
import users from '$controllers/UserController.js';
import snaps from '$controllers/SnapchatController.js';

import gitlog from "gitlog";

import checkAccess from "$utils/checkAccess";

import { l, log } from "$utils/debug";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const session = await locals.session.data;

	const access = await checkAccess(session, ["ACCESS_ADMIN"]);

	if(!access)
		error(404, 'Not Found');

	let gPath = ".git/";
	
	if(fs.existsSync("../blog.git/"))
		gPath = "../blog.git/";	

	const options = {
		repo: gPath,
		number: 20,
		fields: ["subject","abbrevHash", "authorName", "authorDateRel", "rawBody"],
		execOptions: { maxBuffer: 1000 * 1024 },
	};

	return {
		articlesCount: await articles.count(),
		commentsCount: await comments.count(),
		usersCount: await users.count(),
		snapsCount: await snaps.count(),
		commits: await gitlog(options),
	};
}