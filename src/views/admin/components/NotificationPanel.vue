<template>
  <div>
  
   


    <q-list  class="bg-surface rounded-md" style="max-width: 600px" v-if="descrepancy">
      <q-item-label header>Summary</q-item-label>

      <q-item  v-for="item in descrepancy" :key="item.id">
        <q-item-section avatar top>
            <q-avatar size="4em">
            <img :src="item.employee.image">
          </q-avatar>
        </q-item-section>


        <q-item-section top>
          <q-item-label lines="1">
            <span class="text-weight-medium">{{item.employee.full_name}}</span>
            <q-chip  :color="getStatus(item).color"> {{getStatus(item).label}}</q-chip>
          </q-item-label>
          <q-item-label caption lines="1">
            @rstoenescu in #3: > Generic type parameter for props
          </q-item-label>
          <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
        <q-btn dense :to="{ name: 'employeeDetails', params: { id: item.employee.id } }" flat color="primary" label="View Profile"/>
          </q-item-label>
        </q-item-section>

        <q-item-section top side v-if="!item.is_resolve">
          <div class="text-grey-8 q-gutter-xs">
            <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
            <q-btn class="gt-xs" size="12px" flat dense round icon="done" />
           
          </div>
        </q-item-section>
      </q-item>

    
    </q-list>

  </div>
</template>

<script>
import { useDashboardStore } from '@/store/dashboard'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import getChipColor from '@/composables/chipColor'
export default {
    setup(){
        const dashboardStore = useDashboardStore()

        const {descrepancy} = storeToRefs(dashboardStore)
        onMounted(()=>{
            dashboardStore.getDescrepancy()
        })

        return{
            descrepancy,
            getStatus:(item)=>{
                if(item.half_day_in || item.half_day_out){
                    return{
                         label:'Half Day',
                         color:getChipColor('half_day_out')
                        }
                }
                if(item.no_time_in){
                    return{
                         label:'No Time in',
                         color:getChipColor('no_time_in')
                        }
                }
                if(item.no_time_out){
                    return{
                         label:'No Time out',
                         color:getChipColor('no_time_out')
                        }
                }
                if(item.late){
                    return{
                         label:'Late',
                         color:getChipColor('late')
                        }

                }
            }
        }
    }
}
</script>

<style>

</style>