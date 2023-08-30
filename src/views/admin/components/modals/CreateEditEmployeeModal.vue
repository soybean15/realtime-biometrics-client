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
        title="Select Position"
     
        icon="create_new_folder"
        :done="step > 2"
      >

      <PositionStep/>
       
    
      </q-step>
      <q-step
        :name="3"
        title="Select Department"
     
        icon="create_new_folder"
        :done="step > 3"
      >

      <DepartmentStep/>
       
    
      </q-step>


      <q-step
        :name="4"
        title="Create an ad"
        icon="add_comment"
      >
        Try out different ad text to see what brings in the most customers, and learn how to
        enhance your ads using features like ad extensions. If you run into any problems with
        your ads, find out how to tell if they're running and how to resolve approval issues.
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="step === 4 ?onSubmit : $refs.stepper.next()" color="deep-orange" :label="step === 4 ? 'Finish' : 'Continue'" />
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
import PositionStep from "./children/PositionStep.vue";
import DepartmentStep from "./children/DepartmentStep.vue";
import { ref } from "vue";


export default {
  components: {
    PersistentDialog,
    EmployeeForm,
    PositionStep,
    DepartmentStep
    
  },
  props: ["title"],
  setup() {
 
  

    return {
   
      step: ref(1)
    };
  },
};
</script>

<style>
</style>