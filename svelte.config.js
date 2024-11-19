import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		
		alias: {
			$api: "src/routes/api",
			$components: "src/components",
			$config: "src/lib/server/config",
			$controllers: "src/lib/server/controllers",
			$templates: "src/templates",
            $templatesPages: "src/templatesPages",
			$utils: "src/utils",
			$ArticleImage: "src/lib/images/articles"
		},
	},

	preprocess: vitePreprocess(),
};

export default config;
