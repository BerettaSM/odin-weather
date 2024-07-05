import '../styles/global.css';

import { getWeatherData } from './api';
import { renderWeatherData, switchTemperature } from './dom';
import { hideErrors, showError } from './dom/error';
import { debounce } from './utils';
import { HttpError } from './http';

{
  const temperatureControls = document.querySelectorAll(
    '.temperature-control input[name="scale-switcher"]',
  ) as NodeListOf<HTMLInputElement>;

  for (const control of temperatureControls)
    control.addEventListener('change', () =>
      switchTemperature(control.value as 'metric' | 'imperial'),
    );
}

{
  const spinner = document.querySelector('.spinner')!;
  const main = document.querySelector('.weather-info')!;
  const searchInput = document.getElementById(
    'search-input',
  ) as HTMLInputElement;
  const debounceBar = searchInput.parentElement!.querySelector(
    '.debounce-bar',
  ) as HTMLDivElement;
  const searchForm = document.getElementById('search-form') as HTMLFormElement;
  const delay = parseInt(debounceBar.dataset.debounceDelay!);
  const debouncedSubmit = debounce(
    () => searchForm.dispatchEvent(new Event('submit')),
    delay,
  );

  searchInput.addEventListener('input', () => {
    debounceBar.style.setProperty('--time', '0ms');
    debounceBar.classList.remove('filled');

    setTimeout(() => {
      const delay = debounceBar.dataset.debounceDelay!;
      debounceBar.style.setProperty('--time', delay);
      debounceBar.classList.add('filled');
      debouncedSubmit();
    }, 0);
  });

  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = searchInput.value.trim();

    if (!query) return;

    // Loading state start -> hide main component/error component, show spinner, disable input
    main.classList.remove('visible');
    spinner.classList.add('visible');
    hideErrors();

    try {
      const data = await getWeatherData(query, { days: '5' });
      renderWeatherData(data);
      main.classList.add('visible');
    } catch (err) {
      if (!(err instanceof HttpError)) {
        throw err;
      }
      showError(err.message);
    } finally {
      // Loading state end ->  hide spinner, enable input
      spinner.classList.remove('visible');
    }
  });
}
