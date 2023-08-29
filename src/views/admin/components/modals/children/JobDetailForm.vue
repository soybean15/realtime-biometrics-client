<template>
  {{ departments }}
  {{ positions }}
</template>

<script>
import {useDepartmentStore} from '@/store/department'
import {usePositionStore} from '@/store/position'
import { storeToRefs } from 'pinia'
export default {

    setup(){
        const department = useDepartmentStore()
        const position = usePositionStore()

        const {departments} = storeToRefs(department)
        const {positions} = storeToRefs(position) 

        return {
            positions,
            departments
        }

    }
}
</script>

<style>

</style>