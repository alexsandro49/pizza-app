<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const emit = defineEmits(["changeFormType", "changeCurrentIcon"]);
const props = defineProps<{
  inputType: string;
  inputIcon: string;
}>();

function changeFormTypeHandler() {
  emit("changeFormType");
}

function changeCurrentIconHandler() {
  emit("changeCurrentIcon");
}
</script>

<template>
  <div class="box-border h-52 w-full items-center flex flex-col mt-4">
    <p class="font-montserrat text-small-gray mb-2 font-semibold text-base">
      Cadastre-se
    </p>
    <form
      class="font-montserrat flex flex-col justify-between items-end w-full"
    >
      <input
        class="mb-2 border-1 rounded-lg h-10 w-full pl-3 text-small-gray border-small-gray"
        type="text"
        placeholder="Nome completo"
      />
      <input
        class="mb-2 border-1 rounded-lg h-10 w-full pl-3 text-small-gray border-small-gray"
        type="text"
        placeholder="E-mail ou Telefone"
      />
      <div
        class="focus-within:outline-1 outline-small-gray mb-2 pr-2 w-full flex items-center h-10 border-small-gray border-1 rounded-lg focus:border-1"
      >
        <input
          class="h-10 border-none w-full pl-3 text-small-gray outline-none"
          :type="props.inputType"
          placeholder="Senha"
        />
        <font-awesome-icon
          :icon="props.inputIcon"
          class="text-small-gray text-xl inline-flex cursor-pointer"
          @click="changeCurrentIconHandler"
        />
      </div>
      <div
        class="focus-within:outline-1 outline-small-gray mb-2 pr-2 w-full flex items-center h-10 border-small-gray border-1 rounded-lg focus:border-1"
      >
        <input
          class="h-10 border-none w-full pl-3 text-small-gray outline-none"
          :type="props.inputType"
          placeholder="Confirme a sua senha"
        />
        <font-awesome-icon
          :icon="props.inputIcon"
          class="text-small-gray text-xl inline-flex cursor-pointer"
          @click="changeCurrentIconHandler"
        />
      </div>
      <button
        class="cursor-pointer mt-2 w-full bg-tomato-red rounded-lg h-10 text-white font-bold text-xs p-1"
      >
        Criar conta
      </button>
    </form>
    <p class="font-montserrat mt-2 text-small-gray">
      Já criou a sua conta?
      <span
        class="text-tomato-red cursor-pointer"
        @click="changeFormTypeHandler"
        >Acesse ela aqui</span
      >
    </p>
  </div>
</template>
