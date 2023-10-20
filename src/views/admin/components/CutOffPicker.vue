<template>
  <q-btn-dropdown
    color="secondary"
    :label="label"
    dropdown-icon="change_history"
  >
    <q-list>
      <q-item clickable v-close-popup @click="onItemClick(item)" v-for="item in timeStamp" :key="item.label">
        <q-item-section>
          <q-item-label>{{item.label}}</q-item-label>
        </q-item-section>
      </q-item>

    </q-list>
  </q-btn-dropdown>
  {{timeStamp}}
</template>

<script>
import { date } from 'quasar'
import { ref } from 'vue'

const generateCutOffs=()=>{
    const timeStamp = Date.now()
    let month = date.formatDate(timeStamp, 'M')
    let year =  date.formatDate(timeStamp, 'YYYY')
   // const months = []
    const cuttOffs= []

    for(let i =12; i>0; i--){
       

        if(month ==0){
            month =12
            year--
        }    
        const newDate = date.buildDate({ year: year,months:month}) 

        let monthString = date.formatDate(newDate,'MMMM')


        const daysInMonth = date.daysInMonth(newDate)   
        const adjusted1 =date.adjustDate(newDate,{month:month,date:16})
        const adjusted2 = date.adjustDate(newDate,{month:month,date:1})




        let cutOff1   = {label:monthString+' 16-'+daysInMonth,value:date.formatDate(adjusted1,'YYYY-MM-DD')}
        let cutOff2   = {label:monthString+ ' 1-15',value:date.formatDate(adjusted2,'YYYY-MM-DD')}
        cuttOffs.push(cutOff1)
        cuttOffs.push(cutOff2)
        month--
    }



    return cuttOffs

}
export default {

    props:['cut_off'],
    setup(){

        const timeStamp = generateCutOffs()
        const label =  ref(timeStamp[0].label)


        return{

            onItemClick (val) {
          console.log('Clicked on an Item')
          label.value = val.label
            },
            label,
            timeStamp
           
        }
    }
};
</script>

<style>
</style>