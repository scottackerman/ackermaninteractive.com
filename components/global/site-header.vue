<template>
	<header class="site-nav">
		<nav class="main-nav section" aria-label="Main site navigation">

			<button
				class="menu-button"
				@click="navOpen = !navOpen"
				:aria-expanded="navOpen"
				aria-controls="nav"
				aria-label="Toggle mobile navigation"
			>
				<div class="hamburger" :class="{ open: navOpen }">
					<span class="line top"></span>
					<span class="line middle"></span>
					<span class="line bottom"></span>
				</div>
			</button>

			<NuxtLink to="/" class="logo-link" @click="handleLogoClick">
				<img src="/assets/images/ackerman.png" alt="Ackerman signature" />
			</NuxtLink>

			<div class="external-links white">
				Sharing..
			</div>
			<ul class="menu" :class="{ 'active': navOpen }" id="nav" :aria-hidden="!navOpen">
				<li>
					<a class="nav" href="/#skills" @click="navOpen = false" :aria-current="route.hash === '#skills' ? 'page' : undefined">
						Skills
					</a>
				</li>
				<li>
					<a class="nav" href="/#work" @click="navOpen = false" :aria-current="route.hash === '#work' ? 'page' : undefined">
						Work
					</a>
				</li>
				<li>
					<a class="nav" href="/#endorsements" @click="navOpen = false" :aria-current="route.hash === '#endorsements' ? 'page' : undefined">
						Endorsements
					</a>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script setup lang="ts">
	import { useRoute } from '#imports'
	const navOpen = ref(false)
	const route = useRoute()
	const emit = defineEmits<{
		(e: 'modal-open'): void
		(e: 'modal-close'): void
		(e: 'update-nav-state'): void
	}>()

	function handleLogoClick(e: MouseEvent) {
		navOpen.value = false

		// Prevent redundant navigation
		if (route.path === '/') {
			e.preventDefault()
		}
	}

	watch(navOpen, (newVal: boolean) => {
		if (newVal) {
			emit('modal-open')
		} else {
			emit('modal-close')

			setTimeout(() => {
				emit('update-nav-state')
			}, 100)
		}
	})
</script>
