import { defineStore, acceptHMRUpdate } from "pinia";
export const useAuthUserStore=defineStore("AuthUserStore",{
   state:()=>{
//Aquí ho faríem amb un action, però per resumir ho fem hardcoded
       return {
           username:"Alex_Martin",
       }
   },
   actions: {
    visitProfile() {
      window.open(`https://instagram.com/${this.username}`, "_blank");
    },
  },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthUserStore, import.meta.hot));
  }
