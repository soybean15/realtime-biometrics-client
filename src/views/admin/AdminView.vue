<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Admin

          
        </q-toolbar-title>

        <UserMenu/>
        
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item
              @click="onClick"
              :to="{ name: menuItem.to }"
              clickable
              :active="menuItem.to === active"
              v-ripple

              v-if="!menuItem.hidden"
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>

            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
  
  <script>
import { onMounted, ref } from "vue";
import { useNavStore } from "@/store/nav";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import UserMenu from "./components/UserMenu.vue";
import {useSettingStore} from '@/store/settings'
export default {
  components:{UserMenu},
  setup() {
    const leftDrawerOpen = ref(false);
    const settingStore = useSettingStore()

    onMounted(()=>{
      settingStore.get()
    })

    const nav = useNavStore();

    const auth = useAuthStore()

    const { active } = storeToRefs(nav);
    const {user} = storeToRefs(auth)

    const menuList = [
      {
        icon: "dashboard",
        label: "Dashboard",
        to: "dashboard",
        separator: true,
        hidden: false,
      },
      {
        icon: "badge",
        label: "Employee",
        to: "employee",
        separator: false,
        hidden: false,
      },
      {
        icon: "group",
        label: "Users",
        to: "user",
        separator: false,
        hidden: !user.value.admin,
      },

      {
        icon: "error",
        label: "Spam",
        separator: true,
        hidden: false,
      },
      {
        icon: "settings",
        label: "Settings",
        separator: false,
      },

      {
        icon: "help",
        iconColor: "primary",
        label: "Help",
        separator: false,
      },
      {
        icon: "exit_to_app",
        label: "Exit",
        to: "main",
        separator: false,
      },
    ];

    return {
      leftDrawerOpen,
      menuList,
      active,
      onClick: () => {
        nav.getActive();
      },
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>