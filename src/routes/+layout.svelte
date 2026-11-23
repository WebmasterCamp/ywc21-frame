<script>
	import '../../design-system/tokens.css';
	import '../app.postcss';
	import Footer from '../components/Footer.svelte';
</script>

<svelte:head>
	<title>YWC Frame</title>
	<link rel="icon" type="image/png" href="/favicon.png" />
	<meta name="description" content="YWC Frame based on your branch" />
	<meta name="og:title" content="YWC Frame" />
	<meta name="og:description" content="YWC Frame based on your branch" />
	<meta name="og:image" content="/og.png" />
</svelte:head>
<div class="flex flex-col min-h-screen">
	<div class="flex-1">
		<slot />
	</div>
	<Footer />
</div>
