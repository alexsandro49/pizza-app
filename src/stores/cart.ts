import type { IProductInCart } from "@/utils/types";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useProductStore } from "./products";

export const useCartStore = defineStore("cart", () => {
  const productStore = useProductStore();

  const quantitySelected = ref<IProductInCart[]>(quantitySelectedHelper());
  const products = ref(quantitySelected.value.filter((p) => p.quantity > 0));

  function addProductToCart(index: number, quantity: number) {
    if (quantity < 101) {
      quantitySelected.value[index].quantity = quantity;
    }
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

  watch([products.value, quantitySelected], ([newValue], []) => {
    products.value = quantitySelected.value.filter((p) => p.quantity > 0);

    if (!newValue.every((p) => p.quantity > 0)) {
      const helper = newValue.findIndex((product) => product.quantity === 0);

      products.value.slice(helper, 1);
    }
  });

  return { quantitySelected, products, addProductToCart };
});
