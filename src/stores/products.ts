import api from "@/utils/shared";
import type { IProduct } from "@/utils/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore(
  "product",
  () => {
    const products = ref<IProduct[]>([]);

    const types = ["todos", "salgada", "doce", "especial"];
    const currentType = ref(types[0]);

    function changeCurrentType() {
      currentType.value =
        types[
          (types.findIndex((type) => type === currentType.value) + 1) %
            types.length
        ];
    }

    function filteredProducts() {
      return currentType.value === types[0]
        ? products.value
        : products.value.filter((p) => p.type === currentType.value);
    }

    async function fetchProducts() {
      products.value = (await api.get("/product")).data
    }

    return { products, currentType, changeCurrentType, filteredProducts, fetchProducts };
  },
  {
    persist: true,
  },
);
