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

      <q-stepper
      v-model="step"
      ref="stepper"
      animated
      done-color="primary"
      active-color="purple"
      inactive-color="secondary"
    >
      <q-step
        :name="1"
        title="Employee Details"
        icon="settings"
        :done="step > 1"
      >
       
      <q-form class="p-5 py-1">
        <div class="column">
          <div class="row mb-5 self-center">
            <div class="relative">
              <q-avatar size="100px">
                <img :src="image ? image : require('@/assets/img/user.png')" />
              </q-avatar>

              <q-file
                ref="fileInputRef"
                clearable
                class="hidden"
                filled
                color="purple-12"
                v-model="imageFile"
                label="Label"
                @update:model-value="print"
              ></q-file>
              <q-icon
                class="absolute bottom-2 right-0 cursor-pointer"
                @click="upload"
                color="blue-grey-1"
                label="Click"
                name="photo_camera"
                size="2.2em"
              ></q-icon>
            </div>
          </div>
        </div>

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

       
      </q-form>
      </q-step>

      <q-step
        :name="2"
        title="Job Detail"
     
        icon="create_new_folder"
        :done="step > 2"
      >
       


      



      </q-step>

      <q-step
        :name="3"
        title="Create an ad"
        icon="add_comment"
      >
        Try out different ad text to see what brings in the most customers, and learn how to
        enhance your ads using features like ad extensions. If you run into any problems with
        your ads, find out how to tell if they're running and how to resolve approval issues.
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="step === 3 ?onSubmit : $refs.stepper.next()" color="deep-orange" :label="step === 3 ? 'Finish' : 'Continue'" />
          <q-btn v-if="step > 1" flat color="deep-orange" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>
    </q-stepper>


























    </template>
  </PersistentDialog>
</template>

<script>
import PersistentDialog from "@/components/PersistentDialog.vue";
import { useEmployeeStore } from "@/store/employee";
import { storeToRefs } from "pinia";
import { ref } from "vue";

export default {
  components: {
    PersistentDialog,
  },
  props: ["title"],
  setup() {
    const store = useEmployeeStore();

    const fileInputRef = ref(null);
    const imageFile = ref(null);
    const image = ref(null);

    const { errors, employeeForm } = storeToRefs(store);

    return {
      employeeForm,
      errors,
      image,
      imageFile,
      fileInputRef,
      onSubmit: () => {
        store.add(imageFile.value);
      },
      upload: () => {
        fileInputRef.value.pickFiles();
      },

      print: () => {
        image.value = URL.createObjectURL(imageFile.value);

        console.log("printt");
      },
      step: ref(1)
    };
  },
};
</script>

<style>
</style>