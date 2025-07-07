import type { IProductInCart } from "@/utils/types";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state(): { products: IProductInCart[] } {
    return {
      products: [],
    };
  },
  actions: {
    addProductToCart(id: string, quantity: number) {
      const index = this.products.findIndex((product) => product.id === id);

      if (index !== -1) {
        if (quantity === 0) {
          this.products.splice(index, 1);
        }

        this.products[index].quantity = quantity;
      } else {
        if (quantity !== 0) {
          this.products.push({ id, quantity });
        }
      }
    },
    resetDisplayedQuantity(id: string) {
      const index = this.products.findIndex((product) => product.id === id);

      if (index !== -1) {
        return this.products[index].quantity;
      } else {
        return 0;
      }
    },
  },
});
