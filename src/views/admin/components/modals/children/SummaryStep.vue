<template>
 
    <div class="row">

        <div class="column col-6">
            <div class="text-semibold"></div>



        </div>
        <div class="col-6"></div>

    </div>
  
</template>

<script>
import { useEmployeeStore } from '@/store/employee';
import { storeToRefs } from 'pinia';
export default {

    setup(){
        const employee = useEmployeeStore()

        const {employeeForm} = storeToRefs(employee)

        return {
            employeeForm
        }

    }

}
</script>

<style>

</style>