<template>
  <div class="videoWall" ref="videoWall" role="presentation" aria-hidden="true">
    <template v-if="columns.length">
      <div
        class="videoColumn"
        v-for="(column, colIndex) in columns"
        :key="colIndex"
      >
        <video
          v-for="(src, rowIndex) in column"
          :key="`${colIndex}-${rowIndex}`"
          :src="src"
          class="looped-video"
          muted
          playsinline
          preload="auto"
          aria-hidden="true"
          tabindex="-1"
          width="280"
          height="157"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, nextTick } from 'vue'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  gsap.registerPlugin(ScrollTrigger)

  const videoWall = ref<HTMLElement | null>(null)
  const videosPlayingAtOneTime = 12

  const baseVideos = [
    '/videos/vid1.webm',
    '/videos/vid2.webm',
    '/videos/vid3.webm',
    '/videos/vid4.webm',
    '/videos/vid5.webm',
    '/videos/vid6.webm'
  ]

  const columns = ref<string[][]>([])

  function rotateArray(arr: string[], shift: number) {
    return [...arr.slice(shift), ...arr.slice(0, shift)]
  }

  let allVideos: HTMLVideoElement[] = []
  let playingSet = new Set<HTMLVideoElement>()

  function isElementInViewport(el: HTMLElement): boolean {
    const rect = el.getBoundingClientRect()
    return rect.top < window.innerHeight && rect.bottom > 0
  }

  function playVideo(video: HTMLVideoElement) {
    if (!isElementInViewport(video)) return

    video.currentTime = 0
    video.play().catch(() => {})
    playingSet.add(video)

    video.onended = () => {
      video.onended = null
      playingSet.delete(video)
      triggerNextRandomVideo()
    }
  }

  function triggerNextRandomVideo() {
    const candidates = allVideos.filter(v => !playingSet.has(v) && isElementInViewport(v))
    if (candidates.length === 0) return
    const next = candidates[Math.floor(Math.random() * candidates.length)]
    playVideo(next)
  }

  function playInitialBatch(count = videosPlayingAtOneTime) {
    const visibleCandidates = allVideos.filter(isElementInViewport)
    for (let i = 0; i < count && visibleCandidates.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * visibleCandidates.length)
      const [video] = visibleCandidates.splice(randomIndex, 1)
      playVideo(video)
    }
  }

  onMounted(async () => {
    const shuffled = [...baseVideos].sort(() => Math.random() - 0.5)
    columns.value = Array.from({ length: 6 }, (_, i) => rotateArray(shuffled, i))

    await nextTick()

    if (!videoWall.value) return

    const tl = gsap.timeline({
      defaults: { duration: 0.8, ease: 'power2.out', delay: 0.5 }
    })

    tl.from('h1', { opacity: 0, yPercent: 5 })
      .from('.intro-span', { opacity: 0, x: -80, delay: 0.5 }, '<')

    const columnEls = videoWall.value.querySelectorAll('.videoColumn')
    columnEls.forEach((col, i) => {
      const isEven = i % 2 !== 0
      const direction = isEven ? 1 : -1
      const distance = 8

      gsap.fromTo(
        col,
        { yPercent: isEven ? -20 : 0 },
        {
          yPercent: direction * distance,
          ease: 'none',
          scrollTrigger: {
            trigger: videoWall.value,
            start: 'top 70%',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      gsap.timeline({
        scrollTrigger: {
          trigger: videoWall.value,
          start: 'top 70%',
          end: 'top -23%',
          scrub: true,
        },
      })
      .fromTo(videoWall.value, { opacity: 0 }, { opacity: 1, duration: 1 })
      .to(videoWall.value, { opacity: 0, duration: 0.4 })
    })

    allVideos = Array.from(videoWall.value.querySelectorAll('video'))

    allVideos.forEach((video) => {
      video.muted = true
      video.playsInline = true
      video.preload = 'auto'
      video.pause()
      video.currentTime = 0

      const addReady = () => video.classList.add('ready')
      if (video.readyState >= 3) addReady()
      else {
        video.addEventListener('canplay', addReady, { once: true })
        video.addEventListener('loadeddata', addReady, { once: true })
      }
    })

    playInitialBatch(videosPlayingAtOneTime)

    let scrollTimeout: number | null = null
    window.addEventListener('scroll', () => {
      if (scrollTimeout) return
      scrollTimeout = window.setTimeout(() => {
        scrollTimeout = null
        playingSet.forEach((video) => {
          if (!isElementInViewport(video)) {
            video.pause()
            video.onended = null
            playingSet.delete(video)
            triggerNextRandomVideo()
          }
        })
      }, 150)
    })
  })
</script>
