<template>
  <div>
    <nav class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Pages</p>
          <p class="title">{{ book.pages }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Price</p>
          <p class="title">{{ book.price }}</p>
        </div>
      </div>
    </nav>
    <section class="hero is-success mb-5">
      <div class="hero-body">
        <p class="title">{{ book.title }}</p>
        <p class="subtitle">{{ book.about }}</p>
      </div>
    </section>
    <comments :endpoint="`${$route.fullPath.slice(1)}/comments`" />
  </div>
</template>

<script>
import Comments from "../../components/Comments.vue";
export default {
  components: { Comments },
  props: {
    slug: {
      type: String,
      default: "",
    },
    author: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      book: {},
    };
  },
  created() {
    console.log(this.slug, this.author);
    this.$axios.get(this.$route.fullPath.slice(1)).then((response) => {
      this.book = response.data;
    });
  },
};
</script>

<style lang="scss" scoped></style>
