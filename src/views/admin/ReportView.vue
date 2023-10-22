<template> 
  <div class="row py-3">
    <report-side-panel class=" col-3"/>

    <report-container class="col-9"/>




  </div>
</template>

<script>
import ReportContainer from './components/ReportContainer.vue'
import ReportSidePanel from './components/ReportSidePanel.vue'


export default {
  components:{ReportSidePanel,ReportContainer}

}
</script>

<style>

</style>