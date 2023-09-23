<template>
  <q-header elevated class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

      <q-toolbar-title class="pt-2">
        <div class="row items-center">
          <router-link to="/">
            <q-avatar to="/" size="20px" class="mx-3 cursor-pointer">
              <img
                src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
              />
            </q-avatar>
            <span to="/" class="text-md cursor-pointer">PNHS Attendance</span>
          </router-link>
        </div>

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