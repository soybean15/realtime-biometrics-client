<template>
  <DataTable
    :rows="data['employees'].data"
    :columns="columns"
    :cells="['employee_id','fullname','contacts', 'actions', 'image','position','department']"
    @onChangePage="onChangePage"
    :pagination="{max:data['employees'].last_page, max_pages:6 }"
    v-if="data['employees']"
  >
    <!-- <template v-slot:image="{ props }">
      <q-td :props="props">
       
      </q-td>
    </template> -->


    <template v-slot:employee_id="{props}">
      <q-td :props="props">

        <div class="column">
          <span>
            <span class="font-bold mr-1"> ID:</span>
            <span>{{ props.row.employee_id }}</span>
          </span>
          <span>
            <span class="font-bold mr-1">BID:</span>
            <span class="font-secondary">{{ props.row.biometrics_id }}</span>
          </span>
        </div>

    

      </q-td>
    </template>
    <template v-slot:fullname="{props}">
      <q-td :props="props">

        <div class="row items-center w-fit">
          <q-avatar>
          <img :src="props.row.image" />
        </q-avatar>

        <div class="text-md px-2">{{ props.row.full_name }}</div>
        </div>

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

    <template v-slot:position="{props}">
      <q-td :props="props">

        <q-chip size="md"  v-for="position in props.row.positions" :key="position.id">
        {{ position.name }}
      </q-chip>

      
      </q-td>
  
    </template>



    <template v-slot:department="{props}">
      <q-td :props="props">

        <div >
              <q-chip size="md"  v-for="department in props.row.departments" :key="department.id">
        {{ department.name }}
      </q-chip>

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
    name: "employee_id",
    required: true,
    label: " ID",
    align: "left",
    field: (row) => row.employee_id,
    // format: (val) => `${val}`,
    //  sortable: true,
  },
  {
    name: "fullname",
    required: true,
    label: "Employee Name",
    align: "left",
     field: (row) => row.full_name,
    // format: (row) =>
    //   `${row.lastname}, ${row.firstname} ${
    //     row.middlename ? row.middlename[0] : ""
    //   }.`,
     sortable: true,
  },
  {
    name: "contacts",
    required: true,
    label: "Contacts",
    align: "center",
  },
  {
    name: "position",
    required: true,
    label: "Position",
    align: "left",
  },
  {
    name: "department",
    required: true,
    label: "Department",
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