<script lang="ts" setup>
import { useUsersStore } from "@/stores/users";
import { useRouter } from "vue-router";
import HeaderComponent from "@/components/HeaderComponent.vue";
import { useConfigStore } from "@/stores/config";

const usersStore = useUsersStore();
const configStore = useConfigStore();

const router = useRouter();

function loggout() {
  usersStore.changeLoggedUserId("");
  router.push("/");
}
</script>

<template>
  <main :class="{ dark: configStore.darkTheme }">
    <HeaderComponent class="mt-[-2em]" />
    <h1>CATALOG VIEW</h1>
    <p>USER NAME: {{ usersStore.getLoggedUser?.name }}</p>
    <button
      @click="loggout"
      class="bg-tomato-red p-2 rounded text-white font-bold w-44 mt-1 cursor-pointer"
    >
      LOGGOUT
    </button>

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
  @apply self-end mt-auto border-1 border-tomato-red rounded-full w-12 h-12 flex justify-center items-center hover:bg-tomato-red hover:cursor-pointer;
}

.theme-selector-icon {
  @apply text-tomato-red text-xl group-hover:text-small-gray;
}
</style>
