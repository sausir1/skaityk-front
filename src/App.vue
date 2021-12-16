<template>
  <div id="app">
    <global-notification />
    <top-navigation :links="routerLinks" />
    <div class="container">
      <div class="my-card">
        <router-view></router-view>
      </div>
    </div>
    <my-modal />
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Skaitykla</strong> by
          <a href="https://github.com/sausir1">Saulius Sirvydas</a>. <br />
          <ion-icon name="logo-github" style="font-size: 56px"></ion-icon>
          <br />
          <a href="https://github.com/sausir1/skaityk-front">
            <ion-icon name="logo-vue"></ion-icon> Front-end repository</a
          >
          <br />
          <a><ion-icon name="logo-laravel"></ion-icon> Back-end repository</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import TopNavigation from "./components/layout/TopNavigation.vue";
import MyModal from "./components/MyModal.vue";
import GlobalNotification from "./components/layout/GlobalNotification.vue";
export default {
  name: "App",
  components: { TopNavigation, MyModal, GlobalNotification },
  computed: {
    routerLinks() {
      return [
        { name: "Home", link: "" },
        { name: "Authors", link: "authors" },
      ];
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap");
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
#app {
  font-family: "Poppins", sans-serif !important;
  background: #f4f4f4ff !important;
}
body {
  height: 100vh;
}
.my-card {
  margin-top: 1rem;
  padding: 2rem;
  width: 100%;
  min-height: 900px;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}
</style>
