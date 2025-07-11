<script lang="ts" setup>
// import { useUsersStore } from "@/stores/users";
import { useRouter } from "vue-router";
import HeaderComponent from "@/components/HeaderComponent.vue";
import { useConfigStore } from "@/stores/config";
import { useProductStore } from "@/stores/products";
import PizzaSvg from "@/components/PizzaSvg.vue";
import { useCartStore } from "@/stores/cart";

const configStore = useConfigStore();
const productStore = useProductStore();
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
  <main :class="{ dark: configStore.darkTheme }">
    <HeaderComponent class="mt-[-2em]" />

    <div
      class="w-full h-full mt-4 grid grid-cols-2 gap-2 overflow-y-scroll hide-scrollbar"
    >
      <div v-for="(product, index) in productStore.products" :key="product.id">
        <div
          @click="goToProductPage(index)"
          class="dark:border-tomato border-1 h-60 flex flex-col items-center gap-1.5 p-3 rounded-3xl cursor-pointer"
        >
          <PizzaSvg
            class="w-25 h-25 mt-0.5"
            :pizza-color-icon="pizzaColorsPick(index)"
          />
          <p>{{ product.name }}</p>
          <p class="self-end">R${{ product.price.toFixed(2) }}</p>

          <div class="grid w-full gap-1.5 mt-1 grid-cols-3 items-center">
            <p class="text-center text-lg px-1">
              {{ cartStore.products[index].quantity }}
            </p>
            <button
              class="w-full py-1 border-1 text-center border-tomato rounded-lg cursor-pointer text-black hover:bg-tomato dark:text-isabelline"
              @click.stop="cartStore.decreaseProductQuantity(product.id)"
            >
              -
            </button>
            <button
              class="w-full py-1 border-1 text-center border-tomato rounded-lg cursor-pointer text-black hover:bg-tomato dark:text-isabelline"
              @click.stop="cartStore.increaseProductQuantity(product.id)"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@reference "@/assets/main.css";

main {
  @apply flex flex-col items-center justify-between h-screen w-screen overflow-hidden p-8 dark:bg-charcoal;
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
  @apply dark:text-white;
}
</style>
