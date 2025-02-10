<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "./stores/useProductStore";
import { useCartStore } from "./stores/useCartStore";

const productStore = useProductStore();
const cartStore = useCartStore();
productStore.fill()

// Elminem la funció del patch , per probar un altre 
// Patch ens mostra els canvis OldValue NewValue
/*const addToCart=(count,product)=>{
  count=parseInt(count)
  cartStore.$patch(state=>{
    for(let index=0;index<count;index++){
    state.items.push(product);      
    }
  })
}*/

</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="flex justify-end mb-5">
      <AppButton @click="cartStore.undo"> Undo </AppButton>
      <AppButton class="ml-2" @click="cartStore.redo"> Redo </AppButton>
    </div>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard v-for="product in productStore.products" :key="product.name" :product="product"
        @addToCart="cartStore.addItems($event, product)" />
      <!--<ProductCard v-for="product in productStore.products"
        :key="product.name" :product="product"
        @addToCart="addToCart($event,product)"
      />-->
    </ul>
  </div>
</template>
