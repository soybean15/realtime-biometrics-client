<template>
  <q-btn flat color="white" :label="user.name">
    <q-menu transition-show="jump-down" transition-hide="jump-up" style="width: 300px;">
      <div class="p-5">

        <q-form @submit="updateUser">
          <div class="text-red-400 py-1" v-if="errors.name"> {{errors.name[0]}}</div>
          <q-input  v-model="user.name" label="Name" />

          <div class="text-red-400 py-1" v-if="errors.email"> {{errors.email[0]}}</div>
          <q-input  v-model="user.email" label="Email" />

          <div class="text-red-400 py-1" v-if="errors.password"> {{errors.password[0]}}</div>
          <q-input
            type="password"
            
            v-model="current_password"
            label="Current Password"
          />

          
          <q-input
            type="password"
            
            v-model="password"
            label="New Password"
          />

          <q-btn class="my-1" type="submit" color="secondary" label="Submit" />
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


    const { user,errors } = storeToRefs(store);

    return {
      user,
      current_password,
      password,
      store,
      errors,
      updateUser:()=>{
        store.updateProfileInfo(current_password.value,password.value)
      }
    };
  },
};
</script>

<style>
</style>