<template>
    <DataTable
      :rows="departments.data"
      :columns="columns"
      :cells="[
        'name',
        'action',
      ]"
     
    >
      <!-- <template v-slot:image="{ props }">
        <q-td :props="props">
         
        </q-td>
      </template> -->
  
      <template v-slot:name="{ props }">
                <q-td :props="props">
                    <!-- <q-tooltip  anchor="bottom start" self="center start" :offset="[-10,10]">
                        Click to Edit
                    </q-tooltip> -->
                    <div>
                    {{ props.row.name }}
                    <!-- <q-popup-edit
                        @update:model-value="onUpdate(props.row.id, 'name', $event)"
                        v-model="props.row.name"
                        v-slot="scope"
                    >
                        <q-input
                        v-model="scope.value"
                        dense
                        autofocus
                        counter
                        @keyup.enter="scope.set"
                        />
                    </q-popup-edit> -->
                    </div>
                </q-td>
            </template>
  
            <template v-slot:action="{props}">

                <q-td :props="props">

                    <ConfirmDialog>

                        <template v-slot:open-button="{open}">
                            <q-btn @click="open" round color="red" icon="delete" />
                    
                        </template>

                        <template v-slot:title>
                            <div class="font-bold text-lg "> Delete Department </div>

                        </template>
                        <template v-slot:message>
                            <div class=" text-md text-grey-9 my-5"> Are you sure you want to delete {{ props.row.name }}? </div>

                        </template>
                        <template v-slot:buttons="{close}">
                            <div class="row justify-end my-4">
                            <q-btn :loading="loading"  @click="onDelete(props.row.id,close)" class="mx-1" dense  color="red" label="Confirm" />
                            <q-btn   class="mx-1" @click="close" dense   color="secondary" label="Cancel" />
                            </div>
                        
                        </template>
                    </ConfirmDialog>
                    

                </q-td>
            </template>

            
   
    </DataTable>
  </template>
<script>
import DataTable from '@/components/DataTable.vue'
 import {useDepartmentStore} from '@/store/department'
 import { onMounted } from 'vue'
 import { storeToRefs } from 'pinia'
const columns = [
//   {
//     name: "employee_id",
//     required: true,
//     label: " ID",
//     align: "left",
//     field: (row) => row.employee_id,
//     // format: (val) => `${val}`,
//     //  sortable: true,
//   },
  
  {
     name: 'name',
     label: 'Name',
     field: row => row.name,
     required: true,
     align: 'left',
     sortable: true,
     format: (val) => `${val}`,
  
   },
   {
     name: 'action',
     label: 'Action',
     required: true,
     align: 'left',
  
   },

];

export default{
    components:{
        DataTable
    },

    setup(){

        const departmentStore = useDepartmentStore()
 
         
        const {departments} =storeToRefs(departmentStore)


            onMounted(()=>{
                departmentStore.getDepartments()
            });

        return{
            columns,
            departmentStore,
            departments
        }

    },
}
</script>