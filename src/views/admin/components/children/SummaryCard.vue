<template>
  
  <div class="bg-onSurface rounded-md shadow-lg p-5 w-52 m-1">
    <div :class="titleStyle">
        {{title}}

    </div>

    <div class="row justify-center" :class="valueStyle">
        {{value}}

    </div>

    

     

  </div>
</template>

<script>
export default {

    props:['title','titleStyle','value','valueStyle']

}
</script>

<style>

</style>