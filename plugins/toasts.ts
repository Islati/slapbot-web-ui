import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import {defineNuxtPlugin} from "nuxt/app";

export default defineNuxtPlugin((app) => {
    const pluginOptions = {
        position: "bottom-right",
        duration: 5000,
        dismissible: true
    }

    app.vueApp.use(ToastPlugin, pluginOptions);
})