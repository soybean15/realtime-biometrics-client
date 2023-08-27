<template>
  <PersistentDialog
    :width="'900px'"
    @onClose="store.getEmployees"
    :maxWidth="'90vh'"
  >
    <template v-slot:open-button="{ open }">
      <q-btn
        color="primary"
        label="Archive"
        glossy
        @click="open"
        rounded
        class="mx-1"
        icon-right="archive"
        size=".7rem"
      />
    </template>

    <template v-slot:title> Archive </template>

    <template v-slot:content>
      <DataTable
        :columns="columns"
        :rows="data['trashed'].data"
        :cells="['actions']"
        :pagination="{
          max: data['trashed'].last_page,
          max_pages: 6,
        }"
      >
        <template v-slot:top>
          <div class="bg-red-300 w-full row justify-between">
            <span class="">Trash</span>
            <SearchBar />
          </div>
        </template>

        <template v-slot:actions="{ props }">
          <q-td :props="props">
            <div class="column items-end">
              <span class="text-xs">{{ props.row.deleted_at }}</span>
              <q-btn
                dense
                class="text-xs w-28"
                color="primary"
                glossy
                @click="onRestore(props.row.id)"
                text-color="white"
                push
                :loading="loading[props.row.id]"
                label="Restore"
                icon="restore_from_trash"
                v-if="props.row.deleted_at"
              />
              <q-chip
                outline
                color="green"
                text-color="white"
                icon="event"
                v-else
              >
                Restored
              </q-chip>
            </div>
          </q-td>
        </template>
      </DataTable>
    </template>
  </PersistentDialog>
</template>

<script>
import PersistentDialog from "@/components/PersistentDialog.vue";
import DataTable from "@/components/DataTable.vue";
import SearchBar from "@/components/SearchBar.vue";
import { useEmployeeStore } from "@/store/employee";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const columns = [
  {
    name: "fullName",
    required: true,
    label: "Full Name",
    align: "left",
    field: (row) => row,
    format: (row) =>
      `${row.lastname}, ${row.firstname} ${
        row.middlename ? row.middlename[0] : ""
      }.`,
    sortable: true,
  },
  {
    name: "actions",
    required: true,
    label: "Actions",
    align: "right",
  },
];
export default {
  components: {
    PersistentDialog,
    DataTable,
    SearchBar,
  },
  setup() {
    const store = useEmployeeStore();

    const loading = ref([]);
    const { data } = storeToRefs(store);

    return {
      data,
      columns,
      store,
      loading,
      onRestore: async (id) => {
        loading.value[id] = true;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await store.restore(id);
        loading.value[id] = false;
      },
    };
  },
};
</script>

<style>
</style>