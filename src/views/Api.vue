<template lang="pug">
.height-full.flex.flex-column
  .relative.flex-no-shrink
    input.input.width-full(
      type='text'
      ref='input'
      @input='inProgress = true, selectedCategory = "", handleInput($event)'
    )
  ul.flex-no-shrink.flex.flex-wrap.justify-center.margin-top-3.margin-bottom-5.padding-left-0.padding-top-3.no-list
    li(
      v-for='category in $data.$categories'
      :key='category'
    )
      button.plate.padding-2.border-rounded-3.font-xs.text-upper(
        type='button'
        v-text='category.toLowerCase()'
        @click='selectedCategory = selectedCategory === category ? "" : category'
        :class='{ "plate--active": selectedCategory === category }'
      )
  class-list.flex.flex-column.flex-grow.overflow-auto(
    :list='filteredClassesList'
    :animate='animate'
    :in-progress='inProgress'
    :selected-category='selectedCategory'
    @reset='reset'
  )
</template>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 🛸-->

<script>
import { debounce } from "lodash-es";

export default {
  name: "Api",
  components: {
    ClassList: () => import("@com/ClassList.vue"),
  },
  data: () => ({
    selectedCategory: "",
    input: "",
    inProgress: false,
  }),
  computed: {
    filteredClassesList: self =>
      self.input
        ? ((self.selectedCategory = ""),
          self.$data.$cssClasses.filter(
            ({ className, css }) => className.includes(self.input) || css.join("\n").includes(self.input)
          ))
        : self.selectedCategory
        ? self.$data.$cssClasses.filter(({ category }) => category === self.selectedCategory)
        : self.$data.$cssClasses,
    animate: self => Boolean(self.input) || Boolean(self.selectedCategory),
  },
  watch: {
    selectedCategory() {
      this.input = "";
      this.$refs.input.value = this.input;
    },
  },
  mounted() {
    this.$refs.input.focus();
  },
  methods: {
    handleInput: debounce(function ({ target: { value } }) {
      this.inProgress = false;
      this.input = value.trim();
    }, 300),
    reset() {
      this.input = "";
      this.selectedCategory = "";
      this.$refs.input.value = this.input;
      this.$refs.input.focus();
    },
  },
};
</script>
