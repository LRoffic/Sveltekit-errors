import axios from "axios";

async function sendJoinNotif(title, message, url) {
	let joinAPI = "https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush";

	let options = {
		apikey: "secret",
		deviceId: "secret",
		title: title,
		text: message,
		icon: "https://lripsum.net/img/favicon.ico",
		smallicon: "https://lripsum.net/img/favicon.ico"
	}

	if(url!== undefined && url!== "")
		options.url = url;

	await axios.post(joinAPI, options);
}

export default sendJoinNotif