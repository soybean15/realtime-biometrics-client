<template>
  <q-header elevated class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

      <q-toolbar-title>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>
        PNHS Attendance
      </q-toolbar-title>

      <q-space />

      <!--
        notice shrink property since we are placing it
        as child of QToolbar
      -->

    <LoginView/>
     <RegisterView/>
    </q-toolbar>
  </q-header>
</template>

<script>
import LoginView from './modals/LoginView.vue';
import RegisterView from './modals/RegisterView.vue';
 

export default {
  components: { 
    LoginView ,
    RegisterView
  },
  props: ["toggleLeftDrawer"],
};
</script>

<style>
</style>