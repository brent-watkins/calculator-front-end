import { createApp } from "vue";
import "@mdi/font/css/materialdesignicons.css";
import App from "./App.vue";

import "vuetify/styles";
import { createVuetify } from "vuetify";

const vuetify = createVuetify();

createApp(App).use(vuetify).mount("#app");
