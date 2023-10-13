<template>
  
  <div class="bg-onSurface rounded-md shadow-lg p-5">
    <div :class="titleStyle">
        {{title}}

    </div>

    <div class="row justify-center">
        {{value}}

    </div>

    

     

  </div>
</template>

<script>
export default {

    props:['title','titleStyle','value']

}
</script>

<style>

</style>