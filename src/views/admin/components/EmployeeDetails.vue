<template>
  <div v-if="selectedEmployee">
    <div class="row p-2 items-center justify-between">
      <div class="row items-center cursor-pointer">
        <q-icon @click="back" size="1.5rem" name="arrow_back"></q-icon>
        <span class="text-md"> Employee Details</span>
      </div>

      <div class="row items-center px-2">
        <span class="bg-surface p-1 mx-2 rounded-md shadow-sm font-secondary">{{
          `Created at: ${formatTime(selectedEmployee.created_at)}`
        }}</span>

        <ConfirmDialog :pos="'top'">
          <template v-slot:open-button="{ open }">
            <q-btn @click="open" dense label="delete" color="red"></q-btn>
          </template>

          <template v-slot:title>Delete Employee</template>

          <template v-slot:message>{{
            `Delete ${selectedEmployee.full_name}?`
          }}</template>

          <template v-slot:buttons="{ close }">
            <div class="m-2">
              <q-btn
                outline
                @click="onDelete"
                :loading="loading"
                size=".8rem"
                class="mx-1"
                dense
                label="Confirm"
                color="red"
              ></q-btn>
              <q-btn
                @click="close"
                outline
                size=".8rem"
                class="mx-1"
                dense
                label="Cancel"
                color="primary"
              ></q-btn>
            </div>
          </template>
        </ConfirmDialog>
      </div>
    </div>

    <div class="row">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="profile" label="Profile" />
        <q-tab name="attendance" label="Attendance" />
      </q-tabs>
    </div>

    <div class="row h-40 m-2 shadow-sm rounded-lg">
      <div class="col-6 p-2 pr-1">
        <div class="p-2 py-5 bg-surface rounded-lg shadow-lg">
          <div class="column">
            <div class="row">
              <div class="col-6 column items-center justify-center">

                <PhotoUpload @upload="upload" :attribute="'image'" :imageVal="selectedEmployee.image" :errors="errors"/>

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
                <q-chip size="md" text-color="white" color="secondary"> Employee ID: <b> {{`${selectedEmployee.employee_id}`}}</b> </q-chip>

                <q-chip size="md" text-color="white" color="primary"> Biometrics ID: <b> {{`${selectedEmployee.biometrics_id}`}}</b> </q-chip>

                <div class="self-start p-3 m-2 w-full">
                  <div class="row">
                    <div class="col-6">
                      <LabelInput
                        :title="'Firstname'"
                        :titleClass="'font-secondary font-bold'"
                        :value="selectedEmployee.firstname"
                        :attribute="'firstname'"
                        :valueClass="'text-md '"
                        @update="onUpdate"
                        :errors="errors"
                      />

                    </div>
                    <div class="col-5">
                      <LabelInput
                        :title="'Lastname'"
                        :titleClass="'font-secondary font-bold'"
                        :value="selectedEmployee.lastname"
                        :attribute="'lastname'"
                        :valueClass="'text-md  '"
                        @update="onUpdate"
                        :errors="errors"
                      />
                      
                    </div>
        
                  </div>

                  <div class="row">
                    <div class="col-6">
                      <LabelInput
                        :title="'Middlename'"
                        :titleClass="'font-secondary font-bold'"
                        :value="selectedEmployee.middlename"
                        :attribute="'middlename'"
                        :valueClass="'text-md  '"
                        @update="onUpdate"
                        
                      />

                    </div>
                    
  
        
                  </div>
                  <LabelInput
                    :title="'Email'"
                    :titleClass="'font-secondary font-bold'"
                    :value="selectedEmployee.email"
                    :attribute="'email'"
                    :valueClass="'text-md '"
                    @update="onUpdate"
                    :errors="errors"
                  />

                  <LabelInput
                    :title="'Contact Number'"
                    :titleClass="'font-secondary font-bold'"
                    :value="selectedEmployee.contact_number"
                    :valueClass="'text-md  '"
                    :attribute="'contact_number'"
                    @update="onUpdate"
                    :errors="errors"
                  />

                  <LabelInput
                    :title="'Birth Date'"
                    :titleClass="'font-secondary font-bold'"
                    :value="selectedEmployee.birthdate"
                    :type="'date'"
                    :valueClass="'text-md  '"
                    :attribute="'birthdate'"
                    @update="onUpdate"
                  />

                  <LabelInput
                    :title="'Gender'"
                    :titleClass="'font-secondary font-bold'"
                    :value="selectedEmployee.gender"
                    :type="'select'"
                    :data="['Male', 'Female']"
                    :valueClass="'text-md '"
                    :attribute="'gender'"
                    @update="onUpdate"
                  />
                </div>
              </div>

              <div class="col-6 column">
                <div class="mb-5">
                  <div class="font-secondary text-sm">Position</div>
                  <div class="column  ">
                    <div
                      v-for="position in selectedEmployee.positions"
                      :key="position.id"
                    >
                      {{ position.name }}
                    </div>
                  </div>
                </div>

                <div class="mb-5">
                  <div class="font-secondary text-sm">Deparment/s</div>
                  <div class="column  ">
                    <div
                      v-for="department in selectedEmployee.departments"
                      :key="department.id"
                    >
                      {{ department.name }}
                    </div>
                  </div>
                </div>

                <LabelInput
                  :title="'Address'"
                  :titleClass="'font-secondary font-bold'"
                  :value="selectedEmployee.address"
                  :valueClass="'text-md  '"
                  :attribute="'address'"
                  @update="onUpdate"
                />

                <div class="mb-5">
                  <div class="font-secondary text-sm">Date Created:</div>
                  <div class="f ">
                    {{ formatTime(selectedEmployee.created_at) }}
                  </div>
                </div>
                <div class="mb-5">
                  <div class="font-secondary text-sm">Last Updated:</div>
                  <div class=" ">
                    {{ formatTime(selectedEmployee.updated_at) }}
                  </div>
                </div>

                <div class="mb-5">
                  <div class="font-secondary text-sm">Added By:</div>
                  <div class="font-bold ">
                    {{ selectedEmployee.user.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 p-2 pl-1">
        <div class="col-6 bg-surface rounded-lg h-40"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { useEmployeeStore } from "@/store/employee";
import { storeToRefs } from "pinia";
import router from "@/router";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { onMounted, ref } from "vue";
import DateTimeFormatter from "@/composables/DateTimeFormat";
import LabelInput from "@/components/LabelInput.vue";
import { usePositionStore } from "@/store/position";
import PhotoUpload from "@/components/PhotoUpload.vue";
//import moment from 'moment';

export default {
  components: { ConfirmDialog, LabelInput,PhotoUpload },
  setup() {
    const _employee = useEmployeeStore();
    const { selectedEmployee, errors } = storeToRefs(_employee);
    const _position = usePositionStore();
    const { positions } = storeToRefs(_position);

    const loading = ref(false);

    onMounted(() => {
      if (!selectedEmployee.value) {
        console.log("null");
        const id = router.currentRoute.value.params.id;
        _employee.get(id);
      }
    });

    console.log(selectedEmployee.value);

    return {
      selectedEmployee,
      _employee,
      positions,
      loading,
      errors,
      tab: ref("profile"),
      back: () => {
        router.go(-1);
      },
      onDelete: async () => {
        loading.value = true;
        const delayDuration = 500;
        await new Promise((resolve) => setTimeout(resolve, delayDuration));
        _employee.destroy();
        loading.value = false;
        router.go(-1);
      },
      formatTime(timestamp) {
        return new DateTimeFormatter(timestamp).format("MMM D, YYYY");
        //  return moment(timestamp).format("MMM D, YYYY");
      },
      onUpdate: (attribute, val) => {
        _employee.update(attribute, val);
      },

      upload:(val)=>{

        _employee.upload(val)
      }
    };
  },
};
</script>

<style>
</style>