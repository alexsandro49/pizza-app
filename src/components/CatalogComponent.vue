<script lang="ts" setup>
// import { useUsersStore } from "@/stores/users";
import { useRouter } from "vue-router";
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

const router = useRouter();

const pizzaColors = ["#FF6347", "#00CECB", "#33CA7F", "#F0F757", "#006E90"];

function pizzaColorsPick(value: number): string {
  return pizzaColors[value % pizzaColors.length];
}

function goToProductPage(id: number) {
  router.push(`/${id}`);
}

function addProduct(index: number, quantity: number) {
  cartStore.addProductToCart(index, quantity);
}

onMounted(() => {
  productsQuantity.value = cartStore.quantitySelected.map((p) => p.quantity);
});
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
          class="dark:border-tomato-red border-1 h-60 flex flex-col items-center gap-1.5 p-3 rounded-3xl cursor-pointer"
        >
          <PizzaSvg
            class="w-25 h-25 mt-0.5"
            :pizza-color-icon="pizzaColorsPick(index)"
          />
          <p>{{ product.name }}</p>
          <p class="self-end">R${{ product.price.toFixed(2) }}</p>

          <div class="grid w-full gap-1.5 mt-1 grid-cols-4 items-center">
            <p class="text-center text-lg px-1">
              {{ productsQuantity[index] }}
            </p>
            <button
              class="w-full py-1 border-1 text-center border-tomato-red rounded-lg cursor-pointer text-black hover:bg-tomato-red dark:text-white"
              @click.stop="productsQuantity[index]--"
            >
              -
            </button>
            <button
              class="w-full py-1 border-1 text-center border-tomato-red rounded-lg cursor-pointer text-black hover:bg-tomato-red dark:text-white"
              @click.stop="productsQuantity[index]++"
            >
              +
            </button>

            <font-awesome-icon
              @click.stop="addProduct(index, productsQuantity[index])"
              icon="fa-solid fa-cart-plus"
              class="w-full py-2 border-1 border-tomato-red rounded-lg hover:bg-tomato-red dark:text-white cursor-pointer"
            />
          </div>
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
