<script lang="ts" setup>
import HeaderComponent from "@/components/HeaderComponent.vue";
import { useConfigStore } from "@/stores/config";
import { useProductStore } from "@/stores/products";
import CatalogCard from "./CatalogCard.vue";
import { onMounted } from "vue";
import { useCartStore } from "@/stores/shoppingCart";

const configStore = useConfigStore();
const productStore = useProductStore();
const cartStore = useCartStore();

onMounted(async () => {
  await productStore.fetchProducts();
  cartStore.quantitySelectedHelper();
});
</script>

<template>
  <main
    :class="{ dark: configStore.darkTheme }"
    class="bg-isabelline dark:bg-charcoal w-screen h-screen flex flex-col items-center overflow-hidden"
  >
    <HeaderComponent />

    <p
      @click="productStore.changeCurrentType()"
      class="self-start py-2 px-4 md:px-8 xl:px-12 text-lg cursor-pointer dark:text-isabelline text-charcoal"
    >
      TIPO: {{ productStore.currentType.toUpperCase() }}
      <font-awesome-icon icon="fa-solid fa-rotate" class="ml-1" />
    </p>

    <div
      class="w-full h-auto px-4 md:px-8 xl:px-12 pb-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 overflow-y-scroll hide-scrollbar"
    >
      <div
        v-for="(product, index) in productStore.filteredProducts()"
        :key="product.id"
      >
        <CatalogCard :product :index />
      </div>
    </div>
  </main>
</template>

<style scoped>
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
</style>
