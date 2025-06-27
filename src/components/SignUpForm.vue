<script lang="ts" setup>
import { hashHandler, hashRandomValue } from "@/utils/shared";
import type { IUser } from "@/utils/types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "@/stores/users";
import { useConfigStore } from "@/stores/config";

const configStore = useConfigStore()
const usersStore = useUsersStore();

const router = useRouter();

const emit = defineEmits(["changeFormType", "changeCurrentIcon"]);
const props = defineProps<{
  inputType: string;
  inputIcon: string;
}>();

const user = ref<IUser>({
  id: "",
  name: "",
  email: "",
  password: "",
});

const passwordConfirmation = ref("");

function changeFormTypeHandler() {
  emit("changeFormType");
}

function changeCurrentIconHandler() {
  emit("changeCurrentIcon");
}

async function createAccount() {
  await hashRandomValue().then((value) => (user.value.id = value));
  await hashHandler(user.value.password).then(
    (value) => (user.value.password = value),
  );

  usersStore.addUser(user.value);
  usersStore.changeLoggedUserId(user.value.id);

  router.push("/catalog");
}

onMounted(() => {
  user.value.id = "";
  user.value.name = "";
  user.value.email = "";
  user.value.password = "";
});
</script>

<template>
  <div
    :class="{ dark: configStore.darkTheme }"
    class="box-border h-52 w-full items-center flex flex-col mt-4"
  >
    <p
      class="dark:text-white font-montserrat text-small-gray mb-2 font-semibold text-base md:self-start"
    >
      Cadastre-se
    </p>
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
        placeholder="E-mail ou Telefone"
      />
      <div
        class="dark:border-white dark:outline-white focus-within:outline-1 outline-small-gray mb-2 pr-2 w-full flex items-center h-10 border-small-gray border-1 rounded-lg focus:border-1"
      >
        <input
          class="dark:text-white dark:placeholder:text-white h-10 border-none w-full pl-3 text-small-gray outline-none"
          :type="props.inputType"
          v-model="user.password"
          placeholder="Senha"
        />
        <font-awesome-icon
          :icon="props.inputIcon"
          class="dark:text-white text-small-gray text-xl inline-flex cursor-pointer"
          @click="changeCurrentIconHandler"
        />
      </div>
      <div
        class="dark:border-white dark:outline-white focus-within:outline-1 outline-small-gray mb-2 pr-2 w-full flex items-center h-10 border-small-gray border-1 rounded-lg focus:border-1"
      >
        <input
          class="dark:text-white dark:placeholder:text-white h-10 border-none w-full pl-3 text-small-gray outline-none"
          :type="props.inputType"
          v-model="passwordConfirmation"
          placeholder="Confirme a sua senha"
        />
        <font-awesome-icon
          :icon="props.inputIcon"
          class="dark:text-white text-small-gray text-xl inline-flex cursor-pointer"
          @click="changeCurrentIconHandler"
        />
      </div>
      <button
        class="cursor-pointer mt-2 w-full bg-tomato-red rounded-lg h-10 text-white font-bold text-xs p-1"
        @click.prevent="createAccount"
      >
        Criar conta
      </button>
    </form>
    <p class="dark:text-white font-montserrat mt-2 text-small-gray">
      Já criou a sua conta?
      <span
        class="text-tomato-red cursor-pointer"
        @click="changeFormTypeHandler"
        >Acesse ela aqui</span
      >
    </p>
  </div>
</template>
