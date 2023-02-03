import WrapBalancer from 'vue-wrap-balancer'

export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.vueApp.component('WrapBalancer', WrapBalancer)
})
