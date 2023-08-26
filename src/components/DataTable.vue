<template>
  <div>
    <q-table
      class="my-sticky-header-table"
      flat
      bordered
      :title="title"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
      <!-- <slot v-for="cell in cells" :key="cell" name="cell"></slot> -->

      <template v-for="cell in cells" :key="cell" v-slot:[`body-cell-${cell}`]="props">
        
        <slot :name="cell" :props="props"></slot>
      </template>
      <template v-slot:top-right>
        <slot name="top-right"></slot>
      </template>

      <template v-slot:top>
        <slot name="top"></slot>
      </template>
    </q-table>
  </div>
</template>
  
  <script>
export default {
  props: ["rows", "columns", "title", "cells"],
  setup() {
    return {};
  },
};
</script>
<style scoped>
.my-sticky-header-table {
  /* height or max-height is important */
  max-height: 500px;
}

.my-sticky-header-table .q-table__top,
.my-sticky-header-table .q-table__bottom,
.my-sticky-header-table thead tr:first-child th {
  /* bg color is important for th; just specify one */
  background-color: #00b4ff;
}

.my-sticky-header-table thead tr th {
  position: sticky;
  z-index: 1;
}

.my-sticky-header-table thead tr:first-child th {
  top: 0;
}

/* this is when the loading indicator appears */
.my-sticky-header-table.q-table--loading thead tr:last-child th {
  /* height of all previous header rows */
  top: 48px;
}

/* prevent scrolling behind sticky top row on focus */
.my-sticky-header-table tbody {
  /* height of all previous header rows */
  scroll-margin-top: 48px;
}
</style>