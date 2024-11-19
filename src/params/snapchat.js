/** 
 * @param {string} param 
 * @return {param is ("snapchat" | "sc" | "snaps")} 
 * @satisfies {import('@sveltejs/kit').ParamMatcher}
*/
export function match(param) {
	return param === "snapchat" || param === "sc" || param === "snaps";
}