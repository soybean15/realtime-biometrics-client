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
    const position = usePositionStore()
    const deparment = useDepartmentStore()

    onMounted(()=>{
      position.getPositions()
      deparment.getDepartments()

    })

  },
};
</script>
    
    <style>
</style>