<template>
  <div class="column">
    <div :class="titleClass ?? 'text-black'" class="text-sm">{{ title }}</div>

    <div class="row items-center w-full">
      <div class="col-10 py-1" :class="valueClass" v-if="!onEdit">
        {{ val }}
      </div>

      <div class="col-10" v-else>
        <q-input
          dense
          v-model="val"
          mask="date"
          :rules="['date']"
          v-if="type === 'date'"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="val">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          @keyup.enter="onEnter"
          v-model="val"
          dense
          v-if="
            type === null ||
            type === '' ||
            type === 'text' ||
            typeof type === 'undefined'
          "
        />

        <SelectInput :data="data" :value="val"  @onSelect="onSelect"  v-if="type==='select'"/>





      </div>

      <q-btn
        class="col-1"
        round
        flat
        size=".7em"
        @click="change"
        color="primary"
        :icon="!onEdit ? 'edit' : 'edit_off'"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import SelectInput from "./SelectInput.vue";

export default {
components:{ SelectInput },
  props: ["title", 
  "titleClass", 
  "value", 
  "valueClass", 
  "attribute",
   "type", 
   'data'],

  emit: ["update"],

  setup(props, { emit }) {
    const onEdit = ref(false);
    const val = ref(props.value);

    console.log(props.type);
    return {
      onEdit,
      val,
      change() {
        onEdit.value = !onEdit.value;
      },
      onEnter: () => {
       
        emit("update", props.attribute, val.value);

        

        onEdit.value = false;
      },
      onSelect:async(v)=>{

        val.value = v
        emit("update", props.attribute, v);
      
        onEdit.value = false;

      }
    };
  },
};
</script>

<style>
</style>