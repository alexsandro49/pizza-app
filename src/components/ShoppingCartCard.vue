<script setup lang="ts">
import { useCartStore } from "@/stores/shoppingCart";
import { useProductStore } from "@/stores/products";
import { computed } from "vue";
import type { IProductInCart } from "@/utils/types";
import { useRouter } from "vue-router";

const props = defineProps<{
  product: IProductInCart;
}>();

const productStore = useProductStore();
const cartStore = useCartStore();

const router = useRouter();

const productName = productStore.products.find(
  (p) => p.id === props.product.id,
)!.name;
const totalPrice = computed(() => {
  return (
    productStore.products.find((p) => p.id === props.product.id)!.price *
    props.product.quantity
  );
});

function getProductImage() {
  return productStore.products.find((p) => p.id === props.product.id)!
    .imageName;
}

function getProductPath(imageName: string) {
  return new URL(`../assets/${imageName}`, import.meta.url).href;
}

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
  <div
    @click="goToProductPage()"
    class="border-b-1 p-1 gap-2 w-full h-[17vh] flex border-tomato items-center justify-around"
  >
    <img
      :src="getProductPath(getProductImage())"
      alt="Pizza image"
      class="w-25 h-25 mt-0.5 cursor-pointer"
    />

    <div class="flex flex-col w-[70%] py-2 text-isabelline h-full">
      <p class="text-tomato font-bold text-lg my-1 cursor-pointer">
        {{ productName }}
      </p>
      <p>Quantidade: {{ props.product.quantity }}</p>
      <p>Total: R${{ totalPrice.toFixed(2) }}</p>

      <div class="self-end flex gap-1 mt-auto">
        <font-awesome-icon
          @click.stop="decreaseQuantity()"
          icon="fa-solid fa-minus"
          class="button-icon"
        />
        <font-awesome-icon
          @click.stop="increaseQuantity()"
          icon="fa-solid fa-plus"
          class="button-icon"
        />
        <font-awesome-icon
          @click.stop="removeQuantity()"
          icon="fa-solid fa-trash"
          class="button-icon"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.button-icon {
  @apply text-lg border-1 border-isabelline dark:border-tomato p-1.5 rounded cursor-pointer hover:bg-tomato active:bg-tomato;
}
</style>
