<script lang="ts" setup>
import { useCartStore } from "@/stores/shoppingCart";
import type { IProduct } from "@/utils/types";
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  product: IProduct;
  index: number;
}>();

const cartStore = useCartStore();
const router = useRouter();

const minusButtonClicked = ref(false);
const plusButtonClicked = ref(false);

function getProductPath(imageName: string) {
  return new URL(`../assets/${imageName}`, import.meta.url).href;
}

function goToProductPage(productId: number) {
  router.push(`/${productId}`);
}
</script>

<template>
  <div
    @click="goToProductPage(props.index)"
    :class="`row-start-[${props.index % 2}] `"
    class="bg-small-gray dark:bg-light-charcoal border-charcoal dark:border-tomato border-1 h-60 flex flex-col items-center gap-1.5 p-3 rounded-3xl cursor-pointer"
  >
    <img
      :src="getProductPath(props.product.imageName)"
      alt="Pizza image"
      class="w-25 h-25 mt-0.5"
    />

    <p>{{ props.product.name }}</p>
    <p>R${{ product.price.toFixed(2) }}</p>

    <div class="grid w-full gap-1.5 mt-1 grid-cols-3 items-center">
      <p class="text-center text-lg px-1 self-end">
        {{
          cartStore.products.length > 0
            ? cartStore.products[props.index].quantity
            : 0
        }}
      </p>
      <button
        v-on:touchstart="minusButtonClicked = true"
        v-on:touchend="minusButtonClicked = false"
        :class="{ 'bg-tomato': minusButtonClicked }"
        class="card-button"
        @click.stop="cartStore.decreaseProductQuantity(product.id)"
      >
        -
      </button>
      <button
        v-on:touchstart="plusButtonClicked = true"
        v-on:touchend="plusButtonClicked = false"
        :class="{ 'bg-tomato': plusButtonClicked }"
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
  @apply text-isabelline;
}

.card-button {
  @apply w-full py-1 border-1 text-center border-isabelline dark:border-tomato rounded-lg cursor-pointer text-isabelline hover:bg-tomato;
}
</style>
