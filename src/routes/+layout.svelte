<script>
	import '../../design-system/tokens.css';
	import '../app.postcss';
	import Footer from '../components/Footer.svelte';
</script>

<svelte:head>
	<title>YWC Frame</title>
	<link rel="icon" type="image/png" href="/favicon.png" />
	<meta name="description" content="YWC Frame based on your branch" />
	<meta property="og:title" content="YWC Frame" />
	<meta property="og:description" content="YWC Frame based on your branch" />
	<meta property="og:image" content="/og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
<div class="flex flex-col min-h-screen">
	<div class="flex-1">
		<slot />
	</div>
	<Footer />
</div>
