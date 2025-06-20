<script setup lang="ts">
import { computed, ref } from "vue";
import LoginForm from "@/components/LoginForm.vue";
import SignUpForm from "@/components/SignUpForm.vue";
import pizza from "@/assets/rb_29035.png";

const isLogin = ref(true);

const isFaEye = ref(true);
const inputIcon = computed(() =>
  isFaEye.value ? "fa-regular fa-eye" : "fa-regular fa-eye-slash",
);
const inputType = computed(() => (isFaEye.value ? "password" : "text"));

function changeFormType() {
  isLogin.value = !isLogin.value;
}

function changeCurrentIcon() {
  isFaEye.value = !isFaEye.value;
}
</script>

<template>
  <main
    class="flex flex-col w-screen h-screen p-8 box-border items-center overflow-hidden"
  >
    <div class="bg-tomato-red rounded-full mt-[-50vh] mb-5 w-[570px] h-[555px]">
      <img class="w-full" :src="pizza" alt="Pizza image" />
    </div>
    <h1 class="text-tomato-red text-2xl font-bold">Pizza App</h1>

    <LoginForm
      v-if="isLogin"
      :input-type="inputType"
      :input-icon="inputIcon"
      @change-form-type="changeFormType"
      @change-current-icon="changeCurrentIcon"
    />
    <SignUpForm
      v-else
      :input-type="inputType"
      :input-icon="inputIcon"
      @change-form-type="changeFormType"
      @change-current-icon="changeCurrentIcon"
    />
  </main>
</template>
