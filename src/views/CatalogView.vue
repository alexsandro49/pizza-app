<script lang="ts" setup>
// import { useUsersStore } from "@/stores/users";
// import { useRouter } from "vue-router";
import HeaderComponent from "@/components/HeaderComponent.vue";
import { useConfigStore } from "@/stores/config";
import { useProductStore } from "@/stores/products";
import PizzaSvg from "@/components/PizzaSvg.vue";

// const usersStore = useUsersStore();
const configStore = useConfigStore();
const productStore = useProductStore();

const pizzaColors = ["#FF6347", "#00CECB", "#33CA7F", "#F0F757", "#006E90"];

function pizzaColorsPick(value: number): string {
  return pizzaColors[value % pizzaColors.length];
}

/*
const router = useRouter();

function loggout() {
  usersStore.changeLoggedUserId("");
  router.push("/");
} */
</script>

<template>
  <main :class="{ dark: configStore.darkTheme }">
    <HeaderComponent class="mt-[-2em]" />

    <div
      class="w-full h-full mt-4 grid grid-cols-2 gap-2 overflow-y-scroll hide-scrollbar"
    >
      <div v-for="(product, index) in productStore.products" :key="product.id">
        <div
          class="dark:border-tomato-red border-1 h-60 flex flex-col items-center gap-1.5 p-3 rounded-3xl"
        >
          <PizzaSvg
            class="w-25 h-25 mt-0.5"
            :pizza-color-icon="pizzaColorsPick(index)"
          />
          <p>{{ product.name }}</p>
          <p class="self-end">R${{ product.price.toFixed(2) }}</p>
          <p class="self-end border-1 p-1 rounded-lg mt-1 hover:bg-tomato-red">
            Detalhes
          </p>
        </div>
      </div>
    </div>

    <div
      class="theme-selector-container group"
      @click="configStore.changeTheme"
    >
      <font-awesome-icon
        class="theme-selector-icon"
        :icon="configStore.themeIcon"
      />
    </div>
  </main>
</template>

<style scoped>
@reference "@/assets/main.css";

main {
  @apply flex flex-col items-center justify-between h-screen w-screen overflow-hidden p-8
  dark:bg-small-gray;
}

.theme-selector-container {
  /* @apply self-end mt-auto border-1 border-tomato-red rounded-full w-12 h-12 flex justify-center items-center hover:bg-tomato-red hover:cursor-pointer; */
  @apply border-1 border-tomato-red rounded-full hover:bg-tomato-red hover:cursor-pointer w-12 h-12 z-100 absolute bottom-5 right-5  flex justify-center items-center;
}

.theme-selector-icon {
  @apply text-tomato-red text-xl group-hover:text-small-gray;
}

.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

p {
  @apply dark:text-white;
}
</style>
