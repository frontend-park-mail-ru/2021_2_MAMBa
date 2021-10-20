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

function deleteErrors(parentNode) {
  const errorBlocks = parentNode.querySelectorAll('.error-text');
  if (errorBlocks.length === 0) {
    return;
  }
  parentNode.removeChild(...errorBlocks);
}

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

export {createElementFromHTML, createError, foundErrorFields, deleteErrors};
