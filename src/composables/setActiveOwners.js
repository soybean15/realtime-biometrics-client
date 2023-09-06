import { useNavStore } from "@/store/nav";
import { storeToRefs } from "pinia";

const setActiveOwner = (to, from, next) => {
    const nav = useNavStore();
    const { active } = storeToRefs(nav);
  
    const owner = to.meta.owner;
    active.value = owner;
  
  
    next();
  };

  export default setActiveOwner