// window.a = {b: {c: {d: {etc: 'success'}}}}
// getScopedObj(window, `a.b.c.d.etc`)             // success
// getScopedObj(window, `a['b']["c"].d.etc`)       // success
// getScopedObj(window, `a['INVALID']["c"].d.etc`) // undefined
export default function getScopedObj(scope, str) {
    // console.log(`getScopedObj(scope, ${str})`);
    let obj = scope, arr;

    try {
        arr = str.split(/[\[\]\.]/) // split by [,],.
            .filter(el => el)             // filter out empty one
            .map(el => el.replace(/^['"]+|['"]+$/g, '')); // remove string quotation
        arr.forEach(el => obj = obj[el])
    } catch (e) {
        obj = undefined;
    }

    return obj;
}