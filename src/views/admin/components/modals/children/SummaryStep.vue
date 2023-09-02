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
                {{ _department.name }}
                
            </div>

            <div class="text-semibold font-secondary">Positions/s:</div>
            <div>
               {{ _position.name }}
                
            </div>
            <div class="text-semibold font-secondary">User:</div>
            <div>
               {{ employeeForm.user_id }}
                
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
        const {_department} = storeToRefs(department)
        const {_position} = storeToRefs(position)


        employeeForm.value.department_id = _department.value.id
        employeeForm.value.position_id = _position.value.id

        return {
            employeeForm,
            _department,
            _position,
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