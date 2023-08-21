<template>
  <PersistentDialog
    :width="'700px'"
    :maxWidth="'80vh'"
    :backgroundColor="'bg-red-400'"
  >
    <template v-slot:open-button="{ open }">
      <q-btn flat label="Register" @click="open" v-if="!user" />
    </template>

    <template v-slot:title>
      <span class="text-2xl text-bold">Register</span>
    </template>

    <template v-slot:content>
      <div class="p-3">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            outlined
            dense
            label="Email"
            hint="example@email.com"
            lazy-rules
          />
          <q-input
            outlined
            dense
            label="Username"
            hint="example123"
            lazy-rules
          />
          <!-- :rules="[(val) => (val && val.length > 0) || 'Please type something']" -->

          <q-input
            outlined
            dense
            type="password"
            hint="Must be atleast 8 characters"
            label="password"
            lazy-rules
          />
          <q-input
            outlined
            dense
            type="password"
            label="Confirm Password"
            hint="Must match password"
            lazy-rules
          />

          <q-toggle v-model="accept" label="I accept the license and terms" />
          
          <div class="row justify-end">
            <q-btn label="Submit" type="submit" color="primary" />
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
export default {
  components: { PersistentDialog },
  setup() {
    const store = useAuthStore();

    const { user } = storeToRefs(store);

    return {
      user,
    };
  },
};
</script>

<style>
</style>