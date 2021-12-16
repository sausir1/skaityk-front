<template>
  <div class="columns is-multiline">
    <div
      v-if="can.authors"
      class="column is-12"
      style="height: 100px; border-bottom: 1px solid rgba(0, 0, 0, 0.4)"
    >
      <ion-icon
        name="person-add-sharp"
        class="on-hover-green"
        style="font-size: 80px"
        @click="addClick"
      ></ion-icon>
    </div>
    <div v-for="author in authors" :key="author.name" class="column is-4">
      <div class="my-person-card">
        <div class="actions">
          <ion-icon
            v-if="can.authors"
            class="on-hover"
            name="create-outline"
            style="font-size: 32px"
            @click="editClick(author)"
          ></ion-icon>
          <ion-icon
            v-if="can.authors"
            class="on-hover"
            style="font-size: 32px"
            name="close"
            @click="removeClick(author)"
          ></ion-icon>
          <ion-icon
            name="arrow-redo-sharp"
            style="font-size: 32px"
            class="on-hover"
            @click="visitAuthor(author.id)"
          ></ion-icon>
        </div>
        <div class="my-person-content">
          <div class="content">
            <img
              :src="`https://randomuser.me/api/portraits/men/${generateRandom()}.jpg`"
              class="content-card-my"
            />
            <span class="flex-column">
              <h3 class="inside-card">
                {{ author.name }} {{ author.surname }}, {{ author.age }}
              </h3>
              <p>{{ author.nationality }}</p>
            </span>
          </div>
          <footer style="text-align: center">
            <p style="text-overflow: ellipsis; overflow: hidden; height: 70px">
              {{ author.about }}
            </p>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AuthorEdit from "../../components/concreteForms/AuthorEdit.vue";

export default {
  data() {
    return {
      authors: [],
      componentId: 0,
    };
  },
  computed: {
    ...mapState(["can"]),
  },
  created() {
    this.componentId = this.generateRandom();
    this.getAuthors();
  },
  methods: {
    getAuthors() {
      this.$axios.get("authors").then((response) => {
        response.data.forEach((element) => {
          if (element.website.startsWith("http://")) {
            element.website = element.website.substring(
              7,
              element.website.length - 1
            );
            this.authors.push(element);
          }
        });
      });
    },
    visitAuthor(id) {
      this.$router.push(`authors/${id}`);
    },
    generateRandom() {
      return Math.floor(Math.random() * 100);
    },
    editClick(author) {
      this.$eventBus.$emit("modal-open", {
        component: AuthorEdit,
        props: {
          method: "PUT",
          endpoint: `authors/${author.id}`,
          parent: this.componentId,
        },
      });
      this.$eventBus.$on(`submitted-${this.componentId}`, (newData) => {
        const index = this.authors.findIndex(
          (author) => (author.id = newData.id)
        );
        this.$set(this.authors, index, newData);
      });
    },
    removeClick(author) {
      this.$eventBus.confirm().then((answer) => {
        if (answer) {
          const index = this.authors.findIndex(
            (lookable) => lookable === author.id
          );
          this.$axios.delete(`authors/${author.id}`).then((response) => {
            this.$delete(this.authors, index);
            this.$eventBus.$emit("notification-show", {
              message: `Author ${response.name} was deleted succesfully!`,
              status: "success",
            });
          });
        }
      });
    },
    addClick() {
      this.$eventBus.$emit("modal-open", {
        component: AuthorEdit,
        props: {
          method: "POST",
          endpoint: "authors/",
          parent: this.componentId,
        },
      });
      this.$eventBus.$on(`submitted-${this.componentId}`, () => {
        this.getAuthors();
      });
    },
  },
};
</script>

<style>
.actions {
  position: relative;
  top: 1rem;
  left: 1rem;
}
.my-person-card {
  width: 100%;
  height: 350px;
  background: rgb(33, 189, 191);
  background: radial-gradient(
    circle,
    rgba(33, 189, 191, 1) 0%,
    rgba(72, 199, 142, 1) 100%
  );
  border-radius: 1.1rem;
  display: flex;
  flex-flow: column;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  cursor: pointer;
}

.my-person-card:hover,
.my-person-card:focus {
  scale: 1.02;
  transform: translateY(-0.7rem);
}

.my-person-card .my-person-content {
  background: white;
  width: 100%;
  height: 64%;
  margin-top: auto;
  border-radius: 0 0 1rem 1rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  position: relative;
}
.my-person-card footer {
  height: 50%;
  border-top: 1.5px solid rgba(0, 0, 0, 0.15);
  padding: 0.8rem 0.85rem;
  /* border-top: 1px solid rgba(0, 0, 0, 0.4); */
}
.content-card-my {
  border-radius: 50%;
  border: 4px solid white;
  position: absolute;
  margin: auto;
  top: -4.9rem;
  right: 50%;
  transform: translateX(50%);
  height: 110px;
}
.flex-column {
  margin-top: 2.5rem;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;
  text-align: center;
}

.flex-column h3 {
  margin: 0.3rem;
  font-weight: 500;
}
.flex-column p {
  color: rgba(0, 0, 0, 0.7);
}
.on-hover,
.on-hover-green {
  cursor: pointer;
  transition: 0.3s all ease-out;
  font-weight: 600;
}

.on-hover:hover {
  color: white;
  font-weight: 600;
}
.on-hover-green:hover {
  color: rgba(72, 199, 142, 1);
  font-weight: 600;
}
</style>
