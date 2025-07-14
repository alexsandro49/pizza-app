<script lang="ts" setup>
import { useCartStore } from "@/stores/cart";
import type { IProduct } from "@/utils/types";
import { useRouter } from "vue-router";
import PizzaSvg from "./PizzaSvg.vue";

const props = defineProps<{
  product: IProduct;
  index: number;
}>();

const cartStore = useCartStore();
const router = useRouter();

const pizzaColors = ["#FF6347", "#00CECB", "#33CA7F", "#F0F757", "#006E90"];

function pizzaColorsPick(value: number): string {
  return pizzaColors[value % pizzaColors.length];
}

function goToProductPage(productId: number) {
  router.push(`/${productId}`);
}
</script>

<template>
  <div
    @click="goToProductPage(props.index)"
    :class="`row-start-[${props.index % 2}] `"
    class="dark:border-tomato border-1 h-60 flex flex-col items-center gap-1.5 p-3 rounded-3xl cursor-pointer"
  >
    <PizzaSvg
      class="w-25 h-25 mt-0.5"
      :pizza-color-icon="pizzaColorsPick(props.index)"
    />

    <p>{{ props.product.name }}</p>
    <p>R${{ product.price.toFixed(2) }}</p>

    <div class="grid w-full gap-1.5 mt-1 grid-cols-3 items-center">
      <p class="text-center text-lg px-1 self-end">
        {{ cartStore.products[props.index].quantity }}
      </p>
      <button
        class="card-button"
        @click.stop="cartStore.decreaseProductQuantity(product.id)"
      >
        -
      </button>
      <button
        class="card-button"
        @click.stop="cartStore.increaseProductQuantity(product.id)"
      >
        +
      </button>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

p {
  @apply dark:text-isabelline text-charcoal;
}

.card-button {
  @apply w-full py-1 border-1 text-center border-tomato rounded-lg cursor-pointer text-black dark:text-isabelline active:bg-tomato;
}
</style>
