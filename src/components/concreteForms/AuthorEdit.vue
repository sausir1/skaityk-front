<template>
  <api-form
    :endpoint="formProps.endpoint"
    :method="formProps.method"
    :after-submit="afterSubmit"
  >
    <form-item name="name" label="Name" />
    <form-item name="surname" label="Surname" />
    <form-item name="age" label="Age" />
    <form-item name="nationality" label="nationality" />
    <form-item name="about" label="Description" />
    <form-item name="website" label="Website" />
  </api-form>
</template>

<script>
export default {
  props: {
    formProps: {
      type: Object,
      required: true,
    },
  },
  methods: {
    afterSubmit(authorData) {
      this.$eventBus.$emit("modal-close");
      this.$eventBus.$emit(`submitted-${this.formProps.parent}`, authorData);
    },
  },
};
</script>
