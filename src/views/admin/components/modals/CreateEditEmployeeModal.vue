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

      <EmployeeForm/>
       
      
      </q-step>

      <q-step
        :name="2"
        title="Position and Department"
     
        icon="create_new_folder"
        :done="step > 2"
      >

    <PositionAndDepartmentStep/>
       
    
      </q-step>
    


      <q-step
        :name="3"
        title="Summary"
        icon="add_comment"
      >
       <SummaryStep/>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>

          <!-- step===2 ? !_position || !_department <--this line disables the button if department or position is null -->
          <q-btn :disable="step===2 ? !_position || !_department : false" @click="step ===3? onSubmit() : $refs.stepper.next()" color="deep-orange" :label="step === 3 ? 'Finish' : 'Continue'" />
          <q-btn v-if="step > 1" flat color="deep-orange" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>
    </q-stepper>



    </template>
  </PersistentDialog>
</template>

<script>
import PersistentDialog from "@/components/PersistentDialog.vue";
import EmployeeForm from '@/views/admin/components/modals/children/EmployeeForm.vue'
import PositionAndDepartmentStep from "./children/PositionAndDepartmentStep.vue";

import SummaryStep from "./children/SummaryStep.vue";
import { ref } from "vue";
import { useEmployeeStore } from "@/store/employee";
import { usePositionStore } from "@/store/position";

import { storeToRefs } from 'pinia';
import { useDepartmentStore } from '@/store/department';

export default {
  components: {
    PersistentDialog,
    EmployeeForm,
    SummaryStep,
    PositionAndDepartmentStep
    
  },
  props: ["title"],
  setup() {
 
    const store =useEmployeeStore()
    const positionsStore = usePositionStore()
    const departmentStore = useDepartmentStore()

    const {_position} = storeToRefs(positionsStore)
    const {_department} =storeToRefs(departmentStore)

    return {
   
      step: ref(1),
      _position,
      _department,
      onSubmit:()=>{

        
        store.add()
      }
    };
  },
};
</script>

<style>
</style>