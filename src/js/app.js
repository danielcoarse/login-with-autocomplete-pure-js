import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";
import {
  loginUI,
  signUpUI,
  countryAutocompleteUI,
  cityAutocompleteUI,
} from "./config/ui.config";
import { validate } from "./helpers/validate";
import { showInputError, removeInputError } from "./views/form";
import {
  login,
  signup,
  getCountries,
  getCitiesByCountryCode,
} from "./services/auth.service";
import { notify } from "./views/notifications";
import { getNews } from "./services/news.service";
import "./plugins";
import { Autocomplete } from "./views/autocomplete";

const { form, inputEmail, inputPassword } = loginUI;

const inputs = [inputEmail, inputPassword];

const signUpForm = signUpUI.getForm();

// Events
document.addEventListener("DOMContentLoaded", async () => {
  const countries = await getCountries();
  const countryAutocomplete = new Autocomplete(
    countryAutocompleteUI,
    countries
  );

  countryAutocomplete.input.addEventListener("input", () => {
    onCountryAutocompleteInputHandler(countryAutocomplete);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  onSubmit();
});

inputs.forEach((el) =>
  el.addEventListener("focus", () => removeInputError(el))
);

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  onSignUpSubmit();
});

// Handlers
function onCountryAutocompleteInputHandler(countryAutocomplete) {
  countryAutocomplete.onInputHandler();

  countryAutocomplete.item.addEventListener("click", async () => {
    await countryAutocomplete.onClickHandler();
    const cities = await getCitiesByCountryCode(countryAutocomplete.index);
    enableCitiAutocomplete(cityAutocompleteUI, cities);
  });
}

function enableCitiAutocomplete(UI, data) {
  UI.input.removeAttribute("disabled");
  const cityAutocomplete = new Autocomplete(UI, data);

  cityAutocomplete.input.addEventListener("input", () => {
    onCityAutocompleteInputHandler(cityAutocomplete);

    cityAutocomplete.item.addEventListener("click", async () => {
      await cityAutocomplete.onClickHandler();
    });
  });
}

function onCityAutocompleteInputHandler(cityAutocomplete) {
  cityAutocomplete.onInputHandler();
}

async function onSubmit() {
  const isValidForm = inputs.every((el) => {
    const isValidInput = validate(el);
    if (!isValidInput) showInputError(el);
    return isValidInput;
  });

  if (!isValidForm) return;

  try {
    await login(inputEmail.value, inputPassword.value);
    await getNews();
    form.reset();
    notify({ msg: "Login success!", className: "alert-success" });
  } catch (err) {
    notify({ msg: "Login faild!", className: "alert-danger" });
  }
}

async function onSignUpSubmit() {
  const inputs = signUpUI.getInputs();
  console.log(inputs);
  const isValidForm = Object.values(inputs).every((el) => {
    const isValidInput = validate(el);
    if (!isValidInput) showInputError(el);
    return isValidInput;
  });

  if (!isValidForm) return;

  try {
    signUpUI.setFormInputsValues();
    const values = signUpUI.getFormInputsValues();
    const res = await signup(values);
    signUpForm.reset();

    notify({ msg: res, className: "alert-success", timeout: 4000 });
  } catch (err) {
    notify({ msg: res, className: "alert-danger", timeout: 4000 });
  }
}
