<script setup>
import { storeToRefs } from "pinia";
import { useAuthUserStore } from "@/stores/AuthUserStore";
import CartWidget from "@/components/CartWidget.vue";

const authUserStore = useAuthUserStore();
const { username } = storeToRefs(authUserStore);
const { visitProfile } = authUserStore;
</script>

<template>
  <header class="flex justify-between p-6 mb-10 items-center"
    style="background-image: url('/images/double-bubble-outline.png')">
    <h1 class="text-4xl text-gray-700 font-bold">The Pineapple Stand</h1>
    <div>
      <span class="mr-5 cursor-pointer" title="SocialMedia" @click="visitProfile">{{ username }}</span>
      <CartWidget class="inline-block" />
    </div>
  </header>
</template>