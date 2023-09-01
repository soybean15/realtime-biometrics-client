<template>
  <DataTable
    :rows="data['employees'].data"
    :columns="columns"
    :cells="['contacts', 'actions', 'image']"
    @onChangePage="onChangePage"
    :pagination="{max:data['employees'].last_page, max_pages:6 }"
    v-if="data['employees']"
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
      <q-td   :props="props">
        
          <q-btn
            dense
            :to="{ name: 'employeeDetails', params: { id: props.row.id } }"
            class="w-28 text-xs"
            color="primary"
            glossy
            @click="store.selectEmployee(props.row)"
            text-color="white"
            push
            label="View Details"
            icon="preview"
          />
  
        
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

    const { data } = storeToRefs(store);

    const loading = ref([])

    onMounted(() => {
      store.getEmployees();
    });

    return {
      columns,
      data,
      store,
      loading,
      onDelete:async(employee_id)=>{

        loading.value[employee_id] = true
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await store.destroy(employee_id)   
        loading.value[employee_id]= false
      },

      onChangePage:(page)=>{
        console.log(data.value['employees'].links[page].url)
        console.log(page)

        let name = 'employees'

        store.paginate(name,data.value[name].links[page].url)
      }
    };
  },
};
</script>
  
  <style>
</style>