# Init project
- Install mysql database with database.sql
- Edit src/lib/server/config/db_config.json with your mysql credentials

# Reproduce bug
Run the project with 
``` npm run dev ```

Go on https://localhost:5173

If your cache is clear, refresh the page

Then, these error should appear in console :

```
SvelteKitError: Not found: /@id/__x00__virtual:__sveltekit/paths
    at resolve (C:\wamp64\www\blog\node_modules\@sveltejs\kit\src\runtime\server\respond.js:530:13)
    at resolve (C:\wamp64\www\blog\node_modules\@sveltejs\kit\src\runtime\server\respond.js:330:5)
    at passedHandle (file:///C:/wamp64/www/blog/node_modules/svelte-kit-cookie-session/handle.js:2:85)
    at Object.handle (file:///C:/wamp64/www/blog/node_modules/svelte-kit-cookie-session/handle.js:7:32)
    at async Module.respond (C:\wamp64\www\blog\node_modules\@sveltejs\kit\src\runtime\server\respond.js:327:20)
    at async file:///C:/wamp64/www/blog/node_modules/@sveltejs/kit/src/exports/vite/dev/index.js:524:22 {
  status: 404,
  text: 'Not Found'
}
SvelteKitError: Not found: /@id/__x00__virtual:__sveltekit/environment
    at resolve (C:\wamp64\www\blog\node_modules\@sveltejs\kit\src\runtime\server\respond.js:530:13)
    at resolve (C:\wamp64\www\blog\node_modules\@sveltejs\kit\src\runtime\server\respond.js:330:5)
    at passedHandle (file:///C:/wamp64/www/blog/node_modules/svelte-kit-cookie-session/handle.js:2:85)
    at Object.handle (file:///C:/wamp64/www/blog/node_modules/svelte-kit-cookie-session/handle.js:7:32)
    at async Module.respond (C:\wamp64\www\blog\node_modules\@sveltejs\kit\src\runtime\server\respond.js:327:20)
    at async file:///C:/wamp64/www/blog/node_modules/@sveltejs/kit/src/exports/vite/dev/index.js:524:22 {
  status: 404,
  text: 'Not Found'
}
```
