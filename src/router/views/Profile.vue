<template>
  <div class="tile is-ancestor">
    <div class="tile is-3 is-vertical is-parent">
      <div class="tile is-child box">
        <div class="card">
          <div class="card-image">
            <figure class="image is-3by3">
              <img
                :src="`https://randomuser.me/api/portraits/men/${random}.jpg`"
                alt="Placeholder image"
              />
            </figure>
          </div>
        </div>
      </div>
      <div class="tile is-child box">
        <p class="title">{{ userInfo.name }}</p>
        <ul>
          <li>Experience: {{ userInfo.experience }}</li>
          <li>Registered At: {{ userInfo.created_at }}</li>
        </ul>
      </div>
    </div>
    <div class="tile is-parent">
      <div class="tile is-child box">
        <api-form endpoint="auth" method="PATCH" :after-submit="afterSubmit">
          <form-item
            :initial-value="userInfo.email"
            name="email"
            label="Email"
            disabled
          />
          <form-item
            :initial-value="userInfo.username"
            name="username"
            label="Username"
            disabled
          />
          <form-item :initial-value="userInfo.name" name="name" label="Name" />
          <form-item
            :initial-value="userInfo.about"
            name="about"
            label="About"
          />
        </api-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {
    this.random = Math.floor(Math.random() * 100);
  },
  methods: {
    afterSubmit(data) {
      this.$store.commit("userInfo", data);
    },
  },
};
</script>

<style lang="scss" scoped></style>
