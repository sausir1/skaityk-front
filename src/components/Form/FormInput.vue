<template>
  <input
    @input="$emit('input', $event.target.value)"
    :class="{ input: true, 'is-danger': hasError, 'is-loading': loading }"
    :type="type"
    :value="inputValue"
    :placeholder="placeholder"
    :readonly="disabled"
  />
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    inputValue: {
      type: String,
      default: "",
    },
    placeholder: {
      required: false,
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped></style>
