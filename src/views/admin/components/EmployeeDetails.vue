<template>
  <div class="row p-2 items-center justify-between">
    <div class="row items-center cursor-pointer">
      <q-icon @click="back" size="1.5rem" name="arrow_back"></q-icon>
      <span class="text-md"> Employee Details</span>
    </div>

    <div>
      <span class="bg-surface">{{ selectedEmployee.created_at }}</span>
      <q-btn outline label="delete" color="red"></q-btn>
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
              <q-avatar size="120px" rounded>
                <img :src="selectedEmployee.image" />
              </q-avatar>
              <span class="p-2 pb-0 font-semibold">{{
                selectedEmployee.full_name
              }}</span>
              <span
                class="bg-gray-800 text-white text-sm font-bold p-1 rounded-md"
                >{{ `ID: ${selectedEmployee.employee_id}` }}</span
              >

              <div class="self-start p-3 m-2">
                <div class="font-secondary text-sm">Email</div>
                <div class="text-md font-bold font-primary">{{ selectedEmployee.email }}</div>
                <div class="font-secondary text-sm ">
                  Contact Number
                </div>
                <div class="text-md  font-bold font-primary">{{ selectedEmployee.contact_number }}</div>
                <div class="font-secondary text-sm">Birth Date</div>
                <div class="text-md  font-bold font-primary">{{ selectedEmployee.birthdate }}</div>
                <div class="font-secondary text-sm">Gender</div>
                <div class="text-md  font-bold font-primary">{{ selectedEmployee.gender }}</div>
              </div>
            </div>

            <div class="col-6  column">
              <div class="mb-5">
                <div class="font-secondary text-sm">Position</div>
                <div class="column  font-bold font-primary">
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
                <div class="column  font-bold font-primary">
                  <div
                    v-for="department in selectedEmployee.departments"
                    :key="department.id"
                  >
                    {{ department.name }}
                  </div>
                </div>
              </div>
              <div class="mb-5">
                <div class="font-secondary text-sm">Address</div>
                <div class="  font-bold font-primary">
                  {{ selectedEmployee.address }}
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
</template>

<script>
import { useEmployeeStore } from "@/store/employee";
import { storeToRefs } from "pinia";
import router from "@/router";
import { ref } from "vue";

export default {
  setup() {
    const _employee = useEmployeeStore();
    const { selectedEmployee } = storeToRefs(_employee);

    return {
      selectedEmployee,
      tab: ref("profile"),
      back: () => {
        router.go(-1);
      },
    };
  },
};
</script>

<style>
</style>