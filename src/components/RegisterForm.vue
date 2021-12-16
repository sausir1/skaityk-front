<template>
  <api-form endpoint="register" :afterSubmit="afterSubmit">
    <form-item name="name" label="Name" placeholder="John Doe" />
    <form-item name="username" label="Username" placeholder="joDoe" />
    <form-item
      name="email"
      type="email"
      label="Email"
      placeholder="john@example.com"
    />
    <form-item name="password" type="password" label="Password" />
    <form-item
      name="password_confirm"
      type="password"
      label="Confirm password"
    />
  </api-form>
</template>

<script>
export default {
  methods: {
    afterSubmit() {
      this.$eventBus.$emit("modal-close");
      this.$eventBus.$emit("notification-show", {
        status: "success",
        message:
          "Succesfully registered! Log in with your crediantials and enjoy full experience!",
      });
    },
  },
};
</script>
