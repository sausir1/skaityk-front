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
    <form-item-select
      name="category_id"
      label="Category"
      :options="categoryOptions"
    />
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
  data() {
    return {
      categoryOptions: [],
    };
  },
  created() {
    this.$axios.get("categories").then((res) => {
      this.categoryOptions = res.data.map((category) => [
        category.id,
        category.name,
      ]);
    });
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
