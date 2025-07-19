import api from "@/utils/shared";
import type { IUser } from "@/utils/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUsersStore = defineStore(
  "users",
  () => {
    const userData = ref<IUser>();

    async function register(name: string, email: string, password: string) {
      try {
        await api
          .post("/auth/register", {
            name,
            email,
            password,
          })
          .then((user) => {
            userData.value = user.data;
          });

        console.log(userData);
      } catch (error) {
        console.log(error);
      }
    }

    async function login(email: string, password: string) {
      try {
        await api
          .post("/auth/login", {
            email,
            password,
          })
          .then((user) => {
            userData.value = user.data;
          });
      } catch (error) {
        console.log(error);
      }
    }

    function loggout() {
      userData.value = undefined;
    }

    return { userData, register, login, loggout };
  },
  {
    persist: true,
  },
);
