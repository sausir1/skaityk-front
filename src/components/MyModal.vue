<template>
  <transition name="pop">
    <div class="modal is-active" v-if="showModal">
      <div @click="closeModal" class="modal-background"></div>
      <div class="modal-card w-80">
        <template v-if="!component">
          <div
            class="box"
            style="
              display: flex;
              flex-flow: column;
              align-self: center;
              width: 250px;
              height: 6rem;
              align-items: center;
              justify-content: space-evenly;
              height: 12rem;
            "
          >
            <h1 style="font-size: 24px; font-weight: 500">Are you sure?</h1>
            <br />
            <div class="field is-grouped">
              <p class="control">
                <button @click="handleAnswer(true)" class="button is-danger">
                  Yes
                </button>
              </p>
              <p class="control">
                <button
                  @click="handleAnswer(false)"
                  class="button is-danger is-light"
                >
                  No
                </button>
              </p>
            </div>
          </div>
        </template>
        <template v-if="title">
          <header class="modal-card-head">
            <p class="modal-card-title">{{ title }}</p>
            <button
              @click="closeModal"
              class="delete"
              aria-label="close"
            ></button>
          </header>
          <section class="modal-card-body">
            <component :is="this.component" />
          </section>
        </template>
        <template v-else-if="component && !title">
          <div v-if="!formProps" class="box">
            <component :is="component" />
          </div>
          <div v-else class="box">
            <component :is="component" :form-props="formProps" />
          </div>
          <button
            @click="closeModal"
            class="modal-close is-large"
            aria-label="close"
          ></button>
        </template>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      title: null,
      component: null,
      showModal: false,
      formProps: null,
    };
  },
  created() {
    this.$eventBus.$on("modal-open", ({ component, title, props }) => {
      this.component = component;
      this.showModal = true;
      this.title = title;
      if (props) {
        this.formProps = props;
      }
    });
    this.$eventBus.$on("modal-close", () => {
      this.closeModal();
    });
  },
  methods: {
    closeModal() {
      this.showModal = false;
      this.component = null;
      this.title = "";
    },
    handleAnswer(answer) {
      this.$eventBus.$emit("confirm-answer", answer);
      this.closeModal();
    },
  },
};
</script>

<style scoped>
.w-80 {
  max-width: 800px;
  width: 100%;
}
.pop-enter-active,
.pop-leave-active {
  transition: all 0.3s;
}
.pop-enter, .pop-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  /* transform: translateY(-3.7rem); */
}
</style>
