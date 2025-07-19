<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { onMounted, ref, watch } from "vue";
import type { IUser } from "@/utils/types";
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
const loginError = ref(false);

function changeFormTypeHandler() {
  emit("changeFormType");
}

async function loginHandler() {
  await usersStore.login(user.value.email, user.value.password);

  user.value.email = "";
  user.value.password = "";
}

watch([user.value.email, user.value.password], () => {
  loginError.value = false;

  if (
    user.value.email === "" &&
    user.value.password === "" &&
    !loginError.value
  ) {
    loginError.value = true;
  }
});

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
    <h2
      class="text-charcoal dark:text-isabelline font-montserrat mb-2 font-semibold text-base md:self-start"
    >
      Acesse a sua conta
    </h2>

    <form
      class="font-montserrat flex flex-col justify-between items-end w-full"
    >
      <input
        v-model="user.email"
        class="dark:text-isabelline dark:border-isabelline dark:outline-isabelline dark:placeholder:text-isabelline mb-2 border-1 rounded-lg h-10 w-full pl-3 text-charcoal border-charcoal outline-charcoal"
        type="email"
        placeholder="E-mail ou Telefone"
      />

      <div
        class="dark:border-isabelline dark:outline-isabelline focus-within:outline-1 outline-charcoal mb-2 pr-2 w-full flex items-center h-10 border-charcoal border-1 rounded-lg focus:border-1"
      >
        <input
          v-model="user.password"
          class="dark:text-isabelline dark:placeholder:text-isabelline h-10 border-none w-full pl-3 text-charcoal outline-none"
          :type="configStore.inputType"
          placeholder="Senha"
        />
        <font-awesome-icon
          :icon="configStore.inputIcon"
          class="dark:text-isabelline text-charcoal text-xl inline-flex cursor-pointer"
          @click="configStore.changeHidePasswordInput()"
        />
      </div>

      <a class="text-tomato cursor-pointer mb-3 text-tomato-red text-base"
        >Esqueci a minha senha</a
      >
      <button
        class="w-full bg-tomato rounded-lg h-10 text-isabelline font-bold text-xs p-1 cursor-pointer"
        @click.prevent="loginHandler"
      >
        Entrar
      </button>
    </form>

    <p class="dark:text-isabelline font-montserrat mt-2 text-charcoal">
      Ainda não criou a sua conta?
      <a class="text-tomato cursor-pointer" @click="changeFormTypeHandler"
        >Cadastre-se</a
      >
    </p>

    <Transition>
      <p
        v-show="loginError"
        class="mt-5 text-tomato text-base font-bold border-1 p-2 m-1"
      >
        CREDENCIAIS INVÁLIDAS
      </p>
    </Transition>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
