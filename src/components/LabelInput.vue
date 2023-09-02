<template>
    <div class="column ">
        <div :class="titleClass ?? 'text-black'" class=" text-sm " >{{ title }}</div>


        <div class="row items-center  w-full">
            <div  class="col-10 py-1" v-if="!onEdit">{{ val }}</div>
            <q-input class="col-10" @keyup.enter="onEnter" v-model="val" dense v-else />
            <q-btn  class="col-1" round flat size=".7em" @click="change" color="primary" :icon="!onEdit ? 'edit': 'edit_off'" />

        </div>
     

    </div>
  
</template>

<script>
import { ref } from 'vue'
export default {
    props:[
        'title',
        'titleClass',
        'value',
        'attribute'
    ],

    emit:['update'],

    setup(props,{emit}){
        const onEdit = ref(false)
        const val = ref(props.value)
        return {
            onEdit,
            val,
            change(){
                onEdit.value = !onEdit.value
            },
            onEnter:()=>{
                emit('update',props.attribute, val.value)

                onEdit.value = false
            }
        }
    }
}
</script>

<style>

</style>