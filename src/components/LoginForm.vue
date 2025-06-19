<template>
  <div class="box-border h-52 w-full items-center flex flex-col mt-4">
    <p class="font-montserrat text-small-gray mb-2 font-semibold">
      Acesse a sua conta
    </p>
    <form
      class="font-montserrat flex flex-col justify-between items-end w-full"
    >
      <input
        class="mb-2 border-1 rounded-lg h-10 w-full pl-3 text-small-gray border-small-gray"
        type="text"
        placeholder="E-mail ou Telefone"
      />
      <input
        class="mb-2 border-1 rounded-lg h-10 w-full pl-3 text-small-gray border-small-gray"
        type="password"
        placeholder="Senha"
      />
      <p class="mb-3 text-tomato-red text-xs">Esqueci a minha senha</p>
      <button
        class="w-full bg-tomato-red rounded-lg h-10 text-white font-bold text-xs p-1"
      >
        Entrar
      </button>
    </form>
    <p class="font-montserrat mt-2 text-small-gray">
      Ainda não criou a sua conta?
      <span class="text-tomato-red">Cadastre-se</span>
    </p>
  </div>
</template>
