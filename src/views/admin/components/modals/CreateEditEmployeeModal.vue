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

      <EmployeeForm/>
       
      
      </q-step>

      <q-step
        :name="2"
        title="Job Detail"
     
        icon="create_new_folder"
        :done="step > 2"
      >
       
      <JobDetails/>


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
import EmployeeForm from '@/views/admin/components/modals/children/EmployeeForm.vue'
import JobDetails from './children/JobDetailForm.vue'
import { ref } from "vue";


export default {
  components: {
    PersistentDialog,
    EmployeeForm,
    JobDetails
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