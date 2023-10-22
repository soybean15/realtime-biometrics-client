<template>
  <DataTable>

    <template v-slot:top>

        

    </template>

  </DataTable>


</template>

<script>
import DataTable from '@/components/DataTable.vue'

import { useReportStore } from '@/store/report'
import { onMounted } from 'vue'

export default {
    components:{DataTable},
    setup(){
        const reportStore = useReportStore()

        onMounted(()=>{
            reportStore.getReportByDate()

        })

    }

}
</script>

<style>

</style>