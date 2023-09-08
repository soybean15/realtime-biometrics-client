<template>
  <DataTable
    :title="'Users'"
    :rows="users.data"
    :columns="columns"
    :cells="['actions']"
    :pagination="{ max: users.last_page, max_pages: 6 }"
    v-if="users"
  >
    <template v-slot:top>
      <SearchBar />
    </template>

    <template v-slot:actions="{ props }">
      <q-td :props="props">
        <ConfirmDialog :title="'Disable User'" :width="'400px'">
          <template v-slot:open-button="{ open }">
            <q-btn
              :color="props.row.enable ? 'primary' : 'blue-grey-7'"
              :label="props.row.enable ? 'Disable' : 'Enable'"
              @click="open"
            ></q-btn>
          </template>

          <template v-slot:title>
            <span class="font-bold font-xl"
              >{{ !props.row.enable ? "Disable" : "Enable" }} user</span
            >
          </template>

          <template v-slot:message>
            <span class="font-bold"
              >Are you sure you want to
              {{ !props.row.enable ? "Disable" : "Enable" }} user?</span
            >
          </template>

          <template v-slot:buttons="{ close }">
            <q-btn
              dense
              :loading="loading"
              class="m-1"
              color="primary"
              @click="onEnable(props.row.id ,close)"
              label="Enable"
            />
            <q-btn
              dense
              class="m-1"
              color="secondary"
              @click="close"
              label="Cancel"
            />
          </template>
        </ConfirmDialog>
      </q-td>
    </template>
  </DataTable>
</template>

<script>
import DataTable from "@/components/DataTable.vue";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

const columns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "email",
    required: true,
    label: "Email",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "actions",
    required: true,
    label: "Actions",
    align: "center",
  },
];

export default {
  components: {
    DataTable,
    SearchBar,
    ConfirmDialog,
  },
  setup() {
    const store = useAuthStore();

    const { users } = storeToRefs(store);
    const loading = ref(false);

    onMounted(() => {
      store.getUsers();
    });

    return {
      store,
      users,
      columns,
      loading,
      onEnable: async (id,close) => {
        loading.value = true;
        const delayDuration = 1000;
        await new Promise((resolve) => setTimeout(resolve, delayDuration));
        await store.enable(id);
        
        loading.value = false;
        close()
      },
    };
  },
};
</script>

<style>
</style>