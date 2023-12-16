<template>
  <persistent-dialog>

    <template #open-button="{open}">

        <slot name="open-button" :open="open" ></slot>
    
    
    </template>

    <template #title>

        Absents
    </template>
    <template #content>
       <div>
            <ul>
                <li v-for="item in employees" :key="item.id">
                    <div class="p-2  items-center row">

                        <q-avatar >

                            <img :src="item.image"/>
                        </q-avatar>
                        <div class="px-3"> 

                            {{ item.full_name }}
                        </div>

                    </div>
                    
                </li>

            </ul>

       </div>

</template>

  </persistent-dialog>
</template>

<script>
import PersistentDialog from './PersistentDialog.vue'
export default {
  components: { PersistentDialog },
  props:['employees']

}
</script>

<style>

</style>