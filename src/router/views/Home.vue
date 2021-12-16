<template>
  <section class="hero is-success is-halfheight">
    <div class="hero-body">
      <div class="">
        <p class="title">SKAITYKLA</p>
        <p class="subtitle">Welcome</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      count: 5,
    };
  },
  created() {
    this.$axios
      .get("users")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  },
};
</script>
