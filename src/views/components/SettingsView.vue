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

            <q-input outlined  v-model="primaryColor" class="my-input" >
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer" :style="{color :primaryColor}">
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
          <q-avatar
            rounded
            color="purple"
            text-color="white"
            icon="bluetooth"
          />
        </q-item-section>

        <q-item-section>Rounded avatar-type icon</q-item-section>
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

    const { isDark,primaryColor } = storeToRefs(store);

    watch(isDark, () => {
      console.log(isDark.value ? "On dark mode" : "On light mode");
      store.setDarkMode(isDark.value);
    });

    return {
      isDark,
      primaryColor,
      changeColor:()=>{
        store.changeColor()
      }
    };
  },
};
</script>