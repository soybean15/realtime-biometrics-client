<template>
  <PersistentDialog
    :width="'500px'"
    :maxWidth="'80vh'"
  
  >
    <template v-slot:open-button="{ open }">
      <q-btn flat label="Register" @click="open" v-if="!user" />
    </template>

    <template v-slot:title>
      <div class="p-5">
        <span class="text-2xl text-bold">Register</span>
      </div>
    </template>

    <template v-slot:content>
      <div class="p-3">
     
        <q-form @submit="onSubmit" class="q-gutter-md">
          <span class="text-red-500 text-xs" v-if="errors.email">{{`*${errors.email[0]}`}}</span>
          <q-input
           class="mt-0 mb-3"
            outlined
            v-model="registerForm.email"
            dense
            label="Email"
            hint="example@email.com"
            lazy-rules
          />
          <span class="text-red-500 text-xs" v-if="errors.name">{{`*${errors.name[0]}`}}</span>
          <q-input
          class="mt-0"
            outlined
            v-model="registerForm.name"
            dense
            label="Username"
            hint="example123"
            lazy-rules
          />
          <!-- :rules="[(val) => (val && val.length > 0) || 'Please type something']" -->
          <span class="text-red-500 text-xs" v-if="errors.password">{{`*${errors.password[0]}`}}</span>
          <q-input
        
            outlined
            dense
            v-model="registerForm.password"
            type="password"
            hint="Must be atleast 8 characters"
            label="password"
            lazy-rules
          />
          <q-input
            outlined
            dense
            v-model="registerForm.password_confirmation"
            type="password"
            label="Confirm Password"
            hint="Must match password"
            lazy-rules
          />

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
export default {
  components: { PersistentDialog },
  setup() {
    const store = useAuthStore();
    const loading = ref(false);

    const { user, registerForm ,errors} = storeToRefs(store);

    return {
      user,
      registerForm,
      store,
      loading,
      errors,
      onSubmit: async () => {
        loading.value = true;

        const delayDuration = 2000;
        try {
          await new Promise((resolve) => setTimeout(resolve, delayDuration));
          await store.register();
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