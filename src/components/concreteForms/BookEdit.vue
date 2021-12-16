<template>
  <api-form
    :endpoint="formProps.endpoint"
    :afterSubmit="afterSubmit"
    :method="formProps.method"
  >
    <form-item name="title" label="Title" />
    <form-item name="price" label="Price" />
    <form-item name="about" label="Description" />
    <form-item name="pages" label="Number of pages" />
    <form-item name="category_id" label="Category" />
  </api-form>
</template>

<script>
export default {
  props: {
    formProps: {
      type: Object,
      required: true,
    },
    // method: {
    //   type: String,
    //   default: "POST",
    // },
    // endpoint: {
    //   type: String,
    //   default: "authors/1/books",
    // },
  },
  methods: {
    afterSubmit(bookData) {
      this.$eventBus.$emit("modal-close");
      this.$eventBus.$emit(`submitted-${this.formProps.parent}`, bookData);
    },
  },
};
</script>

<style lang="scss" scoped></style>
