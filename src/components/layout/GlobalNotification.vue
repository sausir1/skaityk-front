<template>
  <div class="notification-container">
    <div
      class="m-3"
      v-for="(notification, index) in notifications"
      :key="notification.id"
    >
      <div :class="getStyle(notification)">
        <button @click="removeNotification(index)" class="delete"></button>
        {{ notification.message }}
        <!-- <progress
          class="progress is-warning"
          style="height: 5px; position: absolute; bottom: 0.2px; left: 0"
          value="15"
          max="100"
        ></progress> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notifications: [],
    };
  },
  computed: {
    name() {
      return this.data;
    },
  },
  // notificationObj: Message, status
  created() {
    this.$eventBus.$on("notification-show", (notificationObj) => {
      notificationObj.id = Math.floor(Math.random() * 100);
      this.notifications.push(notificationObj);
    });
  },
  methods: {
    getStyle(notification) {
      return `turbo notification is-${notification.status}`;
    },
    removeNotification(index) {
      this.$delete(this.notifications, index);
    },
  },
};
</script>

<style scoped>
.notification-container {
  z-index: 800 !important;
  position: fixed;
  max-width: 400px;
  bottom: 1.5rem;
  right: 1.5rem;
  margin: 1rem;
  z-index: 15;
}

.turbo {
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
}
.turbo:hover {
  transform: translateX(-0.5rem) scale(1.05);
}

.pop-enter-active,
.pop-leave-active {
  transition: all 0.5s;
}
.pop-enter, .pop-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  /* transform: translateY(-3.7rem); */
}
</style>
