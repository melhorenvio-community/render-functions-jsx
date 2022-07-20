import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import DesignSystem from '@melhorenvio/ds-core'
import '@melhorenvio/ds-core/style.css'



import './assets/main.css'

const app = createApp(App)



app.use(router)
app.use(DesignSystem);

app.mount('#app')
