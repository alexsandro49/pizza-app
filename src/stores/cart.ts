import type { IProductInCart } from "@/utils/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useProductStore } from "./products";

export const useCartStore = defineStore("cart", () => {
  const productStore = useProductStore();

  const products = ref<IProductInCart[]>(quantitySelectedHelper());

  function findIndexByProductId(productId: string): number {
    return products.value.findIndex((p) => p.id === productId)!;
  }

  function increaseProductQuantity(id: string) {
    if (products.value[findIndexByProductId(id)].quantity === 100) return;

    products.value[findIndexByProductId(id)].quantity++;
  }

  function decreaseProductQuantity(id: string) {
    if (products.value[findIndexByProductId(id)].quantity === 0) return;

    products.value[findIndexByProductId(id)].quantity--;
  }

  function removeProductQuantity(id: string) {
    const currentQuantity = products.value[findIndexByProductId(id)].quantity;
    products.value[findIndexByProductId(id)].quantity -= currentQuantity;
  }

  function quantitySelectedHelper() {
    // return productStore.products.map((product) => {
    //   return { id: product.id, quantity: 0 };
    // });

    const helper = productStore.products.map((product) => {
      return { id: product.id, quantity: 0 };
    });

    helper[0].quantity = 2;
    helper[1].quantity = 5;
    helper[2].quantity = 5;
    helper[3].quantity = 2;
    return helper;
  }

  return {
    products,
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProductQuantity,
  };
});
