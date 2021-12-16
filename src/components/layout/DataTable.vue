<template>
  <div>
    <span v-if="canEdit" class="absolute">
      <ion-icon
        name="add-circle-sharp"
        class="on-hover-green"
        style="font-size: 56px"
        @click="addNewClick"
      ></ion-icon>
    </span>
    <table class="table is-hoverable is-fullwidth">
      <thead v-if="hasHeader">
        <tr>
          <th v-for="key in headerColumns" :key="key">{{ key }}</th>
          <th v-if="editRemove">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(singleInstance, index) in displayData" :key="index">
          <td v-for="key in displayColumns" :key="key">
            <slot :name="key" :rowData="singleInstance"></slot>
          </td>
          <td v-if="editRemove">
            <ion-icon
              v-if="canEdit"
              class="on-hover"
              name="create-outline"
              style="font-size: 32px"
              @click="editClick(singleInstance)"
            ></ion-icon>
            <ion-icon
              v-if="canEdit"
              class="on-hover"
              style="font-size: 32px"
              name="close"
              @click="removeClick(singleInstance)"
            ></ion-icon>
            <ion-icon
              name="arrow-redo-sharp"
              style="font-size: 32px"
              class="on-hover"
              @click="visitClick(singleInstance)"
            ></ion-icon>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    editClick: {
      type: Function,
      default: null,
    },
    addNewClick: {
      type: Function,
      default: null,
    },
    removeClick: {
      type: Function,
      default: null,
    },
    visitClick: {
      type: Function,
      default: null,
    },
    editRemove: {
      type: Boolean,
      default: true,
    },
    canEdit: {
      default: false,
      type: Boolean,
    },
    displayColumns: {
      type: Array,
      default: () => [],
    },
    displayData: {
      type: Array,
      default: () => [],
    },
    hasHeader: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentDisplay: [],
    };
  },
  computed: {
    headerColumns() {
      return this.displayColumns.map((item) => item.toUpperCase());
    },
    ...mapState(["can"]),
  },
};
</script>

<style scoped>
.is-hoverable-success tbody tr {
  transition: all 0.2s cubic-bezier(0.39, 0.575, 0.565, 1);
}
.is-hoverable-success tbody tr:hover {
  background: #48c78ed7;
  color: white;
}
.on-hover-green {
  cursor: pointer;
  transition: 0.3s all ease-out;
  font-weight: 600;
}
.on-hover-green:hover {
  color: rgba(72, 199, 142, 1);
  font-weight: 600;
}
</style>
