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
  <PersistentDialog :width="'600px'">

    <template v-slot:open-button="{open}">
        <q-btn @click="open" label="Add Event"  color="secondary" icon-right="edit_calendar"/> 
    </template>
    <template v-slot:title>
      <div>Add New Event</div>
    </template>

    <template v-slot:content>

        <div>
            <q-form>

                <q-input outlined dense label="Event Name"/>

                



            </q-form>
        </div>
    </template>
  </PersistentDialog>
</template>

<script>
import PersistentDialog from "@/components/PersistentDialog.vue";

export default {
  components: { PersistentDialog },
};
</script>

<style>
</style>