<script setup lang="ts">
import { ref } from "vue";
import LoginForm from "@/components/LoginForm.vue";
import SignUpForm from "@/components/SignUpForm.vue";

const isLogin = ref(true);

function changeFormType() {
  isLogin.value = !isLogin.value;
}
</script>

<template>
  <main class="flex flex-col w-screen h-screen p-8 box-border items-center">
    <h1 class="text-tomato-red text-2xl font-bold">Pizza App</h1>

    <LoginForm v-if="isLogin" @change-form-type="changeFormType" />
    <SignUpForm v-else @change-form-type="changeFormType" />
  </main>
</template>
