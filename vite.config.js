import { searchForWorkspaceRoot } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

import * as path from "path";

import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit(),
	],
	test: {
		globals: true,
    	environment: 'jsdom',
		exclude:[
			"../node_modules/*"
		]
	}
});
