import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./index.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

library.add(faTimes);
library.add(faFileDownload);

createApp(App)
  .use(Toast, {})
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
