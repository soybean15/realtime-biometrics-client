<template>
  <DataTable>

    <template v-slot:top>

      <div class="row">
        <span class="text-lg font-bold" v-if="report">

          {{`${formatTime(report.date, 'MMMM Do')} Report`}}

          

        </span>

      </div>

        

    </template>

  </DataTable>

{{report}}
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import {useReportStore} from '@/store/report'
import { storeToRefs } from 'pinia'
import formatTime from '@/composables/DateTimeFormat'

export default {
    components:{DataTable},
    setup(){

      const reportStore = useReportStore()

      const {report } = storeToRefs(reportStore)


      return {
        report,
        formatTime
      }

    }

}
</script>

<style>

</style>