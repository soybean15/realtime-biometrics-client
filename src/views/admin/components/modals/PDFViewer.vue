<template>
  <!-- 
  #slots : 
    -title
    -content
    -open-button
  #props :
    -width  // default 300px
    -maxWidth // default 80vh
    -backgroundColor
 -->

  <PersistentDialog :width="'100%'">
    <template v-slot:title>
      <div class="row items-center justify-between">
        <span class="text-lg font-bold">{{ title }}</span>

        <q-btn @click="downloadBlob" color="secondary" label="Download" />
      </div>

      <!-- <q-btn @click="attendanceStore.generatePDF('download')" color="secondary" label="Download"/> -->
    </template>
    <template v-slot:open-button="{ open }">
      <q-btn @click="open" color="secondary" label="Print" />
    </template>

    <template v-slot:content>
      <iframe :src="pdfFile" width="100%" height="500" frameborder="0"></iframe>
    </template>
  </PersistentDialog>
</template>

<script>
import PersistentDialog from "@/components/PersistentDialog.vue";
import { useAttendanceStore } from "@/store/attendance";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

export default {
  props: ["title"],
  components: { PersistentDialog },
  setup() {
    const attendanceStore = useAttendanceStore();
    const { pdfFile } = storeToRefs(attendanceStore);

    onMounted(() => {
      attendanceStore.generatePDF("stream");
    });

    return {
      pdfFile,
      attendanceStore,
      downloadBlob: async () => {
        // const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = pdfFile.value;
        a.download = "my_blob.pdf"; // Specify the desired filename
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL([[...pdfFile.value]]);

     
      },
    };
  },
};
</script>

<style>
</style>