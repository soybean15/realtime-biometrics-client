<template>
  <div class="q-pa-md">
    <q-list bordered>
      <q-item-label header>Settings</q-item-label>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white" icon="dark_mode" />
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
          <q-avatar color="primary" text-color="white" icon="palette" />
        </q-item-section>

        <q-item-section>
          <div class="row justify-between items-center">
            <span>Theme</span>

            <q-input outlined v-model="primaryColor" class="my-input">
              <template v-slot:append>
                <q-icon
                  name="colorize"
                  class="cursor-pointer"
                  :style="{ color: primaryColor }"
                >
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-color v-model="primaryColor" @change="changeColor" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white" icon="schedule" />
        </q-item-section>
        <q-item-section>
        <div class="row justify-between items-center">
         Working Schedule

          <div class="row justify-end items-center" v-if="settings">
            <q-input
              outlined
              dense
              class="mx-1"
              v-model="settings.start_time"
              mask="time"
              label="Start"
              :rules="['time']"

              style="max-width: 120px;"
            >
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time v-model="settings.start_time">
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
              class="px-1"
              v-model="settings.end_time"
              mask="time"
              label="End"
              :rules="['time']"

              style="max-width: 120px;"
            >
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
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
          </div>
        </div>
      </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white"> R </q-avatar>
        </q-item-section>

        <q-item-section>Letter avatar-type</q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Image avatar</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar square>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Image square avatar</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar rounded>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Image rounded avatar</q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar rounded>
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />
          </q-avatar>
        </q-item-section>
        <q-item-section>List item</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section thumbnail>
          <img src="https://cdn.quasar.dev/img/mountains.jpg" />
        </q-item-section>
        <q-item-section>List item</q-item-section>
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

    const { isDark, primaryColor, settings } = storeToRefs(store);

    watch(isDark, () => {
      console.log(isDark.value ? "On dark mode" : "On light mode");
      store.setDarkMode(isDark.value);
    });

    return {
      isDark,
      primaryColor,
      settings,
      changeColor: () => {
        store.changeColor();
      },
    };
  },
};
</script>