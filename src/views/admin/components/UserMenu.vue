<template>
   <q-btn flat color="white" :label="user.name ">
        <q-menu
          transition-show="jump-down"
          transition-hide="jump-up"
        >
          <q-list style="min-width: 300px">
            <q-item clickable>
                <LabelInput
                  :title="'Name'"
                  :titleClass="'font-secondary font-bold'"
                  :value="user.name"
                  :valueClass="'text-md font-bold font-primary'"
                  :attribute="'name'"
                 
                />
            </q-item>
            <q-item clickable>
                <LabelInput
                  :title="'Email'"
                  :titleClass="'font-secondary font-bold'"
                  :value="user.email"
                  :valueClass="'text-md font-bold font-primary'"
                  :attribute="'name'"
                 
                />
            </q-item>
            <q-separator />
            <q-item clickable>
              <q-item-section>Mind blown</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
</template>

<script>
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import LabelInput from '@/components/LabelInput.vue';
export default {
    components:{LabelInput},
    setup(){
        const store = useAuthStore()

        const {user} = storeToRefs(store)

        return {
            user
        }
    }

}
</script>

<style>

</style>