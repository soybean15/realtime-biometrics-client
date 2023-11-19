<template>
  <div>
    <q-list
      class="bg-surface rounded-md"
      style="max-width: 600px"
      v-if="descrepancy"
    >
      <q-item-label header>
        Summary
        <div class="row items-center">
          <span class="mr-4"> Filter </span>
          <q-btn
            @click="filter('all')"
            flat
            class="mx-1"
            dense
            :color="active === 'all' ? 'primary' : ''"
            label="All"
          />
          <q-btn
            @click="filter('lates')"
            flat
            class="mx-1"
            dense
            :color="active === 'lates' ? 'primary' : ''"
            label="Lates"
          />
          <q-btn
            @click="filter('half_day')"
            flat
            class="mx-1"
            dense
            :color="active === 'half_day' ? 'primary' : ''"
            label="Half Day"
          />
          <q-btn
            @click="filter('no_time_in')"
            flat
            class="mx-1"
            dense
            :color="active === 'no_time_in' ? 'primary' : ''"
            label="No time in"
          />
          <q-btn
            @click="filter('no_time_out')"
            flat
            class="mx-1"
            dense
            :color="active === 'no_time_out' ? 'primary' : ''"
            label="No time out"
          />
        </div>
      </q-item-label>

      <q-item v-for="item in computedData" :key="item.id">
        <q-item-section avatar top>
          <q-avatar size="4em">
            <img :src="item.employee.image" />
          </q-avatar>
        </q-item-section>

        <q-item-section top>
          <q-item-label lines="1">
            <span class="text-weight-medium">{{
              item.employee.full_name
            }}</span>
            <q-chip :color="getStatus(item).color">
              {{ getStatus(item).label }}</q-chip
            >
          </q-item-label>
          <q-item-label caption lines="1">
            @rstoenescu in #3: > Generic type parameter for props
          </q-item-label>
          <q-item-label
            lines="1"
            class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase"
          >
            <q-btn
              dense
              :to="{
                name: 'employeeDetails',
                params: { id: item.employee.id },
              }"
              flat
              color="primary"
              label="View Profile"
            />
          </q-item-label>
        </q-item-section>

        <q-item-section top side v-if="!item.is_resolve">
          <div class="text-grey-8 q-gutter-xs">
            <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
            <q-btn  @click="resolve(getStatus(item).label, item)" class="gt-xs" size="12px" flat dense round icon="done" />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
  <resolve-modal/>
</template>

<script>
import { useDashboardStore } from "@/store/dashboard";
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import getChipColor from "@/composables/chipColor";
import {useResolveStore} from '@/store/resolve'

import ResolveModal from './modals/ResolveModal.vue';
export default {
  components:{ResolveModal},
  setup() {
    const dashboardStore = useDashboardStore();

    const { descrepancy } = storeToRefs(dashboardStore);
    const resolveStore = useResolveStore()
    const {row,dialog,status,title} = storeToRefs(resolveStore)

    const active = ref("all");
    onMounted(() => {
      dashboardStore.getDescrepancy();
    });

    const computedData = computed(() => {
      return descrepancy.value.filter((item) => {
        if (active.value === "all") {
          return true; // No filtering needed when 'all' is selected
        } else if (active.value === "lates") {
          return item.late
        } else if (active.value === "half_day") {
          return item.half_day_in|| item.half_day_out;
        } else if (active.value === "no_time_in") {
          return item.no_time_in 
        } else if (active.value === "no_time_out") {
          return item.no_time_out 
        } else {
          // Handle other cases or return false for unknown values
          return false;
        }
      });
    });

    return {
      descrepancy,
      computedData,
      active,
      getStatus: (item) => {
        if (item.half_day_in ) {
          return {
            label: "Half Day(in)",
            color: getChipColor("half_day_in"),
          };
        }
        if (item.half_day_out) {
          return {
            label: "Half Day(out)",
            color: getChipColor("half_day_out"),
          };
        }
        if (item.no_time_in) {
          return {
            label: "No Time in",
            color: getChipColor("no_time_in"),
          };
        }
        if (item.no_time_out) {
          return {
            label: "No Time out",
            color: getChipColor("no_time_out"),
          };
        }
        if (item.late) {
          return {
            label: "Late",
            color: getChipColor("late"),
          };
        }
      },
      filter: (val) => {
        active.value = val;
      },
      resolve:(val, _row)=>{

       let type = ''

        switch(val){
          case'Half Day(in)':{
            type = 'half_day_in'
            break
          }
          case'Half Day(out)':{
            type ='half_day_out'
            break
          }
          case'No Time in':{
            type = 'no_time_in'
            break
          }
          case'No Time out':{
            type = 'no_time_out'
            break
          }
        }

        dialog.value = true
        status.value = type
        title.value = val
        row.value= _row

      }
    };
  },
};
</script>

<style>
</style>