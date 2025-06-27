<script setup lang="ts">
import { computed, ref } from "vue";
import LoginForm from "@/components/LoginForm.vue";
import SignUpForm from "@/components/SignUpForm.vue";
import pizza from "@/assets/rb_29035.png";

const login = ref(true);

const faEye = ref(true);
const inputIcon = computed(() =>
  faEye.value ? "fa-regular fa-eye" : "fa-regular fa-eye-slash",
);
const inputType = computed(() => (faEye.value ? "password" : "text"));

const darkTheme = ref(true);
const themeIcon = computed(() =>
  darkTheme.value ? "fa-regular fa-sun" : "fa-regular fa-moon",
);

function changeFormType() {
  login.value = !login.value;
}

function changeCurrentIcon() {
  faEye.value = !faEye.value;
}

function changeTheme() {
  darkTheme.value = !darkTheme.value;
}
</script>

<template>
  <main :class="{ dark: darkTheme }">
    <div class="orange-div">
      <img :src="pizza" alt="Pizza image" />
    </div>
    <h1>Pizza App</h1>

    <LoginForm
      v-if="login"
      :input-type="inputType"
      :input-icon="inputIcon"
      :theme="darkTheme"
      @change-form-type="changeFormType"
      @change-current-icon="changeCurrentIcon"
    />
    <SignUpForm
      v-else
      :input-type="inputType"
      :input-icon="inputIcon"
      :theme="darkTheme"
      @change-form-type="changeFormType"
      @change-current-icon="changeCurrentIcon"
    />

    <div class="theme-selector-container group" @click="changeTheme">
      <font-awesome-icon class="theme-selector-icon" :icon="themeIcon" />
    </div>
  </main>
</template>

<style>
@reference "@/assets/main.css";

main {
  @apply flex flex-col w-screen h-screen p-8 box-border items-center overflow-hidden bg-white dark:bg-small-gray;
}

img {
  @apply w-full md:hidden;
}

h1 {
  @apply text-tomato-red text-2xl font-bold md:self-start;
}

.orange-div {
  @apply bg-tomato-red rounded-full mt-[-50vh] mb-5 w-[570px] h-[555px] md:self-start md:w-[101vw] md:rounded-l md:mt-[-35vh] ml-[-4vw];
}

.theme-selector-container {
  @apply self-end mt-auto border-1 border-tomato-red rounded-full w-12 h-12 flex justify-center items-center hover:bg-tomato-red hover:cursor-pointer;
}

.theme-selector-icon {
  @apply text-tomato-red text-xl group-hover:text-small-gray;
}
</style>
