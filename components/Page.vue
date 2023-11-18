<template>
	<div>
		<BgBlur position="topLeft" />
		<BgBlur position="bottomRight" />
		<div class="flex-1 flex flex-col relative">
			<LayoutHeader />
			<div class="flex-1">
				<slot />
			</div>
			<LayoutFooter />
		</div>
	</div>
</template>
