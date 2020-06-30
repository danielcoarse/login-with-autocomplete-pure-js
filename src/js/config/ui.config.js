export const loginUI = {
  form: document.forms["loginForm"],
  inputEmail: document.getElementById("email"),
  inputPassword: document.getElementById("password"),
};

class SignUpUI {
  constructor() {
    this._form = document.forms["signUpForm"];
    this.inputs = {};
    this.inputsValues = {};
  }

  getForm() {
    return this._form;
  }
  getInputs() {
    return (this.inputs = {
      email: this._form.elements.email,
      password: this._form.elements.password,
      nickname: this._form.elements.nickname,
      first_name: this._form.elements.firstname,
      last_name: this._form.elements.lastname,
      phone: this._form.elements.phone,
      gender_orientation: this._form.elements.gender,
      city: this._form.elements.city,
      country: this._form.elements.country,
      date_of_birth_day: this._form.elements.birthDay,
      date_of_birth_month: this._form.elements.birthMonth,
      date_of_birth_year: this._form.elements.birthYear,
    });
  }
  setFormInputsValues() {
    this.inputsValues = {
      email: this._form.elements.email.value,
      password: this._form.elements.password.value,
      nickname: this._form.elements.nickname.value,
      first_name: this._form.elements.firstname.value,
      last_name: this._form.elements.lastname.value,
      phone: this._form.elements.phone.value,
      gender_orientation: this._form.elements.gender.value,
      city: this._form.elements.city.value,
      country: this._form.elements.country.value,
      date_of_birth_day: this._form.elements.birthDay.value,
      date_of_birth_month: this._form.elements.birthMonth.value,
      date_of_birth_year: this._form.elements.birthYear.value,
    };
  }
  getFormInputsValues() {
    return this.inputsValues;
  }
}

export const signUpUI = new SignUpUI();

export const countryAutocompleteUI = {
  input: document.getElementById("country-autocomplete"),
  wrap: document.querySelector(".autocomplete-wrap-country"),
  list: document.querySelector(".autocomplete-list-country"),
}

export const cityAutocompleteUI = {
  input: document.getElementById("city-autocomplete"),
  wrap: document.querySelector(".autocomplete-wrap-city"),
  list: document.querySelector(".autocomplete-list-city"),
}