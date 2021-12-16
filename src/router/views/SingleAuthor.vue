<template>
  <div class="tile is-ancestor">
    <div class="tile is-3 is-vertical is-parent">
      <div class="tile is-child box">
        <div class="card">
          <div class="card-image">
            <figure class="image is-3by3">
              <img
                :src="`https://randomuser.me/api/portraits/men/${random}.jpg`"
                alt="Placeholder image"
              />
            </figure>
          </div>
        </div>
      </div>
      <div class="tile is-child box">
        <p class="title">
          {{ author.name }} {{ author.surname }}, {{ author.age }}
        </p>
        <p>{{ author.about }}</p>
      </div>
    </div>
    <div class="tile is-parent">
      <div class="tile is-child box">
        <p class="title">Books written by {{ author.name }}</p>
        <data-table
          :display-columns="['title', 'about', 'price', 'pages']"
          :display-data="books"
          :can-edit="can.books"
          edit-remove
          :editClick="editBook"
          :removeClick="removeBook"
          :visit-click="visitBook"
        >
          <template #title="{ rowData }">
            {{ rowData.title }}
          </template>
          <template #about="{ rowData }">
            {{ rowData.about }}
          </template>
          <template #price="{ rowData }">
            {{ rowData.price }}
          </template>
          <template #pages="{ rowData }">
            {{ rowData.pages }}
          </template>
        </data-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BookEdit from "../../components/concreteForms/BookEdit.vue";
export default {
  data() {
    return {
      author: {},
      books: [],
      random: 1,
    };
  },
  computed: { ...mapState(["token", "userInfo", "can"]) },
  created() {
    this.random = Math.floor(Math.random() * 100);
    Promise.all([
      this.$axios.get(`authors/${this.$route.params.id}`),
      this.$axios.get(`authors/${this.$route.params.id}/books`),
    ]).then((response) => {
      this.author = response[0].data;
      this.books = response[1].data;
    });
  },
  methods: {
    editBook(book) {
      this.$eventBus.$emit("modal-open", {
        component: BookEdit,
        props: {
          method: "PUT",
          endpoint: `authors/${this.$route.params.id}/books/${book.slug}`,
          parent: this.random,
        },
      });
      this.$eventBus.$on(`submitted-${this.random}`, (data) => {
        const index = this.books.findIndex((book) => (book.id = data.id));
        this.$set(this.books, index, data);
      });
    },
    removeBook(book) {
      this.$eventBus.confirm().then((answer) => {
        console.log(answer, book);
      });
    },
    visitBook(book) {
      this.$router.push({
        name: "single-book",
        params: { id: this.author.id, sl: book.slug },
      });
    },
  },
};
</script>
<style>
.on-hover {
  font-weight: 600;
}
.on-hover:hover {
  color: #48c78ed7;
}
</style>
