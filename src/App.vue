<template lang="pug">
#app.flex
  the-sidebar
  main.width-full.bg-lite-gradient-radial
    transition(
      name='fade-left'
      mode='out-in'
    )
      router-view
</template>

<script>
import "normalize.css";

export default {
  components: {
    TheSidebar: () => import("@com/TheSidebar.vue"),
  },
};
</script>

<style lang="scss">
main {
  margin-left: 17rem;
}

.bg-lite-gradient-radial {
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.25) 100%);
}
</style>
