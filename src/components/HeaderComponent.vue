<script lang="ts" setup>
import { useConfigStore } from "@/stores/config";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed, ref } from "vue";
import PizzaSvg from "./PizzaSvg.vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { useUsersStore } from "@/stores/users";

const configStore = useConfigStore();
const usersStore = useUsersStore();
const cartStore = useCartStore();

const router = useRouter();

const pizzaColorIcon = computed(() =>
  configStore.darkTheme ? "#EFEEEA" : "#273F4F",
);

const cartSize = computed(() => {
  return cartStore.products.filter((p) => p.quantity > 0).length;
});

const displayedFloatingMenu = ref(false);

function goToHomePage() {
  router.push("/");
}

function goToShoppingCartPage() {
  router.push("/cart");
}

function goToAccountPage() {
  router.push("/account");
}

function goToOrdersPage() {
  router.push("/orders");
}

function loggout() {
  configStore.displaySignInForm = true;
  usersStore.changeLoggedUserId("");
  router.push("/");
}
</script>

<template>
  <header
    v-on:touchstart="displayedFloatingMenu = false"
    class="flex bg-tomato w-screen min-h-20 max-h-20 justify-between items-center px-4 md:px-8 xl:px-12"
  >
    <div class="flex items-center justify-between gap-2.5 cursor-pointer h-12">
      <PizzaSvg class="icon-style" :pizza-color-icon="pizzaColorIcon" />
      <h1
        class="dark:text-isabelline text-charcoal text-2xl font-bold"
        @click="goToHomePage()"
      >
        Pizza App
      </h1>
    </div>

    <div class="flex justify-between items-center gap-2 h-12">
      <p class="text-xl font-bold text-charcoal dark:text-isabelline">
        {{ cartSize }}
      </p>
      <font-awesome-icon
        @click="goToShoppingCartPage()"
        icon="fa-solid fa-cart-shopping"
        class="icon-style"
      />
      <font-awesome-icon
        class="icon-style"
        :icon="configStore.themeIcon"
        @click="configStore.changeTheme"
      />

      <div
        @touchstart.stop="displayedFloatingMenu = true"
        class="relative group flex flex-col"
      >
        <font-awesome-icon
          icon="fa-solid fa-circle-user"
          class="icon-style z-50"
        />

        <div
          :class="{ visible: displayedFloatingMenu }"
          class="group-hover:visible invisible top-[150%] absolute duration-400 self-end bg-tomato text-isabelline flex flex-col w-25 h-auto text-center justify-center rounded-b-2xl"
        >
          <a
            class="py-1 border-b-1 border-charcoal dark:border-isabelline text-charcoal dark:text-isabelline hover:text-charcoal dark:hover:text-charcoal hover:font-bold cursor-pointer"
            @click.stop="goToAccountPage()"
            >Conta</a
          >
          <a
            class="py-1 border-b-1 border-charcoal dark:border-isabelline text-charcoal dark:text-isabelline hover:text-charcoal dark:hover:text-charcoal hover:font-bold cursor-pointer"
            @click.stop="goToOrdersPage()"
            >Pedidos</a
          >
          <a
            class="py-1 pb-2 text-charcoal dark:text-isabelline hover:text-charcoal dark:hover:text-charcoal hover:font-bold cursor-pointer"
            @click.stop="loggout()"
            >Desconectar</a
          >
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
@reference "@/assets/main.css";

.icon-style {
  @apply dark:text-isabelline text-charcoal inline-flex cursor-pointer h-10 w-10;
}
</style>
