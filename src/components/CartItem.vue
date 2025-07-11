<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import PizzaSvg from "./PizzaSvg.vue";
import { useProductStore } from "@/stores/products";
import { computed } from "vue";
import type { IProductInCart } from "@/utils/types";
import { useRouter } from "vue-router";
import { useConfigStore } from "@/stores/config";

const props = defineProps<{
  product: IProductInCart;
}>();

const cartStore = useCartStore();
const productStore = useProductStore();
const configStore = useConfigStore();

const pizzaColorIcon = computed(() =>
  configStore.darkTheme ? "#EFEEEA" : "#273F4F",
);

const router = useRouter();

const totalPrice = computed(() => {
  return (
    productStore.products.find((p) => p.id === props.product.id)!.price *
    props.product.quantity
  );
});

function decreaseQuantity() {
  cartStore.decreaseProductQuantity(props.product.id);
}

function increaseQuantity() {
  cartStore.increaseProductQuantity(props.product.id);
}

function removeQuantity() {
  cartStore.removeProductQuantity(props.product.id);
}

function goToProductPage() {
  const productIndex = cartStore.products.findIndex(
    (p) => p.id === props.product.id,
  )!;

  router.push(`/${productIndex}`);
}
</script>

<template>
  <div class="container">
    <PizzaSvg
      @click="goToProductPage()"
      class="w-25 h-25 cursor-pointer"
      :pizza-color-icon="pizzaColorIcon"
    />

    <div class="item-details text-charcoal dark:text-isabelline h-full">
      <p class="text-tomato font-bold text-lg m-y-1">
        {{ productStore.products.find((p) => p.id === props.product.id)!.name }}
      </p>
      <p>Quantidade: {{ props.product.quantity }}</p>
      <p>Total: R${{ totalPrice.toFixed(2) }}</p>

      <div class="self-end flex gap-1 mt-auto">
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
  @apply border-b-1 p-1 gap-2 w-full h-[17vh] flex border-tomato items-center justify-around;
}

.item-details {
  @apply flex flex-col w-[70%] py-2;
}

.items-details-buttons {
  @apply text-lg border-1 border-tomato p-1.5 rounded cursor-pointer hover:bg-tomato;
}
</style>
