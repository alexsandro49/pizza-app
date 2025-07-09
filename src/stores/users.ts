import type { IUser } from "@/utils/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUsersStore = defineStore("users", () => {
  const users = ref([
    {
      id: "8bc13994fbc8c90e412fba8e7bfdff4befc76dda10ad77e244ef03105c74c2cd",
      name: "User 1",
      email: "user1@email.com",
      password:
        "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
    },
  ]);
  const loggedUserId = ref("");

  function addUser(user: IUser) {
    users.value.push(user);
  }
  function changeLoggedUserId(id: string) {
    loggedUserId.value = id;
  }

  return { users, loggedUserId, addUser, changeLoggedUserId };
});
