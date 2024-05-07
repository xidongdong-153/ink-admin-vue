import { createApp } from 'vue'
import App from './App.vue'
import installSvgIcon from './icons'
import installElementPlus from './plugins/element'
import router from './router'
import store from './store'

import i18n from '@/i18n'
import '@/router/permission'
import './styles/index.scss'

const app = createApp(App)

installElementPlus(app)
installSvgIcon(app)

async function bootstrap() {
  app.use(store).use(router).use(i18n).mount('#app')
}

bootstrap()
