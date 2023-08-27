<template>
  <PersistentDialog :width="'900px'" :maxWidth="'90vh'">
    <template v-slot:open-button="{ open }">
      <q-btn
        color="primary"
        label="Archive"
        glossy
        @click="open"
        rounded
        class="mx-1"
        icon-right="archive"
        size=".7rem"
      />
    </template>

    <template v-slot:title> Archive </template>

    <template v-slot:content>
      <DataTable :columns="columns" :rows="trashed.data" :cells="['actions']">
        <template v-slot:top> Trash </template>

        <template v-slot:actions="{props}">

            <q-td :props="props">
                <div class="column items-end">
                    <span class="text-xs">{{props.row.deleted_at}}</span>
                    <q-btn
            dense
            class="text-xs w-28"
            color="primary"
            glossy  
            text-color="white"
            push
            label="Restore"
            icon="restore_from_trash"
          />
                </div>
            
            
            </q-td>
        
        </template>
      </DataTable>

     
    </template>
  </PersistentDialog>
</template>

<script>
import PersistentDialog from "@/components/PersistentDialog.vue";
import DataTable from "@/components/DataTable.vue";
import { useEmployeeStore } from "@/store/employee";
import { storeToRefs } from "pinia";

const columns = [
  {
    name: "fullName",
    required: true,
    label: "Full Name",
    align: "left",
    field: (row) => row,
    format: (row) =>
      `${row.lastname}, ${row.firstname} ${
        row.middlename ? row.middlename[0] : ""
      }.`,
    sortable: true,
  },
  {
    name:'actions',
    required: true,
    label: 'Actions',
    align: 'right'
  }
];
export default {
  components: {
    PersistentDialog,
    DataTable,
  },
  setup() {
    const store = useEmployeeStore();

    const { trashed } = storeToRefs(store);

    return {
      trashed,
      columns,
    };
  },
};
</script>

<style>
</style>