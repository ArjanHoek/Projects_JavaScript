const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmation = document.getElementById('confirmation');

// FUNCTIONS
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
};

const showSuccess = input => (input.parentElement.className = 'form-control');

const checkEmail = input => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  regex.test(input.value.trim())
    ? showSuccess(input)
    : showError(input, `${getFieldName(input)} is not valid`);
};

const checkRequired = inputs =>
  inputs.forEach(input =>
    input.value.trim() === ''
      ? showError(input, `${getFieldName(input)} is required`)
      : showSuccess(input)
  );

const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

const checkPasswordsMatch = (input1, input2) =>
  input1.value !== input2.value
    ? showError(input2, 'Passwords do not match')
    : showSuccess(input2);

const getFieldName = input =>
  input.id.charAt(0).toUpperCase() + input.id.slice(1);

// EVENT LISTENERS
form.addEventListener('submit', event => {
  event.preventDefault();
  checkRequired([username, email, password, confirmation]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, confirmation);
});
