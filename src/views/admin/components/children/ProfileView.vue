<template>
  <div class="p-2 py-5 bg-surface rounded-lg shadow-lg">
    <div class="column">
      <div class="">
        <div class="column items-center justify-center">
          <PhotoUpload
            @upload="upload"
            :attribute="'image'"
            :imageVal="selectedEmployee.image"
            :errors="errors"
          />

          <!-- <q-avatar size="120px" rounded>
                  <img :src="selectedEmployee.image" />
                </q-avatar> -->

          <span class="p-2 pb-0 font-semibold">{{
            selectedEmployee.full_name
          }}</span>
          <!-- <span
                  class="bg-gray-800 text-white text-sm font-bold p-1 rounded-md"
                  >{{ `ID: ${selectedEmployee.employee_id}` }}</span
                > -->
          <q-chip size="md" text-color="white" color="secondary">
            Employee ID: <b> {{ `${selectedEmployee.employee_id}` }}</b>
          </q-chip>

          <q-chip size="md" text-color="white" class="bg-surface">
            Biometrics ID: <b> {{ `${selectedEmployee.biometrics_id}` }}</b>
          </q-chip>

          <div class="self-start p-3 m-2 w-full">
            <div class="row">
              <div class="col-6">
                <LabelInput
                  :title="'Firstname'"
                  :titleClass="' font-bold'"
                  :value="selectedEmployee.firstname"
                  :attribute="'firstname'"
                  :valueClass="'text-md font-secondary'"
                  @update="onUpdate"
                  :errors="errors"
                />
              </div>
              <div class="col-5">
                <LabelInput
                  :title="'Lastname'"
                  :titleClass="' font-bold'"
                  :value="selectedEmployee.lastname"
                  :attribute="'lastname'"
                  :valueClass="'text-md font-secondary '"
                  @update="onUpdate"
                  :errors="errors"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <LabelInput
                  :title="'Middlename'"
                  :titleClass="' font-bold'"
                  :value="selectedEmployee.middlename"
                  :attribute="'middlename'"
                  :valueClass="'text-md font-secondary '"
                  @update="onUpdate"
                />
              </div>

              <LabelInput class="col-5"
              :title="'Birth Date'"
              :titleClass="'font-bold'"
              :value="selectedEmployee.birthdate"
              :type="'date'"
              :valueClass="'text-md font-secondary '"
              :attribute="'birthdate'"
              @update="onUpdate"
            />
            </div>
            <LabelInput class=""
              :title="'Email'"
              :titleClass="' font-bold'"
              :value="selectedEmployee.email"
              :attribute="'email'"
              :valueClass="'text-md font-secondary'"
              @update="onUpdate"
              :errors="errors"
            />

            <div class=" row">
              <LabelInput class="col-6"
              :title="'Contact Number'"
              :titleClass="' font-bold'"
              :value="selectedEmployee.contact_number"
              :valueClass="'text-md font-secondary '"
              :attribute="'contact_number'"
              @update="onUpdate"
              :errors="errors"
            />

            <LabelInput class="col-5"
              :title="'Gender'"
              :titleClass="' font-bold'"
              :value="selectedEmployee.gender"
              :type="'select'"
              :data="['Male', 'Female']"
              :valueClass="'text-md font-secondary'"
              :attribute="'gender'"
              @update="onUpdate"
            />



            </div>

           
           <div class="row">

            <div class="col-6">
              <div class="font-bold text-sm">Position</div>
              <div class="column font-secondary">
                <div class="py-1"
                  v-for="position in selectedEmployee.positions"
                  :key="position.id"
                >
                  {{ position.name }}
                </div>
              </div>
            </div>

            <div class="col-5">
              <div class="text-sm font-bold">Deparment/s</div>
              <div class="column font-secondary">
                <div class="py-1"
                  v-for="department in selectedEmployee.departments"
                  :key="department.id"
                >
                  {{ department.name }}
                </div>
              </div>
            </div>

           </div>
            

            <LabelInput
              :title="'Address'"
              :titleClass="' font-bold'"
              :value="selectedEmployee.address"
              :valueClass="'text-md font-secondary '"
              :attribute="'address'"
              @update="onUpdate"
            />


            <div class="row">
              <div class="col-6">
              <div class="font-bold text-sm">Date Created:</div>
              <div class="font-secondary py-1">
                {{ formatTime(selectedEmployee.created_at) }}
              </div>
            </div>
            <div class="">
              <div class="font-bold text-sm">Last Updated:</div>
              <div class=" font-secondary py-1">
                {{ formatTime(selectedEmployee.updated_at) }}
              </div>
            </div>


            </div>
            
            <div class="">
              <div class="font-bold text-sm">Added By:</div>
              <div class="font-bold font-secondary py-1">
                {{ selectedEmployee.user.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PhotoUpload from "@/components/PhotoUpload.vue";
import LabelInput from "@/components/LabelInput.vue";
import formatTime from "@/composables/DateTimeFormat";
export default {
  components: {
    PhotoUpload,
    LabelInput,
  },
  props: ["selectedEmployee", "upload", "onUpdate", "errors"],
  setup() {
    return {
      formatTime,
    };
  },
};
</script>

<style>
</style>