<script lang="ts">
	import emblaCarouselSvelte from "embla-carousel-svelte";
	import type { WithElementRef } from "bits-ui";
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";
	import { useCarousel } from "./context.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();

	const carousel = useCarousel();
</script>

<!-- svelte-ignore event_directive_deprecated -->
<div
	class="overflow-hidden"
	use:emblaCarouselSvelte={{
		options: {
			container: "[data-embla-container]",
			slides: "[data-embla-slide]",
			...carousel.opts,
			axis: carousel.orientation === "horizontal" ? "x" : "y",
		},
		plugins: carousel.plugins,
	}}
	on:emblaInit={(e) => carousel.onInit(e)}
>
	<div
		bind:this={ref}
		class={cn(
			"flex",
			carousel.orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
			className
		)}
		data-embla-container=""
		{...restProps}
	>
		{@render children?.()}
	</div>
</div>
