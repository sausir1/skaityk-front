<template>
  <nav class="navbar is-success container is-fluid">
    <a
      role="navbar-burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="left-navigation"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
    <div class="navbar-menu" id="left-navigation">
      <div class="navbar-start">
        <router-link
          :to="`/${link.link}`"
          tag="a"
          class="navbar-item"
          v-for="link in links"
          :key="link.name"
          >{{ link.name }}</router-link
        >
      </div>
      <div class="navbar-end">
        <template v-if="!can.user">
          <a @click="onRegisterClick" class="navbar-item">Register</a>
          <a @click="onLoginClick" class="navbar-item">Login</a>
        </template>
        <template v-else>
          <div class="navbar-item has-dropdown is-hoverable">
            <router-link tag="a" to="auth" class="navbar-link">
              <ion-icon name="person-circle" style="font-size: 32px"></ion-icon>
              {{ userInfo.name }}
              <div class="navbar-dropdown">
                <router-link class="navbar-item" tag="a" to="/auth"
                  >My Profile</router-link
                >
                <hr class="navbar-divider" />
                <a @click="logout" href="#" class="navbar-item">Logout</a>
              </div>
            </router-link>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
import LoginForm from "../LoginForm.vue";
import RegisterForm from "../RegisterForm.vue";

export default {
  props: {
    links: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    setInterval(() => {
      if (this.$store.getters.loggedIn) {
        this.$axios.post("auth/alive", {}).then(({ token }) => {
          console.log("firing");
          this.$store.commit("token", token);
        });
      }
    }, 1000 * 60 * 2);
  },
  methods: {
    onRegisterClick() {
      this.$eventBus.$emit("modal-open", {
        component: RegisterForm,
        title: "New user registartion",
      });
    },
    onLoginClick() {
      this.$eventBus.$emit("modal-open", {
        component: LoginForm,
        title: "Login",
      });
    },
    logout() {
      this.$axios.post("auth/logout").then((response) => {
        this.$store.commit("logout");
        this.$eventBus.$emit("notification-show", {
          message: response.data.status,
          status: "success",
        });
      });
    },
  },
  computed: { ...mapState(["can", "userInfo", "loggedIn"]) },
};
</script>

<style scoped>
.ml-10 {
  margin-left: 10rem;
}
.mr-10 {
  margin-right: 10rem;
}
</style>
