<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let className: string = '';
	export { className as class };
	export let variant: 'solid' | 'outlined' = 'solid';

	interface $$Props extends HTMLButtonAttributes {
		class?: string;
		variant?: 'solid' | 'outlined';
	}
</script>

<button
	{...$$restProps}
	on:click
	class={twMerge(
		'focus:ring-4 focus:ring-[#e9c46a]/50 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none',
		'font-bold transition-colors',
		variant === 'solid' && 'text-[#1a1203] rounded-full bg-gradient-to-b from-[#f3dc9a] via-[#d4ae5a] to-[#a9802f] hover:brightness-110',
		variant === 'outlined' &&
			'text-[#e9c46a] border border-[#c9a24b] bg-transparent hover:border-[#e9c46a] hover:text-[#f3dc9a]',
		className
	)}><slot /></button
>
