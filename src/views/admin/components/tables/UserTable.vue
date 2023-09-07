<template>
  <DataTable :title="'Users'" :rows="users.data" :columns="columns"
  :cells="['actions']"
  :pagination="{max:users.last_page, max_pages:6 }"
  v-if="users">

    <template v-slot:top>
     <SearchBar/>
        
    </template>

    <template v-slot:actions="{props}">
      <q-td :props="props">

        <ConfirmDialog >
          <template v-slot:open-button="{open}">
          
            <q-btn :color="props.row.enable?'primary':'blue-grey-7'" :label="props.row.enable ? 'Disable' : 'Enable' " @click="open"></q-btn>
          </template>

        </ConfirmDialog>
      
        
      </q-td>
    </template>
</DataTable>
 
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import { useAuthStore } from '@/store/auth'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'




const columns = [
    {
      name: 'name',
      required: true,
      label: 'Name',
      align: 'left',
      field: row => row.name,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'email',
      required: true,
      label: 'Email',
      align: 'left',
      field: row => row.name,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'actions',
      required: true,
      label: 'Actions',
      align: 'center',

    },
    
  ]




export default {
    components:{
        DataTable,
        SearchBar,
        ConfirmDialog
    },
    setup(){

        const store = useAuthStore()

        const {users} = storeToRefs(store)

        

        onMounted(()=>{
            store.getUsers()
        })


         

        return{
            users,
            columns,
            
        }
    }

}
</script>

<style>

</style>