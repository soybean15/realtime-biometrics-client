<template>
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
                    <q-btn v-close-popup label="Close" color="primary" flat />
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
</template>


<script>
import { useEmployeeStore } from "@/store/employee";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
export default {
  setup() {
    const store = useEmployeeStore();
    const fileInputRef = ref(null);
    const imageFile = ref(null);
    const image = ref(null);

    
    const { errors, employeeForm } = storeToRefs(store);
    
    watch(imageFile,()=>{
      employeeForm.value.image = imageFile.value
    })

    return {
      employeeForm,
      errors,
      image,
      imageFile,
      fileInputRef,
      onSubmit: () => {
       // store.add(imageFile.value);
      },
      upload: () => {
        fileInputRef.value.pickFiles();
      },

      print: () => {
        image.value = URL.createObjectURL(imageFile.value);

        console.log("printt");
      },
    };
  },
};
</script>

<style>
</style>