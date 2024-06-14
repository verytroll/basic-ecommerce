import {createApp} from "vue";
import router from "./routes.js";
import $bus from "./utils/Events.js"
import App from "./App.vue";
import "./grid.css";
import "./main.css";


let app = createApp(App);
app.provide("$bus", $bus);
app.use(router);
app.mount("#app");
