<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog
      v-model="dialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="" style="width: 400px; max-width: 80vh">
        <q-card-section>
          <div class="text-h6">{{ title }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row w-full  justify-between items-center">
            <span>Set Time </span>

            <q-input dense outlined v-model="time" mask="time" >
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time v-model="time">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="row w-full justify-end py-3">
            <q-btn @click="resolve" label="Submit" color="secondary"  />
        </div>

        {{row}}
          
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { useResolveStore } from "@/store/resolve";
import { storeToRefs } from "pinia";
import { ref, watchEffect } from "vue";
import { useAttendanceStore } from '@/store/attendance';
export default {
  setup() {
    const resolveStore = useResolveStore();
    const attendanceStore = useAttendanceStore()
    const { dialog, status, title, settings,row } = storeToRefs(resolveStore);
    const time = ref("8:00");

    watchEffect(() => {
      if (status.value) {
        switch (status.value) {
          case "no_time_in":
          case "half_day_in":
            time.value = settings.value.start_time;
            break;
          case "no_time_out":
          case "half_day_out":
            time.value = settings.value.end_time;
            break;

          default:
            time.value = "08:00";
        }
      }
    });

    return {
      dialog,
      status,
      title,
      time,
      settings,
      row,
      resolve:()=>{

        const date  = row.value.date

        attendanceStore.resolve(
            row.value.employee_id,
            status.value,
            `${date} ${time.value}`
        )
      }
    };
  },
};
</script>

<style>
</style>