<template lang="pug">
#app.flex--lg
  the-nav
  main.width-full.height-full-view.bg-lite-gradient-radial.padding-3.padding-5--lg
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
    TheNav: () => import("@com/TheNav.vue"),
  },
};
</script>

<style lang="scss">
main {
  @include respond-to(lg, min) {
    margin-left: 17rem;
  }
}

.bg-lite-gradient-radial {
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.25) 100%);
}
</style>
