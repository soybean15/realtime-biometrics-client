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

        <UserMenu />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
      overlay
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
              v-if="!menuItem.hidden && !menuItem.children"
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                <span class="text-sm">
                  {{ menuItem.label }}
                </span>
              </q-item-section>
            </q-item>

            <q-expansion-item
            
             :icon="menuItem.icon"
              :label="menuItem.label"
              v-else
            >
              <q-card
                :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
                v-for="item in menuItem.children"
                :key="item.label"
              >
                <q-item
                  @click="onClick"
                  :to="{ name: item.to }"
                  clickable
                  :active="item.to === active"
                  v-ripple
                >
                  <q-item-section class="px-3" avatar>
                    <q-icon  :name="item.icon" />
                  </q-item-section>
                  <q-item-section>
                    <span class="text-xs">
                      {{ item.label }}
                    </span>
                  </q-item-section>
                </q-item>
              </q-card>
            </q-expansion-item>

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
import { useSettingStore } from "@/store/settings";
export default {
  components: { UserMenu },
  setup() {
    const leftDrawerOpen = ref(false);
    const settingStore = useSettingStore();

    onMounted(() => {
      settingStore.get();
    });

    const nav = useNavStore();

    const auth = useAuthStore();

    const { active } = storeToRefs(nav);
    const { user } = storeToRefs(auth);

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
        icon: "calendar_month",
        label: "Calendar",
        separator: false,
        to: "calendar",
        hidden: false,
      },
      {
        icon: "corporate_fare",
        label: "Faculty",
        separator: false,
        to: "calendar",
        hidden: false,
        children: [
          {
            icon: "apartment",
            label: "Department",
            separator: false,
            to: "department",
            hidden: false,
          },
          {
            icon: "person_2",
            label: "Position",
            separator: false,
            to: "position",
            hidden: false,
          },
        ],
      },
      {
        icon: "assignment_turned_in",
        label: "Reports",
        separator: true,
        to: "report",
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
        icon: "settings",
        label: "Settings",
        to: "settings",
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