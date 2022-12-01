import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const LOCALSTORAGE_KEY = 'feedback-form-state';

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();

function onFormSubmit(event) {
  event.preventDefault();

  const formElements = event.currentTarget.elements;

  const email = formElements.email.value;
  const message = formElements.message.value;

  const formDataElements = {
    email,
    message,
  };
  console.log(formDataElements);

  if (email.length === 0 || message.length === 0) {
    alert('Всі поля мають бути заповнені');
  } else {
    console.log(formDataElements);
    form.reset();
  }
}

function onTextareaInput() {
  const email = form.elements.email.value;
  const message = form.elements.message.value;

  const formDataElements = {
    email,
    message,
  };

  const formData = JSON.stringify(formDataElements);
  localStorage.setItem(LOCALSTORAGE_KEY, formData);
}

function populateTextarea() {
  const savedMessage = localStorage.getItem(LOCALSTORAGE_KEY);
  const saveMessageValue = JSON.parse(savedMessage);

  if (savedMessage) {
    form.elements.email.value = saveMessageValue.email;
    form.elements.message.value = saveMessageValue.message;
  }
}
