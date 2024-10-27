<script lang="ts">
	import ArrowRight from "lucide-svelte/icons/arrow-right";
	import type { WithoutChildren } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import { type ButtonProps, Button } from "$lib/registry/new-york/ui/button/index.js";
	import { useCarousel } from "./context.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		variant = "outline",
		size = "icon",
		...restProps
	}: WithoutChildren<ButtonProps> = $props();

	const carousel = useCarousel();
</script>

<Button
	{variant}
	{size}
	class={cn(
		"absolute size-8 touch-manipulation rounded-full",
		carousel.orientation === "horizontal"
			? "-right-12 top-1/2 -translate-y-1/2"
			: "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
		className
	)}
	disabled={!carousel.canScrollNext}
	onclick={carousel.scrollNext}
	onkeydown={(e) => carousel.handleKeydown(e)}
	bind:ref
	{...restProps}
>
	<ArrowRight class="size-4" />
	<span class="sr-only">Next slide</span>
</Button>
