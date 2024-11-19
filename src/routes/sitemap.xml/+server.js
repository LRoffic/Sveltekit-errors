import { dev } from '$app/environment';

import voca from 'voca';

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";

import Article from "$controllers/ArticleController.js";

import {log} from "$utils/debug";

const site = dev ? "http://localhost:5173" : "https://lripsum.net";
const pages = [
	"about",
	"login",
	"signup",
	"sc",
	"snapchat",
	"snaps",
];

let articles = [];

async function addArticles() {
	let articlesList = await Article.get();
	
	articlesList.forEach((article) => {
		articles.push({url:"article/"+article.id+"/"+voca.slugify(article.title), update_date: dayjs(article.update_date ? article.update_date : article.published_date).format("YYYY-MM-DD")})
	});
};
addArticles();

log.info(articles)

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const body = sitemap(pages);
	const response = new Response(body);
	response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
	response.headers.set('Content-Type', 'application/xml');

	return response;
}

const sitemap = (pages) => `<?xml version="1.0" encoding="UTF-8" ?>
	<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="https://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="https://www.w3.org/1999/xhtml" xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="https://www.google.com/schemas/sitemap-image/1.1" xmlns:video="https://www.google.com/schemas/sitemap-video/1.1">
		${pages.map((page) => `
			<url>
				<loc>${site}/${page}</loc>
				<changefreq>daily</changefreq>
				<priority>0.5</priority>
			</url>
		`).join('')}

		${articles.map((article) => `
			<url>
                <loc>${site}/${article.url}</loc>
                <lastmod>${article.update_date}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
            </url>
        `).join('')}
</urlset>`;
