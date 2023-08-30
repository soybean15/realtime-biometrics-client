<template>
  <div class="row">
    <div class="col-6 p-2">
      <div class="column p-3 bg-surface rounded-md shadow-md">
        <div class="text-lg font-bold">Select Department/s</div>
        <SearchBar @search="search" />
        <div
          class="h-72 overflow-y-auto bg-white p-2 rounded-md rounded-t-none"
        >
          <div v-for="department in _departments" :key="department.id">
            <q-btn
              :color="department.selected ? 'secondary' : 'primary'"
              @click="select(department)"
              class="w-full m-1"
              :label="department.name"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="col-6 p-2">
      <div class="column p-3 bg-surface rounded-md shadow-md">
        <div class="text-lg font-bold">Department/s</div>
        <div class="h-80 overflow-y-auto bg-white p-2 rounded-md">
          <div v-for="department in selectedDepartments" :key="department.id">
            <q-btn
              color="secondary"
              @click="select(department)"
              class="w-full m-1"
              :label="department.name"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { useDepartmentStore } from "@/store/department";
import SearchBar from "@/components/SearchBar.vue";
import { storeToRefs } from "pinia";
import { ref } from "vue";
export default {
  components: {
    SearchBar,
  },
  setup() {
    const store = useDepartmentStore();
    const { departments,selectedDepartments } = storeToRefs(store);

    const _departments = ref(structuredClone(departments.value));

    // const selectedDepartments = ref([]);

    return {
      departments,
      select: (department) => {
        const index = selectedDepartments.value.indexOf(department);

        if (index === -1) {
         
          selectedDepartments.value.push(department);
          department.selected = true;
        } else {
        
          selectedDepartments.value.splice(index, 1);
          department.selected = false;
        }
      },
      selectedDepartments,
      _departments,
      search: (text) => {
        const needle = text.toLowerCase();
        const cloned = structuredClone(departments.value);

        _departments.value = structuredClone(
          cloned.filter((v) => v.name.toLowerCase().indexOf(needle) > -1)
        );

        _departments.value.forEach((val) => {
          if (
            selectedDepartments.value.some(
              (selectedItem) => selectedItem.id === val.id
            )
          ) {
            val.selected = true;
          }
        });
      },
    };
  },
};
</script>
  
  <style>
</style>