<template>
    <q-select
        outlined
        v-model="model"
        use-input
        dense
        input-debounce="0"
        :label="label ?? 'Label'"
        :options="options"
        :option-label="'name'"
        @filter="filterFn"
        style="width: 250px"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
</template>

<script>

import { ref, watch } from 'vue'

// const stringOptions = [
//   'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
// ]



export default {
    props:['data','label'],
    emits: ["onChange"],
  setup (props,{emit}) {
    const options = ref(props.data)
    const model = ref(null)

    watch(model,()=>{

      emit('onChange', model.value)

    })
    return {
      model,
      options,

      filterFn (val, update) {
        if (val === '') {
          update(() => {
            options.value = props.data

            // here you have access to "ref" which
            // is the Vue reference of the QSelect
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          options.value = props.data.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
        })
      }
    }
  }
}
</script>

<style>

</style>