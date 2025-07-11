<script lang="ts" setup>
import { useConfigStore } from "@/stores/config";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed } from "vue";
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

function loggout() {
  usersStore.changeLoggedUserId("");
  router.push("/");
}
</script>

<template>
  <div class="container">
    <div class="title-container">
      <PizzaSvg class="icon-style" :pizza-color-icon="pizzaColorIcon" />
      <h1 @click="() => router.push('/')">Pizza App</h1>
    </div>

    <div class="icons-container">
      <p class="text-xl font-bold text-charcoal dark:text-isabelline">
        {{ cartSize }}
      </p>
      <font-awesome-icon
        @click="() => router.push('/cart')"
        icon="fa-solid fa-cart-shopping"
        class="icon-style"
      />
      <font-awesome-icon
        class="icon-style"
        :icon="configStore.themeIcon"
        @click="configStore.changeTheme"
      />
      <font-awesome-icon
        icon="fa-solid fa-circle-user"
        class="icon-style"
        @click="loggout"
      />
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.container {
  @apply flex bg-tomato w-screen min-h-20 max-h-20 justify-between items-center px-3;
}

h1 {
  @apply dark:text-isabelline text-charcoal text-2xl font-bold;
}

.title-container {
  @apply flex items-center justify-between gap-2.5 cursor-pointer h-12;
}

.icons-container {
  @apply flex justify-between items-center gap-2 h-12;
}

.icon-style {
  @apply dark:text-isabelline text-charcoal inline-flex cursor-pointer h-10 w-10;
}
</style>
