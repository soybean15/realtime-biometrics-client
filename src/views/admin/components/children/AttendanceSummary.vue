<template>
    <div>

        <div class="row">
            <SummaryCard
                :title="'Attendance'"
                titleStyle="font-bold text-lg text-green"
                :value="'13/15'"
                valueStyle="text-xl font-bold"
            />

            <SummaryCard
                :title="'Lates'"
                titleStyle="font-bold text-lg text-orange"
                :value="'3'"
                valueStyle="text-xl font-bold"
            />

            <SummaryCard
                :title="'Absents'"
                titleStyle="font-bold text-lg text-red"
                :value="'0'"
                valueStyle="text-xl font-bold"
            />
            <SummaryCard
                :title="'To Resolve'"
                titleStyle="font-bold text-lg text-red"
                :value="'0'"
                valueStyle="text-xl font-bold"
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