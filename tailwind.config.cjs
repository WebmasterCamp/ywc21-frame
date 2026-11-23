const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				surface: 'var(--surface)',
				'surface-deep': 'var(--surface-deep)',
				'surface-raised': 'var(--surface-raised)',
				ink: 'var(--ink)',
				'ink-body': 'var(--ink-body)',
				'ink-muted': 'var(--ink-muted)',
				line: 'var(--line)',
				accent: 'var(--accent)',
				'on-accent': 'var(--on-accent)',
				focus: 'var(--focus)',
				'gold-solid': 'var(--gold-solid)',
				'gold-highlight': 'var(--gold-highlight)'
			},
			fontFamily: {
				sans: 'var(--font-sans)',
				'thai-display': 'var(--font-thai-display)'
			},
			borderRadius: {
				xs: 'var(--radius-xs)',
				sm: 'var(--radius-sm)',
				md: 'var(--radius-md)'
			},
			boxShadow: {
				'glow-gold': 'var(--glow-gold)'
			}
		}
	},
	plugins: []
};

module.exports = config;
