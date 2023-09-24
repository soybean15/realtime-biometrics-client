<template>
  <div class="q-pa-md">
    <q-list bordered>
      <q-item-label header>Settings</q-item-label>

     




      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="secondary" text-color="white" icon="schedule" />
        </q-item-section>
        <q-item-section>
        <div class="row justify-between items-center">
         Working Schedule

          <div class="row items-center" v-if="settings">
          
            <q-input
              outlined
              dense
              class="mx-1 "
              v-model="settings.start_time"
              mask="##:##"
              fill-mask="0"
              label="Start"
              style="max-width: 120px;"

              readonly
            >
              <template v-slot:prepend>
                <q-icon size="1rem" name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time @update:model-value="updateTime" v-model="settings.start_time">
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

            <q-input
              outlined
              dense
       
              class="px-1 "
              v-model="settings.end_time"
              mask="##:##"
              fill-mask="0"
              label="End"
            
              style="max-width: 120px;"
              readonly
            >
              <template v-slot:prepend>
                <q-icon size="1rem" name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time v-model="settings.end_time">
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
            <q-btn  @click="updateTime" label="change" color="primary" dense/>
         
          </div>
        </div>
      </q-item-section>
      </q-item>

      <q-separator/>

      <q-item-label header>Theme</q-item-label>

      


      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="secondary" text-color="white" icon="dark_mode" />
        </q-item-section>

        <q-item-section>
          <div class="row justify-between items-center">
            <span>Dark Mode</span>

            <q-toggle
              v-model="isDark"
              checked-icon="nightlight"
              color="black"
              unchecked-icon="light_mode"
            />
          </div>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="secondary" text-color="white" icon="palette" />
        </q-item-section>

        <q-item-section>
          <div class="row justify-between items-center">
            <span>Primary</span>

            <q-input outlined v-model="theme['primary']" class="my-input">
              <template v-slot:append>
                <q-icon
                  name="colorize"
                  class="cursor-pointer"
                  :style="{ color: theme['primary'] }"
                >
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-color v-model="theme['primary']" @change="changeColor('primary')" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </q-item-section>
      </q-item>





      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="secondary" text-color="white" icon="palette" />
        </q-item-section>

        <q-item-section>
          <div class="row justify-between items-center">
            <span>Secondary</span>

            <q-input outlined v-model="theme['secondary']" class="my-input">
              <template v-slot:append>
                <q-icon
                  name="colorize"
                  class="cursor-pointer"
                  :style="{ color: theme['secondary'] }"
                >
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-color v-model="theme['secondary']" @change="changeColor('secondary')" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </q-item-section>
      </q-item>

    </q-list>
  </div>
</template>

  <script>
import { useSettingStore } from "@/store/settings";
import { storeToRefs } from "pinia";
import { watch } from "vue";
export default {
  setup() {
    const store = useSettingStore();

    const { isDark, theme, settings } = storeToRefs(store);

    watch(isDark, () => {
    
      store.setDarkMode(isDark.value);
    });

    return {
      isDark,
      theme,
      settings,
      changeColor: (key) => {
        store.changeColor(key);
      },
      updateTime:async()=>{
        await store.updateSettings('start_time')
        await store.updateSettings('end_time')

      }
    };
  },
};
</script>