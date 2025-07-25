<script lang="ts" setup>
import type { IUser } from "@/utils/types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { onMounted, ref, watch } from "vue";
import { useUsersStore } from "@/stores/users";
import { useConfigStore } from "@/stores/config";

const emit = defineEmits(["changeFormType"]);

const configStore = useConfigStore();
const usersStore = useUsersStore();

const user = ref<IUser>({
  id: "",
  name: "",
  email: "",
  password: "",
});
const passwordConfirmation = ref("");

const signUpError = ref(false);

function changeFormTypeHandler() {
  emit("changeFormType");
}

function validateEmail(value: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
}

async function createAccount() {
  if (
    user.value.name !== "" &&
    user.value.email !== "" &&
    user.value.password !== "" &&
    user.value.password === passwordConfirmation.value &&
    validateEmail(user.value.email)
  ) {
    await usersStore.register(
      user.value.name,
      user.value.email,
      user.value.password,
    );
  }

  signUpError.value = true;
}

watch([() => user.value.password, () => passwordConfirmation.value], () => {
  if (
    (user.value.password !== "" || passwordConfirmation.value !== "") &&
    signUpError.value
  ) {
    signUpError.value = false;
  }
});

onMounted(() => {
  user.value.name = "";
  user.value.email = "";
  user.value.password = "";
  passwordConfirmation.value = "";
});
</script>

<template>
  <div
    :class="{ dark: configStore.darkTheme }"
    class="box-border h-52 w-full items-center flex flex-col mt-4"
  >
    <h2
      class="dark:text-white font-montserrat text-small-gray mb-2 font-semibold text-base md:self-start"
    >
      Cadastre-se
    </h2>
    <form
      class="font-montserrat flex flex-col justify-between items-end w-full"
    >
      <input
        class="dark:text-white dark:border-white dark:outline-white dark:placeholder:text-white mb-2 border-1 rounded-lg h-10 w-full pl-3 text-small-gray border-small-gray"
        type="text"
        v-model="user.name"
        placeholder="Nome completo"
      />
      <input
        class="dark:text-white dark:border-white dark:outline-white dark:placeholder:text-white mb-2 border-1 rounded-lg h-10 w-full pl-3 text-small-gray border-small-gray"
        type="email"
        v-model="user.email"
        placeholder="Seu melhor E-mail"
      />
      <div
        class="dark:border-white dark:outline-white focus-within:outline-1 outline-small-gray mb-2 pr-2 w-full flex items-center h-10 border-small-gray border-1 rounded-lg focus:border-1"
      >
        <input
          class="dark:text-white dark:placeholder:text-white h-10 border-none w-full pl-3 text-small-gray outline-none"
          :type="configStore.inputType"
          v-model="user.password"
          placeholder="Senha"
        />
        <font-awesome-icon
          :icon="configStore.inputIcon"
          class="dark:text-white text-small-gray text-xl inline-flex cursor-pointer"
          @click="configStore.changeHidePasswordInput()"
        />
      </div>
      <div
        class="dark:border-white dark:outline-white focus-within:outline-1 outline-small-gray mb-2 pr-2 w-full flex items-center h-10 border-small-gray border-1 rounded-lg focus:border-1"
      >
        <input
          class="dark:text-white dark:placeholder:text-white h-10 border-none w-full pl-3 text-small-gray outline-none"
          :type="configStore.inputType"
          v-model="passwordConfirmation"
          placeholder="Confirme a sua senha"
        />
        <font-awesome-icon
          :icon="configStore.inputIcon"
          class="dark:text-white text-small-gray text-xl inline-flex cursor-pointer"
          @click="configStore.changeHidePasswordInput()"
        />
      </div>
      <button
        class="bg-tomato cursor-pointer mt-2 w-full bg-tomato-red rounded-lg h-10 text-white font-bold text-xs p-1"
        @click.prevent="createAccount"
      >
        Criar conta
      </button>
    </form>
    <p class="dark:text-white font-montserrat mt-2 text-small-gray">
      Já criou a sua conta?
      <span class="text-tomato cursor-pointer" @click="changeFormTypeHandler"
        >Acesse ela aqui</span
      >
    </p>

    <p
      :class="{ visible: signUpError }"
      class="mt-5 text-tomato text-base font-bold border-1 p-2 m-1 invisible"
    >
      CREDENCIAIS INVÁLIDAS
    </p>
  </div>
</template>
