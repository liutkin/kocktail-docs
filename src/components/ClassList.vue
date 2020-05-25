<template lang="pug">
div
  .list-header.grid.list-row.text-upper.font-sm.border-rounded-3.no-select
    .grid-column-5 Class #[sup.text-lower.cursor-help(v-text='list.length' :title='`${list.length} matched classes`')]
    .grid-column-7 CSS
  .flex.flex-column.items-center.padding-y-4(v-if='!list.length && !inProgress')
    icon-desert.icon-desert
    .padding-y-2.color-primary No matches, sorry
    button.plate.padding-2.border-rounded-3.font-xs.text-upper(type='button' @click='$emit("reset")') Reset
  .flex.justify-center.padding-y-4(v-if='inProgress')
    icon-cocktail.icon-cocktail
  .flex-grow.overflow-auto(v-else ref='list')
    ul.margin-y-0.padding-left-0.no-list.font-monospace
      li.list-row.grid.border-rounded-3.padding-y-2(
        v-for='({className, css, detailsShown, icon}, index) in list'
        :key='className'
        :style='{ animationDelay: animate ? `${index * 0.025}s` : 0 }'
        :class='[index % 2 !== 0 ? "bg-shade" : "", animate ? ["animate-fade-in-down", "transparent"] : ""]'
      )
        .grid-column-5
          div(:class='icon ? ["flex", "items-center"] : ""')
            span(v-text='className')
            button.icon-btn.margin-left-2(
              type='button'
              v-if='icon'
              @click='list[index].detailsShown = !list[index].detailsShown'
              title='Supported mobile-first, click to see details'
            )
              div(:class='icon ? ["flex", "items-center"] : ""')
              component.icon-btn__svg(:is='icon')
        .grid-column-7
          div(v-for='line in css' :key='line' v-text='line')
        ul.grid-column-12.margin-y-0.padding-left-0.padding-y-2.no-list.font-xs(v-if='detailsShown')
          li.grid.padding-y-1.border-top-dashed.animate-fade-in-down.transparent(
            v-for='({name, value}, index) in $data.$mediaBreakpoints'
            :key='name'
            :style='{ animationDelay: `${index * 0.025}s` }'
          )
            .grid-column-5(v-text='`${className}--${name}`')
            .grid-column-7(v-text='`@media screen and (min-width: ${value}px) { ${css.join(" ")} }`')
</template>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 🛸-->

<script>
export default {
  name: "ClassList",
  components: {
    IconCocktail: () => import("@/assets/cocktail.svg"),
    IconDesert: () => import("@/assets/desert.svg"),
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
    animate: {
      type: Boolean,
      default: false,
    },
    inProgress: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    list() {
      this.$refs.list && (this.$refs.list.scrollTop = 0);
    },
  },
};
</script>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 🛸-->

<style lang="scss" scoped>
@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-1rem);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes pulse {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}

.list-row {
  padding: 0.6rem 0.8rem;
}

.list-header {
  background: linear-gradient(135deg, rgb(253, 233, 226) 0%, rgb(255, 228, 227) 100%);
  color: $color_primary;
}

.animate-fade-in-down {
  animation-name: fade-in-down;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
}

.bg-shade {
  background-color: rgba(0, 0, 0, 0.02);
}

.font-monospace {
  font-family: Menlo, Monaco, Hack, Inconsolata, Input, monospace;
}

.icon-btn {
  border: none;
  outline: none;
  background-color: transparent;
  padding: 0;
  &:hover,
  &:focus {
    .icon-btn__svg {
      fill: $color_primary;
    }
  }
  &__svg {
    width: 1.3rem;
    fill: $color_default;
    transition: fill 0.1s;
  }
}

.border-top-dashed {
  border-top: 1px dashed rgba(0, 0, 0, 0.1);
}

.icon-cocktail {
  width: 5rem;
  animation: pulse 1s infinite;
  fill: #ffbfba;
}

.icon-desert {
  width: 10rem;
  fill: #ffbfba;
}
</style>
