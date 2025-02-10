import { defineStore } from "pinia";
import { groupBy } from "lodash";
import { useAuthUserStore } from "./AuthUserStore";

export const useCartStore = defineStore("CartStore", {
  historyEnabled: true,
  state: () => {
    return {
      items: [],
    };
  },
  actions: {
    addItems(count, item) {
      count = parseInt(count);
      for (let index = 0; index < count; index++) {
        this.items.push({ ...item });
      }
    },
    setItemCount(item, count) {
      // Busquem l'índex del producte dins del carret
      const index = this.items.findIndex((i) => i.name === item.name);
      // Si el producte existeix, actualitzem la quantitat
      if (index !== -1) {
        // Substituïm el producte existent per un nou amb la quantitat actualitzada
        this.items.splice(index, 1, { ...item, quantity: count });
      }
    },
    checkout() {
      const authUserStore = useAuthUserStore();
      alert(`${authUserStore.username} name just bought ${this.count} items at a total of $${this.totalPrice}`)
    },


  },
  getters: {
    /*count(){
      return this.items.length
    },
    isEmpty(){
      return this.count===0;
    }*/
    // Getter per comptar el nombre total d'elements a la llista
    count: (state) => state.items.length,

    // Getter per comprovar si la llista està buida
    isEmpty: (state) => state.count === 0,

    // Agrupa els elements per nom
    grouped: (state) => groupBy(state.items, (item) => item.name),

    // Retorna el nombre d'elements en un grup específic
    groupCount: (state) => (name) => state.grouped[name].length,

    // Getter per calcular el preu total de tots els productes
    totalPrice: (state) => {
      return state.items.reduce((total, item) => total + item.price, 0)
      // Suma cada preu al total acumulat 0); 
      // Valor inicial de l'acumulador és 0
    }
  }
});
