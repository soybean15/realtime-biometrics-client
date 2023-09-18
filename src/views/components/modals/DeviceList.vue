<template>
  <PersistentDialog :width="'600px'">
    <template v-slot:open-button="{ open }">
      <span @click="open">Devices</span>
    </template>

    <template v-slot:title >
        <div class="text-lg font-bold">Devices</div>
        
    </template>

    <template v-slot:content>
      <DataTable :columns="columns" :rows="zkDevices" :cells="['actions']">
    
        <template v-slot:actions="{props}">
            <q-td :props="props">
                <q-btn :loading="loading['ping']"  @click="zk.ping(props.row.ip_address)" color="secondary" label="Connect"></q-btn>    
                <q-btn   @click="zk.ping(props.row.id)" color="red" label="Delete"></q-btn>                  
            </q-td>
        </template>

        <template v-slot:top>

            <div class="row justify-end w-full">

                <AddNewDevice><q-btn color="primary" label="Add New"/></AddNewDevice>


            </div>

        </template>
    </DataTable>
    </template>
  </PersistentDialog>
</template>

<script>
import PersistentDialog from "@/components/PersistentDialog.vue";
import DataTable from "@/components/DataTable.vue";
import { onMounted } from "vue";
import { useZkStore } from "@/store/ZkTeco";
import { storeToRefs } from "pinia";
import AddNewDevice from './AddNewDevice.vue';


const columns = [

{
    
    name: 'name',
    label: 'Device Name',
    field: row => row.name,
    required: true,
    align: 'left',
    sortable: true,
    sortOrder: 'ad', // or 'da'
    format: (val) => `${val}`,
    style: 'width: 200px',
    classes: 'my-special-class',
    headerStyle: 'width: 200px',
    headerClasses: 'my-special-class'
  },
  {
    name: 'ip_address',
    required: true,
    label: 'IP Address',
    align: 'center',
    field: row => row.ip_address,
    format: val => `${val}`,
    style: 'width: 100px',
  },
  {
    name: 'Port',
    required: true,
    label: 'IP Address',
    align: 'center',
    field: row => row.port,
    format: val => `${val}`,
    style: 'width: 80px',

  },
  {
    name: 'actions',
    required: true,
    label: 'Action',
    align: 'center',
    style: 'width: 80px',

  },
]

export default {



  components: {
    PersistentDialog,
    DataTable,
    AddNewDevice
  },
  setup() {
    const zk = useZkStore();

    const { zkDevices,loading } = storeToRefs(zk);
    onMounted(async () => {
      await zk.index();

      console.log(zkDevices.value)
    });

    return {
      zkDevices,
      columns,
      loading,
      zk
    };
  },
};
</script>

<style>
</style>