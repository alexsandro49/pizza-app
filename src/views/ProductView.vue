<script lang="ts" setup>
import { useRoute } from "vue-router";
import HeaderComponent from "@/components/HeaderComponent.vue";
import { useConfigStore } from "@/stores/config";
import { useProductStore } from "@/stores/products";
import PizzaSvg from "@/components/PizzaSvg.vue";
import { useCartStore } from "@/stores/cart";

const configStore = useConfigStore();
const productStore = useProductStore();
const cartStore = useCartStore();

const route = useRoute();

const productIndex = route.params.productIndex;
const pizzaColors = ["#FF6347", "#00CECB", "#33CA7F", "#F0F757", "#006E90"];

function pizzaColorsPick(value: number): string {
  return pizzaColors[value % pizzaColors.length];
}

function decreaseQuantity() {
  cartStore.decreaseProductQuantity(cartStore.products[+productIndex].id);
}

function increaseQuantity() {
  cartStore.increaseProductQuantity(cartStore.products[+productIndex].id);
}
</script>

<template>
  <main
    :class="{ dark: configStore.darkTheme }"
    class="flex flex-col items-center justify-between h-screen w-screen overflow-hidden p-8 dark:bg-charcoal"
  >
    <HeaderComponent class="mt-[-2em]" />

    <div
      class="dark:border-tomato border-1 flex flex-col items-center p-3 rounded-3xl h-full w-full mt-4 overflow-y-scroll hide-scrollbar justify-start"
    >
      <PizzaSvg
        class="w-35 h-35 mt-0.5"
        :pizza-color-icon="pizzaColorsPick(+productIndex)"
      />
      <p class="text-2xl mt-3">
        {{ productStore.products[+productIndex].name }}
      </p>
      <p class="text-xl mt-3">
        R${{ productStore.products[+productIndex].price.toFixed(2) }}
      </p>
      <p class="mt-2 text-lg text-center whitespace-pre-line">
        {{ productStore.products[+productIndex].description }}
      </p>

      <div
        id="final"
        class="grid w-full gap-4 grid-cols-3 items-center mt-auto h-15"
      >
        <p class="font-bold text-center text-lg px-1">
          {{ cartStore.products[+productIndex].quantity }}
        </p>
        <button
          class="text-2xl font-bold w-full h-full py-1 border-2 text-center border-tomato rounded-lg cursor-pointer text-black hover:bg-tomato dark:text-isabelline"
          @click="decreaseQuantity()"
        >
          -
        </button>
        <button
          class="text-2xl font-bold w-full h-full py-1 border-2 text-center border-tomato rounded-lg cursor-pointer text-black hover:bg-tomato dark:text-isabelline"
          @click="increaseQuantity()"
        >
          +
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
@reference "@/assets/main.css";

p {
  @apply text-charcoal dark:text-isabelline;
}

.hide-scrollbar {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE 10+ */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Opera */
}
</style>
