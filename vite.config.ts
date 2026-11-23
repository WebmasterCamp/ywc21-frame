import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
			// tokens.css lives in design-system/, outside SvelteKit's default allow list
			allow: ['design-system']
		}
	}
});
