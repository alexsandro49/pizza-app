import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useConfigStore = defineStore("config", () => {
  const darkTheme = ref(true);
  const displaySignInForm = ref(true);
  const hidePasswordInput = ref(true);

  const inputIcon = computed(() =>
    hidePasswordInput.value ? "fa-regular fa-eye" : "fa-regular fa-eye-slash",
  );
  const inputType = computed(() =>
    hidePasswordInput.value ? "password" : "text",
  );

  const themeIcon = computed(() => {
    return darkTheme.value ? "fa-regular fa-sun" : "fa-regular fa-moon";
  });

  function changeTheme() {
    darkTheme.value = !darkTheme.value;
  }

  function changeDisplayedForm() {
    displaySignInForm.value = !displaySignInForm.value;
  }

  function changeHidePasswordInput() {
    hidePasswordInput.value = !hidePasswordInput.value;
  }

  return {
    darkTheme,
    displaySignInForm,
    hidePasswordInput,
    themeIcon,
    inputIcon,
    inputType,
    changeTheme,
    changeDisplayedForm,
    changeHidePasswordInput,
  };
});
