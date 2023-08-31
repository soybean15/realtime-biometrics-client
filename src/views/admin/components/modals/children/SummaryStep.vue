<template>
 
    <div class="row">

        <div class="column col-6">
            <div class="text-semibold font-secondary">FirstName:</div>
            <div>{{set(employeeForm.firstname)}}</div>
            <div class="text-semibold font-secondary">LastName:</div>
            <div>{{set(employeeForm.lastname)}}</div>
            <div class="text-semibold font-secondary">MiddleName:</div>
            <div>{{set(employeeForm.middlename)}}</div>
            <div class="text-semibold font-secondary">BirthDate:</div>
            <div>{{set(employeeForm.birthdate)}}</div>
            <div class="text-semibold font-secondary">Gender:</div>
            <div>{{set(employeeForm.gender)}}</div>
            



        </div>
        <div class="col-6">
     
            <div class="text-semibold font-secondary">Contact Number:</div>
            <div>{{set(employeeForm.contact_number)}}</div>
            <div class="text-semibold font-secondary">Email:</div>
            <div>{{set(employeeForm.email)}}</div>

            <div class="text-semibold font-secondary">Department/s:</div>
            <div class="flex flex-wrap">
                <div v-for="department in selectedDepartments" :key="department.id">
                    <q-chip dense >{{department.name}}</q-chip>
                </div>
                
            </div>

            <div class="text-semibold font-secondary">Positions/s:</div>
            <div>
                <div v-for="position in selectedPositions" :key="position.id">
                    <q-chip dense >{{position.name}}</q-chip>
                </div>
                
            </div>

        </div>

        <div>
            <div class="text-semibold font-secondary">Address:</div>
            <div>{{set(employeeForm.address)}}</div>
        </div>

    </div>
  
</template>

<script>
import { useEmployeeStore } from '@/store/employee';
import { useDepartmentStore } from '@/store/department';
import { usePositionStore } from '@/store/position';
import { storeToRefs } from 'pinia';
export default {

    setup(){
        const employee = useEmployeeStore()
        const department = useDepartmentStore()
        const position = usePositionStore()

        const {employeeForm} = storeToRefs(employee)
        const {selectedDepartments} = storeToRefs(department)
        const {selectedPositions} = storeToRefs(position)

        console.log(selectedDepartments.value)
        employeeForm.value.departments = selectedDepartments.value
        employeeForm.value.positions = selectedPositions.value

        return {
            employeeForm,
            selectedDepartments,
            selectedPositions,
            set:(str)=>{
                if(str==null || str.replace(/ /g, '').length === 0){
                    return 'N/A';
                }else return str
            }
        }

    }

}
</script>

<style>

</style>