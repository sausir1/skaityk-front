<template>
  <div
    class="field is-horizontal"
    style="width: 80%; margin: auto; margin-bottom: 2.5rem !important"
  >
    <div class="field-label is-normal">
      <label class="label">{{ label }}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <div class="select">
            <select v-model="itemValue" :disabled="disabled">
              <option
                v-for="option in options"
                :key="option[0]"
                :value="option[0]"
              >
                {{ option[1] }}
              </option>
            </select>
          </div>
        </div>
        <transition name="fade">
          <p v-if="errors.length > 0" class="help is-danger absolute">
            {{ errors }}
          </p>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialValue: {
      type: [Array, String, Number],
      default: () => [[]],
    },
    name: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [[]],
    },
  },
  data() {
    return {
      errors: "",
      itemValue: "",
    };
  },
  created() {
    this.itemValue = this.initialValue;
    if (!this.disabled) {
      this.$formBus.$emit("register-input", this.name, this.itemValue);
    }
    this.$formBus.$on(
      `error-${this.name}`,
      (errorMsg) => (this.errors = errorMsg)
    );
    this.$formBus.$on("reset-input", () => {
      this.itemValue = this.initialValue;
    });
    this.$formBus.$on(`set-${this.name}`, (value) => (this.itemValue = value));
  },
  watch: {
    itemValue: {
      handler() {
        this.$formBus.$emit("form-input", this.name, this.itemValue);
        this.errors = "";
      },
    },
  },
};
</script>

<style scoped>
.absolute {
  position: absolute;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-0.7rem);
}
</style>
