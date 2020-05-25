<template lang="pug">
.sidebar.height-full-view--lg.overflow-auto.fixed--lg.no-select
  .padding-right-6.padding-right-5--md.padding-right-4--lg.padding-left-3.padding-left-4--lg.padding-y-4
    router-link.logo.block(:to='{ name: "api" }')
      the-logo(width='100%')
  ul.margin-y-0.padding-left-0.no-list.text-upper.font-sm
    li(v-for='{title, name} in links' :key='name')
      router-link.sidebar__link.block.padding-x-3.padding-x-4--lg.padding-y-3(
        :to='{ name }'
        active-class='bg-lite-gradient-diagonal'
        v-text='title'
      )
</template>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 🛸-->

<script>
export default {
  name: "TheNav",
  components: {
    TheLogo: () => import("@/assets/logo.svg"),
  },
  data: () => ({
    links: [
      {
        title: "Getting Started",
        name: "gettingStarted",
      },
      {
        title: "API",
        name: "api",
      },
      {
        title: "Example",
        name: "example",
      },
    ],
  }),
};
</script>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 🛸-->

<style lang="scss" scoped>
.sidebar {
  @include respond-to(lg, min) {
    width: 17rem;
  }
  &__link {
    color: $color_alt;
    &:not(.bg-lite-gradient-diagonal) {
      &:hover,
      &:focus {
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0) 100%);
      }
    }
  }
}

.logo {
  text-shadow: 0 0 2rem white;
  font-family: $font_primary;
  color: #ff6b12;
  background: linear-gradient(45deg, rgb(255, 96, 0) 0%, rgb(255, 153, 0) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: filter 0.1s ease;
  filter: hue-rotate(-10deg);
  &:hover,
  &:focus {
    filter: hue-rotate(-30deg);
  }
}

.bg-lite-gradient-diagonal {
  background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0));
}
</style>
