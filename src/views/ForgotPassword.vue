<template>
  <div class="row items-center h-[300px] justify-center">

    <div  class="w-[400px] md:w-[500px] bg-surface p-5 rounded-md">
        <div class="text-xl font-bold mb-5">Forgot Password </div>

        <q-form @submit="onSubmit"> 
            <q-input outlined label="Enter your email"/>

            <div class="py-2 row justify-end ">
                <q-btn color="secondary" label="Submit" type="submit"/>
            </div>

        </q-form>
    </div>    
  </div>
</template>

<script>
export default {

    setup(){
        return {
            onSubmit :()=>{

            }
        }
    }

}
</script>

<style>

</style>