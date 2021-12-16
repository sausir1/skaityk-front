<template>
  <form @submit.prevent>
    <slot></slot>
    <div class="field is-grouped is-grouped-centered mt-8">
      <div class="control">
        <button @click="onSubmit" class="button is-success">Submit</button>
      </div>
      <div class="control">
        <button @click="onReset" class="button is-success is-light">
          Reset
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    endpoint: {
      type: String,
      default: "",
      required: true,
    },
    method: {
      type: String,
      default: "POST",
    },
    afterSubmit: {
      type: Function,
      default: (responseData) => {
        return responseData;
      },
    },
    successMessage: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      initialForm: {},
      form: {},
      errorMessage: "",
    };
  },
  created() {
    if (this.method === "POST") {
      this.$formBus.$on("register-input", (inputName, value) => {
        this.$set(this.form, inputName, value);
        this.$set(this.initialForm, inputName, value);
      });
    } else if (this.method === "PUT") {
      this.$axios.get(this.endpoint).then(({ data }) => {
        Object.keys(data).forEach((key) => {
          this.$set(this.form, key, data[key]);
          this.$set(this.initialForm, key, data[key]);
          this.$formBus.$emit(`set-${key}`, data[key]);
        });
      });
    }

    this.$formBus.$on("form-input", (inputName, value) => {
      this.$set(this.form, inputName, value);
    });
  },
  methods: {
    onSubmit() {
      this.$axios[this.method.toLowerCase()](this.endpoint, this.form)
        .then((response) => {
          this.$eventBus.$emit("notification-show", {
            message: this.successMessage || "Operation was successful!",
            status: "success",
          });
          this.afterSubmit(response.data);
        })
        .catch((error) => {
          const response = error.response;
          const errorObj = response.data;
          this.errorMessage = errorObj.message
            ? errorObj.message
            : errorObj.error;
          if (errorObj.errors) {
            Object.keys(errorObj?.errors).forEach((key) => {
              this.$formBus.$emit(`error-${key}`, errorObj.errors[key][0]);
            });
          }
          this.$eventBus.$emit("notification-show", {
            status: "danger",
            message: this.errorMessage,
          });
        });
    },
    onReset() {
      this.$formBus.$emit("reset-input");
    },
  },
};
</script>
<style scoped>
.mt-8 {
  margin-top: 2.5rem;
}
</style>
