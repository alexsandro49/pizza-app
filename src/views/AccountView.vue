<script lang="ts" setup>
import { useUsersStore } from "@/stores/users";

const usersStore = useUsersStore();
</script>

<template>
  <h1>{{ usersStore.userData?.name }}</h1>
</template>
