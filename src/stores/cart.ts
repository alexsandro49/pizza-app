import type { IProductInCart } from "@/utils/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useProductStore } from "./products";

export const useCartStore = defineStore("cart", () => {
  const productStore = useProductStore();

  const quantitySelected = ref<IProductInCart[]>(quantitySelectedHelper());
  const products = computed(() =>
    quantitySelected.value.filter((p) => p.quantity > 0),
  );

  function addProductToCart(index: number, quantity: number) {
    if (quantity > -1 && quantity < 101) {
      quantitySelected.value[index].quantity = quantity;
    }
  }

  function quantitySelectedHelper() {
    return productStore.products.map((product) => {
      return { id: product.id, quantity: 0 };
    });
  }

  return { quantitySelected, products, addProductToCart };
});
