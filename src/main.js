import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

import cssClasses from "@/assets/classes.json";

import IconDevice from "@/assets/device.svg";

Vue.config.productionTip = false;

const categories = cssClasses.reduce(
  (prev, next) => (prev.includes(next.category) ? prev : prev.push(next.category), prev),
  []
);
const classesWithIcon = cssClasses.map(cssClass =>
  cssClass.mobileFirstSupport ? { ...cssClass, icon: IconDevice, detailsShown: false } : cssClass
);
const mediaBreakpoints = [
  {
    name: "sm",
    value: 576,
  },
  {
    name: "md",
    value: 768,
  },
  {
    name: "lg",
    value: 992,
  },
  {
    name: "xl",
    value: 1200,
  },
  {
    name: "xxl",
    value: 1600,
  },
];

Vue.mixin({
  data: () => ({
    $categories: categories,
    $cssClasses: classesWithIcon,
    $mediaBreakpoints: mediaBreakpoints,
  }),
});

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
