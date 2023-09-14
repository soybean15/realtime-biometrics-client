<template>
  <q-header elevated class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

      <q-toolbar-title class="pt-2"> 

       
        
        <q-avatar size="20px">
          <img  src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>
        <span class="text-md">PNHS Attendance</span>
        <MenuView />
      </q-toolbar-title>
    
      <q-space />

      <!--
        notice shrink property since we are placing it
        as child of QToolbar
      -->

      <q-btn
        flat
        :to="{ name: 'admin' }"
        label="Administrator"
        v-if="user && user.enable"
      />
      <LoginView />
      <RegisterView />
    </q-toolbar>
  </q-header>
</template>

<script>
import LoginView from "./modals/LoginView.vue";
import RegisterView from "./modals/RegisterView.vue";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import MenuView from "./MenuView.vue";
export default {
  components: {
    LoginView,
    RegisterView,
    MenuView,
  },
  props: ["toggleLeftDrawer"],
  setup() {
    const store = useAuthStore();

    console.log("header");
    const { user } = storeToRefs(store);

    return {
      user,
    };
  },
};
</script>

<style>
</style>