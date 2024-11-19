/** 
 * @param {string} param 
 * @return {param is ('GetMovieName' | 'GetMoviesName')} 
 * @satisfies {import('@sveltejs/kit').ParamMatcher}
*/
export function match(param) {
	return param === 'GetMovieName' || param === 'GetMoviesName' ;
}