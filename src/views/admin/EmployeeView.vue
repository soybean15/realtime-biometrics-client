<template>
  <EmployeeTable />
</template>
    
    <script>
import EmployeeTable from "./components/tables/EmployeeTable.vue";
import { useDepartmentStore } from "@/store/department";
import { usePositionStore } from "@/store/position";
import { onMounted } from 'vue';



export default {
  components: {
    EmployeeTable,
  },
  setup() {
    const positionStore = usePositionStore()
    const deparmentStore = useDepartmentStore()

    onMounted(()=>{
      positionStore.index()
      deparmentStore.index()

    })

  },
};
</script>
    
    <style>
</style>