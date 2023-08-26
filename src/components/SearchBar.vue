<template>
  <q-input dense  square outlined  borderless v-model="search"  type="search" label="Search">
    <template  v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
export default {};
</script>

<style>
</style>