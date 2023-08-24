<template>
  <DataTable :title="'Users'" :rows="rows" :columns="columns"/>
  {{ users }}
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'




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
    
  ]

  const rows = [
   { "id": 1, "name": "Miguel Gorczany III", "email": "mparker@example.org", "email_verified_at": "2023-08-23T10:46:34.000000Z", "two_factor_secret": null, "two_factor_recovery_codes": null, "two_factor_confirmed_at": null, "created_at": "2023-08-23T10:46:34.000000Z", "updated_at": "2023-08-23T10:46:34.000000Z", "roles": [], "admin": false }, 
  ]

  


export default {
    components:{
        DataTable
    },
    setup(){

        const store = useUserStore()

        const {users} = storeToRefs(store)

        

        onMounted(()=>{
            store.getUsers()
        })


         

        return{
            users,
            columns,
            rows
        }
    }

}
</script>

<style>

</style>