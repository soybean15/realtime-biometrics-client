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
    <template v-slot:open-button="{ open }">
      <q-btn dense @click="open" size="1em" color="red" label="Resolve" />
    </template>

    <template v-slot:title>
      <div class="p-5 text-lg font-semibold">Resolve Issue</div>
    </template>

    <template v-slot:content>
      <div class="p-5">
        <div v-for="item in issue.remarks" :key="item.key">
          <div
            class="row justify-between item-center"
            v-if="item.key === 'no_time_out' || item.key === 'no_time_in'"
          >
            <q-chip
              outline
              square
              :label="item.title"
              :color="getChipColor(item.key)"
            />
            {{ setDefaultTime(item.key) }}

            <div class="row items-center">
              <q-input
                outlined
                dense
                v-model="time"
                mask="time"
              
              >
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

              <q-btn @click="attendanceStore.resolve('Time in',`${issue.date}`)" class="mx-3" dense round color="secondary" icon="check_circle">

                <q-tooltip  class="bg-indigo" :offset="[10, 10]">
                Resolve
                </q-tooltip>
              </q-btn>
            </div>
          </div>

          <div v-else>
            <q-chip
              outline
              square
              :label="item.title"
              :color="getChipColor(item.key)"
            />
          </div>
        </div>
      </div>
    </template>
  </PersistentDialog>
  {{ issue }}
</template>

<script>
import PersistentDialog from "@/components/PersistentDialog.vue";
import getChipColor from "@/composables/chipColor";
import { useSettingStore } from "@/store/settings";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useAttendanceStore } from "@/store/attendance";
export default {
  components: { PersistentDialog },
  props: ["issue"],
  setup() {
    const settingStore = useSettingStore()
    const  attendanceStore = useAttendanceStore()
    const time = ref(null);
    const { settings } = storeToRefs(settingStore);

    return {
      getChipColor,
      time,
      attendanceStore,
      setDefaultTime: (key) => {
        const val = {
          no_time_in: settings.value["end_time"],
          no_time_out: settings.value["start_time"],
        };
        time.value = val[key] === null ? "8:00" : val[key];
      },
    };
  },
};
</script>

<style>
</style>