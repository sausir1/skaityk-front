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
            <small>
              <button
                v-if="comment.author === userInfo.name"
                @click="editComment(comment)"
                class="button is-ghost is-small"
              >
                Edit
              </button>
              <button
                v-if="comment.author === userInfo.name"
                @click="removeComment(comment)"
                class="button is-ghost is-small"
              >
                Delete
              </button>
              Created at · {{ comment.created_at }}
            </small>
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
      commentId: null,
    };
  },
  computed: {
    ...mapState(["can", "userInfo"]),
  },
  created() {
    this.$axios
      .get(this.endpoint)
      .then((response) => (this.comments = response.data));
  },
  methods: {
    addComment() {
      if (this.commentId) {
        return this.$axios
          .put(`${this.endpoint}/${this.commentId}`, {
            comment: this.commentInput,
          })
          .then((response) => {
            const index = this.comments.findIndex(
              (comment) => comment.id === this.commentId
            );
            this.$set(this.comments, index, response.data);
            this.commentId = null;
            this.commentInput = "";
          });
      }
      this.$axios
        .post(this.endpoint, { comment: this.commentInput })
        .then((response) => this.comments.push(response.data));
      this.commentInput = "";
    },
    generateRandom() {
      return Math.floor(Math.random() * 100);
    },
    editComment(comment) {
      this.commentInput = comment.comment;
      this.commentId = comment.id;
    },
    removeComment(comment) {
      this.$eventBus.confirm().then((answer) => {
        if (answer) {
          this.$axios.delete(`${this.endpoint}/${comment.id}`).then(() => {
            this.$axios
              .get(this.endpoint)
              .then((response) => (this.comments = response.data));
            this.$eventBus.$emit("notification-show", {
              message: `Comment was deleted succesfully!`,
              status: "success",
            });
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
