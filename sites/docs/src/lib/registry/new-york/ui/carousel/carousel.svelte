<script lang="ts">
	import { type CarouselProps, setCarousel } from "./context.svelte.js";
	import { cn } from "$lib/utils.js";

	let {
		opts = {},
		plugins = [],
		orientation = "horizontal",
		class: className,
		children,
		...restProps
	}: CarouselProps = $props();

	export const carouselState = setCarousel({
		opts: () => opts,
		plugins: () => plugins,
		orientation: () => orientation,
	});
</script>

<div class={cn("relative", className)} role="region" aria-roledescription="carousel" {...restProps}>
	{@render children?.()}
</div>
