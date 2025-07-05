import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(...[far, fas]);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);

import { createPinia } from "pinia";
const pinia = createPinia();

app.use(pinia);
app.mount("#app");
