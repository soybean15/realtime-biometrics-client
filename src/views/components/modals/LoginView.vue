<template>
  <PersistentDialog :width="'500px'" :maxWidth="'80vh'">
    <template v-slot:open-button="{ open }">
      <q-btn flat label="Login" @click="open" v-if="!user" />
      <q-btn flat label="Logout" @click="store.logout" v-else />
    </template>

    <template v-slot:title>
      <div class="px-5 row items-center">
        <q-icon size="2rem" name="vpn_key" />
        <span class="text-2xl text-bold">Login</span>
      </div>
    </template>

    <template v-slot:content="{ close }">
      <div class="p-5">
        <q-form @submit="onSubmit(close)" @reset="onReset" class="q-gutter-md">
          <span class="text-red-500 text-xs" v-if="errors &&  errors.email">{{
            `*${errors.email[0]}`
          }}</span>
          <q-input
            dense
            outlined
            v-model="loginForm.email"
            label="Email"
            hint="example@email.com"
            :rules="[
              (val) => !!val || 'Email is missing',
              (val) => isValidEmail(val),
            ]"
          />
          <!-- :rules="[(val) => (val && val.length > 0) || 'Please type something']" -->
          <span class="text-red-500 text-xs" v-if="errors && errors.password">{{
            `*${errors.password[0]}`
          }}</span>
          <q-input
            dense
            outlined
            type="password"
            v-model="loginForm.password"
            label="password"
            :rules="[
              (val) => !!val || '* Required',
              (val) => isPasswordValid(val),
            ]"
          />
        <!-- <div class="hover:underline hover:cursor-pointer">   <router-link   :to="{name:'forgotPassword'}"> Forgot Password </router-link></div> -->


          <div class="row justify-center">

            <span class="text-red-500 text-md " v-if="errors && errors.message">{{
            `${errors.message}`
          }}</span>

          </div>
       
          <div class="row justify-end">
            <q-btn
              :loading="loading"
              label="Submit"
              type="submit"
              color="primary"
            >
              <template v-slot:loading>
                <div class="row items-center">
                  <q-spinner-clock size="1rem" />
                  <span class="ml-2 text-[10px]">Loading...</span>
                </div>
              </template>
            </q-btn>
          </div>
        </q-form>
      </div>
    </template>
  </PersistentDialog>
</template>

<script>
import PersistentDialog from "@/components/PersistentDialog.vue";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import getValidations from '@/composables/validations'

export default {
  components: { PersistentDialog },
  setup() {
    const store = useAuthStore();

    const { user, loginForm, errors } = storeToRefs(store);

    const {isValidEmail, isPasswordValid }=getValidations()

    const loading = ref(false);



    return {
      store,
      loginForm,
      user,
      loading,
      errors,
      isValidEmail,
      isPasswordValid,
      onSubmit: async (close) => {
        loading.value = true;

        try {
         // const delayDuration = 2000;
       //   await new Promise((resolve) => setTimeout(resolve, delayDuration));
          await store.login(close);
          loading.value = false;
        } catch (error) {
          loading.value = false;
        }
      },
    
    };
  },
};
</script>

<style>
</style>