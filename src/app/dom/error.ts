const error = document.querySelector('.error')!;

export function showError(
  message: string = 'Something went wrong!',
  title: string = 'Oops...',
) {
  error.querySelector('.error-title')!.textContent = title;
  error.querySelector('.error-message')!.textContent = message;
  error.classList.add('visible');
}

export function hideErrors() {
  error.classList.remove('visible');
}
