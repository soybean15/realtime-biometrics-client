<template>
  <q-btn flat color="white" :label="user.name">
    <q-menu transition-show="jump-down" transition-hide="jump-up">
      <div class="p-5">
        <q-form @submit="store.updateProfileInfo(current_password,password)">
          <q-input dense v-model="user.name" label="Name" />

          <q-input dense v-model="user.email" label="Email" />

          <q-input
            type="password"
            dense
            v-model="current_password"
            label="Current Password"
          />

          <q-input
            type="password"
            dense
            v-model="password"
            label="New Password"
          />

          <q-btn type="submit" color="secondary" label="Submit" />
        </q-form>
      </div>

      <!-- 
          <q-list style="min-width: 300px">
            <q-item clickable>
                <LabelInput
                  :title="'Name'"
                  :titleClass="'font-secondary font-bold'"
                  :value="userForm.name"
                  :valueClass="'text-md font-bold font-primary'"
                  :attribute="'name'"
                 
                />
            </q-item>
            <q-item clickable>
                <LabelInput
                  :title="'Email'"
                  :titleClass="'font-secondary font-bold'"
                  :value="userForm.email"
                  :valueClass="'text-md font-bold font-primary'"
                  :attribute="'name'"
                 
                />
            </q-item>
            <q-separator />
            <q-item clickable>
              <q-item-section>Mind blown</q-item-section>
            </q-item>
          </q-list> -->
    </q-menu>
  </q-btn>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { ref } from "vue";

export default {
  components: {},
  setup() {
    const store = useAuthStore();
    const current_password = ref(null);
    const password = ref("");

    const { user } = storeToRefs(store);

    return {
      user,
      current_password,
      password,
      store
    };
  },
};
</script>

<style>
</style>