import type { IProductInCart } from "@/utils/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore("cart", () => {
  const products = ref<IProductInCart[]>([]);

  function addProductToCart(id: string, quantity: number) {
    const index = products.value.findIndex((product) => product.id === id);

    if (index !== -1) {
      if (quantity === 0) {
        products.value.splice(index, 1);
      }

      products.value[index].quantity = quantity;
    } else {
      if (quantity !== 0) {
        products.value.push({ id, quantity });
      }
    }
  }

  function resetDisplayedQuantity(id: string) {
    const index = products.value.findIndex((product) => product.id === id);

    if (index !== -1) {
      return products.value[index].quantity;
    } else {
      return 0;
    }
  }

  return { products, addProductToCart, resetDisplayedQuantity };
});
