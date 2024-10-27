import type emblaCarouselSvelte from "embla-carousel-svelte";
import type { EmblaCarouselSvelteType } from "embla-carousel-svelte";
import { getContext, setContext } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type CarouselAPI =
	NonNullable<NonNullable<EmblaCarouselSvelteType["$$_attributes"]>["on:emblaInit"]> extends (
		evt: CustomEvent<infer CarouselAPI>
	) => void
		? CarouselAPI
		: never;

type EmblaCarouselConfig = NonNullable<Parameters<typeof emblaCarouselSvelte>[1]>;

export type CarouselOptions = EmblaCarouselConfig["options"];
export type CarouselPlugins = EmblaCarouselConfig["plugins"];

export type CarouselProps = {
	opts?: CarouselOptions;
	plugins?: CarouselPlugins;
	orientation?: "horizontal" | "vertical";
} & HTMLAttributes<HTMLDivElement>;

type CarouselStateProps = {
	opts: () => CarouselOptions | undefined;
	plugins: () => CarouselPlugins | undefined;
	orientation: () => "horizontal" | "vertical";
};

export class CarouselState {
	#props: CarouselStateProps;
	opts = $derived.by(() => this.#props.opts());
	plugins = $derived.by(() => this.#props.plugins() ?? []);
	orientation = $derived.by(() => this.#props.orientation());
	api = $state<CarouselAPI>();
	canScrollPrev = $state(false);
	canScrollNext = $state(false);
	selectedIndex = $state(0);
	scrollNaps = $state<number[]>([]);

	constructor(props: CarouselStateProps) {
		this.#props = props;

		$effect(() => {
			if (this.api) {
				this.onSelect(this.api);
				this.api.on("select", this.onSelect);
				this.api.on("reInit", this.onSelect);
			}
		});

		$effect(() => {
			return () => {
				this.api?.off("select", this.onSelect);
			};
		});
	}

	handleKeydown = (e: KeyboardEvent) => {
		if (e.key === "ArrowLeft") {
			e.preventDefault();
			this.scrollPrev();
		} else if (e.key === "ArrowRight") {
			e.preventDefault();
			this.scrollNext();
		}
	};

	scrollPrev = () => {
		this.api?.scrollPrev();
	};

	scrollNext = () => {
		this.api?.scrollNext();
	};

	scrollTo = (index: number, jump?: boolean) => {
		this.api?.scrollTo(index, jump);
	};

	onInit = (e: CustomEvent<CarouselAPI>) => {
		this.api = e.detail;
		this.scrollNaps = this.api.scrollSnapList();
	};

	onSelect = (api: CarouselAPI) => {
		if (!api) return;
		this.canScrollPrev = api.canScrollPrev();
		this.canScrollNext = api.canScrollNext();
		this.selectedIndex = api.selectedScrollSnap();
	};
}

const CAROUSEL_CTX = Symbol("CAROUSEL_CTX");

export function setCarousel(props: CarouselStateProps): CarouselState {
	return setContext(CAROUSEL_CTX, new CarouselState(props));
}

export function useCarousel(): CarouselState {
	return getContext<CarouselState>(CAROUSEL_CTX);
}
