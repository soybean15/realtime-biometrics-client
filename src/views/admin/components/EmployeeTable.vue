<template>
  <DataTable
    :title="'Employee'"
    :rows="employees.data"
    :columns="columns"
    :cells="['contacts', 'actions','image']"
    v-if="employees"
  >

  <template v-slot:image="{props}">
    <q-td :props="props">
      <q-avatar>
      <img :src="props.row.image">
    </q-avatar>
    </q-td>
  </template>
    <template v-slot:contacts="{ props }">
      <q-td :props="props">
        <div class="row bg-transparent justify-center">
          <q-icon
            name="mail"
            color="grey-9"
            class="mx-1 cursor-pointer"
            size="1.5rem"
          >
            <q-tooltip anchor="top middle" self="top middle">
            {{props.row.email}}
            </q-tooltip>
          </q-icon>
          <q-icon
            name="call"
            color="grey-9"
            class="mx-1 cursor-pointer"
            size="1.5rem"
          >
        
          <q-tooltip anchor="top middle" self="top middle">
            {{props.row.contact_number}}
            </q-tooltip>
        </q-icon>
        </div>
      </q-td>
    </template>
    <template v-slot:actions="{ props }">
      <q-td :props="props">
      
    <q-btn-group push>
      <q-btn dense class="w-20 text-xs " color="primary" glossy text-color="white" push label="Edit" icon="edit" />
      <q-btn dense class="w-20 text-xs" color="red" glossy text-color="white" push label="Delete" icon="delete" />
      
    </q-btn-group>
      </q-td>
    </template>

    <template v-slot:top-right>

        <q-btn color="primary" label="Create"  dense class="mr-3" icon-right="add_circle"/>
      <SearchBar />
    </template>
  </DataTable>
</template>
  
  <script>
import DataTable from "@/components/DataTable.vue";

import { useEmployeeStore } from "@/store/employee";
import SearchBar from "@/components/SearchBar.vue";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

const columns = [
{
    name: "image",
    required: true,
    label: "",
    align: "center",
  },
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
    name: "contacts",
    required: true,
    label: "Contacts",
    align: "center",
  },
  {
    name: "address",
    required: true,
    label: "Address",
    align: "left",
    field: (row) => row.address,
    format: (val) => `${val}`,
  },
  {
    name: "actions",
    required: true,
    label: "Actions",
    align: "center",
  },
];

export default {
  components: {
    DataTable,
    SearchBar,
  },
  setup() {
    const store = useEmployeeStore();

    const { employees } = storeToRefs(store);

    onMounted(() => {
      store.getEmployees();
    });

    return {
      columns,
      employees,
    };
  },
};
</script>
  
  <style>
</style>