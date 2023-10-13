<template>
    <div>

        <div class="row">
            <SummaryCard
                :title="'Attendance'"
                titleStyle="font-bold text-lg text-green"
                :value="'13/15'"
            />

            <SummaryCard
                :title="'Lates'"
                titleStyle="font-bold text-lg text-orange"
                :value="'13/15'"
            />
        </div>

        
    </div>


</template>

<script>
import SummaryCard from './SummaryCard.vue'

export default {
    components:{SummaryCard}

}
</script>

<style>

</style>