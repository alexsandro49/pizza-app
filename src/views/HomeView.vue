<script setup lang="ts">
import { computed, ref } from "vue";
import LoginForm from "@/components/LoginForm.vue";
import SignUpForm from "@/components/SignUpForm.vue";
import pizza from "@/assets/rb_29035.png";
import { useConfigStore } from "@/stores/config";
import { useUsersStore } from "@/stores/users";
import CatalogComponent from "@/components/CatalogComponent.vue";

const configStore = useConfigStore();
const usersStore = useUsersStore();

const login = ref(true);
const faEyeIcon = ref(true);
const inputIcon = computed(() =>
  faEyeIcon.value ? "fa-regular fa-eye" : "fa-regular fa-eye-slash",
);
const inputType = computed(() => (faEyeIcon.value ? "password" : "text"));

function changeFormType() {
  login.value = !login.value;
}

function changeCurrentIcon() {
  faEyeIcon.value = !faEyeIcon.value;
}
</script>

<template >
  <main v-if="usersStore.loggedUserId === ''" :class="{ dark: configStore.darkTheme }" 
  class="bg-isabelline dark:bg-charcoal w-screen h-screen flex flex-col items-center overflow-hidden
  xl:flex-row">
    <div class="bg-tomato rounded-full mt-[-45vh] mb-5 w-[570px] h-[550px] 
    md:self-start md:rounded-l md:w-full md:mt-[-35vh] md:mb-8
    xl:max-w-[35vw] xl:h-screen xl:mt-0 xl:rounded-tr ">
      <img class="w-full md:hidden" :src="pizza" alt="Pizza image" />
    </div>

    <div class="w-full">
      <h1 class="text-tomato text-2xl text-center font-bold
      md:text-left md:pl-8 xl:pl-15
    xl:col-start-3 xl:row-start-1 xl:place-self-start xl:self-end">Pizza App</h1>

      <LoginForm v-if="login" :input-type="inputType" :input-icon="inputIcon" class="form"
        @change-form-type="changeFormType" @change-current-icon="changeCurrentIcon" />
      <SignUpForm v-else :input-type="inputType" :input-icon="inputIcon" class="form" @change-form-type="changeFormType"
        @change-current-icon="changeCurrentIcon" />
    </div>
  </main>

  <CatalogComponent v-else />
</template>

<style scoped>
@reference "@/assets/main.css";

.form {
  @apply h-full px-8 xl:px-15;
}
</style>
