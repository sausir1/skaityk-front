<template>
  <div class="mt-5">
    <article v-for="comment in comments" :key="comment.id" class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img :src="`https://randomuser.me/api/portraits/men/2.jpg`" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ comment.author }}</strong>
            <br />
            {{ comment.comment }}
            <br />
            <small>Created at · {{ comment.created_at }} </small>
          </p>
        </div>
      </div>
    </article>
    <article v-if="can.comments" class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img :src="`https://randomuser.me/api/portraits/men/5.jpg`" />
        </p>
      </figure>
      <div class="media-content">
        <div class="field">
          <p class="control">
            <textarea
              v-model="commentInput"
              class="textarea"
              placeholder="Add a comment..."
            ></textarea>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <button @click="addComment" class="button">Post comment</button>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    endpoint: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      comments: [],
      commentInput: "",
    };
  },
  computed: {
    ...mapState(["can"]),
  },
  created() {
    this.$axios
      .get(this.endpoint)
      .then((response) => (this.comments = response.data));
  },
  methods: {
    addComment() {
      this.$axios
        .post(this.endpoint, { comment: this.commentInput })
        .then((response) => this.comments.push(response.data));
    },
    generateRandom() {
      return Math.floor(Math.random() * 100);
    },
  },
};
</script>

<style lang="scss" scoped></style>
