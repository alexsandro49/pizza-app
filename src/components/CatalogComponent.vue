<script lang="ts" setup>
import HeaderComponent from "@/components/HeaderComponent.vue";
import { useConfigStore } from "@/stores/config";
import { useProductStore } from "@/stores/products";
import CatalogCard from "./CatalogCard.vue";

const configStore = useConfigStore();
const productStore = useProductStore();
</script>

<template>
  <main :class="{ dark: configStore.darkTheme }" 
  class="bg-isabelline dark:bg-charcoal w-screen h-screen flex flex-col items-center overflow-hidden
  ">
    <HeaderComponent class="" />

    <div class="w-full h-auto px-4 md:px-8 xl:px-12 overflow-hidden">
      <p
        @click="productStore.changeCurrentType()"
        class="self-start py-2 text-lg cursor-pointer dark:text-isabelline text-charcoal"
      >
        TIPO: {{ productStore.currentType.toUpperCase() }}
        <font-awesome-icon icon="fa-solid fa-rotate" class="ml-1" />
      </p>
  
      <div
        class="w-full grid grid-cols-2 gap-2 overflow-y-scroll 
        sm:grid-cols-3 lg:grid-cols-4
        
        hide-scrollbar"
      >
        <div
          v-for="(product, index) in productStore.filteredProducts()"
          :key="product.id"
        >
          <CatalogCard :product :index />
        </div>
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
