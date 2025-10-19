import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
// import 'vuetify/styles' // ✅ この行を追加するとcssおかしくなる
// Vuetifyで使用するアイコン
import '@mdi/font/css/materialdesignicons.css'
// Vuetifyのコンポーネントが使用できる
import * as components from 'vuetify/components'
// Vuetifyのディレクティブが使用できる
import * as directives from 'vuetify/directives'
// インポートしたコンポーネントとディレクティブを設定としてVueインスタンスを生成

const vuetify = createVuetify({
  components,
  directives,
})

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
