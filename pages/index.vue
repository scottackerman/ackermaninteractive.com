<template>
  <div>
    <Head>
      <Link rel="canonical" :href="`https://www.domain.com${route.path}`" />
      <Meta property="og:url" :content="`https://www.domain.com${route.path}`" />
    </Head>
    <Body id="skills" class="home">
      <section class="intro tablet:center smdesktop:center desktop:center white" aria-labelledby="intro-title">
        <div class="section">
          <h1 ref="heading" id="intro-title">Heya! I'm scott :)</h1>
          <p>
            I sketch with code the way a visual designer sketches with pencils.
          </p>
          <p>
            I've spent my career at the intersection of design and engineering, and have worked diligently to break down the barriers between the two.
          </p>
        </div>
      </section>

      <section class="research bg-teal">
        <div class="content white section">
          <p>
            HOWDY Leorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas commodo sed lectus non tincidunt. Fusce pulvinar purus luctus dolor posuere dictum. Mauris id lectus tempor sapien sodales eleifend vitae quis dolor. Praesent tellus nibh, laoreet pharetra felis eu, elementum congue risus. Maecenas purus arcu, fermentum quis leo vitae, convallis euismod ligula. Quisque et tempus risus. Donec cursus quam vitae lacus efficitur, eu placerat urna porttitor. Mauris tempus felis nisi, nec faucibus enim suscipit at. Morbi lobortis eros vitae sagittis interdum. Quisque orci diam, vulputate ac sagittis ut, ultricies ut sem. Nunc aliquam ipsum eu ligula dictum cursus. Morbi cursus semper ligula, quis porttitor libero sodales sit amet. Duis malesuada quam magna, ac imperdiet eros euismod ut. Suspendisse vehicula dolor bibendum sapien pretium, quis vestibulum tellus elementum. Mauris eget enim eget justo dictum lobortis. Nulla pellentesque porta magna a congue. In et aliquet sapien. Integer vestibulum, mi sed consequat pellentesque, nibh velit fringilla est, tincidunt ultrices orci mi non nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque volutpat turpis arcu, sit amet luctus velit euismod sit amet. Etiam a sodales nisi. Duis urna purus, aliquet in metus eget, mollis finibus risus. Pellentesque neque justo, fringilla non vehicula vel, ultricies id sapien. Mauris ex nulla, dignissim non nisl ut, vestibulum interdum turpis.
          </p>
        </div>
      </section>
      <PortfolioCards :projects="sortedProjects" />
    </Body>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'HomePage' })
  useStructuredData()

  import { ref, onMounted, nextTick } from 'vue'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { useRoute } from '#imports'
  import { useProjects } from '~/composables/useProjects'

  const route = useRoute()
  const category = (route.query?.category as string) || null
  const { sortedProjects } = useProjects({ category })

  gsap.registerPlugin(ScrollTrigger)
  const title = 'Home'
  const description = 'Page Description'
  const heading = ref<HTMLElement | null>(null)

  useSeoMeta({
    title: title,
    description: description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description,
    ogImage: '/TODO-og.jpg',
    twitterImage: '/TODO-x.jpg',
    twitterCard: 'summary_large_image',
  })

  onMounted(async () => {
    await nextTick()

    gsap.set(heading.value, { opacity: 0, yPercent: 5 })

    let tl = gsap.timeline({
      defaults: {
        duration: 0.8,
        ease: "power2.out",
      }
    })

    tl.to(heading.value, { opacity: 1, yPercent: 0, delay: 0.5 }) 
  })
</script>