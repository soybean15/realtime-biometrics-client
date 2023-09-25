<template>
  <PersistentDialog :width="'800px'">
    <template v-slot:open-button="{ open }">
      <q-btn
        color="secondary"
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

    <template v-slot:content="{ close }">
      <q-stepper
        v-model="step"
        ref="stepper"
        animated
        alternative-labels
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
          <EmployeeForm />
        </q-step>

        <q-step
          :name="2"
          title="Position and Department"
          icon="create_new_folder"
          :done="step > 2"
        >
          <PositionAndDepartmentStep />
        </q-step>

        <q-step :name="3" title="Summary" icon="add_comment">
          <SummaryStep />
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <!-- step===2 ? !_position || !_department <--this line disables the button if department or position is null -->
            <q-btn
              :loading="loading"
              :disable="step === 2 ? !position || !department : false"
              @click="step === 3 ? onSubmit(close) : $refs.stepper.next()"
              color="secondary"
              :label="step === 3 ? 'Finish' : 'Continue'"
            />
            <q-btn
              v-if="step > 1"
              flat
              color="secondary"
              @click="$refs.stepper.previous()"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </template>
  </PersistentDialog>
  <!-- -->
  <MessageDialog :title="'Employee Added'" :isOpen="true"  v-if="selectedEmployee && messageDialog">
    <template v-slot:body >

      <q-separator />
      <div class="row mt-3">

        <div class="col-8">
          <div>
            <span class="font-bold pr-1 font-secondary">Employee Id :</span>
            <span class="font-bold">{{selectedEmployee.employee_id}}</span>
          </div>
          <div>
            <span class="font-bold pr-1 font-secondary">Name :</span>
            <span class="font-bold">{{selectedEmployee.full_name}}</span>
          </div>
  
          <div>
            <span class="font-bold pr-1 font-secondary">Department :</span>
            <span class="font-bold" v-for="item in selectedEmployee.departments" :key="item.id">{{ item.name }}</span>
          </div>
          <div>
            <span class="font-bold pr-1 font-secondary">Position :</span>
            <span class="font-bold" v-for="item in selectedEmployee.positions" :key="item.id">{{ item.name }}</span>
          </div>
        </div>

        <div class="col-4 column items-center">
          <q-chip size="md" text-color="white" color="primary"> Biometrics ID </q-chip>

          <div class="text-4xl font-bold">{{selectedEmployee.biometrics_id}}</div>
        </div>
      </div>
    </template>
  </MessageDialog>
</template>

<script>
import PersistentDialog from "@/components/PersistentDialog.vue";
import EmployeeForm from "@/views/admin/components/modals/children/EmployeeForm.vue";
import PositionAndDepartmentStep from "./children/PositionAndDepartmentStep.vue";

import MessageDialog from "@/components/MessageDialog.vue";
import SummaryStep from "./children/SummaryStep.vue";
import { ref } from "vue";
import { useEmployeeStore } from "@/store/employee";
import { usePositionStore } from "@/store/position";

import { storeToRefs } from "pinia";
import { useDepartmentStore } from "@/store/department";

export default {
  components: {
    PersistentDialog,
    EmployeeForm,
    SummaryStep,
    PositionAndDepartmentStep,
    MessageDialog,
  },
  props: ["title"],
  setup() {
    const store = useEmployeeStore();
    const positionsStore = usePositionStore();
    const departmentStore = useDepartmentStore();

    const { position } = storeToRefs(positionsStore);
    const { selectedEmployee } = storeToRefs(store);
    const { department } = storeToRefs(departmentStore);

    const loading = ref(false);

    const messageDialog = ref(false);

    return {
      step: ref(1),
      position,
      department,
      loading,
      messageDialog,
      selectedEmployee,
      onSubmit: async (close) => {
        loading.value = true;

        await store.add();

        loading.value = false;
        confirm.value = true;
        close();

        messageDialog.value = true;
      },
    };
  },
};
</script>

<style>
</style>