function createElementFromHTML(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.firstChild;
}

function createError(text) {
  const errorBlock = document.createElement('div');
  errorBlock.innerText = text;
  errorBlock.classList.add('error-text');
  return errorBlock;
}

function deleteAllErrors(parentNode) {
  const errorBlocks = parentNode.querySelectorAll('.error-text');
  if (errorBlocks.length === 0) {
    return;
  }
  parentNode.removeChild(...errorBlocks);
}

function deleteNodeError(currNode) {
  const prevNode = currNode.previousSibling;
  if (!prevNode) {
    return;
  }
  if (prevNode.classList.contains('error-text')) {
    currNode.parentNode.removeChild(prevNode);
  }
}
//
// function insertAfter(referenceNode, newNode) {
//   referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
// }

function foundErrorFields(form) {
  let flag = false;
  const formTextInputs = form.querySelectorAll('.text-inputs');
  for (const input of formTextInputs) {
    if (input.classList.contains('error')) {
      flag = true;
      input.classList.toggle('animated');
      continue;
    }
    if (input.value === '') {
      flag = true;
      input.classList.add('error');
      form.insertBefore(createError('Поле не заполнено!'), input);
      input.classList.toggle('animated');
    }
  }
  return flag;
}

function addFocusOutListeners(authForm) {
  const formTextInputs = authForm.querySelectorAll('.text-inputs');
  for (const input of formTextInputs) {
    input.addEventListener('focusout', (e) => {
      deleteNodeError(input);
      switch (input.name) {
        case 'email': {
          if (!input.value.match(/\S+@\S+\.\S+/)) {
            input.classList.add('error');
            authForm.insertBefore(createError('Неправильный email!'), input);
          } else {
            input.classList.remove('error');
          }
          break;
        }
        case 'password': {
          let errorText = '';
          if (!input.value.match(/^(?=.*[0-9])(?=.*[A-z])[A-zА-я0-9]{8,}$/)) {
            input.classList.add('error');
            if (!input.value.match(/(?=.*[0-9])/)) {
              errorText='Пароль должен содержать хотя бы 1 цифру!';
            } else if (!input.value.match(/(?=.*[A-z])/)) {
              errorText='Пароль должен содержать хотя бы 1 латинскую букву!';
            } else if (!input.value.match(/[a-zA-Z0-9]{8,}/)) {
              errorText='Пароль должен содержать хотя бы 8 символов!';
            }
            authForm.insertBefore(createError(errorText), input);
          } else {
            input.classList.remove('error');
          }
          break;
        }
        case 'reppassword': {
          if (input.value !== authForm.password.value) {
            input.classList.add('error');
            authForm.insertBefore(createError('Пароли не совпадают!'), input);
          } else {
            input.classList.remove('error');
          }
          break;
        }
        case 'name':
        case 'surname': {
          if (input.value.match(/^.*[^A-zА-яЁё].*$/)) {
            input.classList.add('error');
            authForm.insertBefore(createError(
                'Недопускаются цифры и спец символы!'), input);
          } else {
            input.classList.remove('error');
          }
          break;
        }
        default: {
          console.log('Wrong name of input');
        }
      }
    });
  }
}


export {createElementFromHTML, createError, foundErrorFields,
  deleteAllErrors, addFocusOutListeners};
