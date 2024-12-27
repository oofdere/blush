import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import tailwindcss from '@tailwindcss/vite';
import { crosswind } from 'lightningcss-plugin-crosswind';

export default defineConfig({
	plugins: [
		sveltekit(),
		tailwindcss(),
		Icons({ compiler: 'svelte' }),
		visualizer({
			emitFile: true,
			filename: 'stats.html'
		})
	],
	css: {
		transformer: 'lightningcss',
		lightningcss: {
			...crosswind
		}
	},
	build: {
		cssMinify: 'lightningcss'
	}
});
