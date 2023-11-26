<template>
	<LayoutPage containerSize="large">
		<template #beforeRichtext>
			<div class="flex flex-col lg:flex-row items-center lg:pl-8 gap-8 lg:gap-12">
				<div class="relative rounded-3xl overflow-hidden">
					<!-- overlay -->

					<WPImage
						src="/wp-content/uploads/2023/11/portrait-final.jpg"
						alt=""
						path="/wordpress-madebyfabian/"
						class="relative w-80 h-72 lg:w-72 lg:h-96" />
					<div
						class="absolute inset-0 w-full h-full bg-gradient-to-br from-white/60 via-transparent to-transparent" />
				</div>

				<div class="relative text-center lg:text-left">
					<h1
						class="from-secondary via-accent-700 to-accent-700 bg-gradient-to-br bg-clip-text text-transparent mb-6">
						Exceptional web experiences,
						<br />
						<span>crafted with passion.</span>
					</h1>
					<p class="PLargeLike !leading-normal mb-10 -mt-1">
						Hej! I am Fabian, a visual product designer and frontend developer,
						<br class="hidden md:block" />
						creating high-quality web experiences for your unique needs.
					</p>
					<div class="UIButtonGroup flex-wrap justify-center lg:justify-start">
						<NuxtLink :to="{ name: 'contact' }" class="UIButton flex-1 md:flex-none">
							Got an idea?
							<span class="mx-1.5 font-bold opacity-30 -mt-1 inline-block">·</span>
							Contact me&nbsp;&nbsp;💬
						</NuxtLink>
						<NuxtLink to="/#projects" external class="UIButton UIButton-secondary flex-1 md:flex-none">
							See my work
						</NuxtLink>
					</div>
				</div>
			</div>
		</template>

		<div id="projects">
			<h2 class="H2-Like">Selected Projects <span class="font-normal"> — what yours could look like.</span></h2>
			<LayoutProjectsList />
			<div class="flex justify-center">
				<NuxtLink class="UIButton UIButton-secondary" :to="{ name: 'contact' }"
					>Looks good?<span class="mx-1.5 font-bold opacity-30 -mt-1 inline-block">·</span>Get in
					touch!&nbsp;&nbsp;💬
				</NuxtLink>
			</div>
		</div>

		<div class="mt-16 md:mt-28 mx-auto max-w-3xl">
			<h2 class="mb-6 H2-Like lg:text-center">Recent Posts</h2>
			<p class="mb-8 lg:mb-16 PLike PLargeLike lg:text-center">
				Everything I think about, want to discuss — or just want to share.
			</p>
			<LayoutBlogList :uniqueKey="uri" />
			<div class="flex justify-center">
				<NuxtLink class="UIButton UIButton-secondary mt-6" :to="{ name: 'blog' }"> See all posts </NuxtLink>
			</div>
		</div>
	</LayoutPage>
</template>

<script setup lang="ts">
	const route = useRoute('index')
	const uri = computed(() => route.fullPath)
</script>
