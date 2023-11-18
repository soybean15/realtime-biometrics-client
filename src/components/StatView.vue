<template>
  <div class="p-4 rounded-md" :class="backgroundColor" style="min-width: 200px">
    <div class="text-lg" :class="title.properties">{{ title.value }}</div>
    <div class="text-3xl row font-semibold items-center">
      {{ value }}
      <div class="row items-center" v-if="caption">
        <div class="font-secondary text-xs px-1">{{ caption.separator }}</div>
        <div class="text-sm font-secondary">{{ caption.value }}</div>
      </div>
    </div>

    <div class="column text-xs font-secondary">
      <div class="row items-center">
        {{ helperText }}
      </div>

      <div class="row items-center">
        <q-icon
          size="2em"
          :color="helper.isPositive ? 'green' : 'red'"
          :name="helper.isUp ? 'arrow_drop_up' : 'arrow_drop_down'"
          v-if="helper"
        />

        <slot name="helper"> </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "backgroundColor",
    "helper",
    "title",
    "value",
    "helperText",
    "caption",
  ],
};
</script>

<style>
</style>