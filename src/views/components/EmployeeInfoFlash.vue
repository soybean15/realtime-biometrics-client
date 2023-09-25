<template>
  <div class="column p-5 bg-surface rounded-md shadow-md">
    <div class="text-2xl pb-5">Attendance Info</div>
    <div class="row" v-if="attendance">
      <q-avatar class="shadow-md" square size="500px">
        <img :src="attendance.employee.image" />
      </q-avatar>

      <div class="p-5 column justify-evenly" >
        <div class="text-3xl" >
          <span class="font-bold font-secondary text-wrap">Name:</span>

          {{attendance.employee.full_name}}
        </div>
        <div class="text-3xl">
          <span class="font-bold font-secondary text-wrap">Position:</span>

          
          <div v-for="item in attendance.employee.positions" :key="item.id">
            {{ item.name }}

          </div>
        </div>
        <div class="text-3xl">
          <span class="font-bold font-secondary text-wrap">Department:</span>

          <div v-for="item in attendance.employee.departments" :key="item.id">
            {{ item.name }}

          </div>
        </div>

        <div class="text-3xl">
          <span class="font-bold font-secondary text-wrap">Type:</span>

          Time In
        </div>

        <div class="text-3xl">
          <span class="font-bold font-secondary text-wrap">Timestamp:</span>

          <span class="text-green px-2 font-bold">
            {{ attendance.timestamp }}
          </span>
        </div>
      </div>
    </div>
    <div class="h-[500px] row justify-center items-center" v-else>

        <div class="font-secondary text-2xl">No Data</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["attendance"],
};
</script>

<style>
</style>