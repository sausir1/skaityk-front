<template>
  <div style="text-align: center">
    <ion-icon name="person-circle-outline" style="font-size: 160px"></ion-icon>
    <api-form
      endpoint="login"
      :after-submit="onLoggedIn"
      success-message="Successfully logged in!"
    >
      <form-item label="Username" name="username" placeholder="username" />
      <form-item label="Password" name="password" type="password" />
    </api-form>
  </div>
</template>

<script>
export default {
  methods: {
    onLoggedIn(data) {
      this.$store.commit("login", data);
      this.$eventBus.$emit("modal-close");
      // if (!this.$route.path.endsWith("/home")) {
      //   this.$router.push("/home");
      // }
    },
  },
};
</script>
