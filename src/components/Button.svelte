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
		'inline-flex items-center justify-center min-h-[44px] px-6 rounded-sm border-[1.5px] border-transparent',
		'font-sans text-base leading-6 font-semibold transition-colors',
		'disabled:opacity-[.45] disabled:cursor-not-allowed',
		variant === 'solid' && 'bg-accent text-on-accent hover:bg-gold-highlight hover:shadow-glow-gold',
		variant === 'outlined' && 'bg-transparent text-ink border-ink hover:bg-surface-raised',
		className
	)}><slot /></button
>
