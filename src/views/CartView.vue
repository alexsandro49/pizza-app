<script lang="ts" setup>
import HeaderComponent from "@/components/HeaderComponent.vue";
import { useConfigStore } from "@/stores/config";
import { useCartStore } from "@/stores/cart";
import CartItem from "@/components/CartItem.vue";

const configStore = useConfigStore();
const cartStore = useCartStore();
</script>

<template>
  <main :class="{ dark: configStore.darkTheme }">
    <HeaderComponent class="mt-[-2em]" />

    <div
      class="dark:border-tomato border-1 flex flex-col items-center p-3 rounded-3xl h-full w-full mt-4 overflow-y-scroll hide-scrollbar justify-start"
    >
      <div
        v-for="product in cartStore.products.filter((p) => p.quantity > 0)"
        :key="product.id"
        class="cart-items-container"
      >
        <CartItem :product="product" :key="product.id" class="cartItem" />
      </div>
    </div>
  </main>
</template>

<style scoped>
@reference "@/assets/main.css";

main {
  @apply flex flex-col items-center justify-between h-screen w-screen overflow-hidden p-8 dark:bg-charcoal;
}

.cart-items-container {
  @apply w-full mb-3;
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

p {
  @apply dark:text-isabelline;
}
</style>
