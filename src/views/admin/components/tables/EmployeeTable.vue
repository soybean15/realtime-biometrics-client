<template>
  <DataTable
    :rows="employees.data"
    :columns="columns"
    :cells="['contacts', 'actions', 'image']"
    v-if="employees"
  >
    <template v-slot:image="{ props }">
      <q-td :props="props">
        <q-avatar>
          <img :src="props.row.image" />
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
              {{ props.row.email }}
            </q-tooltip>
          </q-icon>
          <q-icon
            name="call"
            color="grey-9"
            class="mx-1 cursor-pointer"
            size="1.5rem"
          >
            <q-tooltip anchor="top middle" self="top middle">
              {{ props.row.contact_number }}
            </q-tooltip>
          </q-icon>
        </div>
      </q-td>
    </template>
    <template v-slot:actions="{ props }">
      <q-td :props="props">
        <q-btn-group push>
          <q-btn
            dense
            class="w-20 text-xs"
            color="primary"
            glossy
            text-color="white"
            push
            label="Edit"
            icon="edit"
          />
          <q-btn
            dense
            class="w-20 text-xs"
            color="red"
            glossy
            :loading="loading[props.row.id]"
            @click="onDelete(props.row.id)"
            text-color="white"
            push
            label="Delete"
            icon="delete"
          />
        </q-btn-group>
      </q-td>
    </template>

    <template v-slot:top>
      <div class="col-1 q-table__title">Employees</div>

      <SearchBar class="col-9 px-2" />

      <div class="row">
        <CreateEditEmployeeModal :title="'Add New Employees'">
          
        </CreateEditEmployeeModal>
        <ArchiveModal />
      </div>
    </template>

  </DataTable>
</template>
  
  <script>
import DataTable from "@/components/DataTable.vue";
import CreateEditEmployeeModal from "../modals/CreateEditEmployeeModal.vue";
import ArchiveModal from "../modals/ArchiveModal.vue";
import { useEmployeeStore } from "@/store/employee";
import SearchBar from "@/components/SearchBar.vue";
import { onMounted, ref } from "vue";
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
    CreateEditEmployeeModal,
    ArchiveModal
  },
  setup() {
    const store = useEmployeeStore();

    const { employees } = storeToRefs(store);

    const loading = ref([])

    onMounted(() => {
      store.getEmployees();
    });

    return {
      columns,
      employees,
      store,
      loading,
      onDelete:async(employee_id)=>{

        loading.value[employee_id] = true
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await store.destroy(employee_id)
      
        loading.value[employee_id]= false
      }
    };
  },
};
</script>
  
  <style>
</style>