<template>
  <PersistentDialog :width="'800px'">
    <template v-slot:open-button="{ open }">
    
      <q-btn
                color="primary"
                label="Create"
                @click="open"
                glossy
                rounded  
                class="mx-1"      
                size=".7rem"
                icon-right="add_circle"
              />
    </template>

    <template v-slot:title>
      <div class="px-5">
        {{ title }}
      </div>
    </template>

    <template v-slot:content>
      <q-form @submit="onSubmit" class="p-5">
        <div class="row my-1">
          <div class="col-6 px-1">
            <span class="text-red-400" v-if="errors.firstname">
              {{ errors.firstname[0] }}</span
            >
            <q-input
              class=""
              dense
              outlined
              v-model="employeeForm.firstname"
              label="First Name(required)"
              counter
              maxlength="50"
            />
          </div>

          <div class="col-6 px-1">
            <span class="text-red-400" v-if="errors.lastname">
              {{ errors.lastname[0] }}</span
            >
            <q-input
              dense
              outlined
              v-model="employeeForm.lastname"
              label="Last Name(required)"
              counter
              maxlength="50"
            />
          </div>
        </div>

        <div class="row my-1">
          <q-input
            class="col-6 px-1"
            dense
            outlined
            v-model="employeeForm.middlename"
            label="Middle Name"
            counter
            maxlength="50"
          />
        </div>

        <div class="row my-1">
          <div class="px-1 col-6">
            <span class="text-red-400" v-if="errors.birthdate">
              {{ errors.birthdate[0] }}</span
            >
            <q-input
              dense
              outlined
              v-model="employeeForm.birthdate"
              mask="date"
              label="Birthdate(required)"
              placeholder="YYYY/MM/dd"
              :rules="(val) => !!val || 'Birthdate is Required'"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="employeeForm.birthdate">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="column col-6 items-start px-1 text-gray-500">
            <span class="text-red-400" v-if="errors.gender">
              {{ errors.gender[0] }}</span
            >
            <div class="row">

              <span class="pt-2">Gender:</span>
            <q-radio
              v-model="employeeForm.gender"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="Male"
              label="Male"
            />
            <q-radio
              v-model="employeeForm.gender"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="Female"
              label="Female"
            />
            </div>

            
          </div>
        </div>
        <div class="row my-1">
          <q-input
            dense
            outlined
            v-model="employeeForm.email"
            label="Email"
            counter
            maxlength="100"
            placeholder="example@yahoo.com"
            class="px-1 col-6"
          />

          <q-input
            dense
            outlined
            v-model="employeeForm.contact_number"
            label="Contact Number"
            class="px-1 col-6"
          />
        </div>

        <div class="row my-1">
          <q-input
            dense
            outlined
            counter
            maxlength="255"
            v-model="employeeForm.address"
            type="textarea"
            label="Address"
            class="px-1 col-12"
          />
        </div>

        <div class="row my-1 justify-end">
          <q-btn color="primary" type="submit" glossy label="Submit" />
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

    const { errors, employeeForm } = storeToRefs(store);

    return {
      employeeForm,
      errors,
      onSubmit: () => {
        store.addEmployee();
      },
    };
  },
};
</script>

<style>
</style>