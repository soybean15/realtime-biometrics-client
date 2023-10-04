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

 <PersistentDialog :width="'700px'">

    <template v-slot:open-button="{open}">
        <q-btn dense @click="open" size="1em" color="red" label="Resolve"/>
    
    </template>

    <template v-slot:title>
        <div class="p-5 text-lg font-semibold">Resolve Issue</div>
    </template>



    <template v-slot:content>
       <div class=" p-5">

            <div  v-for="item in issue" :key="item.key">
            
                <div  class="row justify-between item-center" v-if="item.key ==='no_time_out' || item.key ==='no_time_in'" >

                
                    <q-chip outline square :label="item.title" :color="getChipColor(item.key)"/>
                </div>

                <div v-else>
                    <q-chip outline square :label="item.title" :color="getChipColor(item.key)"/>
                </div>

                
            </div>

       </div>
    </template>



 </PersistentDialog>
</template>

<script>
import PersistentDialog from '@/components/PersistentDialog.vue';
import getChipColor from '@/composables/chipColor';
export default {
    components:{PersistentDialog},
    props:['issue'],
    setup(){


        return {

            getChipColor
        }
    }

}
</script>

<style>

</style>