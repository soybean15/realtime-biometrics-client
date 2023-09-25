<template>
  <q-list  class="rounded-borders" >
      <q-item-label header>Today</q-item-label>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">        
            Jane Doe
            <span class="text-green">(Time in)</span>
          </q-item-label>
          <q-item-label caption lines="2">
          
      
          </q-item-label>

          <q-item-label caption lines="2">
            <span class="text-weight-bold">Time:</span>
           8:01
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          1 min ago
        </q-item-section>
      </q-item>

      <q-separator inset="item" />

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar4.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">John Doe

            <span class="text-green">(Time in)</span>
          </q-item-label>
          <q-item-label caption lines="2">
        
          </q-item-label>

          <q-item-label caption lines="2">
            <span class="text-weight-bold">Time:</span>
           8:00
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          1 min ago
        </q-item-section>
      </q-item>
    </q-list>
</template>

<script>
export default {

  props:['employeeList']

}
</script>

<style>

</style>