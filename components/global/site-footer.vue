<template>
	<footer>
		<section class="footer-contents">
			<div class="footer-top">
				<NuxtLink to="/" class="logo-link" @click="navOpen = false">
					<img src="/assets/images/ackerman.png" alt="Ackerman signature" width="295">
				</NuxtLink>

				<nav class="footer-links" aria-label="Footer Navigation">
					<NuxtLink class="nav" to="#" @click="navOpen = false">
						Skills
					</NuxtLink>
					<NuxtLink class="nav" to="#" @click="navOpen = false">
						Work
					</NuxtLink>
					<NuxtLink class="nav" to="#" @click="navOpen = false">
						Endorsements
					</NuxtLink>

					<NuxtLink class="nav" to="#" @click="navOpen = false">
						Github
					</NuxtLink>
					<NuxtLink class="nav" to="#" @click="navOpen = false">
						CodePen
					</NuxtLink>
					<NuxtLink class="nav" to="#" @click="navOpen = false">
						Linkedin
					</NuxtLink>
				</nav>
			</div>

			<p class="body-small footer-legal">
				Copyright © {{ currentYear }} Ackerman Interactive, LLC. All rights reserved.<br>
			</p>
		</section>
	</footer>
</template>


<script setup lang="ts">
	const navOpen = ref(false)
	const currentYear = new Date().getFullYear()
</script>

