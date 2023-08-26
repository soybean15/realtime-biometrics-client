<template>
  <PersistentDialog :width="'800px'">
    <template v-slot:open-button="{ open }">
      <slot name="button" :open="open"></slot>
    </template>

    <template v-slot:title>
      {{ title }}
    </template>

    <template v-slot:content>
      <q-form class="p-5">
        <div class="row">
          <q-input
            class="col-6 px-1"
            dense
            outlined
            v-model="employeeForm.firstname"
            label="First Name(required)"
            counter
            maxlength="50"
          />

          <q-input
            class="col-6 px-1"
            dense
            outlined
            v-model="employeeForm.firstname"
            label="Last Name(required)"
            counter
            maxlength="50"
          />
        </div>

        <div class="row">
          <q-input
            class="col-6 px-1"
            dense
            outlined
            v-model="employeeForm.firstname"
            label="Middle Name(required)"
            counter
            maxlength="50"
          />
          <div class="row items-start px-1 text-gray-500">
            <span  class="pt-2 ">Gender:</span>
            <q-radio
              v-model="shape"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="Male"
              label="Male"
            />
            <q-radio
              v-model="shape"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="Female"
              label="Female"
            />
         
          </div>
        </div>
      </q-form>
    </template>
  </PersistentDialog>
</template>

<script>
import PersistentDialog from "@/components/PersistentDialog.vue";
import { useEmployeeStore } from "@/store/employee";
import { storeToRefs } from "pinia";
export default {
  components: {
    PersistentDialog,
  },
  props: ["title"],
  setup() {
    const store = useEmployeeStore();

    const { employeeForm } = storeToRefs(store);

    return {
      employeeForm,
    };
  },
};
</script>

<style>
</style>