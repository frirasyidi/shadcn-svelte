<script lang="ts">
	import ArrowLeft from "lucide-svelte/icons/arrow-left";
	import type { WithoutChildren } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import { Button, type ButtonProps } from "$lib/registry/new-york/ui/button/index.js";
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
			? "-left-12 top-1/2 -translate-y-1/2"
			: "-top-12 left-1/2 -translate-x-1/2 rotate-90",
		className
	)}
	disabled={!carousel.canScrollPrev}
	onclick={carousel.scrollPrev}
	onkeydown={(e) => carousel.handleKeydown(e)}
	{...restProps}
	bind:ref
>
	<ArrowLeft class="size-4" />
	<span class="sr-only">Previous slide</span>
</Button>
