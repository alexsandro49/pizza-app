<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import PizzaSvg from "./PizzaSvg.vue";
import { useProductStore } from "@/stores/products";
import { computed } from "vue";
import type { IProductInCart } from "@/utils/types";

const props = defineProps<{
  product: IProductInCart;
}>();

const cartStore = useCartStore();
const productStore = useProductStore();

// const productIndex = cartStore.products.findIndex((p) => p === props.product)

const totalPrice = computed(() => {
  return (
    productStore.products.find((p) => p.id === props.product.id)!.price *
    props.product.quantity
  );
});

function decreaseQuantity() {
  cartStore.products[cartStore.products.findIndex((p) => p === props.product)]
    .quantity--;
}

function increaseQuantity() {
  cartStore.products[cartStore.products.findIndex((p) => p === props.product)]
    .quantity++;
}

function removeQuantity() {
  const index = cartStore.products.findIndex((p) => p === props.product)!;
  cartStore.products[index].quantity = 0;
}
</script>

<template>
  <div class="container">
    <PizzaSvg class="w-20 h-20" pizza-color-icon="#FFFFFF" />

    <div class="item-details text-white h-full">
      <p class="text-tomato-red font-bold text-lg m-y-1">
        {{ productStore.products.find((p) => p.id === props.product.id)!.name }}
      </p>
      <p>Quantidade: {{ props.product.quantity }}</p>
      <p>Total: R${{ totalPrice.toFixed(2) }}</p>

      <div class="self-end flex gap-1 h-full">
        <font-awesome-icon
          @click="decreaseQuantity()"
          icon="fa-solid fa-minus"
          class="items-details-buttons"
        />
        <font-awesome-icon
          @click="increaseQuantity()"
          icon="fa-solid fa-plus"
          class="items-details-buttons"
        />
        <font-awesome-icon
          @click="removeQuantity()"
          icon="fa-solid fa-trash"
          class="items-details-buttons"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.container {
  @apply border-b-1 p-2 w-full h-[15vh] flex border-tomato-red items-center justify-around;
}

.item-details {
  @apply flex flex-col w-[70%] p-2;
}

.items-details-buttons {
  @apply text-lg border-1 border-tomato-red p-1.5 rounded cursor-pointer hover:bg-tomato-red;
}
</style>
