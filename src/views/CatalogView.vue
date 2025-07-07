<script lang="ts" setup>
// import { useUsersStore } from "@/stores/users";
// import { useRouter } from "vue-router";
import HeaderComponent from "@/components/HeaderComponent.vue";
import { useConfigStore } from "@/stores/config";
import { useProductStore } from "@/stores/products";
import PizzaSvg from "@/components/PizzaSvg.vue";
import { onMounted, ref } from "vue";
import { useCartStore } from "@/stores/cart";

// const usersStore = useUsersStore();
const configStore = useConfigStore();
const productStore = useProductStore();
const cartStore = useCartStore();
const productsQuantity = ref(productStore.products.map(() => 0));

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

/*
const router = useRouter();

function loggout() {
  usersStore.changeLoggedUserId("");
  router.push("/");
} */
</script>

<template>
  <main :class="{ dark: configStore.darkTheme }">
    <HeaderComponent class="mt-[-2em]" />

    <div
      class="w-full h-full mt-4 grid grid-cols-2 gap-2 overflow-y-scroll hide-scrollbar"
    >
      <div v-for="(product, index) in productStore.products" :key="product.id">
        <div
          class="dark:border-tomato-red border-1 h-60 flex flex-col items-center gap-1.5 p-3 rounded-3xl"
        >
          <PizzaSvg
            class="w-25 h-25 mt-0.5"
            :pizza-color-icon="pizzaColorsPick(index)"
          />
          <p>{{ product.name }}</p>
          <p class="self-end">R${{ product.price.toFixed(2) }}</p>

          <div class="flex items-center w-full justify-end gap-2 mt-1">
            <div class="flex w-full justify-end gap-1 items-center">
              <p class="text-lg px-1">{{ productsQuantity[index] }}</p>
              <button
                class="w-6 py-1 border-1 text-center border-tomato-red rounded-lg cursor-pointer text-black hover:bg-tomato-red dark:text-white"
                @click="reduceProductInCart(index)"
              >
                -
              </button>
              <button
                class="w-6 py-1 border-1 text-center border-tomato-red rounded-lg cursor-pointer text-black hover:bg-tomato-red dark:text-white"
                @click="increaseProductInCart(index)"
              >
                +
              </button>
            </div>

            <p
              class="self-end border-1 border-tomato-red p-1 rounded-lg hover:bg-tomato-red"
              @click="addProductToCart(index)"
            >
              ADICIONAR
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="theme-selector-container group"
      @click="configStore.changeTheme"
    >
      <font-awesome-icon
        class="theme-selector-icon"
        :icon="configStore.themeIcon"
      />
    </div>
  </main>
</template>

<style scoped>
@reference "@/assets/main.css";

main {
  @apply flex flex-col items-center justify-between h-screen w-screen overflow-hidden p-8 dark:bg-small-gray;
}

.theme-selector-container {
  /* @apply self-end mt-auto border-1 border-tomato-red rounded-full w-12 h-12 flex justify-center items-center hover:bg-tomato-red hover:cursor-pointer; */
  @apply border-1 border-tomato-red rounded-full hover:bg-tomato-red hover:cursor-pointer w-12 h-12 z-100 absolute bottom-5 right-5 flex justify-center items-center;
}

.theme-selector-icon {
  @apply text-tomato-red text-xl group-hover:text-small-gray;
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
