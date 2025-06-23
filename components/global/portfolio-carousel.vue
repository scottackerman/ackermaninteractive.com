<template>
	<section class="trials bg-purplealphalight" aria-labelledby="trials-header">
		<div class="content section">
			<h2 id="trials-header" class="eyebrow-large">Featured Clinical Trials</h2>
			<p class="body-regular">Learn more about our current clinical trials. Be sure to talk to your doctor and care team to see if one is right for you.</p>
			<div class="carousel-wrapper">
				<button
					class="carousel-button prev"
					:disabled="!canScrollLeft"
					@click="scrollCarousel('left')"
					aria-label="Previous trial"
				>
					Prev
				</button>
				<div class="carousel" ref="carousel" role="region" aria-label="Trial carousel">
					<PortfolioCards></PortfolioCards>
				</div>
				<button
					class="carousel-button next"
					:disabled="!canScrollRight"
					@click="scrollCarousel('right')"
					aria-label="Next trial"
				>
					Next
				</button>
				<!-- Replace this with the stylized scroll bar -->
				<!-- <div aria-hidden="true" class="carousel-progress">3 of 10</div> -->
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { ref, onMounted, onBeforeUnmount } from 'vue'

	const carousel = ref(null)
	const canScrollLeft = ref(false)
	const canScrollRight = ref(false)

	function updateScrollStatus() {
		const el = carousel.value
		if (!el) return

		canScrollLeft.value = el.scrollLeft > 0
		canScrollRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth
	}

	function scrollCarousel(direction) {
		const el = carousel.value
		if (!el) return

		const card = el.querySelector('li')
		if (!card) return

		const cardWidth = card.offsetWidth + parseFloat(getComputedStyle(card).marginRight || 0)

		el.scrollBy({
			left: direction === 'right' ? cardWidth : -cardWidth,
			behavior: 'smooth'
		})

		// Let the scroll complete, then update
		setTimeout(updateScrollStatus, 300)
	}

	// Recalculate on scroll or resize
	function attachScrollListeners() {
		const el = carousel.value
		if (!el) return

		el.addEventListener('scroll', updateScrollStatus)
		window.addEventListener('resize', updateScrollStatus)
	}

	function detachScrollListeners() {
		const el = carousel.value
		if (!el) return

		el.removeEventListener('scroll', updateScrollStatus)
		window.removeEventListener('resize', updateScrollStatus)
	}

	onMounted(() => {
		updateScrollStatus()
		attachScrollListeners()
	})

	onBeforeUnmount(() => {
		detachScrollListeners()
	})
</script>
