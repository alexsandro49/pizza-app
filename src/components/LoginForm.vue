<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const emit = defineEmits(["changeFormType", "changeCurrentIcon"]);
const props = defineProps<{
  inputType: string;
  inputIcon: string;
  theme: boolean;
}>();

function changeFormTypeHandler() {
  emit("changeFormType");
}

function changeCurrentIconHandler() {
  emit("changeCurrentIcon");
}
</script>

<template>
  <div
    :class="{ dark: props.theme }"
    class="box-border h-52 w-full items-center flex flex-col mt-4"
  >
    <p
      class="dark:text-white font-montserrat text-small-gray mb-2 font-semibold text-base"
    >
      Acesse a sua conta
    </p>
    <form
      class="font-montserrat flex flex-col justify-between items-end w-full"
    >
      <input
        class="dark:text-white dark:border-white dark:outline-white dark:placeholder:text-white mb-2 border-1 rounded-lg h-10 w-full pl-3 text-small-gray border-small-gray outline-small-gray"
        type="text"
        placeholder="E-mail ou Telefone"
      />
      <div
        class="dark:border-white dark:outline-white focus-within:outline-1 outline-small-gray mb-2 pr-2 w-full flex items-center h-10 border-small-gray border-1 rounded-lg focus:border-1"
      >
        <input
          class="dark:text-white dark:placeholder:text-white h-10 border-none w-full pl-3 text-small-gray outline-none"
          :type="props.inputType"
          placeholder="Senha"
        />
        <font-awesome-icon
          :icon="props.inputIcon"
          class="dark:text-white text-small-gray text-xl inline-flex cursor-pointer"
          @click="changeCurrentIconHandler"
        />
      </div>
      <a class="mb-3 text-tomato-red text-base cursor-pointer"
        >Esqueci a minha senha</a
      >
      <button
        class="w-full bg-tomato-red rounded-lg h-10 text-white font-bold text-xs p-1 cursor-pointer"
      >
        Entrar
      </button>
    </form>
    <p class="dark:text-white font-montserrat mt-2 text-small-gray">
      Ainda não criou a sua conta?
      <a class="text-tomato-red cursor-pointer" @click="changeFormTypeHandler"
        >Cadastre-se</a
      >
    </p>
  </div>
</template>
