<script lang="ts" setup>
// import { useUsersStore } from "@/stores/users";
import { useRoute } from "vue-router";
import HeaderComponent from "@/components/HeaderComponent.vue";
import { useConfigStore } from "@/stores/config";
import { useProductStore } from "@/stores/products";
import PizzaSvg from "@/components/PizzaSvg.vue";
import { onMounted, ref } from "vue";
import { useCartStore } from "@/stores/cart";

const configStore = useConfigStore();
const productStore = useProductStore();
const cartStore = useCartStore();
const productsQuantity = ref(productStore.products.map(() => 0));

const route = useRoute();
const productId = route.params.id;

const pizzaColors = ["#FF6347", "#00CECB", "#33CA7F", "#F0F757", "#006E90"];

function pizzaColorsPick(value: number): string {
  return pizzaColors[value % pizzaColors.length];
}

function increaseProductInCart(index: number) {
  if (productsQuantity.value[index] <= 100) {
    productsQuantity.value[index]++;
  }
}

function reduceProductInCart(index: number) {
  if (productsQuantity.value[index] >= 1) {
    productsQuantity.value[index]--;
  }
}

function addProductToCart(index: number) {
  const id = productStore.products[index].id;
  const quantity = productsQuantity.value[index];

  cartStore.addProductToCart(id, quantity);
  productsQuantity.value[index] = cartStore.resetDisplayedQuantity(id);
}

onMounted(() => {
  cartStore.products.map((productInCart) => {
    const index = productStore.products.findIndex(
      (product) => product.id === productInCart.id,
    );
    if (index !== -1) {
      productsQuantity.value[index] = productInCart.quantity;
    }
  });
});
</script>

<template>
  <main :class="{ dark: configStore.darkTheme }">
    <HeaderComponent class="mt-[-2em]" />

    <div
      class="dark:border-tomato-red border-1 flex flex-col items-center p-3 rounded-3xl h-full w-full mt-4 overflow-y-scroll hide-scrollbar justify-start"
    >
      <PizzaSvg
        class="w-35 h-35 mt-0.5"
        :pizza-color-icon="pizzaColorsPick(+productId)"
      />
      <p class="text-2xl mt-3">
        {{ productStore.products[+productId].name }}
      </p>
      <p class="text-xl mt-3">
        R${{ productStore.products[+productId].price.toFixed(2) }}
      </p>
      <p class="mt-2 text-lg text-center whitespace-pre-line">
        {{ productStore.products[+productId].description }}
      </p>

      <div
        id="final"
        class="grid w-full gap-4 grid-cols-4 items-center mt-auto h-15"
      >
        <p class="font-bold text-center text-lg px-1">
          {{ productsQuantity[+productId] }}
        </p>
        <button
          class="text-2xl font-bold w-full h-full py-1 border-2 text-center border-tomato-red rounded-lg cursor-pointer text-black hover:bg-tomato-red dark:text-white"
          @click="reduceProductInCart(+productId)"
        >
          -
        </button>
        <button
          class="text-2xl font-bold w-full h-full py-1 border-2 text-center border-tomato-red rounded-lg cursor-pointer text-black hover:bg-tomato-red dark:text-white"
          @click="increaseProductInCart(+productId)"
        >
          +
        </button>

        <div
          class="flex justify-center items-center w-full h-full border-2 border-tomato-red rounded-lg hover:bg-tomato-red dark:text-white cursor-pointer"
        >
          <font-awesome-icon
            @click="addProductToCart(+productId)"
            icon="fa-solid fa-cart-plus"
            class="text-lg"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@reference "@/assets/main.css";

main {
  @apply flex flex-col items-center justify-between h-screen w-screen overflow-hidden p-8 dark:bg-small-gray;
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
