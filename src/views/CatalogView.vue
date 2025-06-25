<script lang="ts" setup>
import { useUsersStore } from "@/stores/users";
import { useRouter } from "vue-router";

const usersStore = useUsersStore();

const router = useRouter();

function loggout() {
  usersStore.changeLoggedUserId("");
  router.push("/");
}
</script>

<template>
  <main>
    <h1>CATALOG VIEW</h1>
    <p>USER NAME: {{ usersStore.getLoggedUser?.name }}</p>
    <button
      @click="loggout"
      class="bg-tomato-red p-2 rounded text-white font-bold w-44 mt-1 cursor-pointer"
    >
      LOGGOUT
    </button>
  </main>
</template>
