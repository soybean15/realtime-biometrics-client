<template>
    <q-btn-dropdown
      color="secondary"
      :label="label"
      dropdown-icon="change_history"
    >
      <q-list>
        <q-item
          clickable
          v-close-popup
          @click="onItemClick(item)"
          v-for="item in months"
          :key="item.label"
        >
          <q-item-section>
            <q-item-label>{{ item.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>


  </template>
  
  <script>
  import { date } from "quasar";
import { ref } from 'vue';

  const generateMonths = ()=>{

    const now = Date.now()
        let month = date.formatDate(now, "M");
        let year = date.formatDate(now, "YYYY");

        const months=[]


        for(let i= 12;i>0; i--   ){
            if (month ==0){
                month = 12
                year--
            }
           
            const _date = date.buildDate({ year: year, months: month,date:1 });
            const dateStr = date.formatDate(_date,'MMM YYYY')
            const dateValue = date.formatDate(_date,'YYYY-MM-DD')
            months.push({label:dateStr, value:dateValue})
            month --
           
        }


        return months


  }
  export default {

    emits:['onSelect'],

    setup(props,{emit}) {
        const months = generateMonths()
        const label = ref(months[0].label)

        return {
            months,
            label,
            onItemClick:(item)=>{
                label.value = item.label
                emit('onSelect',item.value)
            }
        }
     
    },
  };
  </script>
  
  <style>
  </style>